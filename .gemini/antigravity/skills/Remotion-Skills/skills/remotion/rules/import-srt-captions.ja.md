---
name: import-srt-captions
description: @remotion/captions を使用して .srt 字幕ファイルを Remotion にインポートする
metadata:
  tags: captions, subtitles, srt, import, parse
---

# .srt 字幕を Remotion にインポートする

既存の `.srt` 字幕ファイルがある場合は、`@remotion/captions` の `parseSrt()` を使用して Remotion にインポートできます。

## 前提条件

まず、@remotion/captions パッケージをインストールする必要があります。
インストールされていない場合は、以下のコマンドを使用してください。

```bash
npx remotion add @remotion/captions # npm を使用する場合
bunx remotion add @remotion/captions # bun を使用する場合
yarn remotion add @remotion/captions # yarn を使用する場合
pnpm exec remotion add @remotion/captions # pnpm を使用する場合
```

## .srt ファイルを読む

`staticFile()` を使用して `public` フォルダの `.srt` ファイルを参照してから、フェッチして解析してください。

```tsx
import { useState, useEffect, useCallback } from "react";
import { AbsoluteFill, staticFile, useDelayRender } from "remotion";
import { parseSrt } from "@remotion/captions";
import type { Caption } from "@remotion/captions";

export const MyComponent: React.FC = () => {
  const [captions, setCaptions] = useState<Caption[] | null>(null);
  const { delayRender, continueRender, cancelRender } = useDelayRender();
  const [handle] = useState(() => delayRender());

  const fetchCaptions = useCallback(async () => {
    try {
      const response = await fetch(staticFile("subtitles.srt"));
      const text = await response.text();
      const { captions: parsed } = parseSrt({ input: text });
      setCaptions(parsed);
      continueRender(handle);
    } catch (e) {
      cancelRender(e);
    }
  }, [continueRender, cancelRender, handle]);

  useEffect(() => {
    fetchCaptions();
  }, [fetchCaptions]);

  if (!captions) {
    return null;
  }

  return <AbsoluteFill>{/* ここでキャプションを使用 */}</AbsoluteFill>;
};
```

リモート URL もサポートされています。`staticFile()` の代わりに URL を使用して `fetch()` できます。

## インポートされたキャプションを使用する

解析すると、キャプションは `Caption` 形式になり、すべての `@remotion/captions` ユーティリティで使用できます。
