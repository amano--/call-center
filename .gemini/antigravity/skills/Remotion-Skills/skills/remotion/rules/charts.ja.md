---
name: charts
description: Remotion でのチャートとデータ可視化パターン。棒グラフ、円グラフ、ヒストグラム、進捗バー、またはデータ駆動アニメーションを作成するときに使用します。
metadata:
  tags: charts, data, visualization, bar-chart, pie-chart, graphs
---

# Remotion のチャート

HTML と SVG、D3.js を使用した通常の React コードを使用して Remotion に棒グラフを作成できます。

## `useCurrentFrame()` で駆動されていないアニメーションはない

サードパーティライブラリによるすべてのアニメーションを無効にしてください。
レンダリング中にちらつきが発生します。
代わりに、`useCurrentFrame()` からすべてのアニメーションを駆動してください。

## 棒グラフ アニメーション

基本的な実装例については、[棒グラフの例](assets/charts/bar-chart.tsx) を参照してください。

### スタッガー棒

このようにしてバーの高さをアニメーション化してスタッガーできます。

```tsx
const STAGGER_DELAY = 5;
const frame = useCurrentFrame();
const { fps } = useVideoConfig();

const bars = data.map((item, i) => {
  const delay = i * STAGGER_DELAY;
  const height = spring({
    frame,
    fps,
    delay,
    config: { damping: 200 },
  });
  return <div style={{ height: height * item.value }} />;
});
```

## 円グラフ アニメーション

stroke-dashoffset を使用してセグメントをアニメーション化し、12 時から開始します。

```tsx
const frame = useCurrentFrame();
const { fps } = useVideoConfig();

const progress = interpolate(frame, [0, 100], [0, 1]);

const circumference = 2 * Math.PI * radius;
const segmentLength = (value / total) * circumference;
const offset = interpolate(progress, [0, 1], [segmentLength, 0]);

<circle
  r={radius}
  cx={center}
  cy={center}
  fill="none"
  stroke={color}
  strokeWidth={strokeWidth}
  strokeDasharray={`${segmentLength} ${circumference}`}
  strokeDashoffset={offset}
  transform={`rotate(-90 ${center} ${center})`}
/>;
```
