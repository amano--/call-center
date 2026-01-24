---
name: langsmith-fetch
description: LangSmith StudioからLangChainおよびLangGraphエージェントの実行トレースを取得してデバッグするスキル。エージェント動作のデバッグ、エラー調査、ツール呼び出し分析、メモリ操作確認、またはエージェントパフォーマンス検査が必要な場合に使用。最近のトレースを自動的に取得し、実行パターンを分析します。langsmith-fetch CLIのインストールが必要です。
---

# LangSmith Fetch - エージェントデバッグスキル

LangSmith Studioから実行トレースを直接ターミナルに取得して、LangChainおよびLangGraphエージェントをデバッグします。

## このスキルを使用するタイミング

ユーザーが以下を言及した場合に自動的に発動します：

- 🐛 「エージェントをデバッグして」または「何が間違ったのか？」
- 🔍 「最近のトレースを表示」または「何が起きたのか？」
- ❌ 「エラーをチェック」または「なぜ失敗したのか？」
- 💾 「メモリ操作を分析」または「LTMをチェック」
- 📊 「エージェントパフォーマンスをレビュー」または「トークン使用量をチェック」
- 🔧 「どのツールが呼び出されたのか？」または「実行フローを表示」

## 前提条件

### 1. langsmith-fetchをインストール

```bash
pip install langsmith-fetch
```

### 2. 環境変数を設定

```bash
export LANGSMITH_API_KEY="your_langsmith_api_key"
export LANGSMITH_PROJECT="your_project_name"
```

**セットアップを確認:**

```bash
echo $LANGSMITH_API_KEY
echo $LANGSMITH_PROJECT
```

## コアワークフロー

### ワークフロー1：最近のアクティビティを素早くデバッグ

**ユーザーが言及する場合:** 「今何が起きたのか？」または「エージェントをデバッグして」

**実行:**

```bash
langsmith-fetch traces --last-n-minutes 5 --limit 5 --format pretty
```

**分析して報告:**

- トレースを解析して主要な実行ステップを抽出
- エラーまたは失敗した操作を特定
- ツール呼び出しシーケンスを確認
- 推奨される修正アクション
