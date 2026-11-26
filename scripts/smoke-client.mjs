// Loads the built client.js with a stubbed module loader + React and renders the
// overlay component, to prove the bundle still evaluates and emits only the
// corner stage (no key-visual backdrop).
import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'
import { fileURLToPath } from 'node:url'

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const FILE = path.join(ROOT, 'client.js')
const code = fs.readFileSync(FILE, 'utf8')

// A doc comment that lost its `*/` still parses: the next declaration just
// becomes comment text. That once swallowed FRAME_INTERVAL, which froze the idle
// loop without any error, so check the cadence declaration is real code.
const TEMPLATE = fs.readFileSync(path.join(ROOT, 'client.template.js'), 'utf8')
const cadence = TEMPLATE.indexOf('const FRAME_INTERVAL')
if (cadence < 0) throw new Error('FRAME_INTERVAL disappeared from the template')
if (!TEMPLATE.slice(0, cadence).trimEnd().endsWith('*/')) {
  throw new Error('FRAME_INTERVAL sits inside a comment')
}
const node = (type, props, children) => ({ type, props: props ?? {}, children })

/** Depth-first search for a rendered node by one of its class names. */
const findNode = (node, className) => {
  if (node === null || typeof node !== 'object') return null
  const name = node.props?.className
  if (typeof name === 'string' && name.split(' ').includes(className)) return node
  for (const child of node.children ?? []) {
    const found = findNode(child, className)
    if (found !== null) return found
  }
  return null
}

const React = {
  createElement: (type, props, ...children) => node(type, props, children.flat()),
  Fragment: Symbol('Fragment'),
  useRef: (initial) => ({ current: initial ?? null }),
  useState: (initial) => [typeof initial === 'function' ? initial() : initial, () => {}],
  useEffect: () => {},
  useCallback: (fn) => fn,
}

// Stands in for the page's localStorage: the lock preference is the one key
// the bundle reads and writes.
const storage = new Map()

let registration = null
const sandbox = {
  window: {
    __ModuleLoader__: {
      load: (entry) => {
        registration = entry
      },
    },
    localStorage: {
      getItem: (key) => (storage.has(key) ? storage.get(key) : null),
      setItem: (key, value) => storage.set(key, String(value)),
      removeItem: (key) => storage.delete(key),
    },
    devicePixelRatio: 1,
    requestAnimationFrame: () => 0,
    cancelAnimationFrame: () => {},
  },
  document: {
    baseURI: 'http://127.0.0.1:3080/',
    visibilityState: 'visible',
    addEventListener: () => {},
    removeEventListener: () => {},
    querySelector: () => null,
    querySelectorAll: () => [],
    body: {},
    createTreeWalker: () => ({ nextNode: () => null }),
  },
  MutationObserver: class {
    observe() {}
    disconnect() {}
  },
  NodeFilter: { SHOW_TEXT: 4 },
  Node: { ELEMENT_NODE: 1 },
  Image: class {},
  performance: { now: () => 0 },
  Object,
  console,
  URL,
  Math,
  Map,
  Set,
  Number,
  Error,
  fetch: () => new Promise(() => {}),
}
sandbox.globalThis = sandbox
vm.createContext(sandbox)
vm.runInContext(code, sandbox, { filename: 'client.js' })

if (!registration) throw new Error('module loader was never called')
if (registration.id !== '@local/zzz-spine') throw new Error('unexpected id: ' + registration.id)

const plugin = registration.factory((name) => {
  if (name === 'react') return React
  throw new Error('unexpected require: ' + name)
})

const registrations = []
let overlay = null
const effects = []
const fakeCtx = {
  effect: (factory) => {
    const disposer = factory()
    effects.push(disposer)
    return disposer
  },
  slots: {
    inject: (name, fn) => {
      registrations.push(name)
      fn()
    },
    register: (meta, component) => {
      overlay = { meta, component }
      return { meta, component }
    },
  },
}
plugin.apply(fakeCtx)

if (!registrations.includes('conversation.input.overlay')) {
  throw new Error('overlay slot was not injected: ' + registrations.join(','))
}
if (overlay === null) throw new Error('overlay component was never registered')
if (typeof effects[0] !== 'function') throw new Error('the running-label watcher registered no disposer')

const tree = overlay.component({ useSession: (select) => select({ blank: true }) })
const children = tree.children
const classes = JSON.stringify(children)

if (classes.includes('zzz-kv')) throw new Error('backdrop is still rendered')
if (!classes.includes('zzz-spine-stage')) throw new Error('stage is missing')
if (children.length !== 2) throw new Error('expected style + stage, got ' + children.length)

const css = children[0]?.children?.[0]
if (typeof css !== 'string') throw new Error('style sheet was not emitted as a string')
for (const rule of ['zzz-spine-lock', 'data-lock-visible', 'zzz-spine-pointer', '[data-hover] canvas']) {
  if (!css.includes(rule)) throw new Error('style sheet is missing ' + rule)
}
// The figure must ship both renderers: the WebGL one (seam-free by construction)
// and the Canvas2D fallback for a page without a WebGL context. Losing either
// silently would bring the hairline wireframe back on real phones, so fail loudly.
for (const marker of [
  'createWebGlFigure',
  'webglcontextlost',
  'drawSkeleton',
  'SEAM_OVERLAP',
  'region.degrees === 90',
]) {
  if (!code.includes(marker)) throw new Error('renderer marker is missing: ' + marker)
}
if (code.includes('new spine.SkeletonRenderer')) {
  throw new Error('the seamed SkeletonRenderer path is back')
}
console.log('ok: webgl renderer + canvas2d fallback bundled')

const stageElement = children[1]
if (stageElement === undefined || typeof stageElement.type !== 'function') {
  throw new Error('stage component is missing')
}
const stageMarkup = JSON.stringify(stageElement.type(stageElement.props))
if (!stageMarkup.includes('zzz-spine-lock')) throw new Error('lock button is not rendered')
if (stageMarkup.includes('zzz-spine-restore')) throw new Error('old restore chip is still rendered')
if (!stageMarkup.includes('锁定为点击穿透')) throw new Error('lock label is missing')
console.log('ok: hover lock rendered, old chip gone')
console.log('ok: overlay metadata', JSON.stringify(overlay.meta))
console.log('ok: rendered children', children.length, '(style + stage)')
console.log('ok: click-through stylesheet present')

// A new session page must not reset the lock: the preference is read on mount
// and written whenever the lock toggles.
storage.clear()
const plainTree = stageElement.type(stageElement.props)
const plainMarkup = JSON.stringify(plainTree)
if (plainMarkup.includes('data-locked')) throw new Error('a page without a stored lock must start unlocked')

storage.set('zzz-spine:locked', '1')
const lockedMarkup = JSON.stringify(stageElement.type(stageElement.props))
if (!lockedMarkup.includes('data-locked')) throw new Error('a stored lock was not restored on mount')
if (!lockedMarkup.includes('data-faded')) throw new Error('a restored lock must mount as the ghost pose')

storage.clear()
const lockButton = findNode(plainTree, 'zzz-spine-lock')
if (lockButton === null) throw new Error('lock button node is missing')
lockButton.props.onClick()
if (storage.get('zzz-spine:locked') !== '1') throw new Error('locking was not persisted')
lockButton.props.onClick()
if (storage.has('zzz-spine:locked')) throw new Error('unlocking did not clear the persisted lock')
console.log('ok: lock preference restored on mount and persisted on toggle')
