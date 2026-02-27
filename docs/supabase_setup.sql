-- 1. Limpeza total em ordem correta de dependências
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP TABLE IF EXISTS public.cards;
DROP TABLE IF EXISTS public.plans;
DROP TABLE IF EXISTS public.system_settings;
DROP TABLE IF EXISTS public.profiles;
DROP FUNCTION IF EXISTS public.is_admin();
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

-- 4. Função de Segurança para verificação de Admin (Evita recursão infinita no RLS)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Tabela de Planos (Gestão de Assinaturas)
CREATE TABLE public.plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  price TEXT NOT NULL,
  card_limit TEXT NOT NULL,
  industrial_export BOOLEAN DEFAULT FALSE NOT NULL,
  active BOOLEAN DEFAULT TRUE NOT NULL,
  checkout_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Inserir planos iniciais
INSERT INTO public.plans (name, price, card_limit, industrial_export)
VALUES 
  ('Free', 'R$ 0', '1', false),
  ('Premium', 'R$ 29,90', '10', true),
  ('Enterprise', 'Sob consulta', 'Ilimitado', true)
ON CONFLICT (name) DO NOTHING;

-- 6. Tabela de Configurações do Sistema
CREATE TABLE public.system_settings (
  id TEXT PRIMARY KEY,
  site_name TEXT DEFAULT 'DigiCard Studio',
  hero_title TEXT DEFAULT 'Seu Cartão de Visita, Reinventado.',
  hero_subtitle TEXT DEFAULT 'Crie cartões digitais interativos e gabaritos de impressão profissional em minutos.',
  support_email TEXT DEFAULT 'suporte@digicard.studio',
  maintenance_mode BOOLEAN DEFAULT FALSE,
  mercadopago_public_key TEXT,
  mercadopago_access_token TEXT,
  supabase_url TEXT,
  supabase_anon_key TEXT,
  last_updated TIMESTAMPTZ DEFAULT NOW()
);

-- Inserir registro global inicial
INSERT INTO public.system_settings (id) VALUES ('global') ON CONFLICT DO NOTHING;

-- 7. Tabela de Cartões Profissionais
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

-- 8. Segurança de Dados (Row Level Security)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

-- Políticas para Profiles
CREATE POLICY "Perfis visíveis para todos" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Usuários editam próprio perfil" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins gerenciam todos perfis" ON public.profiles FOR ALL USING (public.is_admin());

-- Políticas para Planos
CREATE POLICY "Planos visíveis para todos" ON public.plans FOR SELECT USING (true);
CREATE POLICY "Admins gerenciam planos" ON public.plans FOR ALL USING (public.is_admin());

-- Políticas para Configurações do Sistema
CREATE POLICY "Configurações visíveis para todos" ON public.system_settings FOR SELECT USING (true);
CREATE POLICY "Admins gerenciam configurações" ON public.system_settings FOR ALL USING (public.is_admin());

-- Políticas para Cards
CREATE POLICY "Cartões públicos visíveis" ON public.cards FOR SELECT USING (true);
CREATE POLICY "Usuários criam próprios cartões" ON public.cards FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Usuários editam próprios cartões" ON public.cards FOR UPDATE USING (
  auth.uid() = user_id OR public.is_admin()
);
CREATE POLICY "Usuários deletam próprios cartões" ON public.cards FOR DELETE USING (
  auth.uid() = user_id OR public.is_admin()
);

-- 9. Automação: Criação de Perfil no Cadastro
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
