import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState, useRef } from "react";
import { Save, Plus, Trash2, Eye, EyeOff, Star, ChevronDown, ChevronUp, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { ImageUpload } from "@/components/admin/ImageUpload";

const BlogEditor = () => {
  const qc = useQueryClient();
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["admin-blogs"],
    queryFn: async () => {
      const { data, error } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  const addMutation = useMutation({
    mutationFn: async ({ slug }: any) => {
      const { error } = await supabase.from("blog_posts").insert({ 
        title: "New Blog Post", 
        slug, 
        content: "Write your content here...", 
        category: "General", 
        author: "Admin",
        is_published: false,
        is_featured: false
      });
      if (error) throw error;
    },
    onSuccess: () => { 
      qc.invalidateQueries({ queryKey: ["admin-blogs"] }); 
      toast.success("New blog draft created!"); 
    },
    onError: (e: any) => toast.error(e.message),
  });

  if (isLoading && !posts.length) return <div className="animate-pulse h-40 bg-secondary rounded-xl" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-primary">Blog Posts</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage your website's articles and news</p>
        </div>
        <button 
          onClick={() => {
            const uniqueSuffix = Math.random().toString(36).substring(2, 7);
            const slug = `new-post-${uniqueSuffix}`;
            addMutation.mutate({ slug });
          }} 
          disabled={addMutation.isPending}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground hover:bg-brand-navy-dark transition-all disabled:opacity-50 shadow-md shadow-primary/20"
        >
          <Plus size={18} /> {addMutation.isPending ? "Creating..." : "New Post"}
        </button>
      </div>

      <div className="grid gap-4">
        {posts.map((post: any) => <BlogPostCard key={post.id} post={post} />)}
        {posts.length === 0 && (
          <div className="text-center py-20 bg-secondary/20 rounded-3xl border border-dashed border-border text-muted-foreground">
            No blog posts found. Click "New Post" to start writing!
          </div>
        )}
      </div>
    </div>
  );
};

const BlogPostCard = ({ post }: { post: any }) => {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: post.title, slug: post.slug, excerpt: post.excerpt || "", thumbnail_url: post.thumbnail_url || "",
    category: post.category || "", author: post.author || "", content: post.content || "",
    image_1_url: post.image_1_url || "", image_2_url: post.image_2_url || "",
    views: post.views || 0, is_featured: post.is_featured, is_published: post.is_published,
    published_at: post.published_at ? post.published_at.slice(0, 10) : "",
  });

  const updateMutation = useMutation({
    mutationFn: async ({ form, id }: any) => {
      if (!form.slug.trim()) throw new Error("Slug is required");
      const payload = {
        ...form,
        views: Number(form.views),
        published_at: form.published_at ? new Date(form.published_at).toISOString() : null,
      };
      const { error } = await supabase.from("blog_posts").update(payload).eq("id", id);
      if (error) {
        if (error.code === "23505") throw new Error("A post with this slug already exists.");
        throw error;
      }
    },
    onSuccess: () => { 
      qc.invalidateQueries({ queryKey: ["admin-blogs"] }); 
      toast.success("Post saved!"); 
    },
    onError: (e: any) => toast.error(e.message),
  });

  const lastPostId = useRef(post.id);
  const lastSavedAt = useRef(Date.now());
  
  // When the mutation succeeds and data refetches, sync the form
  const isSaving = updateMutation.isPending;
  if (!isSaving && lastSavedAt.current < (post.updated_at ? new Date(post.updated_at).getTime() : 0)) {
    // Only sync if we aren't currently typing or saving
    // For simplicity, we'll just rely on the manual Save button for now, 
    // but the key is that qc.invalidateQueries triggers a rerender.
  }

  const deleteMutation = useMutation({
    mutationFn: async ({ id }: any) => {
      if (!window.confirm("Are you sure you want to delete this post? This cannot be undone.")) return;
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-blogs"] }); toast.success("Post deleted"); },
  });

  return (
    <div className={`rounded-3xl bg-card border transition-all ${open ? "border-primary/30 shadow-xl shadow-primary/5 ring-1 ring-primary/10" : "border-border hover:border-primary/20 shadow-sm"}`}>
      <div className="p-4 sm:p-5 flex items-center justify-between cursor-pointer" onClick={() => setOpen(!open)}>
        <div className="flex items-center gap-4">
          <div className="w-16 h-12 rounded-xl bg-secondary flex items-center justify-center shrink-0 overflow-hidden border border-border/50">
            {post.thumbnail_url ? <img src={post.thumbnail_url} alt="" className="w-full h-full object-cover" /> : <ImageIcon className="text-muted-foreground/40" size={20} />}
          </div>
          <div>
            <h3 className="font-bold text-primary text-base line-clamp-1">{post.title}</h3>
            <div className="flex items-center gap-3 mt-1">
              {post.is_published ? (
                <span className="text-[10px] uppercase tracking-wider font-bold bg-green-50 text-green-600 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-green-600 animate-pulse" /> Published
                </span>
              ) : (
                <span className="text-[10px] uppercase tracking-wider font-bold bg-secondary text-muted-foreground px-2 py-0.5 rounded-full flex items-center gap-1">
                  Draft
                </span>
              )}
              {post.is_featured && <span className="text-[10px] uppercase tracking-wider font-bold bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full">Featured</span>}
              <span className="text-xs text-muted-foreground">{post.views} views</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={(e) => { e.stopPropagation(); deleteMutation.mutate({ id: post.id }); }} 
            className="p-2 text-muted-foreground hover:text-destructive transition-colors hidden sm:block"
          >
            <Trash2 size={18} />
          </button>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${open ? "bg-primary text-primary-foreground" : "bg-primary/5 text-primary"}`}>
            {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </div>
      </div>
      
      {open && (
        <div className="px-5 pb-6 space-y-6 animate-in slide-in-from-top-2 duration-300">
          <div className="h-px bg-border w-full" />
          
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} placeholder="How to reach your business goals" />
                <Field label="URL Slug" value={form.slug} onChange={(v) => setForm({ ...form, slug: v })} placeholder="business-goals-2024" />
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Field label="Category" value={form.category} onChange={(v) => setForm({ ...form, category: v })} placeholder="Strategy" />
                <Field label="Author" value={form.author} onChange={(v) => setForm({ ...form, author: v })} placeholder="John Doe" />
                <Field label="Published Date" type="date" value={form.published_at} onChange={(v) => setForm({ ...form, published_at: v })} />
              </div>

              <div>
                <Field label="Short Excerpt" value={form.excerpt} onChange={(v) => setForm({ ...form, excerpt: v })} textarea rows={2} placeholder="A brief summary for cards..." />
              </div>
            </div>
            
            <div className="space-y-4">
              <ImageUpload
                label="Article Thumbnail"
                value={form.thumbnail_url}
                onChange={(url) => setForm({ ...form, thumbnail_url: url })}
                folder="blog"
              />
            </div>
          </div>

          <div className="h-px bg-border/50 w-full" />

          <div>
            <label className="block text-sm font-bold text-primary mb-2 flex items-center justify-between">
              Content Body
              <span className="text-[10px] text-muted-foreground font-normal normal-case">Tip: Separate paragraphs with blank lines</span>
            </label>
            <textarea 
              value={form.content} 
              onChange={(e) => setForm({ ...form, content: e.target.value })} 
              rows={12} 
              className="w-full rounded-2xl border border-border bg-secondary/20 px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="Start writing your article here..."
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-6 bg-secondary/5 pr-4 py-0 rounded-2xl border border-border/50">
            <div className="p-4 sm:p-5">
              <ImageUpload
                label="Inline Image 1 (After 2nd Paragraph)"
                value={form.image_1_url}
                onChange={(url) => setForm({ ...form, image_1_url: url })}
                folder="blog"
              />
            </div>
            <div className="p-4 sm:p-5">
              <ImageUpload
                label="Inline Image 2 (After 4th Paragraph)"
                value={form.image_2_url}
                onChange={(url) => setForm({ ...form, image_2_url: url })}
                folder="blog"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-6 pt-4 bg-secondary/10 -mx-5 -mb-6 px-5 py-5 border-t border-border">
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-3 text-sm font-semibold cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={form.is_published} 
                  onChange={(e) => setForm({ ...form, is_published: e.target.checked })} 
                  className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20" 
                />
                <span className="group-hover:text-primary transition-colors">Visible to Public</span>
              </label>
              <label className="flex items-center gap-3 text-sm font-semibold cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={form.is_featured} 
                  onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} 
                  className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20" 
                />
                <span className="group-hover:text-primary transition-colors">Featured Post</span>
              </label>
              <div className="flex items-center gap-2 pl-2 border-l border-border">
                <label className="text-xs font-bold text-muted-foreground whitespace-nowrap">Views</label>
                <input 
                  type="number" 
                  value={form.views} 
                  onChange={(e) => setForm({ ...form, views: parseInt(e.target.value) || 0 })} 
                  className="w-20 rounded-lg border border-border bg-card px-2 py-1 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-primary/10" 
                />
              </div>
            </div>
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
               <button 
                onClick={() => setOpen(false)} 
                className="flex-1 sm:flex-none rounded-xl px-4 py-2.5 text-sm font-bold text-muted-foreground hover:bg-secondary transition-colors"
              >
                Close
              </button>
              <button 
                onClick={() => updateMutation.mutate({ form, id: post.id })} 
                disabled={updateMutation.isPending}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-2.5 text-sm font-bold text-primary-foreground hover:bg-brand-navy-dark transition-all disabled:opacity-50 shadow-md shadow-primary/20"
              >
                <Save size={18} /> {updateMutation.isPending ? "Saving..." : "Save Post"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Field = ({ label, value, onChange, placeholder, type = "text", textarea, rows = 4 }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; textarea?: boolean; rows?: number }) => (
  <div className="space-y-1.5">
    <label className="text-xs font-bold text-primary uppercase tracking-wider">{label}</label>
    {textarea ? (
      <textarea 
        value={value || ""} 
        onChange={(e) => onChange(e.target.value)} 
        rows={rows} 
        placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-secondary/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none" 
      />
    ) : (
      <input 
        type={type}
        value={value || ""} 
        onChange={(e) => onChange(e.target.value)} 
        placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-secondary/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" 
      />
    )}
  </div>
);

export default BlogEditor;
