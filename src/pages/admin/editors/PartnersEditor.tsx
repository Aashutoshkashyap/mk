import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Save, Plus, Trash2, LayoutGrid, List } from "lucide-react";
import { toast } from "sonner";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { BulkImageUpload } from "@/components/admin/BulkImageUpload";

const PartnersEditor = () => {
  const qc = useQueryClient();
  const [view, setView] = useState<"grid" | "list">("grid");

  const { data: partners = [], isLoading } = useQuery({
    queryKey: ["partners"],
    queryFn: async () => {
      const { data } = await supabase.from("partners").select("*").order("sort_order");
      return data || [];
    },
  });

  const addPartner = useMutation({
    mutationFn: async (partnerData?: { name: string, logo_url: string }) => {
      const { error } = await supabase.from("partners").insert({ 
        name: partnerData?.name || "New Partner", 
        logo_url: partnerData?.logo_url || "https://via.placeholder.com/150", 
        sort_order: partners.length 
      });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["partners"] });
      toast.success("Partner added!");
    },
  });

  const handleBulkUpload = async (urls: string[]) => {
    try {
      const newPartners = urls.map((url, index) => ({
        name: `New Partner ${new Date().toLocaleDateString()}`,
        logo_url: url,
        sort_order: partners.length + index
      }));

      const { error } = await supabase.from("partners").insert(newPartners);
      if (error) throw error;
      
      qc.invalidateQueries({ queryKey: ["partners"] });
      toast.success(`Successfully added ${urls.length} new partners!`);
    } catch (error: any) {
      console.error("Failed to save bulk partners", error);
      toast.error(error.message || "Failed to save partners to database");
    }
  };

  if (isLoading) return <div className="animate-pulse h-40 bg-secondary rounded-xl" />;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-primary tracking-tight">Clients & Partners</h2>
          <p className="text-sm text-muted-foreground mt-1.5 flex items-center gap-2">
            Manage the logos displayed in the marquee section.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-secondary/50 p-1.5 rounded-xl border border-border">
            <button 
              onClick={() => setView("grid")} 
              className={`p-1.5 rounded-lg transition-all ${view === "grid" ? "bg-white shadow-sm text-primary" : "text-muted-foreground hover:text-primary"}`}
              title="Grid View"
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              onClick={() => setView("list")} 
              className={`p-1.5 rounded-lg transition-all ${view === "list" ? "bg-white shadow-sm text-primary" : "text-muted-foreground hover:text-primary"}`}
              title="List View"
            >
              <List size={18} />
            </button>
          </div>
          <button 
            onClick={() => addPartner.mutate(undefined)} 
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground hover:bg-brand-navy-dark transition-all shadow-lg shadow-primary/10"
          >
            <Plus size={20} /> Add One
          </button>
        </div>
      </div>

      {/* Bulk Upload Area */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
        <BulkImageUpload onUploadComplete={handleBulkUpload} folder="partners" />
      </div>

      <div className={view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
        {partners.map((partner: any) => (
          <PartnerCard key={partner.id} partner={partner} view={view} />
        ))}
      </div>
    </div>
  );
};

const PartnerCard = ({ partner, view }: { partner: any; view: "grid" | "list" }) => {
  const qc = useQueryClient();
  const [form, setForm] = useState({ name: partner.name, logo_url: partner.logo_url });

  const updatePartner = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("partners").update(form).eq("id", partner.id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["partners"] });
      toast.success("Partner updated!");
    },
  });

  const deletePartner = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("partners").delete().eq("id", partner.id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["partners"] });
      toast.success("Partner removed");
    },
  });

  if (view === "list") {
    return (
      <div className="flex items-center gap-4 bg-card border border-border p-3 rounded-xl">
        <div className="w-12 h-12 bg-secondary rounded-lg overflow-hidden flex items-center justify-center p-2 shrink-0">
          <img src={partner.logo_url} alt={partner.name} className="max-w-full max-h-full object-contain" />
        </div>
        <input 
          value={form.name} 
          onChange={(e) => setForm({ ...form, name: e.target.value })} 
          className="flex-1 bg-transparent border-none text-sm font-bold focus:ring-0" 
        />
        <div className="flex items-center gap-2">
          <button onClick={() => updatePartner.mutate()} className="p-2 text-brand-blue hover:bg-brand-blue/10 rounded-lg">
            <Save size={16} />
          </button>
          <button onClick={() => deletePartner.mutate()} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="group rounded-2xl bg-card border border-border overflow-hidden transition-all hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5">
      <div className="p-6">
        <ImageUpload 
          label="Partner Logo" 
          value={form.logo_url} 
          onChange={(url) => {
            setForm({ ...form, logo_url: url });
            // Auto save when image changes
            supabase.from("partners").update({ logo_url: url }).eq("id", partner.id).then(() => {
              qc.invalidateQueries({ queryKey: ["partners"] });
            });
          }} 
          folder="partners"
        />
        
        <div className="mt-4 space-y-4">
          <div>
            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1.5 block">Partner Name</label>
            <input 
              value={form.name} 
              onChange={(e) => setForm({ ...form, name: e.target.value })} 
              className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-2.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20" 
            />
          </div>
          
          <div className="flex gap-2 pt-2">
            <button 
              onClick={() => updatePartner.mutate()} 
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary/5 px-4 py-2.5 text-xs font-bold text-primary hover:bg-primary/10 transition-colors"
            >
              <Save size={14} /> Save Changes
            </button>
            <button 
              onClick={() => deletePartner.mutate()} 
              className="inline-flex items-center justify-center rounded-xl bg-destructive/5 px-4 py-2.5 text-xs font-bold text-destructive hover:bg-destructive/10 transition-colors"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnersEditor;
