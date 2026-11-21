/*
 * Client half of the "绝区零 · 立绘" decoration.
 *
 * One piece rides the composer: an animated Spine figure standing on the
 * input card's top-right corner. Clicking it fades the figure out so whatever
 * it covers can be inspected.
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
    /** The event card's lead figure; the only one this decoration uses. */
    const CHARACTER = { dir: 'levels_spine_a', name: '柔光之影' }


    const dataCache = new Map()

    function fetchText(url) {
      return fetch(url, { cache: 'force-cache' }).then((response) => {
        if (!response.ok) throw new Error(`assets ${response.status}: ${url}`)
        return response.text()
      })
    }

    function fetchJson(url) {
      return fetchText(url).then((text) => JSON.parse(text))
    }

    function loadImage(url) {
      return new Promise((resolve, reject) => {
        const image = new Image()
        image.decoding = 'async'
        image.onload = () => resolve(image)
        image.onerror = () => reject(new Error(`texture failed: ${url}`))
        image.src = url
      })
    }

    /** Page headers of a Spine atlas: a bare `*.png` line followed by `size:`. */
    function atlasPages(atlasText) {
      const pages = []
      const pattern = /^(\S+\.png)\s*\r?\n\s*size:\s*[0-9]+\s*,\s*[0-9]+/gm
      let match
      while ((match = pattern.exec(atlasText))) pages.push(match[1])
      return pages
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
      const pages = atlasPages(atlasText)
      await Promise.all(pages.map(async (page) => {
        const image = await loadImage(new URL(page, dirUrl).href)
        for (const atlasPage of atlas.pages) {
          if (atlasPage.name === page) atlasPage.setTexture(new spine.CanvasTexture(image))
        }
      }))
      const skeletonData = new spine.SkeletonJson(new spine.AtlasAttachmentLoader(atlas))
        .readSkeletonData(json)
      const names = skeletonData.animations.map((animation) => animation.name)
      const animation = names.includes('idle') ? 'idle' : names[0]
      const bounds = measure(skeletonData, animation)
      return {
        skeletonData,
        animation,
        bounds,
        // The editor's setup bounds frame the card art the way the event page
        // shows it; the vertex union can include off-stage props, so it is
        // only the fallback for skeletons without declared bounds.
        fit: framing(declaredBox(skeletonData) ?? bounds),
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
  pointer-events: auto;
  cursor: pointer;
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
.zzz-spine-hit:hover canvas {
  transform: translateY(-2px) scale(1.015);
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.5));
}
/* Clicked: the figure turns into a ghost so whatever it covers — conversation
   text, the queue strip — can be inspected; clicking again brings it back. */
.zzz-spine-stage[data-faded] .zzz-spine-hit canvas {
  opacity: 0.12;
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.12));
}
.zzz-spine-stage[data-faded] .zzz-spine-hit:hover canvas {
  transform: none;
  opacity: 0.35;
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2));
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
      const [failed, setFailed] = React.useState(false)
      const [faded, setFaded] = React.useState(false)
      const character = CHARACTER

      React.useEffect(() => {
        let disposed = false
        let frame = 0
        setFailed(false)
        loadCharacter(character.dir).then((data) => {
          if (disposed) return
          const canvas = canvasRef.current
          if (!canvas) return
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
          // Paint one frame synchronously: a background tab never runs
          // requestAnimationFrame, and the stage must not look empty then.
          const paint = (delta) => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2)
            const width = canvas.clientWidth || STAGE_WIDTH
            const height = canvas.clientHeight || STAGE_HEIGHT
            if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
              canvas.width = Math.round(width * dpr)
              canvas.height = Math.round(height * dpr)
            }
            context.setTransform(1, 0, 0, 1, 0, 0)
            context.clearRect(0, 0, canvas.width, canvas.height)
            if (fit === null) return
            context.setTransform(
              fit.a * dpr, 0, 0, -fit.a * dpr,
              fit.e * dpr, fit.f * dpr,
            )
            state.update(delta)
            state.apply(skeleton)
            skeleton.updateWorldTransform(spine.Physics.update)
            renderer.draw(skeleton)
          }
          paint(0.2)
          let previous = performance.now()
          const draw = (now) => {
            const delta = Math.min(0.05, (now - previous) / 1000)
            previous = now
            paint(delta)
            frame = window.requestAnimationFrame(draw)
          }
          frame = window.requestAnimationFrame(draw)
        }).catch(() => {
          if (!disposed) setFailed(true)
        })
        return () => {
          disposed = true
          if (frame) window.cancelAnimationFrame(frame)
        }
      }, [character.dir])

      // Tooltips and the corner label are deliberately gone: a popover on the
      // figure hides the very thing a click is meant to reveal. The accessible
      // name keeps the state announcement for keyboard and screen-reader users.
      const label = failed
        ? '立绘素材加载失败'
        : faded ? `${character.name}，已变透明，点击恢复` : `${character.name}，点击变透明`
      return h('div', {
        className: 'zzz-spine-stage',
        'data-faded': faded ? '' : undefined,
      },
        h('div', { className: 'zzz-spine-glow', 'aria-hidden': true }),
        h('button', {
          type: 'button',
          className: 'zzz-spine-hit',
          'aria-label': label,
          'aria-pressed': faded,
          onClick: () => setFaded((value) => !value),
        }, h('canvas', { ref: canvasRef, 'aria-hidden': true })),
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
        ctx.slots.inject('conversation.input.overlay', () => ctx.slots.register({
          name: 'conversation.input.overlay',
          id: 'zzz-spine',
          order: 20,
        }, ZzzSpine))
      },
    }
  },
})



