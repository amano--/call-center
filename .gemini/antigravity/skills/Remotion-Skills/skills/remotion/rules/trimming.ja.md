---
name: trimming
description: Remotion のトリミングパターン - アニメーション の開始または終了を切る
metadata:
  tags: sequence, trim, clip, cut, offset
---

アニメーションの開始をトリミングするために、負の `from` 値を含む `<Sequence>` を使用してください。

## 開始をトリミングする

負の `from` 値は時間を後ろに移動し、アニメーションが進捗の途中から開始するようにします。

```tsx
import { Sequence, useVideoConfig } from "remotion";

const fps = useVideoConfig();

<Sequence from={-0.5 * fps}>
  <MyAnimation />
</Sequence>;
```

アニメーションは進捗 15 フレームで表示されます。最初の 15 フレームはトリミングされます。
`<MyAnimation>` 内では、`useCurrentFrame()` は 0 ではなく 15 から開始されます。

## 終了をトリミングする

`durationInFrames` を使用して、指定された期間後にコンテンツをアンマウントしてください。

```tsx
<Sequence durationInFrames={1.5 * fps}>
  <MyAnimation />
</Sequence>
```

アニメーションは 45 フレーム再生してから、コンポーネントはアンマウントされます。

## トリミングと遅延

開始をトリミングして表示される時刻を遅延させるために、Sequence をネストしてください。

```tsx
<Sequence from={30}>
  <Sequence from={-15}>
    <MyAnimation />
  </Sequence>
</Sequence>
```

内側の Sequence は開始から 15 フレームをトリミングし、外側の Sequence は結果を 30 フレーム遅延させます。
