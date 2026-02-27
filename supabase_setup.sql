
-- 1. Limpeza total (Cuidado: apaga dados existentes para garantir sincronia total)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP FUNCTION IF EXISTS public.is_admin();
DROP TABLE IF EXISTS public.cards;
DROP TABLE IF EXISTS public.profiles;
DROP TYPE IF EXISTS user_role;

-- 2. Criação do Tipo de Role (Hierarquia do SaaS)
CREATE TYPE user_role AS ENUM ('super_admin', 'admin', 'premium', 'free');

-- 3. Tabela de Perfis (Extensão de auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  role user_role DEFAULT 'free' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 4. Função Auxiliar para evitar recursão nas políticas
CREATE OR REPLACE FUNCTION public.is_admin() 
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'super_admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Tabela de Cartões Profissionais
CREATE TABLE public.cards (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  template TEXT NOT NULL,
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
  is_verified BOOLEAN DEFAULT FALSE,
  theme_color TEXT,
  font_family TEXT,
  base_font_size INTEGER,
  links JSONB DEFAULT '[]'::JSONB,
  stats JSONB DEFAULT '[]'::JSONB,
  save_contact_label TEXT,
  qr_code_url TEXT,
  qr_code_data TEXT,
  custom_website_url TEXT,
  footer_text TEXT,
  physical_show_avatar BOOLEAN DEFAULT TRUE,
  physical_show_title BOOLEAN DEFAULT TRUE,
  physical_show_stats BOOLEAN DEFAULT TRUE,
  physical_show_links BOOLEAN DEFAULT TRUE,
  physical_show_qr BOOLEAN DEFAULT TRUE,
  physical_show_footer BOOLEAN DEFAULT TRUE,
  physical_background_color TEXT DEFAULT '#ffffff',
  last_updated BIGINT
);

-- 6. Segurança de Dados (Row Level Security)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cards ENABLE ROW LEVEL SECURITY;

-- Políticas para Profiles
CREATE POLICY "Perfis visíveis para todos" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Usuários editam próprio perfil" ON public.profiles FOR UPDATE USING (auth.uid() = id);
-- Correção aqui: Adicionado 'FOR' e usando função is_admin() para evitar recursão
CREATE POLICY "Admins gerenciam todos perfis" ON public.profiles FOR ALL USING (public.is_admin());

-- Políticas para Cards
CREATE POLICY "Cartões públicos visíveis" ON public.cards FOR SELECT USING (true);
CREATE POLICY "Usuários criam próprios cartões" ON public.cards FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Usuários editam próprios cartões" ON public.cards FOR UPDATE USING (
  auth.uid() = user_id OR public.is_admin()
);
CREATE POLICY "Usuários deletam próprios cartões" ON public.cards FOR DELETE USING (
  auth.uid() = user_id OR public.is_admin()
);

-- 7. Automação: Criação de Perfil no Cadastro
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, role)
  VALUES (
    new.id, 
    new.raw_user_meta_data->>'full_name', 
    new.raw_user_meta_data->>'avatar_url', 
    'free'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
