import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Save, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import iconMap from "@/lib/iconMap";

const ContactEditor = () => {
  const qc = useQueryClient();
  const { data: items = [], isLoading } = useQuery({
    queryKey: ["admin-contact"],
    queryFn: async () => {
      const { data } = await supabase.from("contact_info").select("*").order("sort_order");
      return data || [];
    },
  });

  const addMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("contact_info").insert({ icon_name: "Mail", title: "New Contact", details: ["Detail"], sort_order: items.length });
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-contact"] }); toast.success("Added!"); },
    onError: (e: any) => toast.error(e.message),
  });

  if (isLoading) return <div className="animate-pulse h-40 bg-secondary rounded-xl" />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-extrabold text-primary">Contact Info</h2>
        <button onClick={() => addMutation.mutate()} className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">
          <Plus size={16} /> Add
        </button>
      </div>
      <div className="space-y-4">
        {items.map((item: any) => <ContactCard key={item.id} item={item} />)}
      </div>
    </div>
  );
};

const ContactCard = ({ item }: { item: any }) => {
  const qc = useQueryClient();
  const [form, setForm] = useState({
    icon_name: item.icon_name, title: item.title,
    details: (item.details || []).join("\n"),
    action_label: item.action_label || "", action_href: item.action_href || "",
  });

  const updateMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("contact_info").update({
        icon_name: form.icon_name, title: form.title,
        details: form.details.split("\n").filter(Boolean),
        action_label: form.action_label || null, action_href: form.action_href || null,
      }).eq("id", item.id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-contact"] }); toast.success("Updated!"); },
    onError: (e: any) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("contact_info").delete().eq("id", item.id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-contact"] }); toast.success("Deleted!"); },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <div className="rounded-2xl bg-card border border-border p-5 space-y-3">
      <div className="grid grid-cols-3 gap-4">
        <div><label className="block text-xs font-semibold mb-1">Icon</label>
          <select value={form.icon_name} onChange={(e) => setForm({ ...form, icon_name: e.target.value })} className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm">
            {Object.keys(iconMap).map((k) => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>
        <div><label className="block text-xs font-semibold mb-1">Title</label><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm" /></div>
        <div className="flex items-end gap-2">
          <button onClick={() => updateMutation.mutate()} className="rounded-lg bg-primary px-3 py-2 text-xs font-bold text-primary-foreground"><Save size={14} /></button>
          <button onClick={() => deleteMutation.mutate()} className="rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive"><Trash2 size={14} /></button>
        </div>
      </div>
      <div><label className="block text-xs font-semibold mb-1">Details (one per line)</label><textarea value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} rows={3} className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm" /></div>
      <div className="grid grid-cols-2 gap-4">
        <div><label className="block text-xs font-semibold mb-1">Action Label</label><input value={form.action_label} onChange={(e) => setForm({ ...form, action_label: e.target.value })} className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm" /></div>
        <div><label className="block text-xs font-semibold mb-1">Action Href</label><input value={form.action_href} onChange={(e) => setForm({ ...form, action_href: e.target.value })} className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm" /></div>
      </div>
    </div>
  );
};

export default ContactEditor;
