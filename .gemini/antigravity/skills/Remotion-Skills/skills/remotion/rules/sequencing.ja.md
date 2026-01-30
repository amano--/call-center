---
name: sequencing
description: Remotion のシーケンシングパターン - 遅延、トリミング、アイテムの期間を制限する
metadata:
  tags: sequence, series, timing, delay, trim
---

`<Sequence>` を使用して、要素がタイムラインに表示される時刻を遅延させてください。

```tsx
import { Sequence } from "remotion";

const {fps} = useVideoConfig();

<Sequence from={1 * fps} durationInFrames={2 * fps} premountFor={1 * fps}>
  <Title />
</Sequence>
<Sequence from={2 * fps} durationInFrames={2 * fps} premountFor={1 * fps}>
  <Subtitle />
</Sequence>
```

デフォルトでは、コンポーネントが絶対フィル要素でラップされます。
アイテムをラップしない場合は、`layout` プロップを使用してください。

```tsx
<Sequence layout="none">
  <Title />
</Sequence>
```

## プリマウント

これにより、実際に再生される前にタイムラインにコンポーネントが読み込まれます。
常に `<Sequence>` をプリマウントしてください！

```tsx
<Sequence premountFor={1 * fps}>
  <Title />
</Sequence>
```

## Series

要素が重複なしで 1 つずつ再生される場合は `<Series>` を使用してください。

```tsx
import { Series } from "remotion";

<Series>
  <Series.Sequence durationInFrames={45}>
    <Intro />
  </Series.Sequence>
  <Series.Sequence durationInFrames={60}>
    <MainContent />
  </Series.Sequence>
  <Series.Sequence durationInFrames={30}>
    <Outro />
  </Series.Sequence>
</Series>;
```

`<Sequence>` の場合と同様に、`<Series.Sequence>` を使用する場合、`layout` プロップが `none` に設定されていない限り、アイテムは絶対フィル要素でラップされます。

### 重複を含む Series

重複するシーケンスに負のオフセットを使用してください。

```tsx
<Series>
  <Series.Sequence durationInFrames={60}>
    <SceneA />
  </Series.Sequence>
  <Series.Sequence offset={-15} durationInFrames={60}>
    {/* SceneA が終了する 15 フレーム前に開始 */}
    <SceneB />
  </Series.Sequence>
</Series>
```

## Sequence 内のフレーム参照

Sequence 内では、`useCurrentFrame()` はローカルフレーム (0 から開始) を返します。

```tsx
<Sequence from={60} durationInFrames={30}>
  <MyComponent />
  {/* MyComponent 内では、useCurrentFrame() は 60-89 ではなく 0-29 を返す */}
</Sequence>
```

## ネストされた Sequence

複雑なタイミングのために Sequence をネストできます。

```tsx
<Sequence from={0} durationInFrames={120}>
  <Background />
  <Sequence from={15} durationInFrames={90} layout="none">
    <Title />
  </Sequence>
  <Sequence from={45} durationInFrames={60} layout="none">
    <Subtitle />
  </Sequence>
</Sequence>
```
