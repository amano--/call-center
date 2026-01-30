---
name: remotion-best-practices
description: Remotion でのビデオ作成 - React ベースのベストプラクティスとパターン集
metadata:
  tags: remotion, video, react, animation, composition, 3d, captions, effects
---

## 使用するタイミング

Remotion コードを扱う際にこのスキルを使用して、ドメイン固有の知識を取得してください。

## 使い方

以下のルールファイルで詳細な説明とコード例を参照してください：

- [rules/3d.md](rules/3d.md) - Three.js と React Three Fiber を使用した Remotion での 3D コンテンツ
- [rules/animations.md](rules/animations.md) - Remotion のアニメーション基礎スキル
- [rules/assets.md](rules/assets.md) - Remotion への画像、ビデオ、オーディオ、フォントのインポート
- [rules/audio.md](rules/audio.md) - Remotion でのオーディオとサウンド使用 - インポート、トリミング、ボリューム、速度、ピッチ
- [rules/calculate-metadata.md](rules/calculate-metadata.md) - コンポジション期間、寸法、プロップの動的設定
- [rules/can-decode.md](rules/can-decode.md) - Mediabunny を使用してブラウザでビデオをデコードできるか確認
- [rules/charts.md](rules/charts.md) - Remotion のチャートとデータビジュアライゼーションパターン
- [rules/compositions.md](rules/compositions.md) - コンポジション、スティル、フォルダ、デフォルトプロップ、動的メタデータの定義
- [rules/display-captions.md](rules/display-captions.md) - TikTok スタイルのページとワードハイライト付きキャプション表示
- [rules/extract-frames.md](rules/extract-frames.md) - Mediabunny を使用して特定のタイムスタンプでビデオからフレームを抽出
- [rules/fonts.md](rules/fonts.md) - Remotion での Google フォントおよびローカルフォントの読み込み
- [rules/get-audio-duration.md](rules/get-audio-duration.md) - Mediabunny でオーディオファイルの期間を秒単位で取得
- [rules/get-video-dimensions.md](rules/get-video-dimensions.md) - Mediabunny でビデオファイルの幅と高さを取得
- [rules/get-video-duration.md](rules/get-video-duration.md) - Mediabunny でビデオファイルの期間を秒単位で取得
- [rules/gifs.md](rules/gifs.md) - Remotion のタイムラインと同期した GIF の表示
- [rules/images.md](rules/images.md) - Img コンポーネントを使用した Remotion へのイメージ埋め込み
- [rules/import-srt-captions.md](rules/import-srt-captions.md) - @remotion/captions を使用した .srt サブタイトルファイルのインポート
- [rules/lottie.md](rules/lottie.md) - Remotion への Lottie アニメーション埋め込み
- [rules/measuring-dom-nodes.md](rules/measuring-dom-nodes.md) - Remotion での DOM 要素の寸法測定
- [rules/measuring-text.md](rules/measuring-text.md) - テキスト寸法の測定、コンテナへのテキスト適合、オーバーフロー確認
- [rules/sequencing.md](rules/sequencing.md) - Remotion のシーケンシングパターン - 遅延、トリミング、アイテムの期間制限
- [rules/tailwind.md](rules/tailwind.md) - Remotion での TailwindCSS の使用
- [rules/text-animations.md](rules/text-animations.md) - Remotion のタイポグラフィとテキストアニメーションパターン
- [rules/timing.md](rules/timing.md) - Remotion の補間曲線 - リニア、イージング、スプリングアニメーション
- [rules/transcribe-captions.md](rules/transcribe-captions.md) - オーディオトランスクリプションしてキャプションを生成
- [rules/transitions.md](rules/transitions.md) - Remotion のシーン遷移パターン
- [rules/trimming.md](rules/trimming.md) - Remotion のトリミングパターン - アニメーションの始まりまたは終わりを切る
- [rules/videos.md](rules/videos.md) - Remotion へのビデオ埋め込み - トリミング、ボリューム、速度、ループ、ピッチ

### Multilingual Support (optional)

This skill can be used with the bilingual approach:

- **SKILL.md** (English) - Primary authoritative documentation
- **SKILL.ja.md** (Japanese) - Reference and localized documentation

When updating **SKILL.md**, always update corresponding **SKILL.ja.md** to keep translations synchronized. The system prioritizes SKILL.md; SKILL.ja.md is for reference and localization purposes only.
