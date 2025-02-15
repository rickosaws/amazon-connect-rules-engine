#!/bin/bash

set -e

failuresDetected=0

recordError()
{
  echo "[ERROR] detected a failure building bot: $1, continuing"
  failuresDetected=$((failuresDetected+1))
}

# Load the shared environment
source ../env/$1.sh

../scripts/rules_engine_check_aws_account.sh

npm install

echo "[INFO] Checking service linked role exists for Lex, an error will be printed if this exists"
aws iam create-service-linked-role --aws-service-name lex.amazonaws.com || true

for i in ./bots/*.json; do
  echo "[INFO] building bot: $i"
  node deploy_lex_bot.js $i $2 || recordError $i
done

if [[ "$failuresDetected" -gt 0 ]]; then
  echo "[ERROR] recorded $failuresDetected failures!"
  exit 1
fi
