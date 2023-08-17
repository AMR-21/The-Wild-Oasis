import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://oxsfsgftgweqbhsyfcam.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94c2ZzZ2Z0Z3dlcWJoc3lmY2FtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE4ODc1OTgsImV4cCI6MjAwNzQ2MzU5OH0.VZrJuwNN-Bfg7q-P7djhjZyHB3IxZgF0Jv614aY21-M";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
