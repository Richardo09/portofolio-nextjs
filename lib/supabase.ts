import { createClient } from '@supabase/supabase-js';

// URL project kamu
const supabaseUrl = '';

// ANON PUBLIC KEY 
const supabaseKey =
  '';

// buat koneksi
export const supabase = createClient(supabaseUrl, supabaseKey);