---
name: videos
description: Remotion にビデオを埋め込む - トリミング、ボリューム、速度、ループ、ピッチ
metadata:
  tags: video, media, trim, volume, speed, loop, pitch
---

# Remotion でビデオを使用する

## 前提条件

まず、@remotion/media パッケージをインストールする必要があります。
インストールされていない場合は、以下のコマンドを使用してください。

```bash
npx remotion add @remotion/media # npm を使用する場合
bunx remotion add @remotion/media # bun を使用する場合
yarn remotion add @remotion/media # yarn を使用する場合
pnpm exec remotion add @remotion/media # pnpm を使用する場合
```

`@remotion/media` の `<Video>` を使用してビデオをコンポジションに埋め込んでください。

```tsx
import { Video } from "@remotion/media";
import { staticFile } from "remotion";

export const MyComposition = () => {
  return <Video src={staticFile("video.mp4")} />;
};
```

リモート URL もサポートされています。

```tsx
<Video src="https://remotion.media/video.mp4" />
```

## トリミング

`trimBefore` と `trimAfter` を使用してビデオの一部を削除してください。値は秒単位です。

```tsx
const { fps } = useVideoConfig();

return (
  <Video
    src={staticFile("video.mp4")}
    trimBefore={2 * fps} // 最初の 2 秒をスキップ
    trimAfter={10 * fps} // 10 秒のマークで終了
  />
);
```

## 遅延

ビデオを `<Sequence>` でラップして、表示される時刻を遅延させてください。

```tsx
import { Sequence, staticFile } from "remotion";
import { Video } from "@remotion/media";

const { fps } = useVideoConfig();

return (
  <Sequence from={1 * fps}>
    <Video src={staticFile("video.mp4")} />
  </Sequence>
);
```

ビデオは 1 秒後に表示されます。

## サイズと位置

`style` プロップを使用してサイズと位置を制御してください。

```tsx
<Video
  src={staticFile("video.mp4")}
  style={{
    width: 500,
    height: 300,
    position: "absolute",
    top: 100,
    left: 50,
    objectFit: "cover",
  }}
/>
```

## ボリューム

静的ボリュームを設定してください (0 から 1)：

```tsx
<Video src={staticFile("video.mp4")} volume={0.5} />
```

または、現在のフレームに基づいて動的ボリュームのコールバックを使用してください。

```tsx
import { interpolate } from "remotion";

const { fps } = useVideoConfig();

return (
  <Video
    src={staticFile("video.mp4")}
    volume={(f) =>
      interpolate(f, [0, 1 * fps], [0, 1], { extrapolateRight: "clamp" })
    }
  />
);
```

ビデオ全体をミュートするには `muted` を使用してください。

```tsx
<Video src={staticFile("video.mp4")} muted />
```

## 速度

`playbackRate` を使用して再生速度を変更してください。

```tsx
<Video src={staticFile("video.mp4")} playbackRate={2} /> {/* 2 倍速 */}
<Video src={staticFile("video.mp4")} playbackRate={0.5} /> {/* 半速 */}
```

逆方向の再生はサポートされていません。

## ループ

`loop` を使用してビデオを無限にループさせてください。

```tsx
<Video src={staticFile("video.mp4")} loop />
```

`loopVolumeCurveBehavior` を使用して、ループ時のフレームカウント動作を制御してください。

- `"repeat"`: フレームカウントは各ループでリセット
- `"extend"`: フレームカウントは増加し続ける

```tsx
<Video
  src={staticFile("video.mp4")}
  loop
  loopVolumeCurveBehavior="extend"
  volume={(f) => interpolate(f, [0, 300], [1, 0])} // 複数ループでフェードアウト
/>
```

## ピッチ

`toneFrequency` を使用して速度に影響を与えずにピッチを調整してください。値は 0.01 から 2 の範囲です。

```tsx
<Video
  src={staticFile("video.mp4")}
  toneFrequency={1.5} // 高いピッチ
/>
<Video
  src={staticFile("video.mp4")}
  toneFrequency={0.8} // 低いピッチ
/>
```

ピッチシフトはサーバー側レンダリング中のみ機能し、Remotion Studio プレビューまたは `<Player />` では機能しません。
