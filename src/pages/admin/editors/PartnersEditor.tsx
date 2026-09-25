import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { Save, Plus, Trash2, LayoutGrid, List, GripVertical } from "lucide-react";
import { toast } from "sonner";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { BulkImageUpload } from "@/components/admin/BulkImageUpload";

const PartnersEditor = () => {
  const qc = useQueryClient();
  const [view, setView] = useState<"grid" | "list">("grid");

  const { data: settings = {}, isLoading: settingsLoading } = useQuery({
    queryKey: ["site_settings"],
    queryFn: async () => {
      const { data } = await supabase.from("site_settings").select("*").eq("id", "00000000-0000-0000-0000-000000000000").maybeSingle();
      return data || {};
    }
  });

  const [headingConfig, setHeadingConfig] = useState({ 
    heading: "", 
    subheading: "",
    padding: "py-24"
  });

  useEffect(() => {
    if ((settings as any)?.section_visibility?.partners_config) {
      setHeadingConfig((settings as any).section_visibility.partners_config);
    }
  }, [settings]);

  const saveConfig = useMutation({
    mutationFn: async () => {
      const currentVisibility = (settings as any)?.section_visibility || {};
      const { error } = await supabase
        .from("site_settings")
        .update({ 
          section_visibility: { 
            ...currentVisibility, 
            partners_config: headingConfig 
          } 
        } as any)
        .eq("id", "00000000-0000-0000-0000-000000000000");
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["site_settings"] });
      toast.success("Partners heading updated!");
    },
    onError: (e: any) => toast.error(e.message)
  });

  const defaultPartners = [
    { id: 'p1', name: 'Metropolitan Transit Authority', logo_url: '', sort_order: 0 },
    { id: 'p2', name: 'Apex Real Estate Consortium', logo_url: '', sort_order: 1 },
    { id: 'p3', name: 'Holcim Infrastructure', logo_url: '', sort_order: 2 },
    { id: 'p4', name: 'Caterpillar Heavy Systems', logo_url: '', sort_order: 3 },
    { id: 'p5', name: 'Skanska Global Alliance', logo_url: '', sort_order: 4 },
    { id: 'p6', name: 'Vanguard Logistics Hubs', logo_url: '', sort_order: 5 },
    { id: 'p7', name: 'Trimble BIM Technologies', logo_url: '', sort_order: 6 },
    { id: 'p8', name: 'National Highway Authority', logo_url: '', sort_order: 7 },
    { id: 'p9', name: 'Balfour Civil Engineering', logo_url: '', sort_order: 8 },
  ];

  const { data: partners = [], isLoading } = useQuery({
    queryKey: ["partners"],
    queryFn: async () => {
      const { data } = await supabase.from("partners").select("*").order("sort_order");
      return data || [];
    },
  });

  const displayPartners = partners.length > 0 ? partners : defaultPartners;

  const addPartner = useMutation({
    mutationFn: async ({ partnerData, len }: any = {}) => {
      const { error } = await supabase.from("partners").insert({ 
        name: partnerData?.name || "New Partner", 
        logo_url: partnerData?.logo_url || "https://via.placeholder.com/150", 
        sort_order: len || 0
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
        sort_order: displayPartners.length + index
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

  const updateOrderMutation = useMutation({
    mutationFn: async (items: any[]) => {
      const promises = items.map((item, index) => 
        supabase.from("partners").upsert({ ...item, sort_order: index })
      );
      await Promise.all(promises);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["partners"] });
    }
  });

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(displayPartners);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    qc.setQueryData(["partners"], items);
    updateOrderMutation.mutate(items);
  };

  if (isLoading || settingsLoading) return <div className="animate-pulse h-40 bg-secondary rounded-xl" />;

  const currentHeading = headingConfig.heading || (settings as any)?.section_visibility?.partners_config?.heading || "The Companies We Serve";
  const currentSubheading = headingConfig.subheading || (settings as any)?.section_visibility?.partners_config?.subheading || "We work with top industry experts.";

  return (
    <div className="space-y-8 pb-20">
      {/* Section Content Configuration */}
      <div className="bg-card rounded-3xl border border-border p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
            <LayoutGrid size={20} />
          </div>
          <div>
            <h3 className="font-display text-lg font-bold text-primary">Section Content</h3>
            <p className="text-xs text-muted-foreground">Manage the text displayed on the public site.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">Heading</label>
            <input 
              value={headingConfig.heading || ""} 
              onChange={(e) => setHeadingConfig({ ...headingConfig, heading: e.target.value })}
              className="w-full rounded-2xl border border-border bg-secondary/30 px-5 py-3 text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none"
              placeholder={currentHeading}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">Subheading</label>
            <input 
              value={headingConfig.subheading || ""} 
              onChange={(e) => setHeadingConfig({ ...headingConfig, subheading: e.target.value })}
              className="w-full rounded-2xl border border-border bg-secondary/30 px-5 py-3 text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none"
              placeholder={currentSubheading}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">Section Spacing</label>
            <select 
              value={headingConfig.padding || "py-24"} 
              onChange={(e) => setHeadingConfig({ ...headingConfig, padding: e.target.value })}
              className="w-full rounded-2xl border border-border bg-secondary/30 px-5 py-3 text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none"
            >
              <option value="py-12">Compact (Small)</option>
              <option value="py-24">Regular (Normal)</option>
              <option value="py-32">Spacious (Large)</option>
              <option value="py-44">Elegant (Huge)</option>
            </select>
          </div>
        </div>

        <button 
          onClick={() => saveConfig.mutate()} 
          disabled={saveConfig.isPending}
          className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:bg-brand-navy-dark transition-all disabled:opacity-50"
        >
          {saveConfig.isPending ? "Saving..." : <><Save size={18} /> Update Section Text</>}
        </button>
      </div>

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
            onClick={() => addPartner.mutate({ len: partners.length })} 
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

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="partners-list" direction={view === "grid" ? "horizontal" : "vertical"}>
          {(provided) => (
            <div 
              {...provided.droppableProps} 
              ref={provided.innerRef} 
              className={view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}
            >
              {displayPartners.map((partner: any, index: number) => (
                <Draggable key={partner.id} draggableId={partner.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`${snapshot.isDragging ? "z-50 relative shadow-2xl ring-1 ring-primary/20 rounded-2xl" : ""}`}
                    >
                      <PartnerCard partner={partner} view={view} dragHandleProps={provided.dragHandleProps} />
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

const PartnerCard = ({ partner, view, dragHandleProps }: { partner: any; view: "grid" | "list", dragHandleProps?: any }) => {
  const qc = useQueryClient();
  const [form, setForm] = useState({ name: partner.name, logo_url: partner.logo_url });

  const updatePartner = useMutation({
    mutationFn: async ({ form, id }: any) => {
      const isCustomId = typeof id === "string" && id.startsWith("p");
      const { error } = await supabase.from("partners").upsert({
        ...(isCustomId ? {} : { id }),
        ...form
      });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["partners"] });
      toast.success("Partner updated!");
    },
  });

  const deletePartner = useMutation({
    mutationFn: async ({ id }: any) => {
      const { error } = await supabase.from("partners").delete().eq("id", id);
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
        <div {...dragHandleProps} className="cursor-grab text-muted-foreground/30 hover:text-primary transition-colors p-1 rounded-lg hover:bg-secondary">
          <GripVertical size={20} />
        </div>
        <div className="w-12 h-12 bg-secondary rounded-lg overflow-hidden flex items-center justify-center p-2 shrink-0">
          <img src={partner.logo_url} alt={partner.name} className="max-w-full max-h-full object-contain" />
        </div>
        <input 
          value={form.name} 
          onChange={(e) => setForm({ ...form, name: e.target.value })} 
          className="flex-1 bg-transparent border-none text-sm font-bold focus:ring-0" 
        />
        <div className="flex items-center gap-2">
          <button onClick={() => updatePartner.mutate({ form, id: partner.id })} className="p-2 text-brand-blue hover:bg-brand-blue/10 rounded-lg">
            <Save size={16} />
          </button>
          <button onClick={() => deletePartner.mutate({ id: partner.id })} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="group rounded-2xl bg-card border border-border overflow-hidden transition-all hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 relative">
      <div {...dragHandleProps} className="absolute top-3 right-3 p-1.5 bg-background/80 backdrop-blur-md rounded-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-grab z-10 text-muted-foreground hover:text-primary shadow-sm border border-border">
        <GripVertical size={16} />
      </div>
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
              onClick={() => updatePartner.mutate({ form, id: partner.id })} 
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary/5 px-4 py-2.5 text-xs font-bold text-primary hover:bg-primary/10 transition-colors"
            >
              <Save size={14} /> Save Changes
            </button>
            <button 
              onClick={() => deletePartner.mutate({ id: partner.id })} 
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
