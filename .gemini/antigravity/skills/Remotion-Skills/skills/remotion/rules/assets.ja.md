---
name: assets
description: Remotion への画像、ビデオ、オーディオ、フォントのインポート
metadata:
  tags: assets, staticFile, images, fonts, public
---

# Remotion にアセットをインポートする

## public フォルダ

アセットをプロジェクトルートの `public/` フォルダに配置してください。

## staticFile() を使用する

`public/` フォルダからファイルを参照するために `staticFile()` を使用する必要があります。

```tsx
import { Img, staticFile } from "remotion";

export const MyComposition = () => {
  return <Img src={staticFile("logo.png")} />;
};
```

この関数は、サブディレクトリにデプロイするときに正しく機能する符号化された URL を返します。

## コンポーネントで使用する

**画像:**

```tsx
import { Img, staticFile } from "remotion";

<Img src={staticFile("photo.png")} />;
```

**ビデオ:**

```tsx
import { Video } from "@remotion/media";
import { staticFile } from "remotion";

<Video src={staticFile("clip.mp4")} />;
```

**オーディオ:**

```tsx
import { Audio } from "@remotion/media";
import { staticFile } from "remotion";

<Audio src={staticFile("music.mp3")} />;
```

**フォント:**

```tsx
import { staticFile } from "remotion";

const fontFamily = new FontFace("MyFont", `url(${staticFile("font.woff2")})`);
await fontFamily.load();
document.fonts.add(fontFamily);
```

## リモート URL

リモート URL は `staticFile()` なしで直接使用できます。

```tsx
<Img src="https://example.com/image.png" />
<Video src="https://remotion.media/video.mp4" />
```

## 重要な注記

- Remotion コンポーネント (`<Img>`, `<Video>`, `<Audio>`) は、レンダリング前にアセットが完全に読み込まれていることを保証します
- ファイル名の特殊文字 (`#`, `?`, `&`) は自動的に符号化されます
