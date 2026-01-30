---
name: compositions
description: コンポジション、スティル、フォルダー、デフォルトプロップ、動的メタデータを定義する
metadata:
  tags: composition, still, folder, props, metadata
---

`<Composition>` は、レンダリング可能なビデオのコンポーネント、幅、高さ、fps、期間を定義します。

通常は `src/Root.tsx` ファイルに配置されます。

```tsx
import { Composition } from "remotion";
import { MyComposition } from "./MyComposition";

export const RemotionRoot = () => {
  return (
    <Composition
      id="MyComposition"
      component={MyComposition}
      durationInFrames={100}
      fps={30}
      width={1080}
      height={1080}
    />
  );
};
```

## デフォルトプロップ

`defaultProps` を渡してコンポーネントに初期値を提供してください。
値は JSON シリアライズ可能である必要があります (`Date`, `Map`, `Set`, `staticFile()` はサポートされています)。

```tsx
import { Composition } from "remotion";
import { MyComposition, MyCompositionProps } from "./MyComposition";

export const RemotionRoot = () => {
  return (
    <Composition
      id="MyComposition"
      component={MyComposition}
      durationInFrames={100}
      fps={30}
      width={1080}
      height={1080}
      defaultProps={
        {
          title: "Hello World",
          color: "#ff0000",
        } satisfies MyCompositionProps
      }
    />
  );
};
```

プロップ型安全性を確保するために `interface` ではなく `type` 宣言を使用してください。

## フォルダー

`<Folder>` を使用してサイドバーのコンポジションを整理してください。
フォルダー名は文字、数字、ハイフンのみで構成できます。

```tsx
import { Composition, Folder } from "remotion";

export const RemotionRoot = () => {
  return (
    <>
      <Folder name="Marketing">
        <Composition id="Promo" /* ... */ />
        <Composition id="Ad" /* ... */ />
      </Folder>
      <Folder name="Social">
        <Folder name="Instagram">
          <Composition id="Story" /* ... */ />
          <Composition id="Reel" /* ... */ />
        </Folder>
      </Folder>
    </>
  );
};
```

## スティル

単一フレーム画像の場合は `<Still>` を使用してください。`durationInFrames` または `fps` は必要ありません。

```tsx
import { Still } from "remotion";
import { Thumbnail } from "./Thumbnail";

export const RemotionRoot = () => {
  return (
    <Still id="Thumbnail" component={Thumbnail} width={1280} height={720} />
  );
};
```

## メタデータを計算する

`calculateMetadata` を使用して、寸法、期間、またはプロップをデータに基づいて動的にしてください。

```tsx
import { Composition, CalculateMetadataFunction } from "remotion";
import { MyComposition, MyCompositionProps } from "./MyComposition";

const calculateMetadata: CalculateMetadataFunction<
  MyCompositionProps
> = async ({ props, abortSignal }) => {
  const data = await fetch(`https://api.example.com/video/${props.videoId}`, {
    signal: abortSignal,
  }).then((res) => res.json());

  return {
    durationInFrames: Math.ceil(data.duration * 30),
    props: {
      ...props,
      videoUrl: data.url,
    },
  };
};

export const RemotionRoot = () => {
  return (
    <Composition
      id="MyComposition"
      component={MyComposition}
      durationInFrames={100} // プレースホルダー、オーバーライドされます
      fps={30}
      width={1080}
      height={1080}
      defaultProps={{ videoId: "abc123" }}
      calculateMetadata={calculateMetadata}
    />
  );
};
```

この関数は `props`, `durationInFrames`, `width`, `height`, `fps`, コーデック関連のデフォルトを返すことができます。レンダリング開始前に一度実行されます。
