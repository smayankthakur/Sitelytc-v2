#!/usr/bin/env bash
# ── Sitelytc dev launcher (macOS/Linux) ── run: bash run.sh
set -e
cd "$(dirname "$0")"

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is not installed. Install the LTS version from https://nodejs.org and retry."
  exit 1
fi

if [ ! -f .env.local ]; then
  echo "Creating .env.local from .env.example ..."
  cp .env.example .env.local
fi

if [ ! -d node_modules ]; then
  echo "Installing dependencies (first run only)..."
  npm install
fi

echo "Starting Sitelytc at http://localhost:3001  (Ctrl+C to stop)"
npm run dev
