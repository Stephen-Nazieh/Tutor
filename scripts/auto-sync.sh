#!/bin/bash
set -e

cd "$(dirname "$0")/.."

echo "[auto-sync] Pulling latest changes from origin/main..."
if ! git pull origin main --rebase; then
  echo "[auto-sync] ERROR: Pull failed. There may be conflicts."
  echo "[auto-sync] Please resolve conflicts manually and re-run."
  exit 1
fi

echo "[auto-sync] Checking for local changes..."
if git diff --quiet && git diff --cached --quiet; then
  echo "[auto-sync] No local changes to commit."
  exit 0
fi

echo "[auto-sync] Staging all changes..."
git add -A

echo "[auto-sync] Committing..."
if [ -z "$1" ]; then
  git commit -m "$(date +'%Y-%m-%d %H:%M:%S') auto-sync"
else
  git commit -m "$1"
fi

echo "[auto-sync] Pushing to origin/main..."
if ! git push origin main; then
  echo "[auto-sync] ERROR: Push failed."
  exit 1
fi

echo "[auto-sync] Sync complete."
