# 绝区零 · 立绘挂件 · 实现说明

README 里被裁掉的实现细节都在这里：路由与缓存的取舍、帧率是怎么定的、素材是怎么从活动页里取出来的、以及还有哪些已知局限。

## 功能

- **输入框右上角的立绘**：只保留活动卡片的首位角色德蕾琪娜·挽昼（皮肤「柔光之影」），循环播放 `idle` 待机动作，悬停时轻微上浮。点击角色让它变透明（约 12% 不透明度），用来查看被立绘盖住的对话内容与控件；再点一次恢复。角色身上不出任何文字：没有悬停提示框，也没有常驻角标——提示框正好盖住用户想看的那块；状态只保留在 `aria-label` / `aria-pressed` 里供读屏使用。
- **层级**：立绘挂在输入框卡片的 overlay 槽位里。排队消息条在页面顺序上位于输入框之前，而立绘是绝对定位，会盖住排队消息条的展开箭头与编辑/删除/插话按钮并吞掉点击；插件因此把 `[data-queue-dock]` 抬到立绘之上（`position: relative; z-index: 2`）。命令菜单等卡片内的浮层自带更高的 z-index，仍显示在最上层。
- **出现在所有会话**：挂件挂在输入框卡片的 overlay 槽位，因此每个会话（包括新建会话的空白页）的输入框右上角都能看到角色。空白页本身保持 DSH 原样，不再铺背景。
- **运行中的小黄花**：会话跑起来时，Chat 会在轮次末尾显示「深度求索中，用时 …」；插件把这句话改写成「罗塞塔数据解算中，用时 …」，并把它前面那只鲸鱼尾巴换成活动页里旋转的小黄花。花朵取 `levels_hua` Spine 的 `a1` 帧，只还原了其中的旋转：`rotateSpeed = -0.3`，即顺时针 3.33 秒一圈（原引擎还叠了 x 方向摆动与缩放脉冲，在图标尺寸下只会读成抖动，所以没有搬）。鲸鱼所在的 14px 方框尺寸与位置都不动，所以行高和计时文本不会产生任何位移；`prefers-reduced-motion` 下停转并保留一帧静止画面。背景始终被裁到 border-box，因此用 `background-size: contain` 保证整朵花都在方框内——溢出会把花瓣切掉。

## 结构

插件分两半：宿主端把素材发出去，浏览器端把立绘画出来。

- **宿主端**（`index.js`）用 `ctx.webServer.register({ kind: 'prefix', path: '/zzz-spine/assets' })` serve 包内 `assets/`。没有走 DSH 自带的 `/plugins/<pkg>/assets/`：那条路由只接受 `.svg` / `.png` / `.webp` / `.jpg` / `.jpeg`，`.json` 与 `.atlas` 会 404。
- **缓存**：`cache-control: no-cache` + ETag（文件大小 + mtime），命中回 304。不用 `max-age` 是因为重打包素材后必须下次刷新就生效；本地 carrier 上一次 304 几乎免费。
- **浏览器端**（`client.js`）是构建产物，不是手写文件。`scripts/build-client.mjs` 把 `client.template.js` 里的 `__SPINE_RUNTIME__` 替换成 `vendor/spine-canvas.min.mjs` 的 IIFE 形式——模块加载器注册的是 classic factory，没法在工厂内部 import 一个 ES module——并把小黄花内联成 data URI，因此首次绘制就是花，不需要挂载后再拉一次图。注册进 `conversation.input.overlay`，order 20。

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

## 性能

这个骨架有 4304 个三角形，全部是 mesh。Canvas2D 运行时按三角形逐个 `clip` + `drawImage(整张图集)`，所以**每帧代价按三角形数量计，不按像素计**——实测把图集从 2048×512 缩到 256×64、或把 DPR 从 2 降到 1，单帧都还是 14 ms 左右。降分辨率、缩图集这条路是死的。

| 场景 | 每秒绘制 | 单帧绘制 | 主线程占用 |
|---|---|---|---|
| 60 Hz 跟屏（优化前） | 60 | 13–15 ms | 约 840 ms/s |
| 20 Hz（现在） | 20 | 12.4–13.6 ms | 约 250 ms/s |
| 点击变透明后 | 补 1 帧后 0 | — | 0 |
| `prefers-reduced-motion` | 补 1 帧后 0 | — | 0 |

待机动作的网格每 1/60 秒只移动约 0.16 设备像素，60 帧里有 59 帧肉眼等价，所以立绘按 20 Hz 呈现。以下情况循环直接停：立绘被点击变透明、标签页不可见、`IntersectionObserver` 报它离开视口、以及 `prefers-reduced-motion: reduce`。停的时候会补画一帧静止画面，画布不会变空。

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

- 立绘按 180×240 CSS 像素渲染，用骨骼文件中声明的 setup bounds 自动取景；不会随窗口缩放变大变小。
- 主线程仍有约 250 ms/s 的开销。再往下走只有两种：把渲染搬进 Worker + `OffscreenCanvas`（实测帧时不变，只是移到另一个线程），或者在构建期把动画烘焙成 sprite 贴图（blit 快两个数量级，但 80 帧 @24fps 的贴图是 52.7 MiB RGBA，为一个挂件不划算）。
- 后台标签页不是"暂停"而是压根不启动：`requestAnimationFrame` 在隐藏页面本来就不触发，循环自己也检查 `document.visibilityState`，从源头不排队。
- 花朵的动画靠 CSS keyframes 驱动，与 Chat 自己那种由图片自带的动画时钟不同；因此它和其他 CSS 动画一样，后台标签页会被浏览器节流，但不会因为重挂而从头开始。
- 花朵用 `:has(> svg)` 定位 Chat 的图标方框，立绘则要抬 `[data-queue-dock]` 的层级，运行中文案靠改写 DOM 文本——三处都依赖 Chat 的内部结构，Chat 一改就可能静默失配（表现为退回原样，不会报错）。
- 插件只针对当前的 DSH Web 客户端验证过；宿主端 API 或槽位改名后需要跟着改。
- 素材版权属于米哈游 / HoYoverse，仅供个人本地使用，见 README 开头的声明。
