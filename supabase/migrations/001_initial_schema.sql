-- =============================================
-- ART-AI Platform — Initial Schema
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================
-- TABLES
-- =============================================

CREATE TABLE galleries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  category text,
  slug text UNIQUE,
  cover_image text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE artworks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  gallery_id uuid REFERENCES galleries(id) ON DELETE CASCADE,
  title text NOT NULL,
  topic text,
  post text,
  image_url text,
  tags text[],
  style text,
  concept text,
  year int,
  inspiration_url text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  artwork_id uuid REFERENCES artworks(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, artwork_id)
);

-- =============================================
-- INDEXES
-- =============================================

CREATE INDEX galleries_slug_idx ON galleries(slug);
CREATE INDEX galleries_category_idx ON galleries(category);
CREATE INDEX artworks_gallery_id_idx ON artworks(gallery_id);
CREATE INDEX artworks_tags_idx ON artworks USING GIN(tags);
CREATE INDEX artworks_style_idx ON artworks(style);
CREATE INDEX favorites_user_id_idx ON favorites(user_id);
CREATE INDEX favorites_artwork_id_idx ON favorites(artwork_id);

-- =============================================
-- AUTO-UPDATE updated_at TRIGGER
-- =============================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER galleries_updated_at
  BEFORE UPDATE ON galleries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

ALTER TABLE galleries ENABLE ROW LEVEL SECURITY;
ALTER TABLE artworks ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- GALLERIES: public read, admin write
CREATE POLICY "galleries_public_read"
  ON galleries FOR SELECT
  TO public
  USING (true);

CREATE POLICY "galleries_admin_insert"
  ON galleries FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE id = auth.uid()
      AND raw_user_meta_data->>'role' = 'admin'
    )
  );

CREATE POLICY "galleries_admin_update"
  ON galleries FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE id = auth.uid()
      AND raw_user_meta_data->>'role' = 'admin'
    )
  );

CREATE POLICY "galleries_admin_delete"
  ON galleries FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE id = auth.uid()
      AND raw_user_meta_data->>'role' = 'admin'
    )
  );

-- ARTWORKS: public read, admin write
CREATE POLICY "artworks_public_read"
  ON artworks FOR SELECT
  TO public
  USING (true);

CREATE POLICY "artworks_admin_insert"
  ON artworks FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE id = auth.uid()
      AND raw_user_meta_data->>'role' = 'admin'
    )
  );

CREATE POLICY "artworks_admin_update"
  ON artworks FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE id = auth.uid()
      AND raw_user_meta_data->>'role' = 'admin'
    )
  );

CREATE POLICY "artworks_admin_delete"
  ON artworks FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE id = auth.uid()
      AND raw_user_meta_data->>'role' = 'admin'
    )
  );

-- FAVORITES: users manage own favorites only
CREATE POLICY "favorites_select_own"
  ON favorites FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "favorites_insert_own"
  ON favorites FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "favorites_delete_own"
  ON favorites FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- =============================================
-- SEED DATA (optional demo galleries)
-- =============================================

INSERT INTO galleries (name, description, category, slug) VALUES
  ('Generative Visions', 'AI-generated abstract landscapes and digital dreamscapes', 'generative', 'generative-visions'),
  ('Architectural AI', 'Futuristic structures imagined by machine intelligence', 'architecture', 'architectural-ai'),
  ('Neural Portraits', 'Human faces reimagined through neural networks', 'portraiture', 'neural-portraits');
