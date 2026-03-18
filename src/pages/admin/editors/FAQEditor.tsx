import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Save, Plus, Trash2, HelpCircle } from "lucide-react";
import { toast } from "sonner";

const FAQEditor = () => {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);

  const { data: faqs = [], isLoading, error } = useQuery({
    queryKey: ["faqs"],
    queryFn: async () => {
      const { data, error } = await supabase.from("faqs").select("*").order("sort_order");
      if (error) throw error;
      return data || [];
    },
  });

  const addMutation = useMutation({
    mutationFn: async () => {
      const newOrder = faqs.length > 0 ? Math.max(...faqs.map(f => f.sort_order)) + 1 : 0;
      const { error, data } = await supabase.from("faqs").insert([
        { question: "New Question", answer: "FAQ answer here", sort_order: newOrder }
      ]).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
      setEditingId(data.id);
      toast.success("FAQ added");
    },
    onError: () => toast.error("Failed to add FAQ")
  });

  const updateMutation = useMutation({
    mutationFn: async (updatedFaq: any) => {
      const { error } = await supabase.from("faqs").update(updatedFaq).eq("id", updatedFaq.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
      setEditingId(null);
      toast.success("FAQ updated successfully");
    },
    onError: () => toast.error("Failed to update FAQ")
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("faqs").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
      toast.success("FAQ deleted");
    },
    onError: () => toast.error("Failed to delete FAQ")
  });

  if (error) {
    return (
      <div className="rounded-2xl border border-destructive/20 bg-destructive/10 p-6 text-destructive flex items-start gap-4">
        <HelpCircle className="h-6 w-6 shrink-0" />
        <div>
          <h3 className="font-bold">Database Error</h3>
          <p className="text-sm opacity-90">Could not load FAQs. Make sure to run the migration SQL script.</p>
        </div>
      </div>
    );
  }

  if (isLoading) return <div className="p-8 text-center text-muted-foreground animate-pulse">Loading FAQs...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold font-display text-primary">Frequently Asked Questions</h2>
        <button
          onClick={() => addMutation.mutate()}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:bg-brand-navy-dark transition-all"
        >
          <Plus size={16} /> Add FAQ
        </button>
      </div>

      <div className="space-y-4">
        {faqs.map((f) => (
          <div key={f.id} className="rounded-xl border border-border bg-card p-5 group transition-all hover:border-primary/20 hover:shadow-md">
            {editingId === f.id ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  updateMutation.mutate({
                    id: f.id,
                    question: formData.get("question"),
                    answer: formData.get("answer"),
                  });
                }}
                className="space-y-4"
              >
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-foreground">Question</label>
                  <input name="question" defaultValue={f.question} required className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-foreground">Answer</label>
                  <textarea name="answer" defaultValue={f.answer} required rows={3} className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={() => setEditingId(null)} className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary">Cancel</button>
                  <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-brand-blue px-4 py-2 text-sm font-bold text-white hover:bg-brand-blue/90">
                    <Save size={16} /> Save FAQ
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex items-start gap-4">
                <div className="flex-1 space-y-1">
                  <h3 className="font-bold text-foreground">{f.question}</h3>
                  <p className="text-sm text-muted-foreground">{f.answer}</p>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => setEditingId(f.id)} className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground text-xs font-semibold">Edit</button>
                  <button onClick={() => window.confirm("Delete this FAQ?") && deleteMutation.mutate(f.id)} className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"><Trash2 size={16} /></button>
                </div>
              </div>
            )}
          </div>
        ))}
        {faqs.length === 0 && (
          <div className="text-center p-8 text-muted-foreground border border-dashed rounded-2xl font-medium">
            No FAQs found. Click "Add FAQ" to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQEditor;
