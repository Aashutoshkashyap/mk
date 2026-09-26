import { useState } from "react";
import { Save, Eye, EyeOff, LayoutDashboard } from "lucide-react";
import { toast } from "sonner";

const SECTIONS = [
  { id: "hero", label: "Main Brand Hero (Home)", page: "Home" },
  { id: "stats", label: "Key Performance Numbers (Home)", page: "Home" },
  { id: "about_overview", label: "About Section Preview (Home)", page: "Home" },
  { id: "services", label: "Core Services Grid (Home)", page: "Home" },
  { id: "testimonials", label: "Customer Reviews (Home)", page: "Home" },
  { id: "partners", label: "Client & Partner Logos (Home)", page: "Home" },
  { id: "blog", label: "Article & Insights Feed (Home)", page: "Home" },
  { id: "faqs", label: "FAQs / Help Section (Home)", page: "Home" },
  { id: "cta", label: "Bottom Contact Bar (Global)", page: "All Pages" },
  { id: "about_intro", label: "Company Overview Intro (About)", page: "About" },
  { id: "vision_mission", label: "Mission & Vision Cards (About)", page: "About" },
  { id: "core_values", label: "Values & Integrity Cards (About)", page: "About" },
  { id: "gallery", label: "Office Photo Gallery (About)", page: "About" },
  { id: "team", label: "Team Member Showcase (Team)", page: "Team" },
  { id: "services_hero", label: "Services Page Banner", page: "Services" },
  { id: "services_list", label: "Detailed Service Blocks (Services)", page: "Services" },
  { id: "contact", label: "Contact Details & Map (Contact)", page: "Contact" },
];

const STORAGE_KEY = "mk_cms_section_visibility";

function getVisibility(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  // Default: all visible
  return Object.fromEntries(SECTIONS.map((s) => [s.id, true]));
}

const VisibilityEditor = () => {
  const [visibility, setVisibility] = useState<Record<string, boolean>>(getVisibility());

  const toggle = (id: string) => setVisibility((prev) => ({ ...prev, [id]: !prev[id] }));

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(visibility));
    window.dispatchEvent(new CustomEvent("mk_cms_update", { detail: { key: "visibility" } }));
    toast.success("Section visibility saved! Changes are live.");
  };

  const showAll = () => {
    const all = Object.fromEntries(SECTIONS.map((s) => [s.id, true]));
    setVisibility(all);
  };

  const pages = [...new Set(SECTIONS.map((s) => s.page))];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-extrabold text-primary">Section Visibility</h2>
        <button onClick={showAll} className="text-xs text-primary hover:underline font-semibold">Show All</button>
      </div>
      <p className="text-sm text-muted-foreground mb-6">Toggle sections on or off across the website. Hidden sections won't appear to visitors.</p>

      <div className="space-y-6">
        {pages.map((page) => (
          <div key={page}>
            <div className="flex items-center gap-2 mb-3">
              <LayoutDashboard size={14} className="text-primary" />
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{page}</h3>
            </div>
            <div className="space-y-2">
              {SECTIONS.filter((s) => s.page === page).map((section) => {
                const isVisible = visibility[section.id] !== false;
                return (
                  <div key={section.id}
                    className={`flex items-center justify-between p-4 rounded-xl border transition-all ${isVisible ? "bg-card border-border" : "bg-secondary/20 border-border/50 opacity-60"}`}>
                    <div className="flex items-center gap-3">
                      {isVisible
                        ? <Eye size={16} className="text-green-500 shrink-0" />
                        : <EyeOff size={16} className="text-muted-foreground shrink-0" />}
                      <span className="text-sm font-medium text-foreground">{section.label}</span>
                    </div>
                    <button
                      onClick={() => toggle(section.id)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isVisible ? "bg-primary" : "bg-secondary"}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${isVisible ? "translate-x-6" : "translate-x-1"}`} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button onClick={handleSave}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:bg-brand-navy-dark transition-colors">
          <Save size={16} /> Save Visibility Settings
        </button>
      </div>
    </div>
  );
};

export default VisibilityEditor;
