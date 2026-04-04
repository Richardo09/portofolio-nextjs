import { createClient } from '@supabase/supabase-js';

// URL project kamu
const supabaseUrl = 'https://ksocdwbjybounpspyhyg.supabase.co';

// ANON PUBLIC KEY 
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtzb2Nkd2JqeWJvdW5wc3B5aHlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUyNDUyMTIsImV4cCI6MjA5MDgyMTIxMn0.NsE7m3Bc_1yVicnOQsDOZbdtunqmt0Xn0ATl2yzz5d0';

// buat koneksi
export const supabase = createClient(supabaseUrl, supabaseKey);
