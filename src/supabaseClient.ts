import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://vpjkavcewfbbboppgvyz.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwamthdmNld2ZiYmJvcHBndnl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxNjg3MDYsImV4cCI6MjA2ODc0NDcwNn0.YIIRNNHTrj7WiOIGbG-yX-8O2KVPhyH22xMEOUYixHM";
// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// En CRA sería:
// const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
// const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
