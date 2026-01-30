---
name: fonts
description: Remotion で Google Fonts とローカルフォントを読み込む
metadata:
  tags: fonts, google-fonts, typography, text
---

# Remotion でフォントを使用する

## @remotion/google-fonts を使用した Google Fonts

推奨される方法は Google Fonts を使用することです。型安全で、レンダリングがフォント読み込み完了まで自動的にブロックされます。

### 前提条件

まず、@remotion/google-fonts パッケージをインストールする必要があります。
インストールされていない場合は、以下のコマンドを使用してください。

```bash
npx remotion add @remotion/google-fonts # npm を使用する場合
bunx remotion add @remotion/google-fonts # bun を使用する場合
yarn remotion add @remotion/google-fonts # yarn を使用する場合
pnpm exec remotion add @remotion/google-fonts # pnpm を使用する場合
```

```tsx
import { loadFont } from "@remotion/google-fonts/Lobster";

const { fontFamily } = loadFont();

export const MyComposition = () => {
  return <div style={{ fontFamily }}>Hello World</div>;
};
```

ファイルサイズを削減するために、必要なウェイトと部分文字集合のみを指定することをお勧めします。

```tsx
import { loadFont } from "@remotion/google-fonts/Roboto";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
});
```

### フォント読み込み完了を待つ

フォントがいつ準備できるかを知る必要がある場合は、`waitUntilDone()` を使用してください。

```tsx
import { loadFont } from "@remotion/google-fonts/Lobster";

const { fontFamily, waitUntilDone } = loadFont();

await waitUntilDone();
```

## @remotion/fonts を使用したローカルフォント

ローカルフォントファイルの場合は、`@remotion/fonts` パッケージを使用してください。

### 前提条件

まず、@remotion/fonts をインストールしてください。

```bash
npx remotion add @remotion/fonts # npm を使用する場合
bunx remotion add @remotion/fonts # bun を使用する場合
yarn remotion add @remotion/fonts # yarn を使用する場合
pnpm exec remotion add @remotion/fonts # pnpm を使用する場合
```

### ローカルフォントを読み込む

フォントファイルを `public/` フォルダに配置して、`loadFont()` を使用してください。

```tsx
import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

await loadFont({
  family: "MyFont",
  url: staticFile("MyFont-Regular.woff2"),
});

export const MyComposition = () => {
  return <div style={{ fontFamily: "MyFont" }}>Hello World</div>;
};
```

### 複数のウェイトを読み込む

各ウェイトを同じファミリー名で個別に読み込んでください。

```tsx
import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

await Promise.all([
  loadFont({
    family: "Inter",
    url: staticFile("Inter-Regular.woff2"),
    weight: "400",
  }),
  loadFont({
    family: "Inter",
    url: staticFile("Inter-Bold.woff2"),
    weight: "700",
  }),
]);
```

### 利用可能なオプション

```tsx
loadFont({
  family: "MyFont", // 必須：CSS で使用する名前
  url: staticFile("font.woff2"), // 必須：フォントファイル URL
  format: "woff2", // オプション：拡張子から自動検出
  weight: "400", // オプション：フォントウェイト
  style: "normal", // オプション：normal または italic
  display: "block", // オプション：font-display 動作
});
```

## コンポーネントで使用する

`loadFont()` をコンポーネントの最上位レベルで呼び出すか、早期にインポートされる別のファイルで呼び出してください。

```tsx
import { loadFont } from "@remotion/google-fonts/Montserrat";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
});

export const Title: React.FC<{ text: string }> = ({ text }) => {
  return (
    <h1
      style={{
        fontFamily,
        fontSize: 80,
        fontWeight: "bold",
      }}
    >
      {text}
    </h1>
  );
};
```
