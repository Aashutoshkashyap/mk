import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Save, Eye, EyeOff, LayoutDashboard } from "lucide-react";
import { toast } from "sonner";

const SECTIONS = [
  { id: "hero", label: "Main Brand Hero (Home)", page: "Home" },
  { id: "stats", label: "Key Performance Numbers (Home)", page: "Home" },
  { id: "about_overview", label: "About Section Preview (Home)", page: "Home" },
  { id: "services", label: "Core Services Grid (Home)", page: "Home" },
  { id: "testimonials", label: "Customer Reviews (Home)", page: "Home" },
  { id: "partners", label: "Client & Partner Logos (Home)", page: "Home" },
  { id: "cta", label: "Bottom Contact Bar (Global)", page: "All Pages" },
  { id: "about_intro", label: "Company Overview Intro (About)", page: "About" },
  { id: "vision_mission", label: "Mission & Vision Cards (About)", page: "About" },
  { id: "core_values", label: "Values & Integrity Cards (About)", page: "About" },
  { id: "gallery", label: "Office Photo Gallery (About)", page: "About" },
  { id: "team", label: "Team Member Showcase (Team)", page: "Team" },
  { id: "services_hero", label: "Services Page Banner", page: "Services" },
  { id: "services_list", label: "Detailed Service Blocks (Services)", page: "Services" },
  { id: "faqs", label: "FAQs / Help Section (Services)", page: "Services" },
  { id: "blog", label: "Article & Insights Feed (Blog)", page: "Blog" },
  { id: "contact", label: "Contact Details & Map (Contact)", page: "Contact" },
];

type VisibilityMap = Record<string, boolean>;

const VisibilityEditor = () => {
  const qc = useQueryClient();

  const { data: settings, isLoading, error } = useQuery({
    queryKey: ["site_settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .eq("id", "00000000-0000-0000-0000-000000000000")
        .maybeSingle();

      if (error) {
        console.error("Visibility Error: Supabase Query Failed", error);
        return {};
      }

      if (!data) {
        console.warn("Visibility Warning: No record found at Fixed ID 0000...0000");
        return {};
      }

      return data as any;
    },
  });

  const [visibility, setVisibility] = useState<VisibilityMap>(() =>
    Object.fromEntries(SECTIONS.map((s) => [s.id, true]))
  );

  const initialized = useRef(false);
  useEffect(() => {
    if (settings && !initialized.current) {
      initialized.current = true;
      const saved = settings.section_visibility as VisibilityMap | null;
      if (saved) {
        setVisibility((prev) => ({ ...prev, ...saved }));
      }
    }
  }, [settings]);

  const mutation = useMutation({
    mutationFn: async ({ payloadVisibility }: any) => {
      const payload = {
        section_visibility: payloadVisibility,
        updated_at: new Date().toISOString()
      };

      // Use a fixed ID to guarantee we are always editing the same singleton row.
      const { error } = await supabase
        .from("site_settings")
        .update(payload)
        .eq("id", "00000000-0000-0000-0000-000000000000");

      if (error) {
        if (error.code === "42703") {
          throw new Error("Missing Column: Please run the SQL script to add 'section_visibility' to site_settings.");
        }
        throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["site_settings"] });
      toast.success("Visibility settings saved!");
    },
    onError: (e: any) => toast.error(e.message || "Failed to save"),
  });

  const toggle = (id: string) =>
    setVisibility((prev) => ({ ...prev, [id]: !prev[id] }));

  const pages = [...new Set(SECTIONS.map((s) => s.page))];

  if (isLoading && !settings) return <div className="animate-pulse h-40 bg-secondary rounded-xl" />;

  // Check if the column actually exists in the response
  const columnExists = settings && "section_visibility" in settings;
  const recordExists = !!settings;

  if (error || !columnExists || !recordExists) return (
    <div className="rounded-2xl border border-destructive/20 bg-destructive/10 p-8 text-destructive">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center">
          <EyeOff size={20} />
        </div>
        <h2 className="text-xl font-bold">Database Repair Required</h2>
      </div>

      {!recordExists ? (
        <p className="mb-4 text-sm">The "Fixed ID" settings record is missing from your database.</p>
      ) : !columnExists ? (
        <p className="mb-4 text-sm">The <code>section_visibility</code> column is missing from your <code>site_settings</code> table.</p>
      ) : null}

      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-wider opacity-70">How to fix:</p>
        <ol className="list-decimal list-inside text-sm space-y-2">
          <li>Open your <strong>Supabase Dashboard</strong>.</li>
          <li>Go to the <strong>SQL Editor</strong>.</li>
          <li>Paste and run the code below:</li>
        </ol>
        <pre className="text-[10px] bg-black/80 text-green-400 p-4 rounded-xl overflow-x-auto border border-white/10 font-mono">
          {`-- 1. Add the column
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS section_visibility JSONB DEFAULT '{}'::jsonb;

-- 2. Create the fixed singleton row
INSERT INTO site_settings (id, company_name)
VALUES ('00000000-0000-0000-0000-000000000000', 'MK Engineering and Construction')
ON CONFLICT (id) DO NOTHING;

-- 3. Delete duplicates
DELETE FROM site_settings WHERE id != '00000000-0000-0000-0000-000000000000';`}
        </pre>
        <button
          onClick={() => qc.invalidateQueries({ queryKey: ["site_settings"] })}
          className="mt-4 px-6 py-2 bg-destructive text-white rounded-lg text-sm font-bold hover:bg-destructive/90 transition-all"
        >
          I've Run the SQL, Refresh Now
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <LayoutDashboard size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-display text-primary">Section Visibility</h2>
            <p className="text-xs text-muted-foreground">Toggle which sections appear on the live website</p>
          </div>
        </div>
        <button
          onClick={() => mutation.mutate({ payloadVisibility: visibility })}
          disabled={mutation.isPending}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground hover:bg-brand-navy-dark transition-all shadow-md shadow-primary/20 disabled:opacity-50"
        >
          <Save size={16} /> {mutation.isPending ? "Saving..." : "Save Visibility"}
        </button>
      </div>

      {pages.map((page) => (
        <div key={page} className="rounded-2xl bg-card border border-border overflow-hidden">
          <div className="px-5 py-3 bg-secondary/50 border-b border-border">
            <h3 className="text-sm font-bold text-foreground">{page} Page</h3>
          </div>
          <div className="divide-y divide-border">
            {SECTIONS.filter((s) => s.page === page).map((section) => {
              const isVisible = visibility[section.id] !== false;
              return (
                <div key={section.id} className="flex items-center justify-between px-5 py-4 hover:bg-secondary/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${isVisible ? "bg-green-500" : "bg-muted-foreground/30"}`} />
                    <span className={`text-sm font-medium ${isVisible ? "text-foreground" : "text-muted-foreground"}`}>
                      {section.label}
                    </span>
                  </div>
                  <button
                    onClick={() => toggle(section.id)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 ${isVisible ? "bg-primary" : "bg-secondary border border-border"
                      }`}
                    role="switch"
                    aria-checked={isVisible}
                  >
                    <span
                      className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${isVisible ? "translate-x-6" : "translate-x-1"
                        }`}
                    />
                    <span className="sr-only">{isVisible ? "Visible" : "Hidden"}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 flex gap-3">
        <Eye size={18} className="text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-amber-800">How this works</p>
          <p className="text-xs text-amber-700 mt-1">
            Toggling a section off hides it from the live website. The content is preserved — you can re-enable it any time.
            This requires the frontend components to check <code className="bg-amber-100 px-1 rounded">section_visibility</code> from site settings.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VisibilityEditor;
