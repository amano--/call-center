---
name: display-captions
description: Caption 形式のキャプションを表示する TikTok スタイルのページと単語ハイライト
metadata:
  tags: captions, subtitles, display, tiktok, highlight
---

# Remotion にキャプションを表示する

このガイドでは、Remotion にキャプションを表示する方法を説明します。すでに `Caption` 形式のキャプションがあることを前提としています。

## 前提条件

まず、@remotion/captions パッケージをインストールする必要があります。
インストールされていない場合は、以下のコマンドを使用してください。

```bash
npx remotion add @remotion/captions # npm を使用する場合
bunx remotion add @remotion/captions # bun を使用する場合
yarn remotion add @remotion/captions # yarn を使用する場合
pnpm exec remotion add @remotion/captions # pnpm を使用する場合
```

## ページを作成する

`createTikTokStyleCaptions()` を使用してキャプションをページにグループ化してください。`combineTokensWithinMilliseconds` オプションは、一度に表示される単語数を制御します。

```tsx
import { useMemo } from "react";
import { createTikTokStyleCaptions } from "@remotion/captions";
import type { Caption } from "@remotion/captions";

// キャプションが切り替わる頻度 (ミリ秒)
// 値が高い = 1 ページあたりより多くの単語
// 値が低い = より少ない単語 (単語ごと)
const SWITCH_CAPTIONS_EVERY_MS = 1200;

const { pages } = useMemo(() => {
  return createTikTokStyleCaptions({
    captions,
    combineTokensWithinMilliseconds: SWITCH_CAPTIONS_EVERY_MS,
  });
}, [captions]);
```

## Sequences でレンダリングする

ページをマップして、各ページを `<Sequence>` でレンダリングしてください。ページタイミングから開始フレームと期間を計算してください。

```tsx
import { Sequence, useVideoConfig, AbsoluteFill } from "remotion";
import type { TikTokPage } from "@remotion/captions";

const CaptionedContent: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      {pages.map((page, index) => {
        const nextPage = pages[index + 1] ?? null;
        const startFrame = (page.startMs / 1000) * fps;
        const endFrame = Math.min(
          nextPage ? (nextPage.startMs / 1000) * fps : Infinity,
          startFrame + (SWITCH_CAPTIONS_EVERY_MS / 1000) * fps,
        );
        const durationInFrames = endFrame - startFrame;

        if (durationInFrames <= 0) {
          return null;
        }

        return (
          <Sequence
            key={index}
            from={startFrame}
            durationInFrames={durationInFrames}
          >
            <CaptionPage page={page} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
```

## 単語ハイライト

キャプションページには `tokens` が含まれており、現在話されている単語をハイライトするために使用できます。

```tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import type { TikTokPage } from "@remotion/captions";

const HIGHLIGHT_COLOR = "#39E508";

const CaptionPage: React.FC<{ page: TikTokPage }> = ({ page }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Sequence の開始に相対的な現在の時間
  const currentTimeMs = (frame / fps) * 1000;
  // ページの開始を追加して絶対時間に変換
  const absoluteTimeMs = page.startMs + currentTimeMs;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ fontSize: 80, fontWeight: "bold", whiteSpace: "pre" }}>
        {page.tokens.map((token) => {
          const isActive =
            token.fromMs <= absoluteTimeMs && token.toMs > absoluteTimeMs;

          return (
            <span
              key={token.fromMs}
              style={{ color: isActive ? HIGHLIGHT_COLOR : "white" }}
            >
              {token.text}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
```
