/*
  # Fix RLS policy for messages table

  1. Security Changes
    - Drop existing restrictive policy on messages table
    - Create new policy allowing anonymous users to insert contact form submissions
    - Ensure RLS remains enabled for security

  This migration fixes the "new row violates row-level security policy" error
  by allowing anonymous users to submit contact forms.
*/

-- Drop the existing policy if it exists
DROP POLICY IF EXISTS "Allow anonymous users to insert messages" ON messages;

-- Create a new policy that allows anonymous users to insert messages
CREATE POLICY "Allow anonymous insert into messages"
  ON messages
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Ensure RLS is enabled (should already be enabled from previous migration)
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;