---
name: measuring-dom-nodes
description: Remotion で DOM 要素の寸法を測定する
metadata:
  tags: measure, layout, dimensions, getBoundingClientRect, scale
---

# Remotion で DOM ノードを測定する

Remotion は `scale()` トランスフォームをビデオコンテナに適用し、`getBoundingClientRect()` の値に影響を与えます。正確な測定値を得るには `useCurrentScale()` を使用してください。

## 要素の寸法を測定する

```tsx
import { useCurrentScale } from "remotion";
import { useRef, useEffect, useState } from "react";

export const MyComponent = () => {
  const ref = useRef<HTMLDivElement>(null);
  const scale = useCurrentScale();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setDimensions({
      width: rect.width / scale,
      height: rect.height / scale,
    });
  }, [scale]);

  return <div ref={ref}>測定するコンテンツ</div>;
};
```
