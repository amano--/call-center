---
name: images
description: `<Img>` コンポーネントを使用して Remotion に画像を埋め込む
metadata:
  tags: images, img, staticFile, png, jpg, svg, webp
---

# Remotion で画像を使用する

## `<Img>` コンポーネント

常に `remotion` から `<Img>` コンポーネントを使用して画像を表示してください。

```tsx
import { Img, staticFile } from "remotion";

export const MyComposition = () => {
  return <Img src={staticFile("photo.png")} />;
};
```

## 重要な制限

**`remotion` の `<Img>` コンポーネントを使用する必要があります。** 以下は使用しないでください。

- ネイティブ HTML `<img>` 要素
- Next.js `<Image>` コンポーネント
- CSS `background-image`

`<Img>` コンポーネントは、ビデオエクスポート中のちらつきと空白フレームを防ぐため、レンダリング前に画像が完全に読み込まれていることを保証します。

## staticFile() を使用したローカル画像

画像を `public/` フォルダに配置し、`staticFile()` を使用してそれらを参照してください。

```
my-video/
├─ public/
│  ├─ logo.png
│  ├─ avatar.jpg
│  └─ icon.svg
├─ src/
├─ package.json
```

```tsx
import { Img, staticFile } from "remotion";

<Img src={staticFile("logo.png")} />;
```

## リモート画像

リモート URL は `staticFile()` なしで直接使用できます。

```tsx
<Img src="https://example.com/image.png" />
```

リモート画像が CORS が有効であることを確認してください。

アニメーション GIF の場合は、代わりに `@remotion/gif` の `<Gif>` コンポーネントを使用してください。

## サイズと位置

`style` プロップを使用してサイズと位置を制御してください。

```tsx
<Img
  src={staticFile("photo.png")}
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

## 動的画像パス

テンプレートリテラルを使用して動的ファイル参照を使用してください。

```tsx
import { Img, staticFile, useCurrentFrame } from "remotion";

const frame = useCurrentFrame();

// 画像シーケンス
<Img src={staticFile(`frames/frame${frame}.png`)} />

// プロップに基づいて選択
<Img src={staticFile(`avatars/${props.userId}.png`)} />

// 条件付き画像
<Img src={staticFile(`icons/${isActive ? "active" : "inactive"}.svg`)} />
```

このパターンは以下に役立ちます。

- 画像シーケンス (フレームごとのアニメーション)
- ユーザー固有のアバターまたはプロフィール画像
- テーマベースのアイコン
- 状態依存グラフィック

## 画像の寸法を取得する

`getImageDimensions()` を使用して画像の寸法を取得してください。

```tsx
import { getImageDimensions, staticFile } from "remotion";

const { width, height } = await getImageDimensions(staticFile("photo.png"));
```

これは、アスペクト比を計算したり、コンポジションをサイズするのに役立ちます。

```tsx
import {
  getImageDimensions,
  staticFile,
  CalculateMetadataFunction,
} from "remotion";

const calculateMetadata: CalculateMetadataFunction = async () => {
  const { width, height } = await getImageDimensions(staticFile("photo.png"));
  return {
    width,
    height,
  };
};
```
