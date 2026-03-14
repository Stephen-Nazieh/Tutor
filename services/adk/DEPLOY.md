# ADK Service Deployment Guide

This guide explains how to deploy the ADK service to Google Cloud Run.

## Prerequisites

- Google Cloud SDK (`gcloud`) installed
- Docker installed (for local testing)
- Access to your Google Cloud project

## Step 1: Set Environment Variables

Run these commands in your terminal:

```bash
# Set your Google Cloud project
export PROJECT_ID=your-project-id
export REGION=us-central1  # or your preferred region

# Set the ADK auth token (generate a secure random string)
export ADK_AUTH_TOKEN=$(openssl rand -base64 32)
echo "Your ADK_AUTH_TOKEN: $ADK_AUTH_TOKEN"

# Your API key
export KIMI_API_KEY=your-kimi-api-key
```

## Step 2: Build and Deploy

```bash
cd services/adk

# Build the container image
gcloud builds submit --tag gcr.io/$PROJECT_ID/adk-service

# Deploy to Cloud Run
gcloud run deploy adk-service \
  --image gcr.io/$PROJECT_ID/adk-service \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --port 8080 \
  --set-env-vars="KIMI_API_KEY=$KIMI_API_KEY,ADK_AUTH_TOKEN=$ADK_AUTH_TOKEN,PORT=8080,ADK_MODEL=kimi-k2.5" \
  --memory 1Gi \
  --cpu 1 \
  --max-instances 10 \
  --min-instances 0

# Get the service URL
export ADK_URL=$(gcloud run services describe adk-service --region=$REGION --format='value(status.url)')
echo "ADK Service URL: $ADK_URL"
```

## Step 3: Test the Deployment

```bash
# Test health endpoint
curl $ADK_URL/health

# Test PCI Master endpoint (should get 401 without auth)
curl -X POST $ADK_URL/v1/pci-master \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ADK_AUTH_TOKEN" \
  -d '{
    "userId": "test-user",
    "message": "Hello",
    "context": {"type": "task", "title": "Test"}
  }'
```

## Step 4: Update Next.js App Environment Variables

Add these to your **Next.js Cloud Run service**:

| Variable | Value |
|----------|-------|
| `ADK_BASE_URL` | The URL from Step 2 (e.g., `https://adk-service-xxx.run.app`) |
| `ADK_AUTH_TOKEN` | The same token you generated in Step 1 |

Redeploy your Next.js app after adding these.

## Troubleshooting

### Port Issues
The service listens on the `PORT` environment variable (Cloud Run sets this). The dockerfile uses port 8080 by default.

### Authentication Errors
- Make sure `ADK_AUTH_TOKEN` matches between the ADK service and Next.js app
- Include `Authorization: Bearer <token>` header in requests

### Model Errors
- Check that `KIMI_API_KEY` is set correctly

### View Logs
```bash
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=adk-service" --limit=50
```

## Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Next.js App   │────▶│  ADK Service    │────▶│  Kimi API       │
│  (Cloud Run)    │     │  (Cloud Run)    │     │   APIs          │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                        │
        │                        │
        ▼                        ▼
   ADK_BASE_URL            Same Database
   ADK_AUTH_TOKEN          (PostgreSQL)
```

## Cost Optimization

- Use `--min-instances 0` to scale to zero when not in use
- Start with `--memory 512Mi` and increase if needed
- Monitor with `gcloud billing budgets create`
