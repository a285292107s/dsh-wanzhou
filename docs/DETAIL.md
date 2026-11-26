# 绝区零 · 立绘挂件 · 实现说明

README 里被裁掉的实现细节都在这里：路由与缓存的取舍、帧率是怎么定的、素材是怎么从活动页里取出来的、以及还有哪些已知局限。

## 功能

- **输入框右上角的立绘**：只保留活动卡片的首位角色德蕾琪娜·挽昼（皮肤「柔光之影」），循环播放 `idle` 待机动作，悬停时轻微上浮。**按下画出来的像素**会让它变透明（约 12% 不透明度）并进入点击穿透：整块画布让出点击，被立绘盖住的正文、时间戳和控件都能直接操作。把鼠标移到角色上时，左上角浮出 24px 的锁形按钮（触屏 32px，点一下角色后显示 4 秒，点过锁或点页面别处立即收起）：点它把角色锁定在“透明+穿透”，点页面别处也不会恢复；再点锁或按 Esc 解锁；未锁定时点页面别处恢复。锁定状态由浏览器记住，新建会话或刷新页面后打开仍是锁定态。角色常态下不出任何文字：没有悬停提示框，也没有常驻角标——提示框正好盖住用户想看的那块；状态只保留在 `aria-label` / `aria-pressed` 里供读屏使用。
- **层级**：立绘挂在输入框卡片的 overlay 槽位里。排队消息条在页面顺序上位于输入框之前，而立绘是绝对定位，会盖住排队消息条的展开箭头与编辑/删除/插话按钮并吞掉点击；插件因此把 `[data-queue-dock]` 抬到立绘之上（`position: relative; z-index: 2`）。命令菜单等卡片内的浮层自带更高的 z-index，仍显示在最上层。点击穿透的路由还会用 `elementsFromPoint` 确认立绘在该点确实画在最上层，所以即使有条目浮在立绘上方，点击也不归立绘。
- **出现在所有会话**：挂件挂在输入框卡片的 overlay 槽位，因此每个会话（包括新建会话的空白页）的输入框右上角都能看到角色。空白页本身保持 DSH 原样，不再铺背景。
- **运行中的小黄花**：会话跑起来时，Chat 会在轮次末尾显示「深度求索中，用时 …」；插件把这句话改写成「罗塞塔数据解算中，用时 …」，并把它前面那只鲸鱼尾巴换成活动页里旋转的小黄花。花朵取 `levels_hua` Spine 的 `a1` 帧，只还原了其中的旋转：`rotateSpeed = -0.3`，即顺时针 3.33 秒一圈（原引擎还叠了 x 方向摆动与缩放脉冲，在图标尺寸下只会读成抖动，所以没有搬）。鲸鱼所在的 14px 方框尺寸与位置都不动，所以行高和计时文本不会产生任何位移；`prefers-reduced-motion` 下停转并保留一帧静止画面。背景始终被裁到 border-box，因此用 `background-size: contain` 保证整朵花都在方框内——溢出会把花瓣切掉。

## 结构

插件分两半：宿主端把素材发出去，浏览器端把立绘画出来。

- **宿主端**（`index.js`）用 `ctx.webServer.register({ kind: 'prefix', path: '/zzz-spine/assets' })` serve 包内 `assets/`。没有走 DSH 自带的 `/plugins/<pkg>/assets/`：那条路由只接受 `.svg` / `.png` / `.webp` / `.jpg` / `.jpeg`，`.json` 与 `.atlas` 会 404。
- **缓存**：`cache-control: no-cache` + ETag（文件大小 + mtime），命中回 304。不用 `max-age` 是因为重打包素材后必须下次刷新就生效；本地 carrier 上一次 304 几乎免费。
- **浏览器端**（`client.js`）是构建产物，不是手写文件。里面有两套立绘渲染：默认的 WebGL（整个网格一次 `drawElements`，接缝不可能出现）和 Canvas2D 回退（逐三角形 `clip` + 裁剪路径重叠）。`scripts/build-client.mjs` 把 `client.template.js` 里的 `__SPINE_RUNTIME__` 替换成 `vendor/spine-canvas.min.mjs` 的 IIFE 形式——模块加载器注册的是 classic factory，没法在工厂内部 import 一个 ES module——并把小黄花内联成 data URI，因此首次绘制就是花，不需要挂载后再拉一次图。注册进 `conversation.input.overlay`，order 20。

## 点击穿透

立绘的命中判定不是 180×240 的矩形。舞台和它的按钮层都是 `pointer-events: none`，点击由挂在 `window` 捕获阶段的文档级路由决定：

- **命中掩码**：每 8 帧重建一次（20 Hz 下 400 ms 一次）。WebGL 路径把同一批顶点再画到 45×60 的帧缓冲，`readPixels` 后按 25% 阈值压成每个格子一个 0/1 的数组；Canvas2D 回退路径则把 backing store 缩放成 45×60 的离屏画布读 alpha。按下或划过时把客户端坐标映射到舞台盒子（不是 canvas——悬停的 `translate`/`scale` 只影响视觉），查表即可。
- **普通态**：只有“落在掩码上”并且“立绘在该点确实最靠前”的按下才归立绘。后者通过临时把 stage 的 `pointer-events` 打开、调用 `document.elementsFromPoint`，看堆栈里立绘之前是否还有别的元素来判断；排队消息条、菜单、弹窗因此不会被抢走点击。归立绘的按下会 `preventDefault` + `stopPropagation`，并吞掉紧随其后的 `mousedown` / `mouseup` / `click`。
- **穿透态**：`data-faded` 之后整块舞台让出点击；锁按钮是唯一一个显式恢复 `pointer-events: auto` 的控件，而且只有悬停到角色或它自己获得焦点时才可见。双击的第二下会被 400 ms 的 guard 吞掉，以免隔空按到刚露出来的控件。
- **锁定**：`data-locked` 时点舞台外不会恢复，锁图标从开锁变成闭锁；锁定与否是浏览器记住的偏好，不是页面内的临时状态，所以新建会话、刷新页面都直接以“透明+穿透”开场。
- **恢复**：悬停角色浮出锁按钮：点一下在锁定/解锁之间切换；未锁定时点舞台外恢复；焦点在立绘内时按 Esc 解锁。穿透状态下舞台内的普通点击不再恢复，因为那正是穿透要交给页面的事。
- **收起**：触屏没有 hover，所以锁按钮靠 `flashLock()` 的 4 秒计时器显示；但一旦它被用过（`click` 落在锁按钮上，且刚才那一下不是鼠标）就立刻 `clearFlash()` + 隐藏——否则手机上会留着一个已经没用的按钮直到计时器到点。任何落在舞台外的按下也会立刻把标识收起来（锁定时只收起标识，不恢复立绘）；未锁定时仍按旧逻辑恢复立绘。
- **悬停**：同一张掩码驱动 `data-hover` 和 `<html>` 上的 `zzz-spine-pointer` 类；锁按钮在命中掩码时出现，并保持到指针离开舞台。`prefers-reduced-motion` 下立绘不绘制，掩码来自第一帧。

锁定的存储：`localStorage['zzz-spine:locked']` 为 `'1'` 表示锁定，解锁时直接 `removeItem`（不写 `0`），所以“键不存在”就是默认的未锁定。挂载时用 `useState` 的惰性初始化同步读一次，锁定的第一帧就是透明+穿透，不会先画一帧常态再变鬼；`unlock` 与 `toggleLock` 负责写入，读写在 `try/catch` 里——站点数据被禁时只失去记忆，不打断当前页面的锁定。`storage` 事件让同源其它标签页跟着切换，写入的标签页自己不会收到该事件，因此不会自激。

开销：掩码每次重建读 45×60×4 = 10.8 KB，2.5 次/秒；指针移动只做一次 rect 读取和一次字节查表，不进入渲染循环。

## 运行中文案

「深度求索中，用时 …」渲染自 Chat 自己的 locale 表（`chat.deepDivingFor`），而插件的 locale 服务**不能覆盖它**：`register()` 对已存在字典的 namespace + locale 会直接抛错（`locale namespace "chat" already has locale "zh"`）。

所以文案是在 DOM 里改写的。一行里同一个词组有三份副本，三份都得改，否则会露出原文案：

| 位置 | 作用 |
|---|---|
| `span[role="status"]` 的文本 | 读屏播报 |
| `.…_text_…` 的文本节点 | 可见文字 |
| `[data-shimmer-text]` 属性 | 高光扫过的叠加层用 `attr()` 画字，内容不在文本节点里 |

改写放在 `MutationObserver` 回调里：它作为微任务在浏览器绘制**之前**跑完，所以 React 每秒刷新时长（重新写回完整原文）时也不会闪一下原字。改写只针对含「深度求索中」的字符串，切到英文 locale 时不会误伤。

要换自己的文案，改 `client.template.js` 里的 `RUNNING_LABEL`，然后 `npm run build`。

唯一约束是必须收敛：改写会在自己造成的突变上再跑一遍，所以替换后的文字里不能再出现原文——即 `to` 不能包含 `from`，`from` 也不能是空串。否则每一遍都匹配到自己刚写进去的内容，观察者不断把自己排成新微任务，浏览器永远等不到空队列去绘制，标签页会直接卡死（不是掉帧）。这两个条件在模块加载时就检查，不满足直接抛错。

## 性能

这个骨架有 4304 个三角形，全部是 mesh。Canvas2D 运行时按三角形逐个 `clip` + `drawImage(整张图集)`，所以**每帧代价按三角形数量计，不按像素计**——实测把图集从 2048×512 缩到 256×64、或把 DPR 从 2 降到 1，单帧都还是 14 ms 左右。降分辨率、缩图集这条路是死的。
### 为什么最终改用 WebGL

Canvas2D 只有一种画带纹理三角形的方法：`clip()` 到三角形、再把图集按仿射变换 `drawImage`。裁剪边是抗锯齿的，相邻三角形在公共边上各只覆盖一部分像素，合成后不到满 alpha；上一版用“裁剪路径向外放 0.6 设备像素 + 只取自己那块图集矩形”把大部分缝盖住了，但**只能盖住，不能消除**——残留多少取决于浏览器的 clip 光栅化实现，换一台手机、换一个版本就可能又冒出来。Spine 官方对 canvas 网格的说法也是同一件事：[spine-canvas 默认不支持 mesh，打开 triangleRendering 后“慢且在某些浏览器上会有 artifact”，推荐用 WebGL 后端/Pixi/spine-player](https://en.esotericsoftware.com/forum/d/28733-artefacts-when-rendering-spine-character-using-spine-canvas)；Canvas2D 裁剪边抗锯齿导致的接缝也是老问题，社区多年来的结论都只是“把裁剪区域放大 0.5–1px 先盖住”（[StackOverflow](https://stackoverflow.com/questions/7274150/how-to-eliminate-the-seam-between-uv-map-triangles-html5-canvas/7274515#7274515)、[OpenLayers #4123](https://github.com/openlayers/openlayers/issues/4123)）。

所以默认路径换成了 **WebGL**：整个立绘合进一个顶点/索引缓冲，每帧只发一次 `drawElements`。GPU 对相邻三角形使用同一条填充规则（共享边只算一次覆盖），接缝从原理上不存在。这不是引入 `spine-webgl`：姿态计算已经由现有的 canvas 运行时完成，WebGL 这边只需要一段 shader 和一批缓冲。

- **图集渗色**：Spine 的 UV 落在纹素边界上，零间距打包的图集若直接 `LINEAR` 采样，精灵边缘会采到旁边那张图。shader 把采样坐标夹到该附件自己的图集矩形内、向内缩半个纹素（[half-texel inset 是标准做法](https://github.com/hansjm10/Idle-Game-Engine/issues/812)），不需要重打图集。
- **预乘 alpha（暗边根因）**：图集透明像素是 `(0,0,0,0)` 透明黑。若按直通 alpha 上传再用 `LINEAR` 采样，采样器把边缘半透明像素和相邻的透明黑按相同权重混合（`lerp(color, black, 1-a)`），在**每一张**贴图的轮廓上混出一条暗线（这正是一次 WebGL 移植后“所有贴图都多了一圈边”的原因）。解决办法是按预乘 alpha 上传（`UNPACK_PREMULTIPLY_ALPHA_WEBGL = true`），片元出来就是预乘值，`gl_FragColor = texel * vAlpha` 直接输出、配合 `blendFunc(ONE, ONE_MINUS_SRC_ALPHA)` 合成；浏览器给 Canvas2D 做重采样时本来就用预乘，所以旧 Canvas2D 路径从来没有这个问题。alpha 通道不受影响，命中掩码不变。
- **附件切换**：`idle` 里有 42 处附件切换（开/闭眼、发丝）。布局阶段把每个槽位在 skin 里可能出现的附件都预留一段顶点；每帧只把当前附件写进它的段，其余段折成零面积（GPU 光栅化零面积三角形不产出像素）。
- **命中掩码**：WebGL 画布不能用 `getImageData` 读回，所以用同一批顶点再画一遍到 45×60 的帧缓冲，`readPixels` 10.8 KB 后按 alpha 阈值压成 0/1（注意 `readPixels` 从底行开始，要翻行）。
- **回退**：拿不到 WebGL 上下文（或图集有多个页面）时退回上一节的 `drawSkeleton()`，行为与旧版一致。
- **DPR 上限 3**：3x 屏按原生分辨率画，4x 屏仍封顶在 3。
- **上下文丢失**：监听 `webglcontextlost` / `webglcontextrestored`，恢复后重建 program/纹理/缓冲并补画一帧（穿透态下循环是停的）。

实测（同一页面 Canvas2D 与 WebGL 各一份立绘、DPR 3、540×720）：单帧 CPU 耗时 **0.6 ms** vs **23.8 ms**（WebGL 只是提交，实际填充在 GPU）；WebGL 的命中掩码回读只在 2.5 次/秒时发生。



| 场景 | 每秒绘制 | 单帧绘制 | 主线程占用 |
|---|---|---|---|
| 60 Hz 跟屏（优化前） | 60 | 13–15 ms | 约 840 ms/s |
| 20 Hz（现在） | 20 | 12.4–13.6 ms | 约 250 ms/s |
| 点击进入穿透后 | 补 1 帧后 0 | — | 0 |
| 鼠标移动（命中检测） | — | 每次移动一次 rect + 查表 | 可忽略 |
| `prefers-reduced-motion` | 补 1 帧后 0 | — | 0 |

待机动作的网格每 1/60 秒只移动约 0.16 设备像素，60 帧里有 59 帧肉眼等价，所以立绘按 20 Hz 呈现。以下情况循环直接停：立绘进入穿透、标签页不可见、`IntersectionObserver` 报它离开视口、以及 `prefers-reduced-motion: reduce`。停的时候会补画一帧静止画面，画布不会变空。

点击穿透的掩码跟随绘制每 8 帧重建一次（2.5 次/秒），每次读回 45×60×4 = 10.8 KB；鼠标移动只做一次 `getBoundingClientRect` 和一次字节查表，不进入渲染循环，也不额外触发重绘。

嫌 20 fps 还是费，改 `client.template.js` 里一个常量即可：

```js
const FRAME_INTERVAL = 1000 / 20   // 改成 1000 / 15 会再省 25%，每步 0.32 CSS px 仍看不出
```

改完跑 `npm run build`。

## 素材

全部素材离线打包在本插件内，不联网、不依赖活动页：

- `assets/spine/levels_spine_a/`：输入框右侧挂件用的 Spine（`.json` + `.atlas` + 贴图），取自活动页前端包里内联的数据与图片。骨骼文件只保留 `idle`：`toggle` 与它字节完全相同、且没有任何 attachment 引用，删掉省下 55 KB。同目录的 `levels_spine_b` / `levels_spine_c`（历史素材，共约 3.2 MB）已从包内移除——它们从未被加载过，删掉之前素材目录是 4.2 MB，现在约 0.9 MB。
- `assets/hua/levels_hua_a.png`：运行中小黄花的贴图，从活动页 `images/levels_hua.png` 图集里裁出。Atlas 里写的是 `bounds:0,0,78,82  rotate:90`，但 Spine 对 `rotate:90` 的区间按转置存放（包内实占 82×78），因此按 82×78 裁切后再转回来，才能拿到完整花形；接着把原画外圈的米白贴纸描边（`255,249,228`）从边缘 flood fill 抹掉（只保留深棕内描边与花瓣本体），最后修剪透明留白得到 74×77。它不以文件形式加载，而是由 `scripts/build-client.mjs` 内联成 data URI 写进样式表。
- `vendor/spine-canvas.min.mjs`：Esoteric Software 官方 Spine WebCanvas 运行时 v4.2.120，已内联进 `client.js`，遵循同目录下的 Spine Runtimes License。
- 体积：`levels_spine_a` 共 929 KB（骨骼 JSON 457 KB + 贴图 460 KB + atlas 12 KB），线上传输约 605 KB（JSON gzip 后 145 KB，PNG 本身已是压缩格式），解码后贴图 4 MB。

## 局限

- 立绘按 180×240 CSS 像素渲染，用骨骼文件中声明的 setup bounds 自动取景；不会随窗口缩放变大变小。backing store 最多 3 份设备像素，再高的屏幕也按 3x 画。
- 点击穿透的命中掩码是 45×60 的近似轮廓：极细的发丝可能漏判（点击会穿过去），轮廓边缘的几个像素也可能多算；掩码每 400 ms 才更新一次，快速拖动时可能慢半拍。
- **WebGL 路径的约束**：只支持单页图集；按槽位顺序出图，所以如果以后换成带 drawOrder 时间线的骨骼，需要重建索引缓冲（当前 `idle` 没有）。canvas 和 WebGL 两条路径都忽略了骨骼里的 6 个 `clipping` 附件（canvas 运行时本来就不支持裁剪附件）。
- Canvas2D 回退路径的放大裁剪会让公共边上的像素被画两次：不透明贴图无影响，但薄纱、半透明边缘的 alpha 会略高一点（肉眼不可见），严格说不是 1:1 还原。
- 只接管鼠标左键和触摸的主按下；右键、中键都按原样交给页面。
- 锁定按浏览器（同源）记住：换浏览器、隐私窗口或清掉站点数据后回到未锁定；禁用存储时退化为仅本页有效。触屏没有 hover，点一下角色会让锁按钮显示 4 秒；点过锁或点页面别处则立即收起，不再留一张只能等时间到点的按钮。
- WebGL 路径下主线程每帧只剩姿态计算 + 一次缓冲上传（实测 0.6 ms），GPU 填充是异步的；Canvas2D 回退路径仍有约 250 ms/s 的开销。
- 后台标签页不是"暂停"而是压根不启动：`requestAnimationFrame` 在隐藏页面本来就不触发，循环自己也检查 `document.visibilityState`，从源头不排队。
- 花朵的动画靠 CSS keyframes 驱动，与 Chat 自己那种由图片自带的动画时钟不同；因此它和其他 CSS 动画一样，后台标签页会被浏览器节流，但不会因为重挂而从头开始。
- 花朵用 `:has(> svg)` 定位 Chat 的图标方框，立绘则要抬 `[data-queue-dock]` 的层级，运行中文案靠改写 DOM 文本——三处都依赖 Chat 的内部结构，Chat 一改就可能静默失配（表现为退回原样，不会报错）。
- 插件只针对当前的 DSH Web 客户端验证过；宿主端 API 或槽位改名后需要跟着改。
- 素材版权属于米哈游 / HoYoverse，仅供个人本地使用，见 README 开头的声明。
