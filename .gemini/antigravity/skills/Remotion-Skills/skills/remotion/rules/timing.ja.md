---
name: timing
description: Remotion の補間曲線 - リニア、イージング、スプリングアニメーション
metadata:
  tags: spring, bounce, easing, interpolation
---

単純な線形補間は `interpolate` 関数を使用して実行されます。

```ts title="100 フレーム上で 0 から 1 に移動"
import { interpolate } from "remotion";

const opacity = interpolate(frame, [0, 100], [0, 1]);
```

デフォルトでは、値は固定されていないため、値は範囲 [0, 1] の外に出ることができます。
以下は、それらをクランプする方法です。

```ts title="外挿を使用して 100 フレーム上で 0 から 1 に移動"
const opacity = interpolate(frame, [0, 100], [0, 1], {
  extrapolateRight: "clamp",
  extrapolateLeft: "clamp",
});
```

## スプリングアニメーション

スプリングアニメーションはより自然な動きを持っています。
時間とともに 0 から 1 に進みます。

```ts title="100 フレーム上で 0 から 1 へのスプリングアニメーション"
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

const frame = useCurrentFrame();
const { fps } = useVideoConfig();

const scale = spring({
  frame,
  fps,
});
```

### 物理的プロパティ

デフォルト設定は：`mass: 1, damping: 10, stiffness: 100`。
これにより、アニメーションはそれが解決する前に跳ね返りがわずかに起こります。

設定は次のようにオーバーライドできます。

```ts
const scale = spring({
  frame,
  fps,
  config: { damping: 200 },
});
```

跳ね返りのない自然な動きの推奨設定は：`{ damping: 200 }`。

一般的な設定をいくつか紹介します。

```tsx
const smooth = { damping: 200 }; // スムーズ、跳ね返りなし（微細な表示）
const snappy = { damping: 20, stiffness: 200 }; // スナップ、最小限の跳ね返り（UI 要素）
const bouncy = { damping: 8 }; // 跳ね返り入場（遊び心のあるアニメーション）
const heavy = { damping: 15, stiffness: 80, mass: 2 }; // 重い、遅い、わずかな跳ね返り
```

### 遅延

デフォルトでは、アニメーションはすぐに開始されます。
`delay` パラメータを使用して、アニメーションを複数フレーム遅延させてください。

```tsx
const entrance = spring({
  frame: frame - ENTRANCE_DELAY,
  fps,
  delay: 20,
});
```

### 期間

`spring()` は物理的なプロパティに基づいて自然な期間を持ちます。
アニメーションを特定の期間に拡張するには、`durationInFrames` パラメータを使用してください。

```tsx
const spring = spring({
  frame,
  fps,
  durationInFrames: 40,
});
```

### spring() を interpolate() と組み合わせる

スプリング出力 (0-1) をカスタム範囲にマップしてください。

```tsx
const springProgress = spring({
  frame,
  fps,
});

// 回転にマップ
const rotation = interpolate(springProgress, [0, 1], [0, 360]);

<div style={{ rotate: rotation + "deg" }} />;
```

### スプリングの追加

スプリングは単なる数値を返すため、数学を実行できます。

```tsx
const frame = useCurrentFrame();
const { fps, durationInFrames } = useVideoConfig();

const inAnimation = spring({
  frame,
  fps,
});
const outAnimation = spring({
  frame,
  fps,
  durationInFrames: 1 * fps,
  delay: durationInFrames - 1 * fps,
});

const scale = inAnimation - outAnimation;
```

## イージング

`interpolate` 関数にイージングを追加してください。

```ts
import { interpolate, Easing } from "remotion";

const value1 = interpolate(frame, [0, 100], [0, 1], {
  easing: Easing.inOut(Easing.quad),
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
});
```

デフォルトのイージングは `Easing.linear` です。
他の凸性があります。

- `Easing.in` 遅く開始して加速
- `Easing.out` 高速開始して遅くなる
- `Easing.inOut`

および曲線 (最もリニアから最も曲がったまで並べられ)：

- `Easing.quad`
- `Easing.sin`
- `Easing.exp`
- `Easing.circle`

凸性と曲線をイージング関数に組み合わせる必要があります。

```ts
const value1 = interpolate(frame, [0, 100], [0, 1], {
  easing: Easing.inOut(Easing.quad),
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
});
```

3 次ベジェ曲線もサポートされています。

```ts
const value1 = interpolate(frame, [0, 100], [0, 1], {
  easing: Easing.bezier(0.8, 0.22, 0.96, 0.65),
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
});
```
