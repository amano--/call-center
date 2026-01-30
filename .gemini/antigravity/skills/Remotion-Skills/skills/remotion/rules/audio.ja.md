---
name: audio
description: Remotion でのオーディオとサウンドの使用 - インポート、トリミング、ボリューム、速度、ピッチ
metadata:
  tags: audio, media, trim, volume, speed, loop, pitch, mute, sound, sfx
---

# Remotion でオーディオを使用する

## 前提条件

まず、@remotion/media パッケージをインストールする必要があります。
インストールされていない場合は、以下のコマンドを使用してください。

```bash
npx remotion add @remotion/media # npm を使用する場合
bunx remotion add @remotion/media # bun を使用する場合
yarn remotion add @remotion/media # yarn を使用する場合
pnpm exec remotion add @remotion/media # pnpm を使用する場合
```

## オーディオのインポート

`@remotion/media` の `<Audio>` を使用して、コンポジションにオーディオを追加してください。

```tsx
import { Audio } from "@remotion/media";
import { staticFile } from "remotion";

export const MyComposition = () => {
  return <Audio src={staticFile("audio.mp3")} />;
};
```

リモート URL もサポートされています。

```tsx
<Audio src="https://remotion.media/audio.mp3" />
```

デフォルトでは、オーディオは開始から、フルボリュームで、フル長で再生されます。
複数のオーディオトラックは、複数の `<Audio>` コンポーネントを追加することでレイヤーできます。

## トリミング

`trimBefore` と `trimAfter` を使用してオーディオの一部を削除してください。値はフレーム単位です。

```tsx
const { fps } = useVideoConfig();

return (
  <Audio
    src={staticFile("audio.mp3")}
    trimBefore={2 * fps} // 最初の 2 秒をスキップ
    trimAfter={10 * fps} // 10 秒のマークで終了
  />
);
```

オーディオはコンポジションの開始時に再生を開始します。指定された部分だけが再生されます。

## 遅延

オーディオを `<Sequence>` でラップして、開始時刻を遅延させてください。

```tsx
import { Sequence, staticFile } from "remotion";
import { Audio } from "@remotion/media";

const { fps } = useVideoConfig();

return (
  <Sequence from={1 * fps}>
    <Audio src={staticFile("audio.mp3")} />
  </Sequence>
);
```

オーディオは 1 秒後に再生を開始します。

## ボリューム

静的ボリュームを設定してください (0 から 1)。

```tsx
<Audio src={staticFile("audio.mp3")} volume={0.5} />
```

または、現在のフレームに基づいて動的ボリュームのコールバックを使用してください。

```tsx
import { interpolate } from "remotion";

const { fps } = useVideoConfig();

return (
  <Audio
    src={staticFile("audio.mp3")}
    volume={(f) =>
      interpolate(f, [0, 1 * fps], [0, 1], { extrapolateRight: "clamp" })
    }
  />
);
```

`f` の値は、コンポジションフレームではなく、オーディオが再生を開始するときに 0 から開始します。

## ミュート

`muted` を使用してオーディオをサイレントにしてください。動的に設定できます。

```tsx
const frame = useCurrentFrame();
const { fps } = useVideoConfig();

return (
  <Audio
    src={staticFile("audio.mp3")}
    muted={frame >= 2 * fps && frame <= 4 * fps} // 2 秒から 4 秒までミュート
  />
);
```

## 速度

`playbackRate` を使用して再生速度を変更してください。

```tsx
<Audio src={staticFile("audio.mp3")} playbackRate={2} /> {/* 2 倍速 */}
<Audio src={staticFile("audio.mp3")} playbackRate={0.5} /> {/* 半速 */}
```

逆方向の再生はサポートされていません。

## ループ

`loop` を使用してオーディオを無限にループさせてください。

```tsx
<Audio src={staticFile("audio.mp3")} loop />
```

`loopVolumeCurveBehavior` を使用して、ループ時のフレームカウント動作を制御してください。

- `"repeat"`: フレームカウントは各ループでリセット (デフォルト)
- `"extend"`: フレームカウントは増加し続ける

```tsx
<Audio
  src={staticFile("audio.mp3")}
  loop
  loopVolumeCurveBehavior="extend"
  volume={(f) => interpolate(f, [0, 300], [1, 0])} // 複数ループでフェードアウト
/>
```

## ピッチ

`toneFrequency` を使用して速度に影響を与えずにピッチを調整してください。値は 0.01 から 2 の範囲です。

```tsx
<Audio
  src={staticFile("audio.mp3")}
  toneFrequency={1.5} // 高いピッチ
/>
<Audio
  src={staticFile("audio.mp3")}
  toneFrequency={0.8} // 低いピッチ
/>
```

ピッチシフトはサーバー側レンダリング中のみ機能し、Remotion Studio プレビューまたは `<Player />` では機能しません。
