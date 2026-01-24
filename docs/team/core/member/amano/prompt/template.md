コンパイルエラーは無視して進めてください。
コンポーネントライブラリは　@shadcn　を使用

## 最小コード規約

type,const 以外禁止
export default 禁止
Effect-TSを使用した サーバーアクセス、fetch エラー時の Result型の処理
tree-shakingを意識した import
Componentは docs/usecases/guide/v02/implementation/implementation-plan/steps/presentational/index.md
を参考に　Presentational Component にし　useForm 等の副作用は対になるhooks を作成して上のcomponent からProps を渡すようにしてください

## コメント規約

冒頭コメントには実装計画書、タスク実装計画書へのMD相対リンク。
Componentに名前が付いてたら名前。
コードコメントには、AIの思考過程を記録。末尾コメントには改変履歴5つ

---

あなたのタスクは[手順書](docs/usecases/guide/v02/implementation/implementation-plan/)に関連する手順書とガイドラインの改善と
この手順書に基づいて作成された計画書類(src/features/member/member-registration/docs/plan/2025-03-26/)の改善です。

なので作業過程での改善点等の気づきはファイルとして docs/usecases/note/v02/　に改善点ごとに新規ファイルを保存してください。

以下の条件で、[手順書](docs/usecases/guide/v02/implementation/implementation-plan/)　に従い、実装計画書を作成してください。

境界つけられたコンテキスト
会員管理(短縮Id m)
機能グループ情報
会員管理(member)
機能情報
会員登録(member-registration)

属性情報
docs/usecases/v04/attribute/member-model.md

ユースケース詳細
docs/usecases/v04/usecase-text/member-registration/usecase-detail.md

保存先
src/features/member/member-registration/docs/plan/2025-03-29

もと文書の構造は極力保つように、壊さずにうまく追記してください。

---

あなたのタスクは[手順書](docs/usecases/guide/create-all-guide.md)と
create-all-guide.md　に関連する手順書の改善です。

改善点は docs/usecases/note/v3/　に保存されています。
この資料をもとにcreate-all-guide.mdと関連するファイルを改善してください。

条件は以下の通り
bounded-contextの短縮Id は極めて重要なものなので削除しないでください。
idはULIDを使用して、[属性名]\_idという名前にしてください。例:会員の場合はmember_id
文書の管理IDは付与してください。
属性は旧実装をもれなく設定してください。

- 旧実装:
  - docs/usecases/99-old/v02/attribute-member.md
  - docs/usecases/99-old/v02/attribute-staff.md

では、最初のステップとして境界付けられたコンテキストの定義から始めましょう。
ファイルを一つ作成したら確認するので承認を取ってください。

---

あなたのタスクは[手順書](docs/usecases/guide/create-all-guide.md)と
create-all-guide.md　に関連する手順書の改善です。

なので作業過程での改善点等の気づきはファイルとして docs/usecases/note/v04/　に保存してください。

ファイル保存先は　docs/usecases/v04

これから以下のプロンプトで命令するので、現在のタスクが手順書改善であることを忘れずに実行してください。

あなたはシステム設計の専門家として、以下のタスクを実行してください：

[手順書](docs/usecases/guide/v01/create-all-guide.md) をよく読んで従ってください

1. コアバリュー（docs/usecases/v04/core-value.md）を分析し、その内容を十分に理解してください。

2. 以下の手順で関連ドキュメントを作成していきます：
   a. 境界付けられたコンテキストの定義
   b. 会員とスタッフの属性一覧の作成
   c. 会員とスタッフのアクター一覧の作成
   d. 会員とスタッフのユースケース概要の作成

3. 各ドキュメントは、既存のガイドラインに従って作成し、以下の点に注意してください：

   - ドキュメント間の一貫性維持
   - 用語の統一
   - 構造の明確さ
   - セキュリティ要件の反映
   - 将来の拡張性への考慮

4. 各ステップで作成したドキュメントについて、品質レビューを実施してください。

条件は以下の通り
bounded-contextの短縮Id は極めて重要なものなので削除しないでください。
idはULIDを使用して、[属性名]\_idという名前にしてください。例:会員の場合はmember_id
文書の管理IDは付与してください。
属性は旧実装をもれなく設定してください。

- 旧実装:
  - docs/usecases/old/v03/attribute-member.md
  - docs/usecases/old/v03/attribute-staff.md

では、最初のステップとして境界付けられたコンテキストの定義から始めましょう。
ファイルを一つ作成したら確認するので承認を取ってください。
