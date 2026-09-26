import { useState } from "react";
import { Save, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { contentStore, DEFAULTS } from "@/lib/contentStore";
import { useStatsContent } from "@/hooks/useCMS";
import IconPicker from "@/components/admin/IconPicker";

type Stat = { id: string; icon_name: string; value: string; label: string; sort_order: number };

const StatsEditor = () => {
  const dbStats = useStatsContent();
  const [stats, setStats] = useState<Stat[]>(dbStats);

  const saveAll = () => {
    contentStore.setStats(stats);
    toast.success("Stats updated! Changes are live.");
  };

  const addStat = () => {
    setStats([...stats, { id: crypto.randomUUID(), icon_name: "Award", value: "0+", label: "New Stat", sort_order: stats.length }]);
  };

  const deleteStat = (id: string) => setStats(stats.filter((s) => s.id !== id));

  const updateStat = (id: string, field: keyof Stat, value: string) => {
    setStats(stats.map((s) => s.id === id ? { ...s, [field]: value } : s));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-primary">Key Statistics</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Customize statistics, numbers, labels, and icons (built-in, URL, or upload).</p>
        </div>
        <button onClick={addStat} className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">
          <Plus size={16} /> Add Stat
        </button>
      </div>
      <div className="space-y-4">
        {stats.map((stat) => (
          <div key={stat.id} className="rounded-2xl bg-card border border-border p-5">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
              <div>
                <IconPicker
                  label="Icon (Library / URL / Upload)"
                  value={stat.icon_name}
                  onChange={(val) => updateStat(stat.id, "icon_name", val)}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">Value (e.g. 120+, ₨ 18B)</label>
                <input value={stat.value} onChange={(e) => updateStat(stat.id, "value", e.target.value)}
                  className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">Label</label>
                <input value={stat.label} onChange={(e) => updateStat(stat.id, "label", e.target.value)}
                  className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm" />
              </div>
              <div className="flex items-center justify-end md:mt-6">
                <button onClick={() => deleteStat(stat.id)}
                  className="rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive hover:bg-destructive/20 inline-flex items-center gap-1">
                  <Trash2 size={14} /> Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex gap-3">
        <button onClick={saveAll}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:bg-brand-navy-dark transition-colors">
          <Save size={16} /> Save All Stats
        </button>
        <button onClick={() => { setStats(DEFAULTS.stats); contentStore.setStats(DEFAULTS.stats); toast.success("Reset to defaults!"); }}
          className="inline-flex items-center gap-2 rounded-xl bg-secondary px-4 py-3 text-sm font-medium text-foreground hover:bg-secondary/80 transition-colors">
          Reset to Defaults
        </button>
      </div>
    </div>
  );
};

export default StatsEditor;
