---
name: tailwind
description: Remotion で TailwindCSS を使用する
metadata:
---

Remotion でプロジェクトに TailwindCSS がインストールされている場合、TailwindCSS を使用してもよいし、使用すべきです。

`transition-*` または `animate-*` クラスを使用しないでください。常に `useCurrentFrame()` フックを使用してアニメーションしてください。

Tailwind は最初に Remotion プロジェクトにインストールして有効にする必要があります - 手順については WebFetch を使用して https://www.remotion.dev/docs/tailwind をフェッチしてください。
