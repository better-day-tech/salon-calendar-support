#!/bin/bash
# 公開前の混入チェック。
#
# 公開対象に連絡先・内部情報・未差し替えのプレースホルダが残っていないかを調べる。
# 何も検出しなければ終了コード 0、検出したら 1 を返す。
#
# このスクリプト自身は検査対象から外している。検出パターンには "@" や "/Users/" が
# 文字列として含まれるため、除外しないと必ず自分自身に一致してしまうため。
#
# 開発者アカウントの識別子（Team ID）はパターンとして書かない。
# 検査項目に literal を残すと、それ自体が公開情報になってしまう。

set -uo pipefail
cd "$(dirname "$0")/.." || exit 1

PATTERN='[[:alnum:]._%+-]+@[[:alnum:].-]+\.[[:alpha:]]{2,}|mailto:|/Users/|DEVELOPMENT_TEAM|\.p12|\.mobileprovision|BEGIN [A-Z ]*PRIVATE KEY|\{\{[A-Z_]+\}\}'

echo "公開対象を検査しています..."
hits=$(grep -rnEI \
  --exclude-dir=.git \
  --exclude-dir=tools \
  "$PATTERN" . 2>/dev/null)

if [ -z "$hits" ]; then
  echo "検出なし。公開対象はクリーンです。"
  exit 0
fi

echo
echo "以下が検出されました。公開前に内容を確認してください。"
echo "$hits"
echo
echo "注意: '@2x.png' のようなファイル名がメールアドレスの形に一致することがあります。"
echo "      実際の連絡先なのか単なる文字列の一致なのかを目で確認してください。"
exit 1
