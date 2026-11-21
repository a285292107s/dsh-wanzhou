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

const node = (type, props, children) => ({ type, props: props ?? {}, children })
const React = {
  createElement: (type, props, ...children) => node(type, props, children.flat()),
  Fragment: Symbol('Fragment'),
  useRef: (initial) => ({ current: initial ?? null }),
  useState: (initial) => [typeof initial === 'function' ? initial() : initial, () => {}],
  useEffect: () => {},
  useCallback: (fn) => fn,
}

let registration = null
const sandbox = {
  window: {
    __ModuleLoader__: {
      load: (entry) => {
        registration = entry
      },
    },
    localStorage: { getItem: () => null, setItem: () => {} },
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

console.log('ok: overlay metadata', JSON.stringify(overlay.meta))
console.log('ok: rendered children', children.length, '(style + stage)')
