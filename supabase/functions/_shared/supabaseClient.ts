import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabaseUrl = Deno.env.get('VITE_SUPABASE_URL') || 'https://rgltgdklkrksczphrupu.supabase.co';
const supabaseAnonKey = Deno.env.get('VITE_SUPABASE_ANON_KEY') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnbHRnZGtsa3Jrc2N6cGhydXB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMzOTAzMTUsImV4cCI6MjA1ODk2NjMxNX0.lxrqr6d5cO7NIRsWK6A1j-vKuqx0hmkXy0StB_Tui4k';

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
