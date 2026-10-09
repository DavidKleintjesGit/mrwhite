#!/usr/bin/env bash
#
# Checks, builds and puts this site on the staging server.
#
#   ./deploy.sh
#
# The deploy itself is the same for every project, so it lives once in
# ~/.claude/skills/staging-deploy/ rather than being copied around. That is
# also where the server details are: this repo is public, and the staging URL
# contains the server's address.

set -euo pipefail

DEPLOY="$HOME/.claude/skills/staging-deploy/staging-deploy.sh"

if [ ! -x "$DEPLOY" ]; then
  echo "staging-deploy.sh not found at $DEPLOY" >&2
  echo "it lives outside this repo on purpose; see the comment above" >&2
  exit 1
fi

npm test
npm run lint
npm run build

"$DEPLOY" mrwhite
