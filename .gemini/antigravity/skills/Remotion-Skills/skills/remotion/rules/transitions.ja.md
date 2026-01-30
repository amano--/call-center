---
name: transitions
description: Remotion 用のフルスクリーンシーントランジション
metadata:
  tags: transitions, fade, slide, wipe, scenes
---

## フルスクリーンのトランジション

複数のシーン またはクリップをアニメーション化するために `<TransitionSeries>` を使用してください。
これは子を絶対位置に配置します。

## 前提条件

まず、@remotion/transitions パッケージをインストールする必要があります。
インストールされていない場合は、以下のコマンドを使用してください。

```bash
npx remotion add @remotion/transitions # npm を使用する場合
bunx remotion add @remotion/transitions # bun を使用する場合
yarn remotion add @remotion/transitions # yarn を使用する場合
pnpm exec remotion add @remotion/transitions # pnpm を使用する場合
```

## 使用例

```tsx
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";

<TransitionSeries>
  <TransitionSeries.Sequence durationInFrames={60}>
    <SceneA />
  </TransitionSeries.Sequence>
  <TransitionSeries.Transition
    presentation={fade()}
    timing={linearTiming({ durationInFrames: 15 })}
  />
  <TransitionSeries.Sequence durationInFrames={60}>
    <SceneB />
  </TransitionSeries.Sequence>
</TransitionSeries>;
```

## 利用可能なトランジションタイプ

それぞれのモジュールからトランジションをインポートしてください。

```tsx
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { flip } from "@remotion/transitions/flip";
import { clockWipe } from "@remotion/transitions/clock-wipe";
```

## 方向を指定したスライドトランジション

スライド方向を入場/退場アニメーションに指定してください。

```tsx
import { slide } from "@remotion/transitions/slide";

<TransitionSeries.Transition
  presentation={slide({ direction: "from-left" })}
  timing={linearTiming({ durationInFrames: 20 })}
/>;
```

方向：`"from-left"`, `"from-right"`, `"from-top"`, `"from-bottom"`

## タイミングオプション

```tsx
import { linearTiming, springTiming } from "@remotion/transitions";

// リニアタイミング - 一定速度
linearTiming({ durationInFrames: 20 });

// スプリングタイミング - 有機的な動き
springTiming({ config: { damping: 200 }, durationInFrames: 25 });
```

## 期間の計算

トランジションは隣接するシーンと重複するため、合計コンポジション長は、すべてのシーケンス期間の合計より**短く**なります。

たとえば、2 つの 60 フレームのシーケンスと 15 フレームのトランジションがある場合：

- トランジションなし：`60 + 60 = 120` フレーム
- トランジション付き：`60 + 60 - 15 = 105` フレーム

トランジション期間が引き引かれます。なぜなら、トランジション中に両方のシーンが同時に再生されるからです。

### トランジションの期間を取得する

タイミングオブジェクトの `getDurationInFrames()` メソッドを使用してください。

```tsx
import { linearTiming, springTiming } from "@remotion/transitions";

const linearDuration = linearTiming({
  durationInFrames: 20,
}).getDurationInFrames({ fps: 30 });
// 20 を返す

const springDuration = springTiming({
  config: { damping: 200 },
}).getDurationInFrames({ fps: 30 });
// スプリング物理に基づいて計算された期間を返す
```

明示的な `durationInFrames` なしで `springTiming` の場合、期間は `fps` に依存します。スプリングアニメーションが落ち着く時を計算するためです。

### コンポジション総期間を計算する

```tsx
import { linearTiming } from "@remotion/transitions";

const scene1Duration = 60;
const scene2Duration = 60;
const scene3Duration = 60;

const timing1 = linearTiming({ durationInFrames: 15 });
const timing2 = linearTiming({ durationInFrames: 20 });

const transition1Duration = timing1.getDurationInFrames({ fps: 30 });
const transition2Duration = timing2.getDurationInFrames({ fps: 30 });

const totalDuration =
  scene1Duration +
  scene2Duration +
  scene3Duration -
  transition1Duration -
  transition2Duration;
// 60 + 60 + 60 - 15 - 20 = 145 フレーム
```
