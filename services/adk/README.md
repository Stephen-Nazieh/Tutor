# Solocorn ADK Service

This service hosts Google ADK-based agents and exposes a thin HTTP API for the main Next.js app.

## Endpoints
- `POST /v1/chat`
- `POST /v1/grading/essay`
- `POST /v1/grading/math`
- `POST /v1/content/generate`
- `POST /v1/briefing`
- `POST /v1/live-monitor`
- `GET /v1/status`

## Development
```bash
cd services/adk
cp .env.example .env
npm install
npm run dev
```

## Auth
Set `ADK_AUTH_TOKEN` and include `Authorization: Bearer <token>` in requests.

## Notes
- The service connects to the same PostgreSQL database as the main app.
- All agents are implemented using Google ADK and share tools via the `tools/` folder.
