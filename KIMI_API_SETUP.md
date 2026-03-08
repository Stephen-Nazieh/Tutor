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
   - Value: `sk-nNHM3NxzlQI9DwwHoV92tEBplEiP8lBguvocsS3MLPWm0BFI`

Or use gcloud CLI:
```bash
gcloud run services update solocorn-app \
  --set-env-vars="KIMI_API_KEY=sk-nNHM3NxzlQI9DwwHoV92tEBplEiP8lBguvocsS3MLPWm0BFI"
```

## Debugging

Check Cloud Run logs to see:
- "Calling Kimi API with message:..." - API is being called
- "Kimi API response received: success" - API returned valid response
- "KIMI_API_KEY not configured" - Environment variable missing
- "Kimi API error:..." - API call failed
- "Using fallback response, source:..." - Fallback was used
