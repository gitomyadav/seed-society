import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://domdjdrrfraogmouufkr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvbWRqZHJyZnJhb2dtb3V1ZmtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI5MjAxNzIsImV4cCI6MjA5ODQ5NjE3Mn0.OQ37MZUJE8yHNbHtxg2P6p-oYx8Way-mM4Ogd-a181k';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
