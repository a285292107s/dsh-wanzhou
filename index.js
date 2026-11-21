/**
 * Host half: serves the extracted Spine assets and the key-visual photograph
 * from this package on the Web carrier, so the browser half can fetch them
 * same-origin without a build step.
 */
import { readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ASSET_ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), 'assets')
const ROUTE = '/zzz-spine/assets'

const MEDIA_TYPES = {
  '.json': 'application/json; charset=utf-8',
  '.atlas': 'text/plain; charset=utf-8',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
}

export const inject = ['webServer']

/**
 * Resolve a request path inside the asset directory.
 * @param pathname - the request pathname.
 * @returns the absolute file path, or `undefined` when the path escapes the directory.
 */
function resolveAsset(pathname) {
  if (!pathname.startsWith(ROUTE + '/')) return undefined
  let relative
  try {
    relative = decodeURIComponent(pathname.slice(ROUTE.length + 1))
  } catch {
    return undefined
  }
  if (relative === '' || relative.includes('\0')) return undefined
  const resolved = path.resolve(ASSET_ROOT, relative)
  if (resolved !== ASSET_ROOT && !resolved.startsWith(ASSET_ROOT + path.sep)) return undefined
  return resolved
}

async function respond(request) {
  const file = resolveAsset(new URL(request.url).pathname)
  if (file === undefined) return new Response('not found', { status: 404 })
  const info = await stat(file).catch(() => undefined)
  if (info === undefined || !info.isFile()) return new Response('not found', { status: 404 })
  // Revalidate on every load rather than guessing a freshness window: a rebuilt
  // atlas or texture has to take effect on the next reload, and a 304 on the
  // local carrier costs one round trip instead of the whole file.
  const etag = `"${info.size.toString(16)}-${Math.trunc(info.mtimeMs).toString(16)}"`
  const headers = {
    'content-type': MEDIA_TYPES[path.extname(file).toLowerCase()] ?? 'application/octet-stream',
    'cache-control': 'no-cache',
    'x-content-type-options': 'nosniff',
    etag,
  }
  if (request.headers.get('if-none-match') === etag) return new Response(null, { status: 304, headers })
  const body = await readFile(file)
  return new Response(body, {
    headers: { ...headers, 'content-length': String(body.byteLength) },
  })
}

export function apply(ctx) {
  ctx.effect(() => ctx.webServer.register({
    kind: 'prefix',
    path: ROUTE,
    resource: (request) => respond(request),
  }))
}
