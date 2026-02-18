
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

/**
 * Cliente Supabase para interação com o banco de dados.
 * Certifique-se de configurar NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY no seu arquivo .env.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const isSupabaseConfigured = !!supabaseUrl && !!supabaseAnonKey;
