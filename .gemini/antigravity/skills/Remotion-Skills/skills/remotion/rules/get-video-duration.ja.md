---
name: get-video-duration
description: Mediabunny を使用してビデオファイルの期間を秒単位で取得する
metadata:
  tags: duration, video, length, time, seconds
---

# Mediabunny を使用してビデオの期間を取得する

Mediabunny はビデオファイルの期間を抽出できます。ブラウザ、Node.js、Bun 環境で機能します。

## ビデオの期間を取得する

```tsx
import { Input, ALL_FORMATS, UrlSource } from "mediabunny";

export const getVideoDuration = async (src: string) => {
  const input = new Input({
    formats: ALL_FORMATS,
    source: new UrlSource(src, {
      getRetryDelay: () => null,
    }),
  });

  const durationInSeconds = await input.computeDuration();
  return durationInSeconds;
};
```

## 使用方法

```tsx
const duration = await getVideoDuration("https://remotion.media/video.mp4");
console.log(duration); // 例：10.5（秒）
```

## ローカルファイルで使用する

ローカルファイルの場合は、`UrlSource` の代わりに `FileSource` を使用してください。

```tsx
import { Input, ALL_FORMATS, FileSource } from "mediabunny";

const input = new Input({
  formats: ALL_FORMATS,
  source: new FileSource(file), // 入力またはドラッグアンドドロップのファイルオブジェクト
});

const durationInSeconds = await input.computeDuration();
```

## Remotion で staticFile を使用する

```tsx
import { staticFile } from "remotion";

const duration = await getVideoDuration(staticFile("video.mp4"));
```
