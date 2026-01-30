---
name: calculate-metadata
description: コンポジション期間、寸法、プロップを動的に設定する
metadata:
  tags: calculateMetadata, duration, dimensions, props, dynamic
---

# calculateMetadata を使用する

`<Composition>` で `calculateMetadata` を使用して、レンダリング前に期間、寸法、プロップを動的に設定してください。

```tsx
<Composition
  id="MyComp"
  component={MyComponent}
  durationInFrames={300}
  fps={30}
  width={1920}
  height={1080}
  defaultProps={{ videoSrc: "https://remotion.media/video.mp4" }}
  calculateMetadata={calculateMetadata}
/>
```

## ビデオに基づいて期間を設定する

mediabunny/metadata スキルの `getMediaMetadata()` 関数を使用してビデオの期間を取得してください。

```tsx
import { CalculateMetadataFunction } from "remotion";
import { getMediaMetadata } from "../get-media-metadata";

const calculateMetadata: CalculateMetadataFunction<Props> = async ({
  props,
}) => {
  const { durationInSeconds } = await getMediaMetadata(props.videoSrc);

  return {
    durationInFrames: Math.ceil(durationInSeconds * 30),
  };
};
```

## ビデオの寸法と一致させる

```tsx
const calculateMetadata: CalculateMetadataFunction<Props> = async ({
  props,
}) => {
  const { durationInSeconds, dimensions } = await getMediaMetadata(
    props.videoSrc,
  );

  return {
    durationInFrames: Math.ceil(durationInSeconds * 30),
    width: dimensions?.width ?? 1920,
    height: dimensions?.height ?? 1080,
  };
};
```

## 複数のビデオに基づいて期間を設定する

```tsx
const calculateMetadata: CalculateMetadataFunction<Props> = async ({
  props,
}) => {
  const metadataPromises = props.videos.map((video) =>
    getMediaMetadata(video.src),
  );
  const allMetadata = await Promise.all(metadataPromises);

  const totalDuration = allMetadata.reduce(
    (sum, meta) => sum + meta.durationInSeconds,
    0,
  );

  return {
    durationInFrames: Math.ceil(totalDuration * 30),
  };
};
```

## デフォルト outName を設定する

プロップに基づいてデフォルト出力ファイル名を設定してください。

```tsx
const calculateMetadata: CalculateMetadataFunction<Props> = async ({
  props,
}) => {
  return {
    defaultOutName: `video-${props.id}.mp4`,
  };
};
```

## プロップを変換する

レンダリング前にデータをフェッチまたはプロップを変換してください。

```tsx
const calculateMetadata: CalculateMetadataFunction<Props> = async ({
  props,
  abortSignal,
}) => {
  const response = await fetch(props.dataUrl, { signal: abortSignal });
  const data = await response.json();

  return {
    props: {
      ...props,
      fetchedData: data,
    },
  };
};
```

`abortSignal` は、Studio でプロップが変更されたときに古いリクエストをキャンセルします。

## 戻り値

すべてのフィールドはオプションです。返された値は `<Composition>` プロップをオーバーライドします。

- `durationInFrames`: フレーム数
- `width`: コンポジション幅 (ピクセル)
- `height`: コンポジション高さ (ピクセル)
- `fps`: フレーム/秒
- `props`: コンポーネントに渡される変換されたプロップ
- `defaultOutName`: デフォルト出力ファイル名
- `defaultCodec`: レンダリングのデフォルトコーデック
