
-- SCRIPT DE CONFIGURAÇÃO PARA SUPABASE (DIGICARD STUDIO)
-- Execute este script no SQL Editor do seu projeto Supabase.

-- 1. Tabela de Perfis de Usuários (Estende o auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  avatar_url text,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- 2. Tabela de Cartões (Com vínculo de usuário)
create table public.cards (
  id text primary key,
  user_id uuid references auth.users on delete cascade default auth.uid(),
  template text not null default 'default',
  full_name text not null,
  full_name_link text,
  job_title text,
  job_title_link text,
  bio text,
  avatar_url text,
  avatar_link text,
  banner_url text,
  banner_link text,
  vcard_url text,
  is_verified boolean default false,
  theme_color text default '#5048e5',
  font_family text default 'Inter',
  base_font_size integer default 16,
  links jsonb default '[]'::jsonb,
  stats jsonb default '[]'::jsonb,
  save_contact_label text default 'Salvar Contato',
  qr_code_url text,
  custom_website_url text,
  footer_text text,
  physical_show_avatar boolean default true,
  physical_show_title boolean default true,
  physical_show_stats boolean default true,
  physical_show_links boolean default true,
  physical_show_qr boolean default true,
  physical_show_footer boolean default true,
  physical_background_color text default '#ffffff',
  last_updated bigint
);

-- 3. Habilitar Row Level Security (Segurança por Linha)
alter table public.profiles enable row level security;
alter table public.cards enable row level security;

-- 4. Políticas para Perfis
create policy "Usuários podem ver seu próprio perfil" on public.profiles
  for select using (auth.uid() = id);

create policy "Usuários podem atualizar seu próprio perfil" on public.profiles
  for update using (auth.uid() = id);

-- 5. Políticas para Cartões
create policy "Usuários podem ver seus próprios cartões" on public.cards
  for select using (auth.uid() = user_id);

create policy "Usuários podem criar seus próprios cartões" on public.cards
  for insert with check (auth.uid() = user_id);

create policy "Usuários podem editar seus próprios cartões" on public.cards
  for update using (auth.uid() = user_id);

create policy "Usuários podem deletar seus próprios cartões" on public.cards
  for delete using (auth.uid() = user_id);

-- 6. Trigger para criar perfil automaticamente no cadastro
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
