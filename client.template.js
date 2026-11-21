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
      await Promise.all(pages.map(async (page) => {
        const texture = await loadTexture(new URL(page, dirUrl).href)
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
@media (pointer: coarse) {
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
      const fadedRef = React.useRef(false)
      const syncRef = React.useRef(null)
      const [failed, setFailed] = React.useState(false)
      const [faded, setFaded] = React.useState(false)
      const character = CHARACTER
      const hoveredRef = React.useRef(false)
      const lockedRef = React.useRef(false)
      const lockVisibleRef = React.useRef(false)
      const maskRef = React.useRef(null)
      const [hovered, setHovered] = React.useState(false)
      const [locked, setLocked] = React.useState(false)
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
      const unlock = React.useCallback(() => {
        lockedRef.current = false
        setLocked(false)
        setFadedState(false)
      }, [setFadedState])
      const toggleLock = React.useCallback(() => {
        if (lockedRef.current) {
          unlock()
          return
        }
        lockedRef.current = true
        setLocked(true)
        setLockShown(true)
        setFadedState(true)
      }, [setFadedState, setLockShown, unlock])
      const activateFigure = React.useCallback(() => {
        if (lockedRef.current) {
          unlock()
          return
        }
        toggleFade()
      }, [toggleFade, unlock])
      React.useEffect(() => {
        let disposed = false
        let rig = null
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
          const skin = pickSkin(skeleton, data.skeletonData)
          if (skin !== null) skeleton.setSkinByName(skin)
          skeleton.setToSetupPose()
          const state = new spine.AnimationState(new spine.AnimationStateData(data.skeletonData))
          state.setAnimation(0, data.animation, true)
          state.update(0.2 + Math.random() * 1.2)
          state.apply(skeleton)
          // 4.3 runtimes no longer transform bones inside apply().
          skeleton.updateWorldTransform(spine.Physics.update)
          const context = canvas.getContext('2d')
          const renderer = new spine.SkeletonRenderer(context)
          renderer.triangleRendering = true
          const fit = data.fit
          let pixelRatio = 1

          // The backing store follows the CSS box. Reading `clientWidth` inside
          // the loop would force a layout on every frame; a ResizeObserver is
          // the one place that has to know instead.
          const resizeCanvas = () => {
            pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
            const width = Math.round((canvas.clientWidth || STAGE_WIDTH) * pixelRatio)
            const height = Math.round((canvas.clientHeight || STAGE_HEIGHT) * pixelRatio)
            if (canvas.width !== width || canvas.height !== height) {
              canvas.width = width
              canvas.height = height
            }
          }

          // The hit mask is rebuilt from what was just painted: downsample the
          // backing store to 45×60, read its alpha, and keep one bit per cell.
          // Starting at MASK_FRAMES - 1 makes the first paint below refresh it.
          const maskCanvas = document.createElement('canvas')
          maskCanvas.width = MASK_WIDTH
          maskCanvas.height = MASK_HEIGHT
          const maskContext = maskCanvas.getContext('2d', { willReadFrequently: true })
          const cells = new Uint8Array(MASK_WIDTH * MASK_HEIGHT)
          let maskFrame = MASK_FRAMES - 1

          const refreshMask = () => {
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
            renderer.draw(skeleton)
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

        const isInsideStage = (x, y) => {
          const rect = stage.getBoundingClientRect()
          return x >= rect.left && x < rect.right && y >= rect.top && y < rect.bottom
        }

        const hitsFigure = (x, y) => {
          const mask = maskRef.current
          if (mask === null) return false
          // The stage, not the canvas: a hover lift moves the canvas visually,
          // and the hit area must not move with it or the pointer flickers at
          // the silhouette's edge.
          const rect = stage.getBoundingClientRect()
          if (rect.width === 0 || rect.height === 0) return false
          if (x < rect.left || x >= rect.right || y < rect.top || y >= rect.bottom) return false
          const column = Math.min(mask.width - 1, Math.floor(((x - rect.left) / rect.width) * mask.width))
          const row = Math.min(mask.height - 1, Math.floor(((y - rect.top) / rect.height) * mask.height))
          return mask.cells[row * mask.width + column] === 1
        }

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
          // The lock is the one control inside the stage that must always
          // receive its own press, even while the stage is click-through.
          if (fromLockButton(event)) return
          const x = event.clientX
          const y = event.clientY

          if (fadedRef.current) {
            // Faded is click-through. Pressing outside the stage restores an
            // unlocked figure; presses inside it go to the page unchanged, so
            // controls behind the figure can be used one after another.
            const inside = isInsideStage(x, y)
            if (!lockedRef.current && !inside) {
              setLockShown(false)
              restore()
              return
            }
            if (event.pointerType !== 'mouse' && (lockedRef.current || inside)) flashLock()
            if (inside && performance.now() < guardUntil) {
              // The second click of a double click would otherwise land on the
              // control the fade just revealed.
              event.preventDefault()
              event.stopPropagation()
              arm()
            }
            return
          }

          if (!hitsFigure(x, y) || !figureIsTopmost(x, y)) return
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
          const inside = isInsideStage(x, y)
          const hit = hitsFigure(x, y)
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
          if (!armed) return
          // The lock is the one control that must always work, even if a press
          // from just before is still being swallowed.
          if (fromLockButton(event)) {
            disarm()
            return
          }
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
            ? `${character.name}，已锁定点击穿透，悬停角色可解锁`
            : `${character.name}，点击穿透中，点击页面别处可恢复`
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



