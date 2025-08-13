/*
  # Create messages table for contact form

  1. New Tables
    - `messages`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required)
      - `phone` (text, optional)
      - `service` (text, required - type of inquiry)
      - `message` (text, required)
      - `created_at` (timestamp with timezone, default now())

  2. Security
    - Enable RLS on `messages` table
    - Add policy for anonymous users to insert contact form data
*/

CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  service text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous users to insert messages"
  ON messages
  FOR INSERT
  TO anon
  WITH CHECK (true);