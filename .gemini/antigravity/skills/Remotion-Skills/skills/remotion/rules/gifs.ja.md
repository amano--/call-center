---
name: gif
description: Remotion で GIF、APNG、AVIF、WebP を表示する
metadata:
  tags: gif, animation, images, animated, apng, avif, webp
---

# Remotion でアニメーション画像を使用する

## 基本的な使用方法

`<AnimatedImage>` を使用して、GIF、APNG、AVIF、または WebP 画像を Remotion のタイムラインと同期して表示してください。

```tsx
import { AnimatedImage, staticFile } from "remotion";

export const MyComposition = () => {
  return (
    <AnimatedImage src={staticFile("animation.gif")} width={500} height={500} />
  );
};
```

リモート URL もサポートされています (CORS が有効である必要があります)。

```tsx
<AnimatedImage
  src="https://example.com/animation.gif"
  width={500}
  height={500}
/>
```

## サイズと配置

画像がコンテナを満たす方法を `fit` プロップで制御してください。

```tsx
// コンテナに伸ばす (デフォルト)
<AnimatedImage src={staticFile("animation.gif")} width={500} height={300} fit="fill" />

// アスペクト比を維持、コンテナ内に収まる
<AnimatedImage src={staticFile("animation.gif")} width={500} height={300} fit="contain" />

// コンテナを埋める、必要に応じてクロップ
<AnimatedImage src={staticFile("animation.gif")} width={500} height={300} fit="cover" />
```

## 再生速度

`playbackRate` を使用してアニメーション速度を制御してください。

```tsx
<AnimatedImage src={staticFile("animation.gif")} width={500} height={500} playbackRate={2} /> {/* 2 倍速 */}
<AnimatedImage src={staticFile("animation.gif")} width={500} height={500} playbackRate={0.5} /> {/* 半速 */}
```

## ループの動作

アニメーションが終了した場合の動作を制御してください。

```tsx
// 無限にループ (デフォルト)
<AnimatedImage src={staticFile("animation.gif")} width={500} height={500} loopBehavior="loop" />

// 1 回再生、最終フレームを表示
<AnimatedImage src={staticFile("animation.gif")} width={500} height={500} loopBehavior="pause-after-finish" />

// 1 回再生、その後キャンバスをクリア
<AnimatedImage src={staticFile("animation.gif")} width={500} height={500} loopBehavior="clear-after-finish" />
```

## スタイリング

追加の CSS には `style` プロップを使用してください (サイズは `width` と `height` プロップを使用してください)。

```tsx
<AnimatedImage
  src={staticFile("animation.gif")}
  width={500}
  height={500}
  style={{
    borderRadius: 20,
    position: "absolute",
    top: 100,
    left: 50,
  }}
/>
```

## GIF の期間を取得する

`@remotion/gif` の `getGifDurationInSeconds()` を使用して GIF の期間を取得してください。

```bash
npx remotion add @remotion/gif # npm を使用する場合
bunx remotion add @remotion/gif # bun を使用する場合
yarn remotion add @remotion/gif # yarn を使用する場合
pnpm exec remotion add @remotion/gif # pnpm を使用する場合
```

```tsx
import { getGifDurationInSeconds } from "@remotion/gif";
import { staticFile } from "remotion";

const duration = await getGifDurationInSeconds(staticFile("animation.gif"));
console.log(duration); // 例：2.5
```

これは、コンポジション期間を GIF と一致させるのに便利です。

```tsx
import { getGifDurationInSeconds } from "@remotion/gif";
import { staticFile, CalculateMetadataFunction } from "remotion";

const calculateMetadata: CalculateMetadataFunction = async () => {
  const duration = await getGifDurationInSeconds(staticFile("animation.gif"));
  return {
    durationInFrames: Math.ceil(duration * 30),
  };
};
```

## 代替案

`<AnimatedImage>` が機能しない場合 (Chrome と Firefox でのみサポート)、代わりに `@remotion/gif` の `<Gif>` を使用できます。

```bash
npx remotion add @remotion/gif # npm を使用する場合
bunx remotion add @remotion/gif # bun を使用する場合
yarn remotion add @remotion/gif # yarn を使用する場合
pnpm exec remotion add @remotion/gif # pnpm を使用する場合
```

```tsx
import { Gif } from "@remotion/gif";
import { staticFile } from "remotion";

export const MyComposition = () => {
  return <Gif src={staticFile("animation.gif")} width={500} height={500} />;
};
```

`<Gif>` コンポーネントは `<AnimatedImage>` と同じプロップを持ちますが、GIF ファイルのみをサポートします。
