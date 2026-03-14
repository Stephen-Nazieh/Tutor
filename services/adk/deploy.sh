#!/bin/bash
set -e

# ADK Service Deployment Script
# Run this from the project root directory

echo "=== ADK Service Deployment ==="

# Configuration
export PROJECT_ID=project-29e0fd29-a707-458c-bd1
export REGION=us-central1
export KIMI_API_KEY=sk-nNHM3NxzlQI9DwwHoV92tEBplEiP8lBguvocsS3MLPWm0BFI

# Generate ADK auth token
export ADK_AUTH_TOKEN=$(openssl rand -base64 32)

echo ""
echo "=== Configuration ==="
echo "Project ID: $PROJECT_ID"
echo "Region: $REGION"
echo "ADK_AUTH_TOKEN: $ADK_AUTH_TOKEN"
echo ""
echo "⚠️  SAVE THIS ADK_AUTH_TOKEN - you'll need it for the Next.js app!"
echo ""

# Set gcloud project
echo "Setting gcloud project..."
gcloud config set project $PROJECT_ID

# Build the container image
echo ""
echo "=== Building Container Image ==="
# Ensure we're in the right directory with Dockerfile
if [ ! -f "services/adk/Dockerfile" ]; then
    echo "ERROR: Dockerfile not found in services/adk/"
    echo "Current directory: $(pwd)"
    ls -la services/adk/
    exit 1
fi
gcloud builds submit services/adk --tag gcr.io/$PROJECT_ID/adk-service

# Deploy to Cloud Run
echo ""
echo "=== Deploying to Cloud Run ==="
gcloud run deploy adk-service \
  --image gcr.io/$PROJECT_ID/adk-service \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --port 8080 \
  --set-env-vars="KIMI_API_KEY=$KIMI_API_KEY,ADK_AUTH_TOKEN=$ADK_AUTH_TOKEN,ADK_MODEL=kimi-k2.5" \
  --memory 1Gi \
  --cpu 1 \
  --max-instances 10 \
  --min-instances 0

# Get the service URL
echo ""
echo "=== Getting Service URL ==="
export ADK_URL=$(gcloud run services describe adk-service --region=$REGION --format='value(status.url)')
echo "ADK Service URL: $ADK_URL"

# Test health endpoint
echo ""
echo "=== Testing Health Endpoint ==="
curl -s $ADK_URL/health || echo "Health check failed - service may still be starting up"

echo ""
echo "=== Deployment Complete ==="
echo ""
echo "Next steps:"
echo "1. Add these environment variables to your Next.js Cloud Run service:"
echo "   ADK_BASE_URL=$ADK_URL"
echo "   ADK_AUTH_TOKEN=$ADK_AUTH_TOKEN"
echo ""
echo "2. Redeploy your Next.js app"
echo ""
echo "3. Test PCI chat in your application"
