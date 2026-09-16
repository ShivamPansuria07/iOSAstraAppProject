import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL ?? '';
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '';

const supabase = createClient(
  SUPABASE_URL || 'https://YOUR_PROJECT.supabase.co',
  SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'
);

export default supabase;
