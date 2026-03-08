-- ─────────────────────────────────────────────────────────────────────────────
-- church_intake  —  Client intake form submissions
-- Run this in the Supabase SQL editor (Dashboard → SQL Editor → New query)
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS church_intake (
  id                   uuid        PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Auth / RLS anchor  (one row per user — enforced by UNIQUE)
  user_id              uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Section 1: Basic Church Info
  org_name             text        NOT NULL,
  primary_contact_name text        NOT NULL,
  address              text        NOT NULL,
  denomination         text,

  -- Section 2: Branding & Vibe
  logo_url             text,
  vibe_words           text[]      DEFAULT '{}',     -- ["Bold","Warm","Modern"]
  color_preferences    text,
  design_preference    text,
  media_links          text,

  -- Section 3: Technical Access
  current_site_url     text,
  domain_info          text,
  mission_summary      text,

  -- Section 4: Feature Requirements
  requested_features   text[]      DEFAULT '{}',

  -- Timestamps
  submitted_at         timestamptz DEFAULT now(),
  updated_at           timestamptz DEFAULT now(),

  CONSTRAINT church_intake_user_id_key UNIQUE (user_id)
);

-- ── Row-Level Security ────────────────────────────────────────────────────────
ALTER TABLE church_intake ENABLE ROW LEVEL SECURITY;

-- Clients can insert their own row
CREATE POLICY "Clients can insert own intake"
  ON church_intake FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Clients can read their own row
CREATE POLICY "Clients can view own intake"
  ON church_intake FOR SELECT
  USING (auth.uid() = user_id);

-- Clients can update their own row (upsert re-uses this)
CREATE POLICY "Clients can update own intake"
  ON church_intake FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ── Admin read-all (service role only — no extra policy needed) ───────────────
-- Supabase service-role key bypasses RLS entirely.
-- Use it server-side (API route / edge function) when you need admin access.

-- ── Auto-update updated_at ────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS church_intake_updated_at ON church_intake;
CREATE TRIGGER church_intake_updated_at
  BEFORE UPDATE ON church_intake
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
