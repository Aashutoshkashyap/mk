import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Save, Plus, Trash2, ChevronDown, ChevronUp, GripVertical } from "lucide-react";
import { toast } from "sonner";
import iconMap from "@/lib/iconMap";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const defaultConstructionTeam = [
  {
    id: "tm1",
    name: "Er. Madan K. Shrestha",
    role: "Chairman & Managing Director",
    experience: "28+ Yrs Exp",
    bio: "Founding leader of MK Engineering and Construction. Oversees corporate strategy, mega-infrastructure execution, and multilateral agency partnerships with DoR, ADB, and World Bank across Nepal.",
    image_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600",
    team_sectors: [
      { id: "ts1", label: "National Highways", icon_name: "Building2", sort_order: 1 },
      { id: "ts2", label: "Major Bridges", icon_name: "ShieldCheck", sort_order: 2 },
    ],
  },
  {
    id: "tm2",
    name: "Er. Rameshwor Adhikari",
    role: "Executive Director & Head of Operations",
    experience: "24+ Yrs Exp",
    bio: "Directs turnkey field mobilization, captive heavy equipment fleet deployments, and river training hydraulic protection works across the Mid-Hills and Terai flood plains.",
    image_url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600",
    team_sectors: [
      { id: "ts3", label: "River Training", icon_name: "Compass", sort_order: 1 },
      { id: "ts4", label: "Fleet Logistics", icon_name: "Truck", sort_order: 2 },
    ],
  },
  {
    id: "tm3",
    name: "Er. Binod K. Thapa, M.Sc.",
    role: "Chief Technical Officer & Head of Engineering",
    experience: "21+ Yrs Exp",
    bio: "Spearheads structural design coordination, seismic detailing per Nepal Building Code (NBC 105:2020), geotechnical foundation validation, and site QA/QC testing labs.",
    image_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600",
    team_sectors: [
      { id: "ts5", label: "NBC Seismic Code", icon_name: "HardHat", sort_order: 1 },
      { id: "ts6", label: "QA/QC Testing Labs", icon_name: "Award", sort_order: 2 },
    ],
  },
  {
    id: "tm4",
    name: "Sunita Pradhan",
    role: "Director of Contracts & Multilateral Procurement",
    experience: "18+ Yrs Exp",
    bio: "Manages public-sector procurement, FIDIC commercial contract administration, ADB/World Bank compliance frameworks, and tender documentation across all 6 service lines.",
    image_url: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600",
    team_sectors: [
      { id: "ts7", label: "FIDIC Contracts", icon_name: "FileText", sort_order: 1 },
      { id: "ts8", label: "Tender Bidding", icon_name: "CheckCircle2", sort_order: 2 },
    ],
  },
];

const TeamEditor = () => {
  const qc = useQueryClient();
  const { data: members = [], isLoading } = useQuery({
    queryKey: ["admin-team"],
    queryFn: async () => {
      const { data } = await supabase.from("team_members").select("*, team_sectors(*)").order("sort_order");
      return data || [];
    },
  });

  const displayMembers = members.length > 0 ? members : defaultConstructionTeam;

  const addMutation = useMutation({
    mutationFn: async ({ len }: any) => {
      const { error } = await supabase.from("team_members").insert({ name: "New Member", role: "Role", sort_order: len });
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-team"] }); toast.success("Member added!"); },
  });

  const updateOrderMutation = useMutation({
    mutationFn: async (items: any[]) => {
      const promises = items.map((item, index) => 
        supabase.from("team_members").upsert({ ...item, sort_order: index })
      );
      await Promise.all(promises);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-team"] });
    }
  });

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(displayMembers);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    qc.setQueryData(["admin-team"], items);
    updateOrderMutation.mutate(items);
  };

  if (isLoading) return <div className="animate-pulse h-40 bg-secondary rounded-xl" />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-extrabold text-primary">Team Members</h2>
        <button onClick={() => addMutation.mutate({ len: displayMembers.length })} className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">
          <Plus size={16} /> Add Member
        </button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="team-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {displayMembers.map((m: any, index: number) => (
                <Draggable key={m.id} draggableId={m.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={snapshot.isDragging ? "z-50 relative shadow-2xl ring-1 ring-primary/20 rounded-2xl" : ""}
                    >
                      <MemberCard member={m} dragHandleProps={provided.dragHandleProps} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

const MemberCard = ({ member, dragHandleProps }: { member: any, dragHandleProps?: any }) => {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: member.name, role: member.role, image_url: member.image_url || "", experience: member.experience || "", bio: member.bio || "" });

  const updateMutation = useMutation({
    mutationFn: async ({ form, id }: any) => {
      const isCustomId = typeof id === "string" && id.startsWith("tm");
      const { error } = await supabase.from("team_members").upsert({
        ...(isCustomId ? {} : { id }),
        ...form
      });
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-team"] }); toast.success("Member updated!"); },
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ id }: any) => {
      const { error } = await supabase.from("team_members").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-team"] }); toast.success("Member deleted!"); },
  });

  const addSectorMutation = useMutation({
    mutationFn: async ({ id, len }: any) => {
      const { error } = await supabase.from("team_sectors").insert({ team_member_id: id, icon_name: "Briefcase", label: "New Sector", sort_order: len });
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-team"] }); },
  });

  return (
    <div className="rounded-2xl bg-card border border-border overflow-hidden">
      <div className="p-5 flex items-center justify-between cursor-pointer" onClick={() => setOpen(!open)}>
        <div className="flex items-center gap-3">
          <div {...dragHandleProps} onClick={(e) => e.stopPropagation()} className="cursor-grab text-muted-foreground/30 hover:text-primary transition-colors p-1 -ml-2 rounded-lg hover:bg-secondary">
            <GripVertical size={20} />
          </div>
          {member.image_url && <img src={member.image_url} alt={member.name} className="w-10 h-10 rounded-full object-cover" />}
          <div>
            <h3 className="font-bold text-primary text-sm">{member.name}</h3>
            <p className="text-xs text-muted-foreground">{member.role}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={(e) => { e.stopPropagation(); deleteMutation.mutate({ id: member.id }); }} className="rounded-lg bg-destructive/10 px-2 py-1 text-xs text-destructive"><Trash2 size={14} /></button>
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
          <button onClick={() => updateMutation.mutate({ form, id: member.id })} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-bold text-primary-foreground"><Save size={14} /> Save</button>

          <div className="mt-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-foreground">Sectors</h4>
              <button onClick={() => addSectorMutation.mutate({ id: member.id, len: member.team_sectors?.length || 0 })} className="text-xs font-bold text-brand-blue flex items-center gap-1"><Plus size={12} /> Add</button>
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
    mutationFn: async ({ form, id }: any) => {
      const { error } = await supabase.from("team_sectors").update(form).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-team"] }); },
  });

  const del = useMutation({
    mutationFn: async ({ id }: any) => {
      const { error } = await supabase.from("team_sectors").delete().eq("id", id);
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
      <button onClick={() => update.mutate({ form, id: sector.id })} className="rounded-lg bg-primary/10 px-2 py-1.5 text-xs text-primary"><Save size={12} /></button>
      <button onClick={() => del.mutate({ id: sector.id })} className="rounded-lg bg-destructive/10 px-2 py-1.5 text-xs text-destructive"><Trash2 size={12} /></button>
    </div>
  );
};

export default TeamEditor;
