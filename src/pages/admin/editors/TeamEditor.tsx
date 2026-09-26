import { useState } from "react";
import { Save, Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";
import ImageUploadInput from "@/components/admin/ImageUploadInput";

// Team data uses localStorage directly
const STORAGE_KEY = "mk_cms_team_members";

const defaultMembers = [
  { id: "tm1", name: "Mohan Kumar Shrestha", role: "Managing Director & CEO", bio: "Founder and Managing Director with 25+ years leading complex highway, bridge, and infrastructure projects across Nepal. Holds a Masters in Civil Engineering from IOE, Pulchowk.", image_url: "", sort_order: 0 },
  { id: "tm2", name: "Er. Prabhat Khatri", role: "Chief Technical Officer", bio: "Oversees all engineering design, QC, and technical compliance. Specialises in pre-stressed concrete bridge design and highway geometric engineering.", image_url: "", sort_order: 1 },
  { id: "tm3", name: "Sunita Thapa", role: "Chief Financial Officer", bio: "Manages the company's financial operations, project cost control, and procurement. 15+ years in infrastructure project finance.", image_url: "", sort_order: 2 },
  { id: "tm4", name: "Er. Ramesh Karki", role: "Head of Site Operations", bio: "Leads on-site construction teams across all active projects. Expert in earthworks, retaining structures, and heavy equipment deployment in remote terrain.", image_url: "", sort_order: 3 },
];

function getMembers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : defaultMembers;
  } catch { return defaultMembers; }
}

function saveMembers(members: any[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
  window.dispatchEvent(new CustomEvent("mk_cms_update", { detail: { key: "team_members" } }));
}

type Member = { id: string; name: string; role: string; bio: string; image_url: string; sort_order: number };

const TeamEditor = () => {
  const [members, setMembers] = useState<Member[]>(getMembers());
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleSave = () => { saveMembers(members); toast.success("Team updated! Changes are live."); };

  const add = () => {
    const newMember: Member = { id: crypto.randomUUID(), name: "New Team Member", role: "Title", bio: "", image_url: "", sort_order: members.length };
    setMembers([...members, newMember]);
    setExpandedId(newMember.id);
  };

  const remove = (id: string) => setMembers(members.filter((m) => m.id !== id));
  const update = (id: string, field: keyof Member, val: string) =>
    setMembers(members.map((m) => m.id === id ? { ...m, [field]: val } : m));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-extrabold text-primary">Team Members</h2>
        <button onClick={add} className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"><Plus size={16} /> Add Member</button>
      </div>
      <div className="space-y-3">
        {members.map((m) => (
          <div key={m.id} className="rounded-2xl bg-card border border-border overflow-hidden">
            <div className="flex items-center gap-4 p-4 cursor-pointer hover:bg-secondary/10 transition-colors"
              onClick={() => setExpandedId(expandedId === m.id ? null : m.id)}>
              {m.image_url ? (
                <img src={m.image_url} alt={m.name} className="w-10 h-10 rounded-full object-cover border border-border" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  {m.name.charAt(0)}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-foreground">{m.name}</div>
                <div className="text-xs text-muted-foreground">{m.role}</div>
              </div>
              {expandedId === m.id ? <ChevronUp size={16} className="text-muted-foreground shrink-0" /> : <ChevronDown size={16} className="text-muted-foreground shrink-0" />}
            </div>
            {expandedId === m.id && (
              <div className="border-t border-border p-4 space-y-4">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">Full Name</label>
                    <input value={m.name} onChange={(e) => update(m.id, "name", e.target.value)}
                      className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">Role / Designation</label>
                    <input value={m.role} onChange={(e) => update(m.id, "role", e.target.value)}
                      className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm" />
                  </div>
                </div>

                <ImageUploadInput
                  label="Member Photo"
                  value={m.image_url}
                  onChange={(url) => update(m.id, "image_url", url)}
                  placeholder="https://... or upload photo"
                  previewHeight="h-32"
                />

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">Bio / Credentials</label>
                  <textarea value={m.bio} onChange={(e) => update(m.id, "bio", e.target.value)} rows={3}
                    className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm" />
                </div>
                <div className="flex justify-end">
                  <button onClick={() => remove(m.id)}
                    className="inline-flex items-center gap-1 rounded-lg bg-destructive/10 px-3 py-1.5 text-xs text-destructive hover:bg-destructive/20">
                    <Trash2 size={13} /> Delete Member
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 flex gap-3">
        <button onClick={handleSave} className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:bg-brand-navy-dark transition-colors">
          <Save size={16} /> Save Team
        </button>
      </div>
    </div>
  );
};

export default TeamEditor;
