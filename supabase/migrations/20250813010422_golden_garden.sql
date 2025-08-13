/*
  # Comprehensive fix for messages table RLS policy

  1. Security Changes
    - Drop all existing policies on messages table
    - Create a new policy specifically for anonymous contact form submissions
    - Ensure RLS is properly enabled
    - Grant necessary permissions to anon role

  This migration ensures anonymous users can submit contact forms while maintaining security.
*/

-- Drop all existing policies on the messages table
DROP POLICY IF EXISTS "Allow anonymous insert into messages" ON messages;
DROP POLICY IF EXISTS "Allow anonymous insertions" ON messages;
DROP POLICY IF EXISTS "Enable insert for anon users" ON messages;

-- Ensure RLS is enabled
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Grant INSERT permission to anon role
GRANT INSERT ON messages TO anon;

-- Create a comprehensive policy for anonymous insertions
CREATE POLICY "anon_can_insert_messages"
ON messages
FOR INSERT
TO anon
WITH CHECK (true);

-- Also ensure the anon role has usage on the schema
GRANT USAGE ON SCHEMA public TO anon;