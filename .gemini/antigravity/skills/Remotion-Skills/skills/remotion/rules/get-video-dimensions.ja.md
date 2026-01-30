---
name: get-video-dimensions
description: Mediabunny を使用してビデオファイルの幅と高さを取得する
metadata:
  tags: dimensions, width, height, resolution, size, video
---

# Mediabunny を使用してビデオの寸法を取得する

Mediabunny はビデオファイルの幅と高さを抽出できます。ブラウザ、Node.js、Bun 環境で機能します。

## ビデオの寸法を取得する

```tsx
import { Input, ALL_FORMATS, UrlSource } from "mediabunny";

export const getVideoDimensions = async (src: string) => {
  const input = new Input({
    formats: ALL_FORMATS,
    source: new UrlSource(src, {
      getRetryDelay: () => null,
    }),
  });

  const videoTrack = await input.getPrimaryVideoTrack();
  if (!videoTrack) {
    throw new Error("ビデオトラックが見つかりません");
  }

  return {
    width: videoTrack.displayWidth,
    height: videoTrack.displayHeight,
  };
};
```

## 使用方法

```tsx
const dimensions = await getVideoDimensions("https://remotion.media/video.mp4");
console.log(dimensions.width); // 例：1920
console.log(dimensions.height); // 例：1080
```

## ローカルファイルで使用する

ローカルファイルの場合は、`UrlSource` の代わりに `FileSource` を使用してください。

```tsx
import { Input, ALL_FORMATS, FileSource } from "mediabunny";

const input = new Input({
  formats: ALL_FORMATS,
  source: new FileSource(file), // 入力またはドラッグアンドドロップのファイルオブジェクト
});

const videoTrack = await input.getPrimaryVideoTrack();
const width = videoTrack.displayWidth;
const height = videoTrack.displayHeight;
```

## Remotion で staticFile を使用する

```tsx
import { staticFile } from "remotion";

const dimensions = await getVideoDimensions(staticFile("video.mp4"));
```
