// Generates client.js from client.template.js by inlining the Spine WebCanvas
// runtime (vendor/spine-canvas.min.mjs, @esotericsoftware/spine-canvas 4.2.120,
// under the Spine Runtimes License) as a plain function, because the browser
// module loader registers classic factories and cannot import an ES module from
// inside one. The running-turn flower rides the stylesheet as a data URI so its
// first paint is already correct, without a fetch on mount.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const RUNTIME = path.join(ROOT, 'vendor/spine-canvas.min.mjs')
const FLOWER = path.join(ROOT, 'assets/hua/levels_hua_a.png')
const TEMPLATE = path.join(ROOT, 'client.template.js')
const OUTPUT = path.join(ROOT, 'client.js')

/** Turn the minified ESM bundle into an IIFE that returns its export map. */
function runtimeAsExpression() {
  const code = fs.readFileSync(RUNTIME, 'utf8')
  const start = code.lastIndexOf('export{')
  if (start < 0) throw new Error('no export statement found in ' + RUNTIME)
  const tail = code.slice(start).replace(/^export\{/, '').replace(/\};?\s*$/, '')
  const pairs = tail.split(',').map((entry) => {
    const [local, exported] = entry.split(' as ').map((part) => part.trim())
    if (!local) throw new Error('bad export entry: ' + entry)
    return `${JSON.stringify(exported ?? local)}: ${local}`
  })
  const body = code.slice(0, start)
  return `(function () {\n${body}\nreturn { ${pairs.join(', ')} };\n})()`
}

const FLOWER_PLACEHOLDER = '__FLOWER_IMAGE__'
const template = fs.readFileSync(TEMPLATE, 'utf8')
if (!template.includes('__SPINE_RUNTIME__')) throw new Error('template is missing the runtime placeholder')
if (template.split('__SPINE_RUNTIME__').length !== 2) throw new Error('template must contain the runtime placeholder exactly once')
const flowerCount = template.split(FLOWER_PLACEHOLDER).length - 1
if (flowerCount !== 1) throw new Error(`template must contain ${FLOWER_PLACEHOLDER} exactly once, found ${flowerCount}`)

const flowerUri = 'data:image/png;base64,' + fs.readFileSync(FLOWER).toString('base64')
const out = template
  .replace(FLOWER_PLACEHOLDER, () => flowerUri)
  .replace('__SPINE_RUNTIME__', () => runtimeAsExpression())
fs.writeFileSync(OUTPUT, out, 'utf8')
const bytes = fs.statSync(OUTPUT).size
console.log(`wrote ${path.relative(ROOT, OUTPUT)} (${(bytes / 1024).toFixed(1)} KiB)`)
