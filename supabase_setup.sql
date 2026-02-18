
-- 1. Tabela de Perfis (Estende a tabela auth.users do Supabase)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  avatar_url text,
  updated_at timestamp with time zone default now()
);

-- 2. Atualizar a tabela de Cards para incluir o dono (user_id)
-- Se a tabela já existir, apenas adicionamos a coluna
do $$ 
begin
  if not exists (select 1 from pg_attribute where attrelid = 'cards'::regclass and attname = 'user_id') then
    alter table cards add column user_id uuid references auth.users on delete cascade;
  end if;
end $$;

-- 3. Habilitar RLS (Row Level Security)
alter table profiles enable row level security;
alter table cards enable row level security;

-- 4. Políticas para Perfis
create policy "Usuários podem ver o próprio perfil" on profiles for select using (auth.uid() = id);
create policy "Usuários podem atualizar o próprio perfil" on profiles for update using (auth.uid() = id);

-- 5. Políticas para Cards
-- Permitir que qualquer pessoa veja um cartão pelo ID (para a página pública /c/slug)
create policy "Visualização pública de cartões" on cards for select using (true);

-- Permitir que usuários autenticados gerenciem apenas seus próprios cartões
create policy "Usuários gerenciam seus próprios cartões" on cards 
  for all 
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- 6. Trigger para criar perfil automaticamente ao cadastrar
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
