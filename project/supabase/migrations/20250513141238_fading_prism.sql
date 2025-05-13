
CREATE TABLE IF NOT EXISTS records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  body text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users NOT NULL,
  category text,
  status text DEFAULT 'active',
  priority integer DEFAULT 1,
  CONSTRAINT priority_range CHECK (priority BETWEEN 1 AND 5)
);

ALTER TABLE records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own records"
  ON records
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own records"
  ON records
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own records"
  ON records
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own records"
  ON records
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX idx_records_user_id ON records(user_id);
CREATE INDEX idx_records_category ON records(category);
CREATE INDEX idx_records_status ON records(status);
