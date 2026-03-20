# Solocorn CI/CD (GCP Cloud Run)

## Flow

- **Pull Request to `main`**: Runs CI (build + lint), then deploys a **Preview** to Cloud Run with `--no-traffic` and posts the Preview URL as a PR comment.
- **Push (merge) to `main`**: Runs CI, then deploys **Production** and sends 100% traffic to the new revision.

Builds use `Dockerfile.production`.

## GitHub Secrets (Repository Settings → Secrets and variables → Actions)

Add these **required** secrets:

| Secret | Description |
|--------|-------------|
| `GCP_PROJECT_ID` | Google Cloud project ID (e.g. `my-project-123`) |
| `GCP_SA_KEY` | Service account key JSON (whole file content) with roles: Cloud Run Admin, Artifact Registry Writer, Service Account User |
| `DATABASE_URL` | PostgreSQL connection URL used at runtime (e.g. `postgresql://user:pass@host:5432/db`) |
| `DIRECT_URL` | Direct PostgreSQL URL (same as `DATABASE_URL` if no pooler) |
| `NEXTAUTH_SECRET` | NextAuth secret (min 32 characters) |
| `NEXTAUTH_URL` | Full app URL (e.g. `https://your-service.run.app` for production) |
| `REDIS_URL` | Redis URL (e.g. `redis://host:6379`) or leave empty if not used |

Optional (add if your app uses them):

- `DATABASE_POOL_URL` – PgBouncer or other pooler URL
- Any other env vars your app reads at runtime (add to `env_vars` in the workflow and create matching secrets)

## Preview vs production

- **Preview**: Same service name, new revision with `--no-traffic` and tag `preview-pr-<number>`. The commented URL points to that revision so partners can test without affecting production traffic.
- **Production**: New revision receives 100% traffic after merge to `main`.
