import { createClient } from '@supabase/supabase-js';

const supaSite = 'https://db.rjhtvdpxldkdbiwjnngx.supabase.co';
const supaKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqaHR2ZHB4bGRrZGJpd2pubmd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY4ODg4ODksImV4cCI6MjAwMjQ2NDg4OX0.WiR5r68jjkiuJFfFVevREnFu4GyosKbVeHIpBWZ9UKU';

const db = createClient(supaSite, supaKey);

export default db;
