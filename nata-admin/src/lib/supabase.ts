import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wfkgcpsaslztjfkiwgln.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indma2djcHNhc2x6dGpma2l3Z2xuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3NzAyNzAsImV4cCI6MjA1NjM0NjI3MH0.HGcbGA7P3ZjKzZvn177sAeMACMDB9h7VDKgtcQ_jMpY";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
