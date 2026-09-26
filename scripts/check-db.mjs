/**
 * Check what's in each table
 */
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://frqtzqyjwfkwwgxucqfx.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZycXR6cXlqd2Zrd3dneHVjcWZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3MjMwNjIsImV4cCI6MjA4OTI5OTA2Mn0.7hd2F7Hk_mriBSQ3wT-qAQ_9LOwa1sOJXrdtLakBARo";

const sb = createClient(SUPABASE_URL, SUPABASE_KEY);

const tables = ["hero_section","about_section","prefooter_cta","site_settings","stats","services","faqs","testimonials","blog_posts","contact_info","core_values"];
for (const t of tables) {
  const { data, error } = await sb.from(t).select("*").limit(3);
  if (error) console.log(`❌ ${t}: ${error.message}`);
  else console.log(`✅ ${t}: ${data.length} rows — ${data.length > 0 ? JSON.stringify(data[0]).slice(0,80) : 'EMPTY'}`);
}
