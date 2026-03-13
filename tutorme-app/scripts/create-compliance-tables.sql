-- Compliance tables: COPPA / FERPA / GDPR
-- Run via: psql $DATABASE_URL -f scripts/create-compliance-tables.sql

CREATE TABLE IF NOT EXISTS consent_logs (
  id                TEXT        PRIMARY KEY,
  user_id           TEXT        NOT NULL,
  consent_type      TEXT        NOT NULL,
  consent_version   TEXT        NOT NULL,
  granted           BOOLEAN     NOT NULL,
  ip_address        TEXT,
  user_agent        TEXT,
  granted_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  revoked_at        TIMESTAMPTZ,
  parent_user_id    TEXT,
  notes             TEXT
);
CREATE INDEX IF NOT EXISTS consent_userId_idx    ON consent_logs(user_id);
CREATE INDEX IF NOT EXISTS consent_type_idx      ON consent_logs(consent_type);

CREATE TABLE IF NOT EXISTS deletion_requests (
  id                TEXT        PRIMARY KEY,
  user_id           TEXT        NOT NULL,
  requested_by      TEXT        NOT NULL,
  reason            TEXT,
  status            TEXT        NOT NULL DEFAULT 'pending',
  requested_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  processed_at      TIMESTAMPTZ,
  processed_by      TEXT,
  admin_notes       TEXT,
  pseudonymized_id  TEXT
);
CREATE INDEX IF NOT EXISTS deletion_status_idx   ON deletion_requests(status);
CREATE INDEX IF NOT EXISTS deletion_userId_idx   ON deletion_requests(user_id);

CREATE TABLE IF NOT EXISTS pii_access_logs (
  id                TEXT        PRIMARY KEY,
  accessor_id       TEXT        NOT NULL,
  accessor_role     TEXT        NOT NULL,
  target_user_id    TEXT,
  resource_type     TEXT        NOT NULL,
  resource_id       TEXT,
  action            TEXT        NOT NULL,
  endpoint          TEXT        NOT NULL,
  ip_hash           TEXT,
  accessed_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  legal_basis       TEXT
);
CREATE INDEX IF NOT EXISTS pii_accessorId_idx    ON pii_access_logs(accessor_id);
CREATE INDEX IF NOT EXISTS pii_targetUserId_idx  ON pii_access_logs(target_user_id);
CREATE INDEX IF NOT EXISTS pii_accessedAt_idx    ON pii_access_logs(accessed_at);
CREATE INDEX IF NOT EXISTS pii_resourceType_idx  ON pii_access_logs(resource_type);

CREATE TABLE IF NOT EXISTS third_party_audits (
  id                    TEXT        PRIMARY KEY,
  service_name          TEXT        NOT NULL UNIQUE,
  category              TEXT        NOT NULL,
  data_processed        JSONB       NOT NULL DEFAULT '[]',
  gdpr_compliant        BOOLEAN     NOT NULL DEFAULT FALSE,
  coppa_compliant       BOOLEAN     NOT NULL DEFAULT FALSE,
  ferpa_compliant       BOOLEAN     NOT NULL DEFAULT FALSE,
  dpa_signed            BOOLEAN     NOT NULL DEFAULT FALSE,
  no_training_clause    BOOLEAN     NOT NULL DEFAULT FALSE,
  privacy_policy_url    TEXT,
  notes                 TEXT,
  last_audited_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  audited_by            TEXT
);

CREATE TABLE IF NOT EXISTS data_export_requests (
  id            TEXT        PRIMARY KEY,
  user_id       TEXT        NOT NULL,
  status        TEXT        NOT NULL DEFAULT 'pending',
  requested_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at  TIMESTAMPTZ,
  download_url  TEXT,
  expires_at    TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS export_userId_idx   ON data_export_requests(user_id);
CREATE INDEX IF NOT EXISTS export_status_idx   ON data_export_requests(status);

CREATE TABLE IF NOT EXISTS age_verifications (
  id                      TEXT        PRIMARY KEY,
  user_id                 TEXT        NOT NULL UNIQUE,
  is_minor                BOOLEAN     NOT NULL,
  age_group               TEXT        NOT NULL,
  parent_consent_required BOOLEAN     NOT NULL,
  parent_consent_granted  BOOLEAN     NOT NULL DEFAULT FALSE,
  parent_user_id          TEXT,
  verified_at             TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS privacy_policy_versions (
  id              TEXT        PRIMARY KEY,
  version         TEXT        NOT NULL UNIQUE,
  effective_date  TIMESTAMPTZ NOT NULL,
  summary         TEXT        NOT NULL,
  full_text_url   TEXT,
  is_active       BOOLEAN     NOT NULL DEFAULT FALSE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed default third-party audit records
INSERT INTO third_party_audits (id, service_name, category, data_processed, gdpr_compliant, coppa_compliant, ferpa_compliant, dpa_signed, no_training_clause, privacy_policy_url, notes, last_audited_at)
VALUES
  ('tp-kimi', 'Kimi K2.5 (Moonshot AI)', 'ai_provider', '["chat_messages"]', FALSE, FALSE, FALSE, FALSE, FALSE, 'https://moonshot.cn/privacy', 'Action required: Obtain DPA from Moonshot AI. Verify no-training clause.', NOW()),
  ('tp-dailyco', 'Daily.co', 'video', '["video_streams", "participant_metadata"]', TRUE, FALSE, FALSE, TRUE, FALSE, 'https://www.daily.co/privacy', 'COPPA compliance: Verify handling of minors in video sessions.', NOW()),
  ('tp-sentry', 'Sentry', 'monitoring', '["error_traces", "stack_traces"]', TRUE, FALSE, FALSE, FALSE, FALSE, 'https://sentry.io/privacy/', 'Configure PII scrubbing in Sentry settings. Do not log raw student data in errors.', NOW()),
  ('tp-nextauth', 'NextAuth.js', 'auth', '["email", "session_tokens"]', TRUE, TRUE, TRUE, TRUE, TRUE, 'https://next-auth.js.org/security', 'Open source, self-hosted. JWT tokens, no third-party data transfer.', NOW())
ON CONFLICT (service_name) DO NOTHING;

-- Seed first privacy policy version
INSERT INTO privacy_policy_versions (id, version, effective_date, summary, is_active, created_at)
VALUES (
  'ppv-2024-01',
  '2024-01',
  '2024-01-01 00:00:00+00',
  'Initial privacy policy covering GDPR, COPPA, and FERPA compliance. Includes AI data policy stating that student and tutor data is never used to train public AI models.',
  TRUE,
  NOW()
) ON CONFLICT (version) DO NOTHING;
