---
name: animations
description: Remotion の基本的なアニメーションスキル
metadata:
  tags: animations, transitions, frames, useCurrentFrame
---

すべてのアニメーションは `useCurrentFrame()` フックで駆動される必要があります。
アニメーションを秒単位で記述し、`useVideoConfig()` の `fps` 値を掛けてください。

```tsx
import { useCurrentFrame } from "remotion";

export const FadeIn = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, 2 * fps], [0, 1], {
    extrapolateRight: "clamp",
  });

  return <div style={{ opacity }}>Hello World!</div>;
};
```

CSS トランジション またはアニメーションは禁止されています。正しくレンダリングされません。
Tailwind アニメーションクラス名は禁止されています。正しくレンダリングされません。
