/*
 * Client half of the "绝区零 · 立绘" decoration.
 *
 * One piece rides the composer: an animated Spine figure standing on the
 * input card's top-right corner. Pressing the painted figure fades it to a
 * ghost and lets clicks through to whatever it covers; the empty corners of
 * the 180×240 stage never catch a press in the first place.
 *
 * `client.js` is generated from this file by `_extract/build-client.mjs`,
 * which substitutes the runtime placeholder with the bundled Spine runtime.
 */
window.__ModuleLoader__.load({
  id: '@local/zzz-spine',
  factory(require) {
    const React = require('react')
    const h = React.createElement

    /* eslint-disable-next-line no-unused-vars */
    const spine = __SPINE_RUNTIME__

    const ASSET_ROOT = 'zzz-spine/assets/'
    const STAGE_WIDTH = 180
    const STAGE_HEIGHT = 240
    const GROUND_MARGIN = 4
    /**
     * The event card's lead figure. 德蕾琪娜·挽昼 is the character; 柔光之影 is
     * only the name of the outfit the event shows her in.
     */
    const CHARACTER = { dir: 'levels_spine_a', name: '德蕾琪娜·挽昼' }
    /**
     * Presentation cadence for the figure. The idle loop's meshes move about
     * 0.16 device pixels per 1/60 s, so a 60 Hz repaint draws 59 near-identical
     * frames a second for ~13 ms of Canvas2D time each — the whole frame budget
     * of the page. At 20 Hz one step is 0.24 CSS px, still sub-pixel motion for
     * an eye that only sees the 3.3 s loop, for a third of the work.
     */
    const FRAME_INTERVAL = 1000 / 20

    /**
     * Canvas2D cannot fill a skinned mesh in one call: it clips every triangle
     * and blits the atlas page through an affine map. Those clips are
     * antialiased, so at every shared edge the two neighbours each cover only
     * part of the pixel — the edge comes out at ~75% alpha instead of 100%.
     * Over the dark card that deficit reads as a wireframe of hairlines across
     * the whole figure, and a phone whose DPR is higher than the backing store
     * cap upsamples the canvas, thickening them into thread-like lines.
     *
     * Growing each triangle's clip by this many device pixels lets the
     * neighbours overlap so the shared edge reaches full alpha. Each triangle
     * blits only its own atlas rect, so the grown border can only repeat the
     * sprite's own pixels and never samples the sprite packed next to it.
     */
    const SEAM_OVERLAP = 0.6

    /**
     * The corner stage is mostly empty, so the pointer router tests the
     * figure's painted pixels instead of letting the whole rectangle swallow
     * presses. The mask is a coarse 45×60 alpha grid — 4×4 CSS px per cell —
     * rebuilt from the canvas every eighth painted frame (400 ms at 20 Hz).
     */
    const MASK_WIDTH = 45
    const MASK_HEIGHT = 60
    const MASK_THRESHOLD = 64
    const MASK_FRAMES = 8
    /**
     * A press on the figure is followed by a click the router has to swallow;
     * this window is also held after fading so the second click of a double
     * click cannot land on whatever the figure was covering.
     */
    const THROUGH_GUARD_MS = 400

    /**
     * The lock is a preference, not a page-local mode: it lives in
     * localStorage, so a new session page, a reload, or a second tab opens
     * with the figure already ghosted instead of needing the lock again.
     * Sessions are pages of the same origin, so the browser is the right
     * scope; clearing site data brings back the default unlocked figure.
     */
    const LOCK_STORAGE_KEY = 'zzz-spine:locked'

    function readStoredLock() {
      try {
        return window.localStorage.getItem(LOCK_STORAGE_KEY) === '1'
      } catch {
        // Storage can be unavailable (site data blocked, some private modes).
        // Losing the preference is harmless: the figure starts unlocked.
        return false
      }
    }

    function writeStoredLock(locked) {
      try {
        if (locked) window.localStorage.setItem(LOCK_STORAGE_KEY, '1')
        else window.localStorage.removeItem(LOCK_STORAGE_KEY)
      } catch {
        // Not remembered, but this page keeps the lock until it is reloaded.
      }
    }

    const dataCache = new Map()

    function fetchText(url) {
      // No `force-cache`: the host answers with an ETag and a 304, so a rebuilt
      // atlas is picked up without re-downloading unchanged bytes.
      return fetch(url).then((response) => {
        if (!response.ok) throw new Error(`assets ${response.status}: ${url}`)
        return response.text()
      })
    }

    function fetchJson(url) {
      return fetchText(url).then((text) => JSON.parse(text))
    }

    /**
     * Decode a texture page without blocking a frame. `Image` finishes decoding
     * on the first `drawImage`, i.e. inside a paint; `createImageBitmap` decodes
     * up front off the main thread, which is why the first frame no longer costs
     * the ~33 ms an <img> decode did.
     */
    async function loadTexture(url) {
      if (typeof createImageBitmap === 'function') {
        try {
          const response = await fetch(url)
          if (!response.ok) throw new Error(`texture ${response.status}: ${url}`)
          return await createImageBitmap(await response.blob())
        } catch {
          // Fall through to the element path; both are accepted by CanvasTexture.
        }
      }
      return await new Promise((resolve, reject) => {
        const image = new Image()
        image.decoding = 'async'
        image.onload = () => resolve(image)
        image.onerror = () => reject(new Error(`texture failed: ${url}`))
        image.src = url
      })
    }

    /** World-space bounds of the visible attachments at three idle poses. */
    function measure(skeletonData, animationName) {
      const skeleton = new spine.Skeleton(skeletonData)
      const state = new spine.AnimationState(new spine.AnimationStateData(skeletonData))
      state.setAnimation(0, animationName, true)
      const vertices = []
      let minX = Infinity
      let minY = Infinity
      let maxX = -Infinity
      let maxY = -Infinity
      const samples = [0, 0.45, 0.9, 1.35]
      for (let index = 0; index < samples.length; index++) {
        const step = index === 0 ? 0 : 0.45
        state.update(step)
        state.apply(skeleton)
        skeleton.updateWorldTransform(spine.Physics.update)
        for (const slot of skeleton.drawOrder) {
          const attachment = slot.getAttachment()
          if (!attachment) continue
          const isRegion = attachment instanceof spine.RegionAttachment
          const isMesh = attachment instanceof spine.MeshAttachment
          if (!isRegion && !isMesh) continue
          const length = attachment.worldVerticesLength
          if (!length) continue
          if (vertices.length < length) vertices.length = length
          attachment.computeWorldVertices(slot, 0, length, vertices, 0, 2)
          for (let i = 0; i < length; i += 2) {
            if (vertices[i] < minX) minX = vertices[i]
            if (vertices[i] > maxX) maxX = vertices[i]
            if (vertices[i + 1] < minY) minY = vertices[i + 1]
            if (vertices[i + 1] > maxY) maxY = vertices[i + 1]
          }
        }
      }
      if (!Number.isFinite(minX) || !Number.isFinite(minY)) return null
      return { minX, minY, maxX, maxY }
    }

    /** The editor's setup bounds, when the skeleton declares usable ones. */
    function declaredBox(skeletonData) {
      const width = skeletonData.width
      const height = skeletonData.height
      if (!(width > 1) || !(height > 1)) return null
      return {
        minX: skeletonData.x,
        minY: skeletonData.y,
        maxX: skeletonData.x + width,
        maxY: skeletonData.y + height,
      }
    }

    /** Canvas transform that fits the given box on the stage, bottom-aligned. */
    function framing(bounds) {
      if (bounds === null) return null
      const width = Math.max(1, bounds.maxX - bounds.minX)
      const height = Math.max(1, bounds.maxY - bounds.minY)
      const usableWidth = STAGE_WIDTH - 6
      const usableHeight = STAGE_HEIGHT - GROUND_MARGIN * 2
      const scale = Math.min(usableWidth / width, usableHeight / height)
      const drawnWidth = width * scale
      const left = (STAGE_WIDTH - drawnWidth) / 2
      // World y grows upward and canvas y downward; the figures stand on the
      // card's top edge, so the lowest declared pixel sits at the bottom.
      return {
        a: scale,
        e: left - bounds.minX * scale,
        f: STAGE_HEIGHT - GROUND_MARGIN + bounds.minY * scale,
      }
    }

    /** Skin with the most resolved attachments is the one that draws body art. */
    function pickSkin(skeleton, skeletonData) {
      let best = null
      let bestCount = -1
      for (const skin of skeletonData.skins) {
        skeleton.setSkinByName(skin.name)
        skeleton.setToSetupPose()
        let count = 0
        for (const slot of skeleton.slots) if (slot.attachment) count++
        if (count > bestCount) {
          bestCount = count
          best = skin.name
        }
      }
      return best
    }

    const QUAD_TRIANGLES = [0, 1, 2, 2, 3, 0]

    /**
     * Paint one pose of a skinned skeleton.
     *
     * This replaces `spine.SkeletonRenderer`'s `triangleRendering` path: the
     * drawing is the same run of clipped, affine-mapped atlas blits, but each
     * clip is grown by `overlap` world units and sourced from the attachment's
     * own atlas rect. Shared edges then overlap instead of leaving the
     * translucent hairline described at `SEAM_OVERLAP`, and the grown border
     * can only repeat the sprite's own pixels.
     *
     * `overlap` is `SEAM_OVERLAP` converted to world units, so the overlap is a
     * constant size in device pixels at any backing-store scale.
     */
    function drawSkeleton(context, skeleton, overlap) {
      let vertices = new Float32Array(0)
      for (const slot of skeleton.drawOrder) {
        const attachment = slot.getAttachment()
        if (attachment === null) continue
        const isRegion = attachment instanceof spine.RegionAttachment
        const isMesh = !isRegion && attachment instanceof spine.MeshAttachment
        if (!isRegion && !isMesh) continue
        const region = attachment.region
        if (region === null || region === undefined) continue
        if (region.texture === null || region.texture === undefined) continue
        const image = region.texture.getImage()
        if (image === null || image === undefined) continue
        const length = isRegion ? 8 : attachment.worldVerticesLength
        if (!(length > 0)) continue
        if (vertices.length < length) vertices = new Float32Array(length)
        if (isRegion) attachment.computeWorldVertices(slot, vertices, 0, 2)
        else attachment.computeWorldVertices(slot, 0, length, vertices, 0, 2)
        const triangles = isRegion ? QUAD_TRIANGLES : attachment.triangles
        if (triangles === null || triangles === undefined) continue
        const uvs = attachment.uvs
        if (uvs === null || uvs === undefined) continue
        const attachmentColor = attachment.color
        const alpha = skeleton.color.a * slot.color.a *
          (attachmentColor === undefined ? 1 : attachmentColor.a)
        if (!(alpha > 0)) continue
        // The atlas stores a `rotate: 90` region transposed: the atlas text's
        // width/height describe the sprite, while the page holds height×width.
        const rotated = region.degrees === 90
        const sourceWidth = rotated ? region.height : region.width
        const sourceHeight = rotated ? region.width : region.height
        const pageWidth = image.width - 1
        const pageHeight = image.height - 1
        context.globalAlpha = alpha
        for (let index = 0; index < triangles.length; index += 3) {
          const a = triangles[index] * 2
          const b = triangles[index + 1] * 2
          const c = triangles[index + 2] * 2
          const x1 = vertices[a]
          const y1 = vertices[a + 1]
          const x2 = vertices[b]
          const y2 = vertices[b + 1]
          const x3 = vertices[c]
          const y3 = vertices[c + 1]
          // Grow the clip away from the centroid: every edge moves outward by
          // `overlap`, so neighbours overlap instead of meeting at half alpha.
          const centerX = (x1 + x2 + x3) / 3
          const centerY = (y1 + y2 + y3) / 3
          let reach = Math.hypot(x1 - centerX, y1 - centerY) || 1
          const p1x = x1 + ((x1 - centerX) / reach) * overlap
          const p1y = y1 + ((y1 - centerY) / reach) * overlap
          reach = Math.hypot(x2 - centerX, y2 - centerY) || 1
          const p2x = x2 + ((x2 - centerX) / reach) * overlap
          const p2y = y2 + ((y2 - centerY) / reach) * overlap
          reach = Math.hypot(x3 - centerX, y3 - centerY) || 1
          const p3x = x3 + ((x3 - centerX) / reach) * overlap
          const p3y = y3 + ((y3 - centerY) / reach) * overlap
          const tu1 = uvs[a] * pageWidth
          const tv1 = uvs[a + 1] * pageHeight
          const tu2 = uvs[b] * pageWidth
          const tv2 = uvs[b + 1] * pageHeight
          const tu3 = uvs[c] * pageWidth
          const tv3 = uvs[c + 1] * pageHeight
          context.beginPath()
          context.moveTo(p1x, p1y)
          context.lineTo(p2x, p2y)
          context.lineTo(p3x, p3y)
          context.closePath()
          // Affine map from the atlas page onto this triangle. Paths are
          // rasterised where they are built, so the clip above keeps its
          // canvas-space shape while the blit is transformed.
          const e1x = p2x - p1x
          const e1y = p2y - p1y
          const e2x = p3x - p1x
          const e2y = p3y - p1y
          const du2 = tu2 - tu1
          const dv2 = tv2 - tv1
          const du3 = tu3 - tu1
          const dv3 = tv3 - tv1
          let det = du2 * dv3 - du3 * dv2
          if (det === 0) continue
          det = 1 / det
          const ta = (dv3 * e1x - dv2 * e2x) * det
          const tb = (dv3 * e1y - dv2 * e2y) * det
          const tc = (du2 * e2x - du3 * e1x) * det
          const td = (du2 * e2y - du3 * e1y) * det
          context.save()
          context.transform(ta, tb, tc, td,
            p1x - ta * tu1 - tc * tv1, p1y - tb * tu1 - td * tv1)
          context.clip()
          context.drawImage(image,
            region.x, region.y, sourceWidth, sourceHeight,
            region.x, region.y, sourceWidth, sourceHeight)
          context.restore()
        }
      }
      context.globalAlpha = 1
    }
    /* ---------------------------------------------------------------------
     * WebGL figure
     *
     * Canvas2D has exactly one way to fill a textured triangle: clip to it and
     * blit the atlas through an affine map. Clip edges are antialiased, so every
     * shared edge comes out translucent; growing the clip (`SEAM_OVERLAP`) hides
     * most of that, but the seam is only ever covered, never removed, and how
     * much survives depends on the browser's clip rasteriser. That is why Spine
     * calls its canvas mesh path experimental and points at the WebGL backend.
     *
     * On the GPU the same triangles are filled by one rasteriser with one fill
     * rule: a pixel inside the mesh is covered exactly once, so shared edges
     * cannot seam. This is a small purpose-built renderer rather than the full
     * spine-webgl runtime: the canvas runtime already poses the skeleton, so all
     * that is left is one batched draw call.
     *
     * Atlas bleeding is handled in the shader. Spine's UVs sit on texel edges,
     * so LINEAR sampling at a sprite's border would reach into the sprite packed
     * next to it — this page has no padding at all. Clamping each sample to the
     * attachment's own rect, half a texel in, keeps every sample inside the
     * sprite.
     * ------------------------------------------------------------------- */

    const WEBGL_VERTEX_SHADER = [
      'attribute vec2 aPosition;',
      'attribute vec2 aUV;',
      'attribute vec4 aBounds;',
      'attribute float aAlpha;',
      'uniform vec2 uScale;',
      'uniform vec2 uOffset;',
      'uniform vec2 uHalf;',
      'varying vec2 vUV;',
      'varying vec4 vBounds;',
      'varying float vAlpha;',
      'void main() {',
      '  vec2 px = aPosition * uScale + uOffset;',
      '  gl_Position = vec4(px.x / uHalf.x - 1.0, 1.0 - px.y / uHalf.y, 0.0, 1.0);',
      '  vUV = aUV;',
      '  vBounds = aBounds;',
      '  vAlpha = aAlpha;',
      '}',
    ].join('\n')

    const WEBGL_FRAGMENT_SHADER = [
      '#ifdef GL_FRAGMENT_PRECISION_HIGH',
      'precision highp float;',
      '#else',
      'precision mediump float;',
      '#endif',
      'uniform sampler2D uTexture;',
      'varying vec2 vUV;',
      'varying vec4 vBounds;',
      'varying float vAlpha;',
      'void main() {',
      '  // The atlas is uploaded premultiplied (see UNPACK_PREMULTIPLY_ALPHA_WEBGL),',
      '  // so the texel already carries rgb*alpha. Multiplying again would be wrong;',
      '  // and uploading straight alpha makes LINEAR sampling pull transparent-black',
      '  // padding into every sprite edge (the dark fringe around all textures).',
      '  vec4 texel = texture2D(uTexture, clamp(vUV, vBounds.xy, vBounds.zw));',
      '  gl_FragColor = texel * vAlpha;',
      '}',
    ].join('\n')

    function compileShader(gl, type, source) {
      const shader = gl.createShader(type)
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw new Error('shader: ' + gl.getShaderInfoLog(shader))
      }
      return shader
    }

    /** Every attachment name this slot can show while the track plays. */
    function slotAttachmentNames(skin, slotIndex) {
      if (skin === null || skin === undefined) return []
      const bag = skin.attachments
      if (bag === null || bag === undefined) return []
      const entry = typeof bag.get === 'function' ? bag.get(slotIndex) : bag[slotIndex]
      if (entry === null || entry === undefined) return []
      if (typeof entry.keys === 'function') return [...entry.keys()]
      return Object.keys(entry)
    }

    /**
     * One batched draw call for the whole figure, plus a tiny framebuffer used
     * to rebuild the click-through mask without reading the visible canvas
     * (a WebGL canvas cannot be read back with `getImageData`).
     */
    function createWebGlFigure(canvas, image, fit) {
      const gl = canvas.getContext('webgl', {
        alpha: true,
        premultipliedAlpha: true,
        antialias: false,
        depth: false,
        stencil: false,
        preserveDrawingBuffer: false,
      })
      if (gl === null) throw new Error('no webgl context')

      const pageWidth = image.width
      const pageHeight = image.height
      let program = null
      let attributes = null
      let uniforms = null
      let texture = null
      let buffers = null
      let layout = null
      let mask = null
      let restored = null
      let lost = false
      let skeletonRef = null
      let skinRef = null
      let pixelRatioRef = 1
      const scratch = { vertices: new Float32Array(0) }

      const createResources = () => {
        program = gl.createProgram()
        gl.attachShader(program, compileShader(gl, gl.VERTEX_SHADER, WEBGL_VERTEX_SHADER))
        gl.attachShader(program, compileShader(gl, gl.FRAGMENT_SHADER, WEBGL_FRAGMENT_SHADER))
        gl.linkProgram(program)
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
          throw new Error('program: ' + gl.getProgramInfoLog(program))
        }
        attributes = {
          position: gl.getAttribLocation(program, 'aPosition'),
          uv: gl.getAttribLocation(program, 'aUV'),
          bounds: gl.getAttribLocation(program, 'aBounds'),
          alpha: gl.getAttribLocation(program, 'aAlpha'),
        }
        uniforms = {
          scale: gl.getUniformLocation(program, 'uScale'),
          offset: gl.getUniformLocation(program, 'uOffset'),
          half: gl.getUniformLocation(program, 'uHalf'),
          texture: gl.getUniformLocation(program, 'uTexture'),
        }
        texture = gl.createTexture()
        gl.bindTexture(gl.TEXTURE_2D, texture)
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        mask = null
        if (skeletonRef !== null) buildBuffers(skeletonRef, skinRef)
      }

      /**
       * One block of vertices per (slot, candidate attachment), in slot order.
       * A slot can switch attachments while the track plays (the idle track
       * toggles the eye expressions 42 times), so every candidate the skin
       * offers for that slot is reserved; each frame the inactive ones are
       * collapsed to zero area and drawn as nothing.
       */
      const buildBuffers = (skeleton, skin) => {
        const slots = skeleton.slots
        const entries = []
        let vertexTotal = 0
        let indexTotal = 0
        for (let slotIndex = 0; slotIndex < slots.length; slotIndex++) {
          const slotData = slots[slotIndex]
          const candidates = slotAttachmentNames(skin, slotIndex)
          if (slotData.attachment !== undefined && slotData.attachment !== null &&
            candidates.indexOf(slotData.attachment) < 0) {
            candidates.push(slotData.attachment)
          }
          for (const name of candidates) {
            const attachment = skin.getAttachment(slotIndex, name)
            if (attachment === null || attachment === undefined) continue
            const isRegion = attachment instanceof spine.RegionAttachment
            const isMesh = !isRegion && attachment instanceof spine.MeshAttachment
            if (!isRegion && !isMesh) continue
            const region = attachment.region
            if (region === null || region === undefined) continue
            if (region.texture === null || region.texture === undefined) continue
            const uvs = attachment.uvs
            if (uvs === null || uvs === undefined) continue
            const count = isRegion ? 4 : attachment.worldVerticesLength / 2
            if (!(count > 0)) continue
            const triangles = isRegion ? QUAD_TRIANGLES : attachment.triangles
            if (triangles === null || triangles === undefined) continue
            // Rotated atlas regions are stored transposed: the atlas text's
            // width/height describe the sprite, the page holds height×width.
            const rotated = region.degrees === 90
            const storedWidth = rotated ? region.height : region.width
            const storedHeight = rotated ? region.width : region.height
            let minU = (region.x + 0.5) / pageWidth
            let maxU = (region.x + storedWidth - 0.5) / pageWidth
            let minV = (region.y + 0.5) / pageHeight
            let maxV = (region.y + storedHeight - 0.5) / pageHeight
            if (maxU < minU) { minU = maxU = region.x / pageWidth }
            if (maxV < minV) { minV = maxV = region.y / pageHeight }
            entries.push({
              slotIndex,
              name,
              attachment,
              first: vertexTotal,
              count,
              uvs,
              minU,
              maxU,
              minV,
              maxV,
              triangles,
            })
            vertexTotal += count
            indexTotal += triangles.length
          }
        }

        const positions = new Float32Array(vertexTotal * 2)
        const uvs = new Float32Array(vertexTotal * 2)
        const bounds = new Float32Array(vertexTotal * 4)
        const alphas = new Float32Array(vertexTotal)
        const indices = new Uint16Array(indexTotal)
        let indexOffset = 0
        for (const entry of entries) {
          for (let vertex = 0; vertex < entry.count; vertex++) {
            const target = (entry.first + vertex) * 2
            uvs[target] = entry.uvs[vertex * 2]
            uvs[target + 1] = entry.uvs[vertex * 2 + 1]
            const boundTarget = (entry.first + vertex) * 4
            bounds[boundTarget] = entry.minU
            bounds[boundTarget + 1] = entry.minV
            bounds[boundTarget + 2] = entry.maxU
            bounds[boundTarget + 3] = entry.maxV
          }
          for (let index = 0; index < entry.triangles.length; index++) {
            indices[indexOffset + index] = entry.first + entry.triangles[index]
          }
          indexOffset += entry.triangles.length
        }

        const makeBuffer = (target, data, usage) => {
          const buffer = gl.createBuffer()
          gl.bindBuffer(target, buffer)
          gl.bufferData(target, data, usage)
          return buffer
        }
        buffers = {
          positions: makeBuffer(gl.ARRAY_BUFFER, positions, gl.DYNAMIC_DRAW),
          uvs: makeBuffer(gl.ARRAY_BUFFER, uvs, gl.STATIC_DRAW),
          bounds: makeBuffer(gl.ARRAY_BUFFER, bounds, gl.STATIC_DRAW),
          alphas: makeBuffer(gl.ARRAY_BUFFER, alphas, gl.DYNAMIC_DRAW),
          indices: makeBuffer(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW),
        }
        layout = {
          entries,
          byKey: new Map(entries.map((entry) => [entry.slotIndex + ':' + entry.name, entry])),
          positions,
          alphas,
          indexCount: indexTotal,
        }
      }

      const ensureMask = () => {
        if (mask !== null) return mask
        const maskTexture = gl.createTexture()
        gl.bindTexture(gl.TEXTURE_2D, maskTexture)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, MASK_WIDTH, MASK_HEIGHT, 0,
          gl.RGBA, gl.UNSIGNED_BYTE, null)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        const framebuffer = gl.createFramebuffer()
        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer)
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, maskTexture, 0)
        const complete = gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE
        gl.bindFramebuffer(gl.FRAMEBUFFER, null)
        if (!complete) return null
        mask = {
          framebuffer,
          pixels: new Uint8Array(MASK_WIDTH * MASK_HEIGHT * 4),
          cells: new Uint8Array(MASK_WIDTH * MASK_HEIGHT),
        }
        return mask
      }

      const draw = (target, pixelRatio, ratioX, ratioY, halfWidth, halfHeight) => {
        if (buffers === null || layout === null) return
        gl.bindFramebuffer(gl.FRAMEBUFFER, target)
        gl.viewport(0, 0, Math.round(halfWidth * 2), Math.round(halfHeight * 2))
        gl.clearColor(0, 0, 0, 0)
        gl.clear(gl.COLOR_BUFFER_BIT)
        gl.useProgram(program)
        gl.enable(gl.BLEND)
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
        gl.activeTexture(gl.TEXTURE0)
        gl.bindTexture(gl.TEXTURE_2D, texture)
        gl.uniform1i(uniforms.texture, 0)
        gl.uniform2f(uniforms.scale, fit.a * pixelRatio * ratioX, -fit.a * pixelRatio * ratioY)
        gl.uniform2f(uniforms.offset, fit.e * pixelRatio * ratioX, fit.f * pixelRatio * ratioY)
        gl.uniform2f(uniforms.half, halfWidth, halfHeight)
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.positions)
        gl.enableVertexAttribArray(attributes.position)
        gl.vertexAttribPointer(attributes.position, 2, gl.FLOAT, false, 0, 0)
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.uvs)
        gl.enableVertexAttribArray(attributes.uv)
        gl.vertexAttribPointer(attributes.uv, 2, gl.FLOAT, false, 0, 0)
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.bounds)
        gl.enableVertexAttribArray(attributes.bounds)
        gl.vertexAttribPointer(attributes.bounds, 4, gl.FLOAT, false, 0, 0)
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.alphas)
        gl.enableVertexAttribArray(attributes.alpha)
        gl.vertexAttribPointer(attributes.alpha, 1, gl.FLOAT, false, 0, 0)
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices)
        gl.drawElements(gl.TRIANGLES, layout.indexCount, gl.UNSIGNED_SHORT, 0)
        gl.bindFramebuffer(gl.FRAMEBUFFER, null)
      }

      const paint = (skeleton, pixelRatio) => {
        if (lost || buffers === null || layout === null || fit === null) return
        const positions = layout.positions
        const alphas = layout.alphas
        positions.fill(0)
        alphas.fill(0)
        for (const slot of skeleton.drawOrder) {
          const attachment = slot.getAttachment()
          if (attachment === null) continue
          const entry = layout.byKey.get(slot.data.index + ':' + attachment.name)
          if (entry === undefined) continue
          const length = entry.count * 2
          if (scratch.vertices.length < length) scratch.vertices = new Float32Array(length * 2)
          if (entry.attachment instanceof spine.RegionAttachment) {
            attachment.computeWorldVertices(slot, scratch.vertices, 0, 2)
          } else {
            attachment.computeWorldVertices(slot, 0, length, scratch.vertices, 0, 2)
          }
          positions.set(scratch.vertices.subarray(0, length), entry.first * 2)
          const alpha = skeleton.color.a * slot.color.a * attachment.color.a
          alphas.fill(alpha, entry.first, entry.first + entry.count)
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.positions)
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, positions)
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.alphas)
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, alphas)
        pixelRatioRef = pixelRatio
        draw(null, pixelRatio, 1, 1, canvas.width / 2, canvas.height / 2)
      }

      /** Rebuild the 45×60 hit mask from a matching off-screen render. */
      const readMask = (pixelRatio) => {
        if (lost || buffers === null || layout === null || fit === null) return null
        const target = ensureMask()
        if (target === null) return null
        draw(target.framebuffer, pixelRatio, MASK_WIDTH / canvas.width, MASK_HEIGHT / canvas.height,
          MASK_WIDTH / 2, MASK_HEIGHT / 2)
        // `draw` unbinds when it is done, and readPixels reads whatever framebuffer
        // is bound — so re-bind the off-screen target first.
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.framebuffer)
        gl.readPixels(0, 0, MASK_WIDTH, MASK_HEIGHT, gl.RGBA, gl.UNSIGNED_BYTE, target.pixels)
        gl.bindFramebuffer(gl.FRAMEBUFFER, null)
        let filled = 0
        for (let row = 0; row < MASK_HEIGHT; row++) {
          const source = (MASK_HEIGHT - 1 - row) * MASK_WIDTH
          const destination = row * MASK_WIDTH
          for (let column = 0; column < MASK_WIDTH; column++) {
            // readPixels starts at the bottom row; the stage's mask is top-down.
            const alpha = target.pixels[(source + column) * 4 + 3]
            const value = alpha >= MASK_THRESHOLD ? 1 : 0
            target.cells[destination + column] = value
            filled += value
          }
        }
        return { cells: target.cells, filled }
      }

      const onContextLost = (event) => {
        event.preventDefault()
        lost = true
        buffers = null
        layout = null
        mask = null
        program = null
        texture = null
      }

      const onContextRestored = () => {
        lost = false
        try {
          createResources()
        } catch {
          return
        }
        if (restored !== null) restored()
      }

      canvas.addEventListener('webglcontextlost', onContextLost)
      canvas.addEventListener('webglcontextrestored', onContextRestored)
      createResources()

      return {
        build(skeleton, skin) {
          skeletonRef = skeleton
          skinRef = skin
          buildBuffers(skeleton, skin)
        },
        paint,
        readMask,
        dispose() {
          canvas.removeEventListener('webglcontextlost', onContextLost)
          canvas.removeEventListener('webglcontextrestored', onContextRestored)
        },
        get lost() { return lost },
        set onRestore(fn) { restored = fn },
        get pixelRatio() { return pixelRatioRef },
      }
    }

    async function build(dir) {
      const dirUrl = new URL('spine/' + dir + '/', new URL(ASSET_ROOT, document.baseURI))
      const [atlasText, json] = await Promise.all([
        fetchText(new URL(dir + '.atlas', dirUrl).href),
        fetchJson(new URL(dir + '.json', dirUrl).href),
      ])
      const atlas = new spine.TextureAtlas(atlasText)
      // The atlas text already names its pages; re-parsing it would be a second,
      // more brittle copy of that truth.
      const pages = atlas.pages.map((page) => page.name)
      const textures = new Map()
      await Promise.all(pages.map(async (page) => {
        const texture = await loadTexture(new URL(page, dirUrl).href)
        textures.set(page, texture)
        for (const atlasPage of atlas.pages) {
          if (atlasPage.name === page) atlasPage.setTexture(new spine.CanvasTexture(texture))
        }
      }))
      const skeletonData = new spine.SkeletonJson(new spine.AtlasAttachmentLoader(atlas))
        .readSkeletonData(json)
      const names = skeletonData.animations.map((animation) => animation.name)
      const animation = names.includes('idle') ? 'idle' : names[0]
      return {
        skeletonData,
        animation,
        // The editor's setup bounds frame the card art the way the event page
        // shows it; the vertex union can include off-stage props, so it is only
        // the fallback for skeletons without declared bounds — and it is only
        // measured when that fallback is actually needed (7.5 ms otherwise).
        fit: framing(declaredBox(skeletonData) ?? measure(skeletonData, animation)),
        // The WebGL path uploads the atlas page itself, so it needs the decoded
        // image; a multi-page atlas is left to the Canvas2D fallback, which can
        // draw any page per attachment.
        pageCount: pages.length,
        image: pages.length === 1 ? textures.get(pages[0]) : undefined,
      }
    }

    /* ---------------------------------------------------------------------
     * Running-turn flower
     *
     * Chat's running indicator draws a whale tail sized by its own stylesheet.
     * The decoration keeps that 14px square and only swaps what is painted in
     * it for the event page's little four-petal flower. Only the spin is
     * reproduced: the event engine also wobbled the bone on x and pulsed its
     * scale, but those read as jitter at icon size and are left out.
     * ------------------------------------------------------------------- */
    /* ---------------------------------------------------------------------
     * Running-turn label
     *
     * Chat renders the running row's wording from its own locale table
     * (`chat.deepDivingFor`), and a plugin cannot override it: the locale
     * service throws when a namespace already has a dictionary for that
     * locale. So the wording is rewritten in the DOM instead. Every rewrite
     * happens inside a MutationObserver callback, which runs as a microtask
     * before the browser paints, so React re-rendering the duration once a
     * second never flashes the old text.
     * ------------------------------------------------------------------- */

    const RUNNING_LABEL = { from: '深度求索中', to: '罗塞塔数据解算中' }
    const SHIMMER_TEXT = 'data-shimmer-text'

    // Relabelling runs again on every mutation it causes, so it only converges
    // once the rewritten text no longer contains `from`. When `to` contains
    // `from` (or `from` is empty), every pass matches its own output: the
    // observer keeps re-queueing itself as a microtask, the queue never drains,
    // and the browser never gets to paint — the tab locks up instead of merely
    // dropping frames. That is a configuration mistake, so it fails here, at
    // load time, rather than the first time a turn runs.
    if (RUNNING_LABEL.from === '' || RUNNING_LABEL.to.includes(RUNNING_LABEL.from)) {
      throw new Error(
        'RUNNING_LABEL does not converge: `from` must be non-empty and `to` must not contain it',
      )
    }

    /** Rewrite every copy of the label inside one running row. */
    function relabel(root) {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
      for (let node = walker.nextNode(); node !== null; node = walker.nextNode()) {
        const value = node.nodeValue
        if (value === null || !value.includes(RUNNING_LABEL.from)) continue
        node.nodeValue = value.split(RUNNING_LABEL.from).join(RUNNING_LABEL.to)
      }
      // The shimmer overlay paints its sweep from this attribute, not from text,
      // so it has to be carried along or the highlight shows the old wording.
      for (const element of root.querySelectorAll(`[${SHIMMER_TEXT}]`)) {
        const value = element.getAttribute(SHIMMER_TEXT)
        if (value === null || !value.includes(RUNNING_LABEL.from)) continue
        element.setAttribute(SHIMMER_TEXT, value.split(RUNNING_LABEL.from).join(RUNNING_LABEL.to))
      }
    }

    /**
     * Follow every `[data-chat-running]` row in the document. The row mounts
     * once per Turn, so the document observer only carries the childList edge;
     * the per-row observer carries the text and attribute churn.
     */
    function watchRunningLabel() {
      const RUNNING = '[data-chat-running]'
      // One observer per row, tracked so teardown can stop all of them. A row
      // that leaves the document never mutates again, so its observer has to be
      // pruned from here — the per-row callback would never fire to clean up,
      // and this list would otherwise keep every finished row's DOM alive.
      const tracked = []
      const attached = new WeakMap()

      const prune = () => {
        for (let index = tracked.length - 1; index >= 0; index--) {
          const entry = tracked[index]
          if (entry.root.isConnected) continue
          entry.observer.disconnect()
          attached.delete(entry.root)
          tracked.splice(index, 1)
        }
      }

      const attach = (root) => {
        if (attached.has(root)) return
        relabel(root)
        const observer = new MutationObserver(() => relabel(root))
        observer.observe(root, {
          characterData: true,
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: [SHIMMER_TEXT],
        })
        attached.set(root, observer)
        tracked.push({ root, observer })
      }

      for (const root of document.querySelectorAll(RUNNING)) attach(root)

      const rows = new MutationObserver((records) => {
        prune()
        for (const record of records) {
          for (const node of record.addedNodes) {
            if (node.nodeType !== Node.ELEMENT_NODE) continue
            if (node.matches(RUNNING)) attach(node)
            const inner = node.querySelector(RUNNING)
            if (inner !== null) attach(inner)
          }
        }
      })
      rows.observe(document.body, { childList: true, subtree: true })

      return () => {
        rows.disconnect()
        for (const entry of tracked) entry.observer.disconnect()
        tracked.length = 0
      }
    }
    function loadCharacter(dir) {
      if (!dataCache.has(dir)) {
        dataCache.set(dir, build(dir).catch((error) => {
          dataCache.delete(dir)
          throw error
        }))
      }
      return dataCache.get(dir)
    }

    const CSS = `
.zzz-spine-stage {
  position: absolute;
  right: 6px;
  bottom: 0;
  width: ${STAGE_WIDTH}px;
  height: ${STAGE_HEIGHT}px;
  pointer-events: none;
  display: block;
}
.zzz-spine-hit {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  /* The stage ignores pointer events; a document-level router decides
     whether a press landed on the painted figure. */
  pointer-events: none;
  border-radius: 12px;
  -webkit-tap-highlight-color: transparent;
}
.zzz-spine-hit:focus-visible {
  outline: 2px solid var(--dsw-alias-border-focus, #4c8dff);
  outline-offset: 2px;
}
.zzz-spine-hit canvas {
  width: 100%;
  height: 100%;
  display: block;
  pointer-events: none;
  opacity: 1;
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.45));
  transition: transform 200ms ease, filter 200ms ease, opacity 220ms ease;
}
/* The pointer router sets data-hover only over painted pixels. The lift is
   cosmetic; hit testing keeps using the untransformed stage box. */
.zzz-spine-stage[data-hover] canvas {
  transform: translateY(-2px) scale(1.015);
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.5));
}
/* Faded: the figure is a ghost and the stage lets every press through, so
   even controls behind the painted body can be used. */
.zzz-spine-stage[data-faded] .zzz-spine-hit canvas {
  opacity: 0.12;
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.12));
}
/* Lock control. It stays in the DOM so it can be reached from the keyboard,
   but it only becomes visible while the pointer is on the figure (or the
   button itself is focused). Locking keeps the ghost and the click-through
   in place until it is unlocked again. */
.zzz-spine-lock {
  position: absolute;
  top: 2px;
  left: 2px;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  margin: 0;
  padding: 0;
  border: 1px solid var(--dsw-alias-border-l1, rgba(255, 255, 255, 0.16));
  border-radius: 999px;
  background: var(--dsw-alias-bg-module-platform, rgba(30, 30, 30, 0.78));
  color: var(--dsw-alias-label-secondary, #c8c8c8);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.35);
  opacity: 0;
  transform: translateY(-2px) scale(0.96);
  pointer-events: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: opacity 140ms ease, transform 140ms ease, color 140ms ease, border-color 140ms ease;
}
.zzz-spine-stage[data-lock-visible] .zzz-spine-lock,
.zzz-spine-lock:focus-visible {
  opacity: 1;
  transform: none;
  pointer-events: auto;
}
.zzz-spine-lock:hover,
.zzz-spine-lock:focus-visible {
  color: var(--dsw-alias-label-primary, #ffffff);
  border-color: var(--dsw-alias-border-focus, rgba(120, 170, 255, 0.6));
}
.zzz-spine-stage[data-locked] .zzz-spine-lock {
  color: var(--dsw-alias-label-primary, #ffffff);
  border-color: var(--dsw-alias-border-focus, rgba(120, 170, 255, 0.65));
  background: rgba(76, 141, 255, 0.22);
}
.zzz-spine-lock:focus-visible {
  outline: 2px solid var(--dsw-alias-border-focus, #4c8dff);
  outline-offset: 2px;
}

/* Fingers need a bigger target than a mouse pointer. */
@media (any-pointer: coarse) {
  .zzz-spine-lock {
    width: 32px;
    height: 32px;
  }
}

/* Only painted pixels are clickable, so the stage keeps its default cursor;
   the router marks the hovered <html> while the pointer is over the figure. */
html.zzz-spine-pointer,
html.zzz-spine-pointer body {
  cursor: pointer;
}
.zzz-spine-glow {
  position: absolute;
  left: 50%;
  bottom: 2px;
  width: 150px;
  height: 150px;
  margin-left: -75px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(120, 170, 255, 0.22) 0%, rgba(120, 170, 255, 0) 70%);
  pointer-events: none;
  transition: opacity 220ms ease;
}
.zzz-spine-stage[data-faded] .zzz-spine-glow {
  opacity: 0.25;
}
/* The queue strip is a flow sibling rendered before the composer, so the
   card's floating figure would otherwise paint over its header chevron and
   row actions and swallow their clicks. Lift the strip back above the figure;
   composer overlays that must stay on top carry their own higher z-index. */
[data-queue-dock] {
  position: relative;
  z-index: 2;
}

/* -------------------------------------------------------------------------
   Running-turn flower

   Chat renders its running indicator as [data-chat-running]; inside it the
   icon is the only child carrying an svg, and it sits in a fixed square that
   the clock was laid out around. Keep that square and its size, drop the whale
   inside it, and spin the event flower there instead: layout does not change
   and the swap costs no reflow.
   ---------------------------------------------------------------------- */
[data-chat-running] :where(span, div):has(> svg) {
  background-image: url('__FLOWER_IMAGE__');
  background-position: center;
  background-repeat: no-repeat;
  /* A background is always clipped to the border box, so this must fit inside
     Chat's 14px square: overshooting would slice the petals off. */
  background-size: contain;
  transform-origin: 50% 50%;
  animation: zzz-flower-spin 3333.333ms linear infinite;
  will-change: transform;
}

/* The whale (animated mask and its static fallback) leaves the square to the
   flower; the decorative square keeps its own accessibility hiding. */
[data-chat-running] :where(span, div):has(> svg) > * {
  display: none !important;
}
/* The event engine turns the bone a full -360deg every 1/0.3 s. */
@keyframes zzz-flower-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
}

@media (prefers-reduced-motion: reduce) {
  [data-chat-running] :where(span, div):has(> svg) {
    animation: none;
  }
}
`

    function Stage() {
      const canvasRef = React.useRef(null)
      const stageRef = React.useRef(null)
      // A stored lock mounts straight into the ghost pose: the fade the lock
      // implies must exist before the first paint, not after a press.
      const [locked, setLocked] = React.useState(readStoredLock)
      const [faded, setFaded] = React.useState(locked)
      const fadedRef = React.useRef(locked)
      const syncRef = React.useRef(null)
      const [failed, setFailed] = React.useState(false)
      const character = CHARACTER
      const hoveredRef = React.useRef(false)
      const lockedRef = React.useRef(locked)
      const lockVisibleRef = React.useRef(false)
      const maskRef = React.useRef(null)
      const [hovered, setHovered] = React.useState(false)
      const [lockVisible, setLockVisible] = React.useState(false)

      const setHover = React.useCallback((next) => {
        if (hoveredRef.current === next) return
        hoveredRef.current = next
        setHovered(next)
      }, [])

      const setLockShown = React.useCallback((next) => {
        if (lockVisibleRef.current === next) return
        lockVisibleRef.current = next
        setLockVisible(next)
      }, [])

      // Fade and lock actions only touch refs and state, so the pointer router,
      // the keyboard path and the lock control can share them across renders.
      const setFadedState = React.useCallback((next) => {
        if (fadedRef.current === next) return
        fadedRef.current = next
        setFaded(next)
        setHover(false)
        if (syncRef.current !== null) syncRef.current()
      }, [setHover])
      const toggleFade = React.useCallback(() => {
        setFadedState(!fadedRef.current)
      }, [setFadedState])
      const restore = React.useCallback(() => setFadedState(false), [setFadedState])
      // Unlocking is a choice worth remembering too: leaving a session with
      // the figure restored must not bring the ghost back on the next one.
      const unlock = React.useCallback(() => {
        lockedRef.current = false
        setLocked(false)
        setFadedState(false)
        writeStoredLock(false)
      }, [setFadedState])
      const toggleLock = React.useCallback(() => {
        if (lockedRef.current) {
          unlock()
          return
        }
        lockedRef.current = true
        setLocked(true)
        setFadedState(true)
        writeStoredLock(true)
      }, [setFadedState, unlock])
      const activateFigure = React.useCallback(() => {
        if (lockedRef.current) {
          unlock()
          return
        }
        toggleFade()
      }, [toggleFade, unlock])

      // Every page of the GUI in this browser shares the preference, so a tab
      // that flips the lock tells the others through the `storage` event. The
      // writer never receives its own event, so this cannot loop.
      React.useEffect(() => {
        const onStorage = (event) => {
          if (event.key !== null && event.key !== LOCK_STORAGE_KEY) return
          // `key === null` means clear(): re-read whatever survived.
          const next = event.key === null ? readStoredLock() : event.newValue === '1'
          if (lockedRef.current === next) return
          lockedRef.current = next
          setLocked(next)
          setFadedState(next)
        }
        window.addEventListener('storage', onStorage)
        return () => window.removeEventListener('storage', onStorage)
      }, [setFadedState])
      React.useEffect(() => {
        let disposed = false
        let rig = null
        let glFigure = null
        let frame = 0
        let drawn = 0
        let intersecting = true
        let pageVisible = document.visibilityState !== 'hidden'

        const motion = typeof window.matchMedia === 'function'
          ? window.matchMedia('(prefers-reduced-motion: reduce)')
          : null
        const canvas = canvasRef.current
        const stage = stageRef.current

        /**
         * A frame is only owed to a figure the viewer can actually see moving,
         * on the active tab, not faded out, and not under a reduced-motion
         * preference. Everything else is charge for nothing.
         */
        const shouldRun = () => rig !== null &&
          !(motion !== null && motion.matches) &&
          pageVisible && intersecting && !fadedRef.current

        const tick = (now) => {
          frame = 0
          if (disposed || !shouldRun()) return
          // Measured against the last painted frame instead of an accumulator:
          // an accumulator drifts into the wrong multiple of the interval when
          // 60 Hz steps sum to just under the threshold in floating point.
          if (now - drawn >= FRAME_INTERVAL - 1) {
            // Clamp so a stall or a hidden tab resumes smoothly instead of
            // jumping a quarter second into the loop.
            rig.paint(Math.min(0.1, (now - drawn) / 1000))
            drawn = now
          }
          frame = window.requestAnimationFrame(tick)
        }

        const sync = () => {
          if (disposed) return
          if (shouldRun()) {
            if (frame === 0) {
              drawn = performance.now()
              frame = window.requestAnimationFrame(tick)
            }
            return
          }
          if (frame !== 0) {
            window.cancelAnimationFrame(frame)
            frame = 0
          }
          // Freezing must not blank the stage: repaint the held pose once.
          if (rig !== null) rig.paint(0)
        }
        syncRef.current = sync

        const visibility = typeof IntersectionObserver === 'function'
          ? new IntersectionObserver((entries) => {
            const entry = entries[entries.length - 1]
            intersecting = entry === undefined ? true : entry.isIntersecting
            sync()
          })
          : null
        if (visibility !== null && stage !== null) visibility.observe(stage)

        const resize = typeof ResizeObserver === 'function'
          ? new ResizeObserver(() => {
            if (rig === null) return
            rig.resize()
            rig.paint(0)
          })
          : null
        if (resize !== null && canvas !== null) resize.observe(canvas)

        const onPageVisibility = () => {
          pageVisible = document.visibilityState !== 'hidden'
          sync()
        }
        const onMotionChange = () => sync()
        document.addEventListener('visibilitychange', onPageVisibility)
        if (motion !== null && motion.addEventListener !== undefined) {
          motion.addEventListener('change', onMotionChange)
        }

        setFailed(false)
        loadCharacter(character.dir).then((data) => {
          if (disposed) return
          if (canvas === null) return
          const skeleton = new spine.Skeleton(data.skeletonData)
          const skinName = pickSkin(skeleton, data.skeletonData)
          const skin = skinName === null ? null : data.skeletonData.findSkin(skinName)
          if (skinName !== null) skeleton.setSkinByName(skinName)
          skeleton.setToSetupPose()
          const state = new spine.AnimationState(new spine.AnimationStateData(data.skeletonData))
          state.setAnimation(0, data.animation, true)
          state.update(0.2 + Math.random() * 1.2)
          state.apply(skeleton)
          // 4.3 runtimes no longer transform bones inside apply().
          skeleton.updateWorldTransform(spine.Physics.update)
          const fit = data.fit
          let pixelRatio = 1

          // WebGL first: the GPU fills neighbouring triangles with one fill rule,
          // so the mesh cannot show the Canvas2D clip seams at all. Without a
          // WebGL context (or on a multi-page atlas) the seamed-but-overlapped
          // Canvas2D path takes over.
          let context = null
          if (fit !== null && data.pageCount === 1 && data.image !== undefined) {
            try {
              glFigure = createWebGlFigure(canvas, data.image, fit)
              glFigure.build(skeleton, skin)
            } catch {
              glFigure = null
            }
          }
          if (glFigure === null) context = canvas.getContext('2d')

          // The backing store follows the CSS box. Reading `clientWidth` inside
          // the loop would force a layout on every frame; a ResizeObserver is
          // the one place that has to know instead.
          const resizeCanvas = () => {
            // A phone's 3x screen would otherwise upsample a 2x backing store and
            // smear the figure; the cost is per triangle, not per pixel, so native
            // resolution on a 3x device is nearly free. Cap it so an exotic 4x
            // screen does not pay for fill that nobody can see at 180x240.
            pixelRatio = Math.min(window.devicePixelRatio || 1, 3)
            const width = Math.round((canvas.clientWidth || STAGE_WIDTH) * pixelRatio)
            const height = Math.round((canvas.clientHeight || STAGE_HEIGHT) * pixelRatio)
            if (canvas.width !== width || canvas.height !== height) {
              canvas.width = width
              canvas.height = height
            }
          }

          // The hit mask is rebuilt from what was just painted: a WebGL figure
          // renders a 45×60 framebuffer and reads it back; the Canvas2D fallback
          // downsamples the visible canvas. Starting at MASK_FRAMES - 1 makes the
          // first paint below refresh it.
          let maskCanvas = null
          let maskContext = null
          const cells = new Uint8Array(MASK_WIDTH * MASK_HEIGHT)
          let maskFrame = MASK_FRAMES - 1
          if (glFigure === null) {
            maskCanvas = document.createElement('canvas')
            maskCanvas.width = MASK_WIDTH
            maskCanvas.height = MASK_HEIGHT
            maskContext = maskCanvas.getContext('2d', { willReadFrequently: true })
          }

          const refreshMask = () => {
            if (glFigure !== null) {
              const result = glFigure.readMask(pixelRatio)
              maskRef.current = result === null
                ? null
                : { width: MASK_WIDTH, height: MASK_HEIGHT, cells: result.cells }
              return
            }
            if (maskContext === null) return
            try {
              maskContext.clearRect(0, 0, MASK_WIDTH, MASK_HEIGHT)
              maskContext.drawImage(canvas, 0, 0, MASK_WIDTH, MASK_HEIGHT)
              const pixels = maskContext.getImageData(0, 0, MASK_WIDTH, MASK_HEIGHT).data
              for (let cell = 0; cell < cells.length; cell++) {
                cells[cell] = pixels[cell * 4 + 3] >= MASK_THRESHOLD ? 1 : 0
              }
              maskRef.current = { width: MASK_WIDTH, height: MASK_HEIGHT, cells }
            } catch {
              // A tainted canvas cannot be read. Without a mask every press
              // falls through, which is better than blocking the page.
              maskRef.current = null
            }
          }
          const paint = (delta) => {
            if (glFigure !== null) {
              state.update(delta)
              state.apply(skeleton)
              skeleton.updateWorldTransform(spine.Physics.update)
              glFigure.paint(skeleton, pixelRatio)
            } else {
              if (context === null) return
              context.setTransform(1, 0, 0, 1, 0, 0)
              context.clearRect(0, 0, canvas.width, canvas.height)
              if (fit === null) return
              context.setTransform(
                fit.a * pixelRatio, 0, 0, -fit.a * pixelRatio,
                fit.e * pixelRatio, fit.f * pixelRatio,
              )
              state.update(delta)
              state.apply(skeleton)
              skeleton.updateWorldTransform(spine.Physics.update)
              drawSkeleton(context, skeleton, SEAM_OVERLAP / (fit.a * pixelRatio))
            }
            if (++maskFrame >= MASK_FRAMES) {
              maskFrame = 0
              refreshMask()
            }
          }

          rig = {
            paint,
            resize: () => {
              resizeCanvas()
              // Force the paint that follows to rebuild the mask at the new size.
              maskFrame = MASK_FRAMES - 1
            },
          }
          if (glFigure !== null) {
            // A lost context comes back empty; repaint the current pose so the
            // figure does not stay blank until the next tick (which is paused
            // whenever the figure is faded).
            glFigure.onRestore = () => {
              if (disposed) return
              rig.paint(0)
            }
          }
          resizeCanvas()
          // Paint one frame synchronously: a background tab never runs
          // requestAnimationFrame, and the stage must not look empty then.
          paint(0.2)
          sync()
        }).catch(() => {
          if (!disposed) setFailed(true)
        })

        return () => {
          disposed = true
          if (frame) window.cancelAnimationFrame(frame)
          frame = 0
          if (visibility !== null) visibility.disconnect()
          if (resize !== null) resize.disconnect()
          document.removeEventListener('visibilitychange', onPageVisibility)
          if (motion !== null && motion.removeEventListener !== undefined) {
            motion.removeEventListener('change', onMotionChange)
          }
          syncRef.current = null
          maskRef.current = null
          if (glFigure !== null) {
            glFigure.dispose()
            glFigure = null
          }
          rig = null
        }
      }, [character.dir])

      /**
       * Pointer routing. The stage and its hit layer are pointer-events: none,
       * so a press only belongs to the figure when this router says it landed
       * on a painted pixel and the figure is what is painted there. Everything
       * else — the empty corners of the stage, the page under a faded figure —
       * keeps its normal target.
       */
      React.useEffect(() => {
        const stage = stageRef.current
        if (stage === null) return undefined

        let armed = false
        let guardUntil = 0
        let timer = 0
        // Remember what pressed last: a touch has no hover, so the lock chip has
        // to be retired by the router itself once it has been used.
        let lastPointerType = ''
        const isInside = (rect, x, y) =>
          x >= rect.left && x < rect.right && y >= rect.top && y < rect.bottom

        // The stage, not the canvas: a hover lift moves the canvas visually,
        // and the hit area must not move with it or the pointer flickers at
        // the silhouette's edge.
        const hitsFigure = (rect, x, y) => {
          const mask = maskRef.current
          if (mask === null) return false
          if (rect.width === 0 || rect.height === 0) return false
          if (!isInside(rect, x, y)) return false
          const column = Math.min(mask.width - 1, Math.floor(((x - rect.left) / rect.width) * mask.width))
          const row = Math.min(mask.height - 1, Math.floor(((y - rect.top) / rect.height) * mask.height))
          return mask.cells[row * mask.width + column] === 1
        }

        const isInsideStage = (x, y) => isInside(stage.getBoundingClientRect(), x, y)

        let flashTimer = 0

        const fromLockButton = (event) => event.target instanceof Element &&
          event.target.closest('.zzz-spine-lock') !== null

        const clearFlash = () => {
          if (flashTimer !== 0) {
            window.clearTimeout(flashTimer)
            flashTimer = 0
          }
        }

        // Touch has no hover, so a tap reveals the lock for a few seconds
        // instead of leaving it on screen for good.
        const flashLock = () => {
          setLockShown(true)
          clearFlash()
          flashTimer = window.setTimeout(() => {
            flashTimer = 0
            setLockShown(false)
          }, 4000)
        }

        /**
         * Menus and the queue strip can paint above the figure while the
         * figure's box covers the same point. `elementsFromPoint` skips a
         * pointer-events: none stage, so switch it on for the query and look
         * at what is painted in front of it.
         */
        const figureIsTopmost = (x, y) => {
          if (typeof document.elementsFromPoint !== 'function') return true
          const previous = stage.style.pointerEvents
          stage.style.pointerEvents = 'auto'
          let stack
          try {
            stack = document.elementsFromPoint(x, y)
          } finally {
            stage.style.pointerEvents = previous
          }
          const index = stack.indexOf(stage)
          if (index < 0) return false
          for (let position = 0; position < index; position++) {
            if (!stage.contains(stack[position])) return false
          }
          return true
        }

        const disarm = () => {
          armed = false
          if (timer !== 0) {
            window.clearTimeout(timer)
            timer = 0
          }
        }

        const arm = () => {
          armed = true
          if (timer !== 0) window.clearTimeout(timer)
          // A press that never becomes a click (drag, cancel) must not keep
          // swallowing the next click elsewhere on the page.
          timer = window.setTimeout(disarm, 1000)
        }

        const onPointerDown = (event) => {
          // Only a primary press belongs to the figure; right-click and
          // middle-click stay with the page (context menu, autoscroll).
          if (event.button !== 0) return
          lastPointerType = event.pointerType
          // A new press owns whatever click follows it; a press that was
          // dragged away must not swallow this one.
          disarm()
          // The lock is the one control inside the stage that must always
          // receive its own press, even while the stage is click-through.
          if (fromLockButton(event)) return
          const x = event.clientX
          const y = event.clientY
          const rect = stage.getBoundingClientRect()
          if (fadedRef.current) {
            // Faded is click-through. Pressing outside the stage restores an
            // unlocked figure; presses inside it go to the page unchanged, so
            // controls behind the figure can be used one after another.
            const inside = isInside(rect, x, y)
            if (!inside) {
              // Any press off the figure puts the chip away right now; an
              // unlocked figure also comes back. A locked one stays ghosted, but
              // the end of the interaction is still the moment to hide the chip
              // rather than leave it up for the rest of the touch flash window.
              clearFlash()
              setLockShown(false)
              if (!lockedRef.current) restore()
              return
            }
            if (event.pointerType !== 'mouse') flashLock()
            if (inside && performance.now() < guardUntil) {
              // The second click of a double click would otherwise land on the
              // control the fade just revealed.
              event.preventDefault()
              event.stopPropagation()
              arm()
            }
            return
          }

          if (!hitsFigure(rect, x, y) || !figureIsTopmost(x, y)) return
          event.preventDefault()
          event.stopPropagation()
          arm()
          guardUntil = performance.now() + THROUGH_GUARD_MS
          toggleFade()
          if (event.pointerType !== 'mouse') flashLock()
        }

        const onPointerMove = (event) => {
          if (event.pointerType === 'touch') return
          // A moving mouse owns the hover state; drop any touch flash timer.
          if (flashTimer !== 0) {
            window.clearTimeout(flashTimer)
            flashTimer = 0
          }
          const x = event.clientX
          const y = event.clientY
          const rect = stage.getBoundingClientRect()
          const inside = isInside(rect, x, y)
          const hit = hitsFigure(rect, x, y)
          // Once shown, the lock stays visible while the pointer is anywhere in
          // the stage, so moving from the body to the button does not make it
          // disappear on the way.
          setLockShown(hit || fromLockButton(event) || (lockVisibleRef.current && inside))
          setHover(!fadedRef.current && hit)
        }

        const onLeave = () => {
          setHover(false)
          setLockShown(false)
          clearFlash()
        }

        const swallow = (event) => {
          if (!armed || fromLockButton(event)) return
          if (!isInsideStage(event.clientX, event.clientY)) return
          event.preventDefault()
          event.stopPropagation()
        }

        const onClick = (event) => {
          if (fromLockButton(event)) {
            // The lock chip has just done its job. Hiding it here is what keeps a
            // phone from showing a dead button for the remaining seconds of the
            // 4 s touch flash; a mouse keeps it because the pointer still rests
            // on it, and keyboard activation keeps it through :focus-visible.
            disarm()
            if (event.detail !== 0 && lastPointerType !== 'mouse') {
              clearFlash()
              setLockShown(false)
            }
            return
          }
          if (!armed) return
          // Keyboard activation has no pointer press behind it; never eat it.
          if (event.detail === 0) {
            disarm()
            return
          }
          if (!isInsideStage(event.clientX, event.clientY)) {
            disarm()
            return
          }
          disarm()
          event.preventDefault()
          event.stopPropagation()
        }

        const onPointerCancel = () => {
          if (armed) disarm()
        }

        const onKeyDown = (event) => {
          if (event.key !== 'Escape' || !fadedRef.current) return
          const active = document.activeElement
          if (active !== stage && !stage.contains(active)) return
          event.stopPropagation()
          unlock()
        }

        // Capture on the window: a press has to be routed before the page's
        // own handlers or the target's default action can see it.
        window.addEventListener('pointerdown', onPointerDown, true)
        window.addEventListener('pointermove', onPointerMove, { capture: true, passive: true })
        window.addEventListener('mousedown', swallow, true)
        window.addEventListener('mouseup', swallow, true)
        window.addEventListener('click', onClick, true)
        window.addEventListener('pointercancel', onPointerCancel, true)
        window.addEventListener('blur', onLeave)
        document.addEventListener('visibilitychange', onLeave)
        document.addEventListener('keydown', onKeyDown, true)

        return () => {
          window.removeEventListener('pointerdown', onPointerDown, true)
          window.removeEventListener('pointermove', onPointerMove, true)
          window.removeEventListener('mousedown', swallow, true)
          window.removeEventListener('mouseup', swallow, true)
          window.removeEventListener('click', onClick, true)
          window.removeEventListener('pointercancel', onPointerCancel, true)
          window.removeEventListener('blur', onLeave)
          document.removeEventListener('visibilitychange', onLeave)
          document.removeEventListener('keydown', onKeyDown, true)
          clearFlash()
          disarm()
        }
      }, [restore, setHover, setLockShown, toggleFade, unlock])

      // A pointer cursor over the painted figure without giving the stage any
      // hit area of its own. Descendants with their own cursor still win.
      React.useEffect(() => {
        if (!hovered) return undefined
        const root = document.documentElement
        root.classList.add('zzz-spine-pointer')
        return () => root.classList.remove('zzz-spine-pointer')
      }, [hovered])

      // No tooltip: a popover on the figure hides the very thing a click is
      // meant to reveal. The lock is icon-only; the figure's state lives in
      // its accessible name for keyboard and screen-reader users.
      const label = failed
        ? '立绘素材加载失败'
        : faded
          ? locked
            ? `${character.name}，已锁定点击穿透，按 Enter 解锁`
            : `${character.name}，点击穿透中，按 Enter 或点页面别处恢复`
          : `${character.name}，点击变透明并让出点击`
      return h('div', {
        ref: stageRef,
        className: 'zzz-spine-stage',
        'data-faded': faded ? '' : undefined,
        'data-hover': hovered ? '' : undefined,
        'data-locked': locked ? '' : undefined,
        'data-lock-visible': lockVisible ? '' : undefined,
      },
        h('div', { className: 'zzz-spine-glow', 'aria-hidden': true }),
        h('button', {
          type: 'button',
          className: 'zzz-spine-hit',
          'aria-label': label,
          'aria-pressed': faded,
          onClick: activateFigure,
        }, h('canvas', { ref: canvasRef, 'aria-hidden': true })),
        h('button', {
          type: 'button',
          className: 'zzz-spine-lock',
          'aria-label': locked ? '取消锁定，恢复立绘' : '锁定为点击穿透',
          'aria-pressed': locked,
          onClick: toggleLock,
        }, h('svg', {
          viewBox: '0 0 16 16',
          width: 14,
          height: 14,
          'aria-hidden': true,
          focusable: 'false',
        },
        h('rect', {
          x: 3.5,
          y: 7,
          width: 9,
          height: 6.5,
          rx: 1.5,
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 1.3,
        }),
        h('path', {
          d: locked
            ? 'M5.5 7V5.2a2.5 2.5 0 0 1 5 0V7'
            : 'M5.5 7V5.2a2.5 2.5 0 0 1 4.7-1.2',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 1.3,
          strokeLinecap: 'round',
        }))),
      )
    }

    /**
     * The composer overlay. The decoration deliberately leaves the blank
     * New-session page plain: the events' key-visual animation cost more than
     * it returned there, so only the corner figure is rendered now.
     */
    function ZzzSpine() {
      return h(React.Fragment, null,
        h('style', null, CSS),
        h(Stage),
      )
    }

    return {
      inject: ['slots'],
      apply(ctx) {
        ctx.effect(() => watchRunningLabel(), 'zzz-spine: running-turn label')
        ctx.slots.inject('conversation.input.overlay', () => ctx.slots.register({
          name: 'conversation.input.overlay',
          id: 'zzz-spine',
          order: 20,
        }, ZzzSpine))
      },
    }
  },
})



