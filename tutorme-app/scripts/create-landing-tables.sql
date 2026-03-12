-- Run this script to create the landing page tables
-- Execute via: psql $DATABASE_URL -f scripts/create-landing-tables.sql

CREATE TABLE IF NOT EXISTS landing_inquiries (
  id         TEXT        PRIMARY KEY,
  name       TEXT        NOT NULL,
  email      TEXT        NOT NULL,
  message    TEXT        NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS landing_signups (
  id         TEXT        PRIMARY KEY,
  username   TEXT        NOT NULL,
  bio        TEXT,
  country    TEXT,
  photo      TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Handy queries for viewing submissions
-- SELECT * FROM landing_inquiries  ORDER BY created_at DESC;
-- SELECT * FROM landing_signups    ORDER BY created_at DESC;
