-- Profiles (extending auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  username TEXT UNIQUE,
  avatar_url TEXT,
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sectors
CREATE TABLE sectors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  svg_path TEXT,
  position_x INTEGER DEFAULT 0,
  position_y INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Boulders
CREATE TABLE boulders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  grade TEXT NOT NULL CHECK (grade IN ('blanco', 'verde', 'amarillo', 'azul', 'morado', 'rojo', 'negro')),
  grade_range TEXT NOT NULL,
  hold_color TEXT NOT NULL,
  sector_id UUID REFERENCES sectors ON DELETE SET NULL,
  image_url TEXT,
  description TEXT,
  setter TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true
);

-- Ascents (user sends)
CREATE TABLE ascents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles ON DELETE CASCADE,
  boulder_id UUID NOT NULL REFERENCES boulders ON DELETE CASCADE,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  attempts INTEGER,
  notes TEXT,
  UNIQUE(user_id, boulder_id)
);

-- Create indexes
CREATE INDEX idx_boulders_sector ON boulders(sector_id);
CREATE INDEX idx_boulders_grade ON boulders(grade);
CREATE INDEX idx_boulders_active ON boulders(is_active);
CREATE INDEX idx_ascents_user ON ascents(user_id);
CREATE INDEX idx_ascents_boulder ON ascents(boulder_id);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE sectors ENABLE ROW LEVEL SECURITY;
ALTER TABLE boulders ENABLE ROW LEVEL SECURITY;
ALTER TABLE ascents ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Sectors policies (public read, admin write)
CREATE POLICY "Sectors are viewable by everyone" ON sectors
  FOR SELECT USING (true);

CREATE POLICY "Admins can insert sectors" ON sectors
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
  );

CREATE POLICY "Admins can update sectors" ON sectors
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
  );

CREATE POLICY "Admins can delete sectors" ON sectors
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
  );

-- Boulders policies (public read, admin write)
CREATE POLICY "Boulders are viewable by everyone" ON boulders
  FOR SELECT USING (true);

CREATE POLICY "Admins can insert boulders" ON boulders
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
  );

CREATE POLICY "Admins can update boulders" ON boulders
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
  );

CREATE POLICY "Admins can delete boulders" ON boulders
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
  );

-- Ascents policies
CREATE POLICY "Ascents are viewable by everyone" ON ascents
  FOR SELECT USING (true);

CREATE POLICY "Users can insert own ascents" ON ascents
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own ascents" ON ascents
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own ascents" ON ascents
  FOR DELETE USING (auth.uid() = user_id);

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'username');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on auth.users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Storage bucket for boulder images
INSERT INTO storage.buckets (id, name, public) VALUES ('boulders', 'boulders', true);

-- Storage policies
CREATE POLICY "Boulder images are publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'boulders');

CREATE POLICY "Admins can upload boulder images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'boulders' AND
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
  );

CREATE POLICY "Admins can update boulder images" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'boulders' AND
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
  );

CREATE POLICY "Admins can delete boulder images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'boulders' AND
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
  );
