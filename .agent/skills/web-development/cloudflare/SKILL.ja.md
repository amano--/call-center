---
name: cloudflare (JP)
description: Workers, Pages, ストレージ (KV, D1, R2), AI (Workers AI, Vectorize, Agents SDK), ネットワーキング (Tunnel, Spectrum), セキュリティ (WAF, DDoS), IaC (Terraform, Pulumi) など、Cloudflare プラットフォームでの開発タスク全体をカバーする包括的スキル。
language: ja
references:
  - workers
  - pages
  - d1
  - durable-objects
  - workers-ai
---

# Cloudflare Platform Skill

Cloudflare プラットフォーム上で構築するための総合スキルです。以下の決定木（Decision Trees）を使用して適切なプロダクトを見つけ、詳細なリファレンスを読み込んでください。

## このスキルの使い方

### リファレンスファイル構造

`./references/<product>/` 内の各プロダクトには、エントリーポイントとして `README.md` が含まれています。構造は以下の2パターンのいずれかです：

**マルチファイル形式 (5ファイル):**
| ファイル | 目的 | 読むタイミング |
|---|---|---|
| `README.md` | 概要、利用シーン、開始方法 | **最初に必ず読む** |
| `api.md` | ランタイム API、型定義、メソッドシグネチャ | コードを書く時 |
| `configuration.md` | wrangler.toml, バインディング, セットアップ | プロジェクト設定時 |
| `patterns.md` | 一般的なパターン、ベストプラクティス | 実装指針が必要な時 |
| `gotchas.md` | 落とし穴、制限事項、エッジケース | デバッグ、ミス防止時 |

**シングルファイル形式:** すべての情報が `README.md` に集約されています。

### 推奨される読み進め方

1. まず `README.md` から始める
2. タスクに関連する追加ファイルを読む（マルチファイル形式の場合）:
   - 機能実装 → `api.md` + `patterns.md`
   - プロジェクト設定 → `configuration.md`
   - トラブルシューティング → `gotchas.md`

### パス指定の例

```
./references/workflows/README.md         # Workflows の開始点
./references/workflows/api.md            # Workflow クラス, ステップメソッド
./references/durable-objects/gotchas.md  # Durable Objects の制限事項
./references/workers-ai/README.md        # Workers AI のドキュメント（シングルファイル）
```

## クイック決定木 (Quick Decision Trees)

### "コードを実行したい"

```
コードを実行したい？
├─ エッジでのサーバーレス関数 → workers/
├─ Gitデプロイ付きフルスタックWebアプリ → pages/
├─ ステートフルな調整/リアルタイム処理 → durable-objects/
├─ 長時間実行されるマルチステップジョブ → workflows/
├─ コンテナの実行 → containers/
├─ マルチテナント（顧客がコードをデプロイ） → workers-for-platforms/
└─ 定期実行タスク (cron) → cron-triggers/
```

### "データを保存したい"

```
ストレージが必要？
├─ Key-Value (設定, セッション, キャッシュ) → kv/
├─ リレーショナル SQL → d1/ (SQLite) または hyperdrive/ (既存の Postges/MySQL)
├─ オブジェクト/ファイルストレージ (S3互換) → r2/
├─ メッセージキュー (非同期処理) → queues/
├─ ベクトル埋め込み (AI/セマンティック検索) → vectorize/
├─ エンティティごとの強力な整合性を持つ状態 → durable-objects/ (DO storage)
├─ シークレット管理 → secrets-store/
└─ R2 へのストリーミング ETL → pipelines/
```

### "AI/ML を使いたい"

```
AIが必要？
├─ 推論実行 (LLM, Embeddings, 画像生成) → workers-ai/
├─ RAG/検索用ベクトルデータベース → vectorize/
├─ ステートフルな AI エージェント構築 → agents-sdk/
├─ 任意の AI プロバイダ用ゲートウェイ (キャッシュ, ルーティング) → ai-gateway/
└─ AI パワード検索ウィジェット → ai-search/
```

### "ネットワーク/接続性が必要"

```
ネットワークが必要？
├─ ローカルサービスをインターネットに公開 → tunnel/
├─ TCP/UDP プロキシ (非 HTTP) → spectrum/
├─ WebRTC TURN サーバー → turn/
├─ プライベートネットワーク接続 → network-interconnect/
├─ ルーティングの最適化 → argo-smart-routing/
└─ リアルタイム動画/音声 → realtimekit/ または realtime-sfu/
```

### "セキュリティが必要"

```
セキュリティが必要？
├─ Web Application Firewall (WAF) → waf/
├─ DDoS 保護 → ddos/
├─ Bot 検知/管理 → bot-management/
├─ API 保護 → api-shield/
├─ CAPTCHA 代替 → turnstile/
└─ 漏洩クレデンシャル検知 → waf/ (マネージド ルールセット)
```

### "メディア/コンテンツを扱いたい"

```
メディアが必要？
├─ 画像最適化/変換 → images/
├─ 動画ストリーミング/エンコード → stream/
├─ ブラウザ自動化/スクリーンショット → browser-rendering/
└─ サードパーティスクリプト管理 → zaraz/
```

### "Infrastructure as Code (IaC) が必要"

```
IaCが必要？
├─ Pulumi → pulumi/
├─ Terraform → terraform/
└─ 直接 API を利用 → api/
```

## プロダクト索引 (Product Index)

### Compute & Runtime

| Product               | Entry File                                     |
| --------------------- | ---------------------------------------------- |
| Workers               | `./references/workers/README.md`               |
| Pages                 | `./references/pages/README.md`                 |
| Pages Functions       | `./references/pages-functions/README.md`       |
| Durable Objects       | `./references/durable-objects/README.md`       |
| Workflows             | `./references/workflows/README.md`             |
| Containers            | `./references/containers/README.md`            |
| Workers for Platforms | `./references/workers-for-platforms/README.md` |
| Cron Triggers         | `./references/cron-triggers/README.md`         |
| Tail Workers          | `./references/tail-workers/README.md`          |
| Snippets              | `./references/snippets/README.md`              |
| Smart Placement       | `./references/smart-placement/README.md`       |

### Storage & Data

| Product         | Entry File                               |
| --------------- | ---------------------------------------- |
| KV              | `./references/kv/README.md`              |
| D1              | `./references/d1/README.md`              |
| R2              | `./references/r2/README.md`              |
| Queues          | `./references/queues/README.md`          |
| Hyperdrive      | `./references/hyperdrive/README.md`      |
| DO Storage      | `./references/do-storage/README.md`      |
| Secrets Store   | `./references/secrets-store/README.md`   |
| Pipelines       | `./references/pipelines/README.md`       |
| R2 Data Catalog | `./references/r2-data-catalog/README.md` |
| R2 SQL          | `./references/r2-sql/README.md`          |

### AI & Machine Learning

| Product    | Entry File                          |
| ---------- | ----------------------------------- |
| Workers AI | `./references/workers-ai/README.md` |
| Vectorize  | `./references/vectorize/README.md`  |
| Agents SDK | `./references/agents-sdk/README.md` |
| AI Gateway | `./references/ai-gateway/README.md` |
| AI Search  | `./references/ai-search/README.md`  |

### Networking & Connectivity

| Product              | Entry File                                    |
| -------------------- | --------------------------------------------- |
| Tunnel               | `./references/tunnel/README.md`               |
| Spectrum             | `./references/spectrum/README.md`             |
| TURN                 | `./references/turn/README.md`                 |
| Network Interconnect | `./references/network-interconnect/README.md` |
| Argo Smart Routing   | `./references/argo-smart-routing/README.md`   |
| Workers VPC          | `./references/workers-vpc/README.md`          |

### Security

| Product         | Entry File                              |
| --------------- | --------------------------------------- |
| WAF             | `./references/waf/README.md`            |
| DDoS Protection | `./references/ddos/README.md`           |
| Bot Management  | `./references/bot-management/README.md` |
| API Shield      | `./references/api-shield/README.md`     |
| Turnstile       | `./references/turnstile/README.md`      |

### Media & Content

| Product           | Entry File                                 |
| ----------------- | ------------------------------------------ |
| Images            | `./references/images/README.md`            |
| Stream            | `./references/stream/README.md`            |
| Browser Rendering | `./references/browser-rendering/README.md` |
| Zaraz             | `./references/zaraz/README.md`             |

### Real-Time Communication

| Product      | Entry File                            |
| ------------ | ------------------------------------- |
| RealtimeKit  | `./references/realtimekit/README.md`  |
| Realtime SFU | `./references/realtime-sfu/README.md` |

### Developer Tools

| Product            | Entry File                                  |
| ------------------ | ------------------------------------------- |
| Wrangler           | `./references/wrangler/README.md`           |
| Miniflare          | `./references/miniflare/README.md`          |
| C3                 | `./references/c3/README.md`                 |
| Observability      | `./references/observability/README.md`      |
| Analytics Engine   | `./references/analytics-engine/README.md`   |
| Web Analytics      | `./references/web-analytics/README.md`      |
| Sandbox            | `./references/sandbox/README.md`            |
| Workerd            | `./references/workerd/README.md`            |
| Workers Playground | `./references/workers-playground/README.md` |

### Infrastructure as Code

| Product   | Entry File                         |
| --------- | ---------------------------------- |
| Pulumi    | `./references/pulumi/README.md`    |
| Terraform | `./references/terraform/README.md` |
| API       | `./references/api/README.md`       |

### Other Services

| Product       | Entry File                             |
| ------------- | -------------------------------------- |
| Email Routing | `./references/email-routing/README.md` |
| Email Workers | `./references/email-workers/README.md` |
| Static Assets | `./references/static-assets/README.md` |
| Bindings      | `./references/bindings/README.md`      |
| Cache Reserve | `./references/cache-reserve/README.md` |
