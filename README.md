# salon-calendar-support

iOS アプリ「サロンカレンダー」（Better Day Tech）のサポートサイトです。

**このリポジトリはサポートサイトの公開にのみ使用します。アプリのソースコードは含めません。**

公開してよいのは、サポート文書・CSS・サイト用画像だけです。
アプリのソース、署名情報、開発者アカウントの識別子、ローカルの絶対パス、開発記録、
個人の連絡先は含めません。

---

## お問い合わせ

| 用途 | 窓口 |
|---|---|
| ご質問・不具合のご報告・ご要望 | [Issues](https://github.com/better-day-tech/salon-calendar-support/issues) |
| セキュリティ・プライバシーに関わる非公開のご連絡 | [Private Vulnerability Reporting](https://github.com/better-day-tech/salon-calendar-support/security/advisories/new) |

Issues への投稿は公開されます。個人情報は書き込まないでください。
詳しくは [SECURITY.md](SECURITY.md) をご覧ください。

---

## 公開設定

GitHub の Settings → Pages で以下を選ぶ。

- Source: Deploy from a branch
- Branch: `main` / `/docs`

Private Vulnerability Reporting は Settings → Code security から有効化する。
有効になっていないと、上記の非公開連絡用 URL が機能しない。

## 公開される URL

| 用途 | URL |
|---|---|
| サポート（App Store Connect の Support URL） | `https://better-day-tech.github.io/salon-calendar-support/` |
| プライバシーポリシー（同 Privacy Policy URL） | `https://better-day-tech.github.io/salon-calendar-support/privacy.html` |
| サポート（英語） | `https://better-day-tech.github.io/salon-calendar-support/en/` |
| プライバシーポリシー（英語） | `https://better-day-tech.github.io/salon-calendar-support/en/privacy.html` |

## 構成

```
docs/
├── index.html          サポートトップ（日本語）
├── privacy.html        プライバシーポリシー（日本語）
├── en/
│   ├── index.html      サポートトップ（英語）
│   └── privacy.html    プライバシーポリシー（英語）
├── assets/
│   └── style.css       アプリと同じ配色（生成りの紙 + warm brown）
└── .nojekyll           Jekyll のビルドを無効化（素の HTML をそのまま配信する）
```

外部フォントや CDN は読み込んでいない。アプリ自体が開発者のサーバーと通信しない製品なので、
サポートサイトも第三者へのリクエストを発生させない構成に揃えている。

## 表示内容の現在方針

2026-08-11 時点で、サポートトップは v1.1 の商品説明に合わせて以下を反映している。

- 可愛い、かっこいい、スタイリッシュ系のテンプレート表現
- `Editorial Clean`、`Heart Wallpaper`、`Mode Collage` の方向性
- 無料版は月間予定画像の作成・保存・共有を維持
- Proは追加テンプレート、背景、正方形写真背景、フレーム、光、タグ位置/タグフォント調整
- Proは月額/年額の自動更新サブスクリプションのみ。週額プランは作らない
- 現行版は静止画の作成・保存・共有に集中し、動画編集、GIF/MP4書き出し、AI画像生成API連携は含めない

## ローカルでの確認

```bash
cd docs && python3 -m http.server 8788
```

---

## 連絡先の方針

**公開ページに個人のメールアドレスを記載しません。** 一般の問い合わせは GitHub Issues、
セキュリティ・プライバシー関連は Private Vulnerability Reporting に一本化しています。

App Store Connect に登録する審査担当者向けの連絡先は非公開の情報です。
**この公開リポジトリや公開サイトへ転記しないでください。**
一般公開のサポート窓口とは用途がまったく別のものです。

## 公開前の混入チェック

`.git` を除いた公開対象に、連絡先や内部情報、未差し替えのプレースホルダが
残っていないことを確認します。

```bash
./tools/prepublish-check.sh
```

何も検出しなければ終了コード 0 を返します。
`@2x.png` のようなファイル名がメールアドレスの形に一致することがあるため、
出力があった場合は、実際の連絡先なのか単なる文字列の一致なのかを目で確認してください。

開発者アカウントの識別子（Team ID）は、検出パターンとしてもこのリポジトリに書きません。
文字列そのものを検査項目に残すと、それ自体が公開情報になってしまうためです。

---

## プライバシーポリシーの表現について

「アプリは一切通信を行いません」のような絶対表現は使っていません。
OS の共有シート、App Store / StoreKit の購入処理、App Store の統計、端末バックアップなど、
Apple の標準機能による処理は
開発者へのデータ送信とは別のものであり、絶対表現はそれらと矛盾するためです。

現在の記述は次の趣旨で統一しています。

- 開発者が運営するサーバーへ利用者データを送信しない
- アカウント、広告 SDK、解析 SDK、第三者 SDK を使用しない
- 利用者が入力・選択したデータと写真は原則として端末内に保存する
- Proの購入・購読状態の確認はAppleのApp Store / StoreKitで処理される
- 利用者が明示的に書き出し・共有した場合を除き、開発者はそのデータを受信しない
- OS、App Store / StoreKit、端末バックアップ等の Apple 標準機能による処理は、開発者へのデータ送信とは別である

サポート窓口が GitHub 上にあることと、アプリが通信しないことは別の話です。
**アプリがサポート窓口へ自動的に接続することはありません。**
利用者が自分でブラウザからアクセスした場合の取り扱いには GitHub, Inc. の定めが適用されます。
この区別はポリシー本文にも明記しています。

**App Store Connect の App Privacy 申告・アプリ実装・権限説明（Info.plist の
`NSPhotoLibraryAddUsageDescription`）と、この 4 ページの記述は常に一致させてください。**

---

## 外部通信機能を追加する場合の注意

> **AI 画像生成 API 連携をはじめ、外部通信をともなう機能を追加する場合は、
> 実装に着手する前に、プライバシーポリシーと App Store Connect の App Privacy 申告を
> 再評価してください。**

| 変わること | 影響する箇所 |
|---|---|
| 開発者または第三者のサーバーへ送信が発生する | ポリシー 1・4 章の「送信しない」の記述 |
| 第三者 SDK / API を組み込む | ポリシー 1 章の「第三者 SDK を使用しない」の記述 |
| 送信内容に利用者の入力・画像が含まれる | App Privacy の「データを収集しない」申告そのもの |
| 新たな権限や通信の説明が要る | Info.plist の用途説明、審査時の説明 |

App Privacy の申告と実装が食い違うと、審査でのリジェクトだけでなく、
公開後の是正対象にもなります。実装を始めてから直すのではなく、**先に文書を更新**してください。

同じ注意は、アプリ側リポジトリの `README.md` にも記載しています。
