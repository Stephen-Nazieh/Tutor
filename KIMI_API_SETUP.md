# Kimi API Setup for Production

## Environment Variable

The `KIMI_API_KEY` must be set in your Cloud Run deployment environment.

### Local Development
- Set in `tutorme-app/.env.local`

### Production (Cloud Run)
1. Go to Google Cloud Console
2. Navigate to Cloud Run
3. Select your service
4. Click "Edit & Deploy New Revision"
5. Under "Container, Variables & Secrets, Connections, Security"
6. Add environment variable:
  - Name: `KIMI_API_KEY`
  - Value: `YOUR_KIMI_API_KEY` (do not commit this value to source control)

Or use gcloud CLI:
```bash
gcloud run services update solocorn-app \
  --set-env-vars="KIMI_API_KEY=YOUR_KIMI_API_KEY"
```

## Debugging

Check Cloud Run logs to see:
- "Calling Kimi API with message:..." - API is being called
- "Kimi API response received: success" - API returned valid response
- "KIMI_API_KEY not configured" - Environment variable missing
- "Kimi API error:..." - API call failed
- "Using fallback response, source:..." - Fallback was used

## Rotate KIMI API Key (recommended)

If a key has been exposed, revoke it at the Kimi provider dashboard immediately and create a new key. Then follow the steps below to store the new key in Secret Manager and update Cloud Run.

1. Create a Secret Manager secret (one-time):

```bash
gcloud secrets create kimi-api-key \
  --replication-policy="automatic" \
  --project="YOUR_GCP_PROJECT"
```

2. Add the new key as a secret version (replace `NEW_KEY` with the key value):

```bash
echo -n "NEW_KEY" | gcloud secrets versions add kimi-api-key --data-file=- --project="YOUR_GCP_PROJECT"
```

3. Grant your Cloud Run service account permission to access the secret (replace `SERVICE_ACCOUNT_EMAIL`):

```bash
gcloud secrets add-iam-policy-binding kimi-api-key \
  --member="serviceAccount:SERVICE_ACCOUNT_EMAIL" \
  --role="roles/secretmanager.secretAccessor" \
  --project="YOUR_GCP_PROJECT"
```

4. Update Cloud Run to mount the secret as an environment variable (`KIMI_API_KEY`):

```bash
gcloud run services update solocorn-app \
  --project="YOUR_GCP_PROJECT" \
  --region="YOUR_CLOUD_RUN_REGION" \
  --update-secrets="KIMI_API_KEY=kimi-api-key:latest"
```

5. Redeploy if necessary and verify logs for successful calls.

Alternative: use the helper script `scripts/rotate-kimi-key.sh` in this repo to automate steps 1–4 (it requires `gcloud` and that you provide `NEW_KEY`, `PROJECT`, `SERVICE`, `REGION`, and `SERVICE_ACCOUNT`