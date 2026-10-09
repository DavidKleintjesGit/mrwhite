#!/usr/bin/env bash
#
# Builds the static export and puts it on the server.
#
#   ./deploy.sh
#
# HOW IT WORKS
#
#   `npm run build` writes a plain static site to out/ — there is no server
#   side to this app, so deploying is copying files. The copy goes over SSH
#   as a single tar stream rather than scp per file: one connection instead
#   of hundreds, and it keeps the odd filenames Next.js emits intact.
#
# THE HOST
#
#   Reached through an SSH host alias, not a raw address, so no server
#   details live in this repo. The alias is defined in ~/.ssh/config on the
#   machine that deploys. Override either value if you need to:
#
#     MRWHITE_HOST=other-alias MRWHITE_ROOT=/var/www/other/public ./deploy.sh
#
#   Deploy as the web user, never as root. Files written by root in /var/www
#   end up owned by root, and the web server can then no longer read them.
#
# ONE-TIME SETUP FOR A NEW SITE
#
#   The web server needs to know about the site. On this box that is Caddy,
#   with one file per site in /etc/caddy/sites/, written as root:
#
#     <host> {
#       root * /var/www/mrwhite/public
#       encode zstd gzip
#
#       # The export writes the language pages as nl.html and en.html, not as
#       # nl/index.html, so /nl needs this fallback or it 404s.
#       try_files {path} {path}.html {path}/index.html
#       file_server
#
#       handle_errors {
#         rewrite * /404.html
#         file_server
#       }
#     }
#
#   Then `caddy validate --config /etc/caddy/Caddyfile && systemctl reload caddy`.

set -euo pipefail

HOST="${MRWHITE_HOST:-fsn1-web}"
ROOT="${MRWHITE_ROOT:-/var/www/mrwhite/public}"

echo "→ checking"
npm test
npm run lint

echo "→ building"
npm run build

echo "→ copying to $HOST:$ROOT"
tar -cf - -C out . | ssh "$HOST" "
  set -eu
  mkdir -p '$ROOT'
  rm -rf '$ROOT'/*
  tar -xf - -C '$ROOT'
"

echo "✓ deployed to $HOST:$ROOT"
