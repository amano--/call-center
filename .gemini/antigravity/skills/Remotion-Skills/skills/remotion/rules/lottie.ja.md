---
name: lottie
description: Remotion に Lottie アニメーションを埋め込む
metadata:
  category: Animation
---

# Remotion で Lottie アニメーションを使用する

## 前提条件

まず、@remotion/lottie パッケージをインストールする必要があります。
インストールされていない場合は、以下のコマンドを使用してください。

```bash
npx remotion add @remotion/lottie # npm を使用する場合
bunx remotion add @remotion/lottie # bun を使用する場合
yarn remotion add @remotion/lottie # yarn を使用する場合
pnpm exec remotion add @remotion/lottie # pnpm を使用する場合
```

## Lottie ファイルを表示する

Lottie アニメーションをインポートするには：

- Lottie アセットをフェッチする
- 読み込みプロセスを `delayRender()` と `continueRender()` でラップする
- アニメーションデータをステートに保存する
- `@remotion/lottie` パッケージの `Lottie` コンポーネントを使用して Lottie アニメーションをレンダリングする

```tsx
import { Lottie, LottieAnimationData } from "@remotion/lottie";
import { useEffect, useState } from "react";
import { cancelRender, continueRender, delayRender } from "remotion";

export const MyAnimation = () => {
  const [handle] = useState(() =>
    delayRender("Lottie アニメーションを読み込み中"),
  );

  const [animationData, setAnimationData] =
    useState<LottieAnimationData | null>(null);

  useEffect(() => {
    fetch("https://assets4.lottiefiles.com/packages/lf20_zyquagfl.json")
      .then((data) => data.json())
      .then((json) => {
        setAnimationData(json);
        continueRender(handle);
      })
      .catch((err) => {
        cancelRender(err);
      });
  }, [handle]);

  if (!animationData) {
    return null;
  }

  return <Lottie animationData={animationData} />;
};
```

## スタイリングとアニメーション

Lottie は `style` プロップをサポートして、スタイルとアニメーションを許可します。

```tsx
return (
  <Lottie animationData={animationData} style={{ width: 400, height: 400 }} />
);
```
