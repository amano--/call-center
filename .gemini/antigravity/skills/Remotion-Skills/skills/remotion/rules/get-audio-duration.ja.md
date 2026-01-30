---
name: get-audio-duration
description: Mediabunny を使用してオーディオファイルの期間を秒単位で取得する
metadata:
  tags: duration, audio, length, time, seconds, mp3, wav
---

# Mediabunny を使用してオーディオの期間を取得する

Mediabunny はオーディオファイルの期間を抽出できます。ブラウザ、Node.js、Bun 環境で機能します。

## オーディオの期間を取得する

```tsx
import { Input, ALL_FORMATS, UrlSource } from "mediabunny";

export const getAudioDuration = async (src: string) => {
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
const duration = await getAudioDuration("https://remotion.media/audio.mp3");
console.log(duration); // 例：180.5（秒）
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

const duration = await getAudioDuration(staticFile("audio.mp3"));
```
