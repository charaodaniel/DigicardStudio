-- ==========================================
-- SCRIPT DE CONFIGURAÇÃO DIGICARD STUDIO
-- Execute este script no SQL Editor do Supabase
-- ==========================================

-- 1. Limpeza do banco para recriação (CUIDADO: Isso apaga os dados existentes na tabela cards)
DROP TABLE IF EXISTS cards CASCADE;

-- 2. Criação da Tabela de Cartões com suporte a modo Híbrido e Impressão
CREATE TABLE cards (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  template TEXT DEFAULT 'default',
  
  -- Identidade Digital
  full_name TEXT NOT NULL,
  full_name_link TEXT,
  job_title TEXT,
  job_title_link TEXT,
  bio TEXT,
  
  -- Mídia e Arquivos
  avatar_url TEXT,
  avatar_link TEXT,
  banner_url TEXT,
  banner_link TEXT,
  vcard_url TEXT,
  is_verified BOOLEAN DEFAULT false,
  
  -- Design e Estilo
  theme_color TEXT DEFAULT '#5048e5',
  font_family TEXT DEFAULT 'Inter',
  base_font_size INTEGER DEFAULT 16,
  
  -- Dados Estruturados (JSONB para flexibilidade)
  links JSONB DEFAULT '[]'::jsonb,
  stats JSONB DEFAULT '[]'::jsonb,
  
  -- QR Code e Rodapé
  save_contact_label TEXT DEFAULT 'Salvar Contato',
  qr_code_url TEXT,
  qr_code_data TEXT,
  custom_website_url TEXT,
  footer_text TEXT,
  
  -- Preferências de Impressão (Gabarito Físico)
  physical_show_avatar BOOLEAN DEFAULT true,
  physical_show_title BOOLEAN DEFAULT true,
  physical_show_stats BOOLEAN DEFAULT true,
  physical_show_links BOOLEAN DEFAULT true,
  physical_show_qr BOOLEAN DEFAULT true,
  physical_show_footer BOOLEAN DEFAULT true,
  physical_background_color TEXT DEFAULT '#ffffff',
  
  -- Metadados de sistema
  last_updated BIGINT
);

-- 3. Habilitar Row Level Security (Segurança por Usuário)
ALTER TABLE cards ENABLE ROW LEVEL SECURITY;

-- 4. Definição das Políticas de Segurança (Policies)

-- POLÍTICA: Visualização Pública (Qualquer um pode ver o cartão via link público /c/id)
CREATE POLICY "Cartões são visíveis publicamente" 
ON cards FOR SELECT 
USING (true);

-- POLÍTICA: Inserção (Apenas o dono autenticado pode criar seus cartões)
CREATE POLICY "Usuários podem criar seus próprios cartões" 
ON cards FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- POLÍTICA: Atualização (Apenas o dono pode editar seus cartões)
CREATE POLICY "Usuários podem atualizar seus próprios cartões" 
ON cards FOR UPDATE 
USING (auth.uid() = user_id);

-- POLÍTICA: Deleção (Apenas o dono pode apagar seus cartões)
CREATE POLICY "Usuários podem deletar seus próprios cartões" 
ON cards FOR DELETE 
USING (auth.uid() = user_id);

-- Comentário para documentar o banco
COMMENT ON TABLE cards IS 'Tabela de identidades profissionais híbridas do DigiCard Studio.';