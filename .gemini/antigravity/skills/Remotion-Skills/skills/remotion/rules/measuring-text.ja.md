---
name: measuring-text
description: テキスト寸法を測定する、テキストをコンテナにフィットさせる、オーバーフローをチェックする
metadata:
  tags: measure, text, layout, dimensions, fitText, fillTextBox
---

# Remotion でテキストを測定する

## 前提条件

まだインストールされていない場合は、@remotion/layout-utils をインストールしてください。

```bash
npx remotion add @remotion/layout-utils # npm を使用する場合
bunx remotion add @remotion/layout-utils # bun を使用する場合
yarn remotion add @remotion/layout-utils # yarn を使用する場合
pnpm exec remotion add @remotion/layout-utils # pnpm を使用する場合
```

## テキストの寸法を測定する

`measureText()` を使用してテキストの幅と高さを計算してください。

```tsx
import { measureText } from "@remotion/layout-utils";

const { width, height } = measureText({
  text: "Hello World",
  fontFamily: "Arial",
  fontSize: 32,
  fontWeight: "bold",
});
```

結果はキャッシュされます。重複した呼び出しはキャッシュされた結果を返します。

## テキストを幅にフィットさせる

`fitText()` を使用してコンテナに最適なフォントサイズを見つけてください。

```tsx
import { fitText } from "@remotion/layout-utils";

const { fontSize } = fitText({
  text: "Hello World",
  withinWidth: 600,
  fontFamily: "Inter",
  fontWeight: "bold",
});

return (
  <div
    style={{
      fontSize: Math.min(fontSize, 80), // 80px で制限
      fontFamily: "Inter",
      fontWeight: "bold",
    }}
  >
    Hello World
  </div>
);
```

## テキストのオーバーフローをチェックする

`fillTextBox()` を使用してテキストがボックスを超える場合をチェックしてください。

```tsx
import { fillTextBox } from "@remotion/layout-utils";

const box = fillTextBox({ maxBoxWidth: 400, maxLines: 3 });

const words = ["Hello", "World", "This", "is", "a", "test"];
for (const word of words) {
  const { exceedsBox } = box.add({
    text: word + " ",
    fontFamily: "Arial",
    fontSize: 24,
  });
  if (exceedsBox) {
    // テキストがオーバーフロー、それに応じて処理
    break;
  }
}
```

## ベストプラクティス

**フォントを最初に読み込む:** フォントが読み込まれた後にのみ測定関数を呼び出してください。

```tsx
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily, waitUntilDone } = loadFont("normal", {
  weights: ["400"],
  subsets: ["latin"],
});

waitUntilDone().then(() => {
  // 測定するのに安全
  const { width } = measureText({
    text: "Hello",
    fontFamily,
    fontSize: 32,
  });
});
```

**validateFontIsLoaded を使用する:** フォント読み込みの問題を早期に検出してください。

```tsx
measureText({
  text: "Hello",
  fontFamily: "MyCustomFont",
  fontSize: 32,
  validateFontIsLoaded: true, // フォントが読み込まれていない場合はスロー
});
```

**フォントプロパティを一致させる:** 測定とレンダリングに同じプロパティを使用してください。

```tsx
const fontStyle = {
  fontFamily: "Inter",
  fontSize: 32,
  fontWeight: "bold" as const,
  letterSpacing: "0.5px",
};

const { width } = measureText({
  text: "Hello",
  ...fontStyle,
});

return <div style={fontStyle}>Hello</div>;
```

**パディングとボーダーを避ける:** レイアウトの違いを防ぐため、`border` の代わりに `outline` を使用してください。

```tsx
<div style={{ outline: "2px solid red" }}>テキスト</div>
```
