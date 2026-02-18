-- Tabela de Cartões do DigiCard Studio
CREATE TABLE IF NOT EXISTS cards (
  id text PRIMARY KEY,
  template text NOT NULL DEFAULT 'default',
  full_name text NOT NULL,
  full_name_link text,
  job_title text,
  job_title_link text,
  bio text,
  avatar_url text,
  avatar_link text,
  banner_url text,
  banner_link text,
  vcard_url text,
  is_verified boolean DEFAULT false,
  theme_color text DEFAULT '#5048e5',
  font_family text DEFAULT 'Inter',
  base_font_size integer DEFAULT 16,
  links jsonb DEFAULT '[]'::jsonb,
  stats jsonb DEFAULT '[]'::jsonb,
  save_contact_label text DEFAULT 'Salvar Contato',
  qr_code_url text,
  custom_website_url text,
  footer_text text,
  physical_show_avatar boolean DEFAULT true,
  physical_show_title boolean DEFAULT true,
  physical_show_stats boolean DEFAULT true,
  physical_show_links boolean DEFAULT true,
  physical_show_qr boolean DEFAULT true,
  physical_show_footer boolean DEFAULT true,
  physical_background_color text DEFAULT '#ffffff',
  last_updated bigint
);

-- Habilitar Row Level Security (Segurança por linha)
ALTER TABLE cards ENABLE ROW LEVEL SECURITY;

-- Criar política de acesso público total (Ideal para testes e prototipagem rápida)
-- NOTA: Em produção, você deve restringir isso para usuários autenticados (auth.uid() = user_id)
CREATE POLICY "Acesso Público Total" ON cards 
  FOR ALL 
  USING (true) 
  WITH CHECK (true);

-- Criar índices para busca rápida por ID
CREATE INDEX IF NOT EXISTS idx_cards_id ON cards(id);