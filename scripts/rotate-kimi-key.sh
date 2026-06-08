#!/usr/bin/env bash
set -euo pipefail

# Usage:
# NEW_KEY="..." PROJECT="my-project" SERVICE="solocorn-app" REGION="us-central1" SERVICE_ACCOUNT="svc@project.iam.gserviceaccount.com" ./scripts/rotate-kimi-key.sh

if [ -z "${NEW_KEY:-}" ]; then
  echo "ERROR: NEW_KEY must be set (do not commit this value)."
  exit 1
fi
PROJECT=${PROJECT:-$(gcloud config get-value project 2>/dev/null || echo "")}
if [ -z "$PROJECT" ]; then
  echo "ERROR: PROJECT must be set or configured in gcloud."
  exit 1
fi
SERVICE=${SERVICE:-solocorn-app}
REGION=${REGION:-us-central1}
SECRET_NAME=${SECRET_NAME:-kimi-api-key}
SERVICE_ACCOUNT=${SERVICE_ACCOUNT:-}

# Create secret if it doesn't exist
if ! gcloud secrets describe "$SECRET_NAME" --project="$PROJECT" >/dev/null 2>&1; then
  echo "Creating secret $SECRET_NAME in project $PROJECT"
  gcloud secrets create "$SECRET_NAME" --replication-policy="automatic" --project="$PROJECT"
fi

# Add new secret version
echo -n "$NEW_KEY" | gcloud secrets versions add "$SECRET_NAME" --data-file=- --project="$PROJECT"

if [ -n "$SERVICE_ACCOUNT" ]; then
  echo "Granting Secret Manager access to $SERVICE_ACCOUNT"
  gcloud secrets add-iam-policy-binding "$SECRET_NAME" \
    --member="serviceAccount:$SERVICE_ACCOUNT" \
    --role="roles/secretmanager.secretAccessor" \
    --project="$PROJECT"
else
  echo "WARNING: SERVICE_ACCOUNT not set — ensure the Cloud Run service's runtime service account has access to the secret."
fi

# Update Cloud Run service to use the secret as an env var
echo "Updating Cloud Run service $SERVICE to use secret $SECRET_NAME"
gcloud run services update "$SERVICE" \
  --project="$PROJECT" \
  --region="$REGION" \
  --update-secrets="KIMI_API_KEY=$SECRET_NAME:latest"

echo "Rotation complete. Verify Cloud Run logs for successful Kimi API calls."
