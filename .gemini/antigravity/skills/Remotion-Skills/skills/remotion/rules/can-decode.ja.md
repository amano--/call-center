---
name: can-decode
description: Mediabunny を使用してビデオをブラウザでデコードできるかを確認する
metadata:
  tags: decode, validation, video, audio, compatibility, browser
---

# ビデオをデコードできるかを確認する

ビデオを再生しようとする前に、Mediabunny を使用してビデオをブラウザでデコードできるかを確認してください。

## `canDecode()` 関数

この関数は任意のプロジェクトにコピーして貼り付けることができます。

```tsx
import { Input, ALL_FORMATS, UrlSource } from "mediabunny";

export const canDecode = async (src: string) => {
  const input = new Input({
    formats: ALL_FORMATS,
    source: new UrlSource(src, {
      getRetryDelay: () => null,
    }),
  });

  try {
    await input.getFormat();
  } catch {
    return false;
  }

  const videoTrack = await input.getPrimaryVideoTrack();
  if (videoTrack && !(await videoTrack.canDecode())) {
    return false;
  }

  const audioTrack = await input.getPrimaryAudioTrack();
  if (audioTrack && !(await audioTrack.canDecode())) {
    return false;
  }

  return true;
};
```

## 使用方法

```tsx
const src = "https://remotion.media/video.mp4";
const isDecodable = await canDecode(src);

if (isDecodable) {
  console.log("ビデオをデコードできます");
} else {
  console.log("このブラウザではビデオをデコードできません");
}
```

## Blob で使用する

ファイルアップロードまたはドラッグアンドドロップの場合は、`BlobSource` を使用してください。

```tsx
import { Input, ALL_FORMATS, BlobSource } from "mediabunny";

export const canDecodeBlob = async (blob: Blob) => {
  const input = new Input({
    formats: ALL_FORMATS,
    source: new BlobSource(blob),
  });

  // 上記と同じ検証ロジック
};
```
