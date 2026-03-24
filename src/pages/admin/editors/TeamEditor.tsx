import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Save, Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";
import iconMap from "@/lib/iconMap";
import { ImageUpload } from "@/components/admin/ImageUpload";

const TeamEditor = () => {
  const qc = useQueryClient();
  const { data: members = [], isLoading } = useQuery({
    queryKey: ["admin-team"],
    queryFn: async () => {
      const { data } = await supabase.from("team_members").select("*, team_sectors(*)").order("sort_order");
      return data || [];
    },
  });

  const addMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("team_members").insert({ name: "New Member", role: "Role", sort_order: members.length });
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-team"] }); toast.success("Member added!"); },
  });

  if (isLoading) return <div className="animate-pulse h-40 bg-secondary rounded-xl" />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-extrabold text-primary">Team Members</h2>
        <button onClick={() => addMutation.mutate()} className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">
          <Plus size={16} /> Add Member
        </button>
      </div>
      <div className="space-y-4">
        {members.map((m: any) => <MemberCard key={m.id} member={m} />)}
      </div>
    </div>
  );
};

const MemberCard = ({ member }: { member: any }) => {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: member.name, role: member.role, image_url: member.image_url || "", experience: member.experience || "", bio: member.bio || "" });

  const updateMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("team_members").update(form).eq("id", member.id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-team"] }); toast.success("Member updated!"); },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("team_members").delete().eq("id", member.id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-team"] }); toast.success("Member deleted!"); },
  });

  const addSectorMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("team_sectors").insert({ team_member_id: member.id, icon_name: "Briefcase", label: "New Sector", sort_order: (member.team_sectors?.length || 0) });
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-team"] }); },
  });

  return (
    <div className="rounded-2xl bg-card border border-border overflow-hidden">
      <div className="p-5 flex items-center justify-between cursor-pointer" onClick={() => setOpen(!open)}>
        <div className="flex items-center gap-3">
          {member.image_url && <img src={member.image_url} alt={member.name} className="w-10 h-10 rounded-full object-cover" />}
          <div>
            <h3 className="font-bold text-primary text-sm">{member.name}</h3>
            <p className="text-xs text-muted-foreground">{member.role}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={(e) => { e.stopPropagation(); deleteMutation.mutate(); }} className="rounded-lg bg-destructive/10 px-2 py-1 text-xs text-destructive"><Trash2 size={14} /></button>
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>
      {open && (
        <div className="p-5 border-t border-border space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-xs font-semibold mb-1">Name</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm" /></div>
            <div><label className="block text-xs font-semibold mb-1">Role</label><input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm" /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <ImageUpload 
              label="Member Photo" 
              value={form.image_url} 
              onChange={(url) => setForm({ ...form, image_url: url })} 
              folder="team"
            />
            <div><label className="block text-xs font-semibold mb-1">Experience</label><input value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm" /></div>
          </div>
          <div><label className="block text-xs font-semibold mb-1">Bio</label><textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={2} className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm" /></div>
          <button onClick={() => updateMutation.mutate()} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-bold text-primary-foreground"><Save size={14} /> Save</button>

          <div className="mt-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-foreground">Sectors</h4>
              <button onClick={() => addSectorMutation.mutate()} className="text-xs font-bold text-brand-blue flex items-center gap-1"><Plus size={12} /> Add</button>
            </div>
            <div className="space-y-2">
              {(member.team_sectors || []).sort((a: any, b: any) => a.sort_order - b.sort_order).map((sector: any) => (
                <SectorRow key={sector.id} sector={sector} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SectorRow = ({ sector }: { sector: any }) => {
  const qc = useQueryClient();
  const [form, setForm] = useState({ icon_name: sector.icon_name, label: sector.label });

  const update = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("team_sectors").update(form).eq("id", sector.id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-team"] }); },
  });

  const del = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("team_sectors").delete().eq("id", sector.id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-team"] }); },
  });

  return (
    <div className="flex items-center gap-2">
      <select value={form.icon_name} onChange={(e) => setForm({ ...form, icon_name: e.target.value })} className="rounded-lg border border-border bg-secondary/50 px-2 py-1.5 text-xs w-32">
        {Object.keys(iconMap).map((k) => <option key={k} value={k}>{k}</option>)}
      </select>
      <input value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} className="flex-1 rounded-lg border border-border bg-secondary/50 px-3 py-1.5 text-xs" />
      <button onClick={() => update.mutate()} className="rounded-lg bg-primary/10 px-2 py-1.5 text-xs text-primary"><Save size={12} /></button>
      <button onClick={() => del.mutate()} className="rounded-lg bg-destructive/10 px-2 py-1.5 text-xs text-destructive"><Trash2 size={12} /></button>
    </div>
  );
};

export default TeamEditor;
