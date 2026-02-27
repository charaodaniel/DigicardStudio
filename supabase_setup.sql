
-- LIMPEZA TOTAL (DROP)
DROP POLICY IF EXISTS "Public can view any card" ON cards;
DROP POLICY IF EXISTS "Users can manage their own cards" ON cards;
DROP POLICY IF EXISTS "Admins can view all cards" ON cards;
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can manage all profiles" ON profiles;

DROP TABLE IF EXISTS cards;
DROP TABLE IF EXISTS profiles;

-- EXTENSÕES
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- TIPOS DE USUÁRIOS (ROLES)
-- super_admin: Acesso total ao sistema e faturamento
-- admin: Gestão de usuários e suporte
-- premium: Cliente com recursos ilimitados
-- free: Usuário com limites básicos

-- TABELA DE PERFIS (PROFILES)
-- Complementa o auth.users do Supabase
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'free' CHECK (role IN ('super_admin', 'admin', 'premium', 'free')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABELA DE CARTÕES (CARDS)
CREATE TABLE cards (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  template TEXT NOT NULL DEFAULT 'default',
  full_name TEXT NOT NULL,
  full_name_link TEXT,
  job_title TEXT NOT NULL,
  job_title_link TEXT,
  bio TEXT,
  avatar_url TEXT,
  avatar_link TEXT,
  banner_url TEXT,
  banner_link TEXT,
  vcard_url TEXT,
  is_verified BOOLEAN DEFAULT false,
  theme_color TEXT DEFAULT '#5048e5',
  font_family TEXT DEFAULT 'Inter',
  base_font_size INTEGER DEFAULT 16,
  links JSONB DEFAULT '[]',
  stats JSONB DEFAULT '[]',
  save_contact_label TEXT DEFAULT 'Salvar Contato',
  qr_code_url TEXT,
  qr_code_data TEXT,
  custom_website_url TEXT,
  footer_text TEXT,
  physical_show_avatar BOOLEAN DEFAULT true,
  physical_show_title BOOLEAN DEFAULT true,
  physical_show_stats BOOLEAN DEFAULT true,
  physical_show_links BOOLEAN DEFAULT true,
  physical_show_qr BOOLEAN DEFAULT true,
  physical_show_footer BOOLEAN DEFAULT true,
  physical_background_color TEXT DEFAULT '#ffffff',
  last_updated BIGINT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- HABILITAR SEGURANÇA (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE cards ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS PARA PROFILES
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND (role = 'admin' OR role = 'super_admin')
    )
  );

CREATE POLICY "Super Admins can manage roles" ON profiles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'super_admin'
    )
  );

-- POLÍTICAS PARA CARTÕES
CREATE POLICY "Public can view any card" ON cards
  FOR SELECT USING (true);

CREATE POLICY "Users can manage their own cards" ON cards
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all cards" ON cards
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND (role = 'admin' OR role = 'super_admin')
    )
  );

-- TRIGGER PARA CRIAR PERFIL AUTOMATICAMENTE NO SIGNUP
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, role)
  VALUES (
    NEW.id, 
    NEW.raw_user_meta_data->>'full_name', 
    NEW.raw_user_meta_data->>'avatar_url',
    'free' -- Padrão ao cadastrar
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
