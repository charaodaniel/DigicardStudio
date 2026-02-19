-- SCRIPT DE CONFIGURAÇÃO COMPLETO PARA DIGICARD STUDIO
-- Execute este script no SQL Editor do seu projeto Supabase

-- 1. Tabela de Cartões (Cards)
CREATE TABLE IF NOT EXISTS public.cards (
    id TEXT PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    template TEXT DEFAULT 'default',
    full_name TEXT,
    full_name_link TEXT,
    job_title TEXT,
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
    links JSONB DEFAULT '[]'::jsonb,
    stats JSONB DEFAULT '[]'::jsonb,
    save_contact_label TEXT DEFAULT 'Salvar Contato',
    qr_code_url TEXT,
    qr_code_data TEXT,
    custom_website_url TEXT,
    footer_text TEXT,
    -- Configurações de Impressão (Modo Físico)
    physical_show_avatar BOOLEAN DEFAULT true,
    physical_show_title BOOLEAN DEFAULT true,
    physical_show_stats BOOLEAN DEFAULT true,
    physical_show_links BOOLEAN DEFAULT true,
    physical_show_qr BOOLEAN DEFAULT true,
    physical_show_footer BOOLEAN DEFAULT true,
    physical_background_color TEXT DEFAULT '#ffffff',
    last_updated BIGINT
);

-- 2. Habilitar RLS (Row Level Security)
ALTER TABLE public.cards ENABLE ROW LEVEL SECURITY;

-- 3. Políticas de Acesso

-- Permissão para visualizar qualquer cartão (público)
CREATE POLICY "Cartões são visíveis publicamente por ID" 
ON public.cards FOR SELECT 
USING (true);

-- Permissão para o dono inserir seus próprios cartões
CREATE POLICY "Usuários podem inserir seus próprios cartões" 
ON public.cards FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Permissão para o dono atualizar seus próprios cartões
CREATE POLICY "Usuários podem atualizar seus próprios cartões" 
ON public.cards FOR UPDATE 
USING (auth.uid() = user_id);

-- Permissão para o dono excluir seus próprios cartões
CREATE POLICY "Usuários podem excluir seus próprios cartões" 
ON public.cards FOR DELETE 
USING (auth.uid() = user_id);

-- 4. Tabela de Perfis (Opcional, mas recomendado)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ver seu próprio perfil" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Usuários podem atualizar seu próprio perfil" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);