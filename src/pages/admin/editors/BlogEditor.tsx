import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Save, Plus, Trash2, Eye, EyeOff, Star, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";

const BlogEditor = () => {
  const qc = useQueryClient();
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["admin-blogs"],
    queryFn: async () => {
      const { data } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
      return data || [];
    },
  });

  const addMutation = useMutation({
    mutationFn: async () => {
      const slug = `new-post-${Date.now()}`;
      const { error } = await supabase.from("blog_posts").insert({ title: "New Blog Post", slug, content: "Write your content here...", category: "General", author: "Admin" });
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-blogs"] }); toast.success("Post created!"); },
  });

  if (isLoading) return <div className="animate-pulse h-40 bg-secondary rounded-xl" />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-extrabold text-primary">Blog Posts</h2>
        <button onClick={() => addMutation.mutate()} className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">
          <Plus size={16} /> New Post
        </button>
      </div>
      <div className="space-y-4">
        {posts.map((post: any) => <BlogPostCard key={post.id} post={post} />)}
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
    mutationFn: async () => {
      const { error } = await supabase.from("blog_posts").update({
        ...form, views: Number(form.views),
        published_at: form.published_at ? new Date(form.published_at).toISOString() : null,
      }).eq("id", post.id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-blogs"] }); toast.success("Post updated!"); },
    onError: (e: any) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("blog_posts").delete().eq("id", post.id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-blogs"] }); toast.success("Post deleted!"); },
  });

  return (
    <div className="rounded-2xl bg-card border border-border overflow-hidden">
      <div className="p-5 flex items-center justify-between cursor-pointer" onClick={() => setOpen(!open)}>
        <div className="flex items-center gap-3">
          {post.thumbnail_url && <img src={post.thumbnail_url} alt="" className="w-12 h-8 rounded-lg object-cover" />}
          <div>
            <h3 className="font-bold text-primary text-sm">{post.title}</h3>
            <div className="flex items-center gap-2 mt-0.5">
              {post.is_published ? <span className="text-xs text-brand-green flex items-center gap-1"><Eye size={10} /> Published</span> : <span className="text-xs text-muted-foreground flex items-center gap-1"><EyeOff size={10} /> Draft</span>}
              {post.is_featured && <span className="text-xs text-amber-500 flex items-center gap-1"><Star size={10} /> Featured</span>}
              <span className="text-xs text-muted-foreground">{post.views} views</span>
            </div>
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
            <div><label className="block text-xs font-semibold mb-1">Title</label><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm" /></div>
            <div><label className="block text-xs font-semibold mb-1">Slug</label><input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm" /></div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div><label className="block text-xs font-semibold mb-1">Category</label><input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm" /></div>
            <div><label className="block text-xs font-semibold mb-1">Author</label><input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm" /></div>
            <div><label className="block text-xs font-semibold mb-1">Published Date</label><input type="date" value={form.published_at} onChange={(e) => setForm({ ...form, published_at: e.target.value })} className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm" /></div>
          </div>
          <div><label className="block text-xs font-semibold mb-1">Excerpt</label><textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm" /></div>
          <div><label className="block text-xs font-semibold mb-1">Thumbnail URL</label><input value={form.thumbnail_url} onChange={(e) => setForm({ ...form, thumbnail_url: e.target.value })} className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm" /></div>
          <div><label className="block text-xs font-semibold mb-1">Content (paragraphs separated by blank lines)</label><textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={8} className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm font-mono" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-xs font-semibold mb-1">Image 1 URL (after 2nd paragraph)</label><input value={form.image_1_url} onChange={(e) => setForm({ ...form, image_1_url: e.target.value })} className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm" /></div>
            <div><label className="block text-xs font-semibold mb-1">Image 2 URL (after 4th paragraph)</label><input value={form.image_2_url} onChange={(e) => setForm({ ...form, image_2_url: e.target.value })} className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm" /></div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1">Base / Total Views</label>
              <input type="number" value={form.views} onChange={(e) => setForm({ ...form, views: parseInt(e.target.value) || 0 })} className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm" />
            </div>
            <div className="flex items-end gap-4">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} className="rounded" />
                Published
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} className="rounded" />
                Featured
              </label>
            </div>
          </div>
          <button onClick={() => updateMutation.mutate()} disabled={updateMutation.isPending}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:bg-brand-navy-dark transition-colors disabled:opacity-50">
            <Save size={16} /> {updateMutation.isPending ? "Saving..." : "Save Post"}
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogEditor;
