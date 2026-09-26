import { useState } from "react";
import { Save, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { contentStore, DEFAULTS } from "@/lib/contentStore";
import { useFaqsContent } from "@/hooks/useCMS";

type FAQ = { id: string; question: string; answer: string; sort_order: number };

const FAQEditor = () => {
  const dbFaqs = useFaqsContent();
  const [faqs, setFaqs] = useState<FAQ[]>(dbFaqs);

  const saveAll = () => { contentStore.setFaqs(faqs); toast.success("FAQs updated! Changes are live."); };
  const add = () => setFaqs([...faqs, { id: crypto.randomUUID(), question: "New Question?", answer: "Answer here.", sort_order: faqs.length }]);
  const remove = (id: string) => setFaqs(faqs.filter((f) => f.id !== id));
  const update = (id: string, field: keyof FAQ, val: string) =>
    setFaqs(faqs.map((f) => f.id === id ? { ...f, [field]: val } : f));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-extrabold text-primary">FAQs</h2>
        <button onClick={add} className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"><Plus size={16} /> Add FAQ</button>
      </div>
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={faq.id} className="rounded-2xl bg-card border border-border p-5 space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-muted-foreground">#{idx + 1}</span>
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">Question</label>
              <input value={faq.question} onChange={(e) => update(faq.id, "question", e.target.value)}
                className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">Answer</label>
              <textarea value={faq.answer} onChange={(e) => update(faq.id, "answer", e.target.value)} rows={3}
                className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm" />
            </div>
            <div className="flex justify-end">
              <button onClick={() => remove(faq.id)}
                className="inline-flex items-center gap-1 rounded-lg bg-destructive/10 px-3 py-1.5 text-xs text-destructive hover:bg-destructive/20">
                <Trash2 size={13} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex gap-3">
        <button onClick={saveAll} className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:bg-brand-navy-dark transition-colors">
          <Save size={16} /> Save All FAQs
        </button>
        <button onClick={() => { setFaqs(DEFAULTS.faqs); contentStore.setFaqs(DEFAULTS.faqs); toast.success("Reset!"); }}
          className="inline-flex items-center gap-2 rounded-xl bg-secondary px-4 py-3 text-sm font-medium text-foreground hover:bg-secondary/80 transition-colors">
          Reset to Defaults
        </button>
      </div>
    </div>
  );
};

export default FAQEditor;
