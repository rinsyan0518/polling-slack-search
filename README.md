search allをポーリングし、取得したメッセージの差分を表示するものです。
（取得後10秒のインターバルを置きます）

※macのことしか考えてないです。

# 使い方

## セットアップ

1. `.env.template` を `.env` としてコピーしておいてください
2. `yarn`を実行してください

## Slackアプリの作成

1. https://api.slack.com/apps から新しくSlackアプリを作ってください
2. OAuth & Permissionsを開き、Redirect URLsに `http://localhost:3000` 、Scopesに `search:read`を追加してください
5. Basic InformationのApp Credentialsから`Client ID`と`Client Secret`を `.env` に書いてください

## Access Tokenの取得

1. `yarn run wait-oauth`を実行してください
2. 開いたページでAllowを押してください
3. 成功するとローカルに`.access_token`というファイルが作成されます

OAuth & PermissionsのRedirect URLsから `http://localhost:3000` を削除して大丈夫です。

## Slackのメッセージを購読

1. `yarn run read-stream` を実行してください

# 注意

Access Tokenをローカルに保存しますので、取り扱いに注意してください。
