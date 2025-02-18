-- File: setup/database.sql
-- Run this script in the Supabase SQL Editor to set up your database

-- Create messages table with UUID as primary key
CREATE TABLE IF NOT EXISTS public.messages (
  id uuid not null default gen_random_uuid(),
  flowers jsonb not null,
  personal_message text null,
  constraint messages_pkey primary key (id)
) TABLESPACE pg_default;

-- Note: Row Level Security (RLS) is intentionally not enabled for this table
-- This means anyone with the anon key can read/write to this table
-- For a production application, you might want to consider enabling RLS