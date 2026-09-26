import { useState } from "react";
import { Save, Plus, Trash2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { contentStore, DEFAULTS } from "@/lib/contentStore";
import { useBlogPostsContent } from "@/hooks/useCMS";
import ImageUploadInput from "@/components/admin/ImageUploadInput";

type BlogPost = { id: string; title: string; slug: string; excerpt: string; content: string; category: string; author: string; is_published: boolean; is_featured: boolean; thumbnail_url?: string; published_at?: string };

const BlogEditor = () => {
  const dbPosts = useBlogPostsContent();
  const [posts, setPosts] = useState<BlogPost[]>(dbPosts);
  const [editingId, setEditingId] = useState<string | null>(null);

  const saveAll = () => { contentStore.setBlogPosts(posts); toast.success("Blog posts updated! Changes are live."); };

  const add = () => {
    const id = crypto.randomUUID();
    const newPost: BlogPost = {
      id, title: "New Post", slug: `new-post-${Date.now()}`, excerpt: "", content: "", category: "News",
      author: "MK Communications Team", is_published: false, is_featured: false,
      published_at: new Date().toISOString().split("T")[0],
    };
    setPosts([newPost, ...posts]);
    setEditingId(id);
  };

  const remove = (id: string) => setPosts(posts.filter((p) => p.id !== id));
  const update = (id: string, field: keyof BlogPost, val: any) =>
    setPosts(posts.map((p) => p.id === id ? { ...p, [field]: val } : p));
  const toggle = (id: string, field: "is_published" | "is_featured") =>
    setPosts(posts.map((p) => p.id === id ? { ...p, [field]: !p[field] } : p));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-extrabold text-primary">Blog Posts</h2>
        <button onClick={add} className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"><Plus size={16} /> New Post</button>
      </div>
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="rounded-2xl bg-card border border-border overflow-hidden">
            {/* List view header */}
            <div className="flex items-center gap-4 p-5 cursor-pointer hover:bg-secondary/20 transition-colors"
              onClick={() => setEditingId(editingId === post.id ? null : post.id)}>
              {post.thumbnail_url ? (
                <img src={post.thumbnail_url} alt="" className="w-12 h-12 rounded-lg object-cover border border-border shrink-0" />
              ) : (
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground text-xs font-bold shrink-0">
                  No Img
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-foreground truncate">{post.title}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{post.category} · {post.author}</div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${post.is_published ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                  {post.is_published ? "Published" : "Draft"}
                </span>
                {post.is_featured && <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-primary/10 text-primary">Featured</span>}
              </div>
            </div>

            {/* Edit form (expanded) */}
            {editingId === post.id && (
              <div className="border-t border-border p-5 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">Title</label>
                    <input value={post.title} onChange={(e) => update(post.id, "title", e.target.value)}
                      className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">Slug (URL)</label>
                    <input value={post.slug} onChange={(e) => update(post.id, "slug", e.target.value)}
                      className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm font-mono" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">Category</label>
                    <input value={post.category} onChange={(e) => update(post.id, "category", e.target.value)}
                      className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">Author</label>
                    <input value={post.author} onChange={(e) => update(post.id, "author", e.target.value)}
                      className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">Published Date</label>
                    <input type="date" value={post.published_at || ""} onChange={(e) => update(post.id, "published_at", e.target.value)}
                      className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm" />
                  </div>
                </div>
                
                {/* Image Upload Input */}
                <ImageUploadInput
                  label="Thumbnail Image"
                  value={post.thumbnail_url || ""}
                  onChange={(url) => update(post.id, "thumbnail_url", url)}
                  placeholder="https://... or upload thumbnail"
                  previewHeight="h-36"
                />

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">Excerpt (short summary)</label>
                  <textarea value={post.excerpt} onChange={(e) => update(post.id, "excerpt", e.target.value)} rows={2}
                    className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">Content (full article)</label>
                  <textarea value={post.content} onChange={(e) => update(post.id, "content", e.target.value)} rows={8}
                    className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm font-mono" />
                </div>
                <div className="flex items-center gap-4 pt-2">
                  <button onClick={() => toggle(post.id, "is_published")}
                    className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold transition-colors ${post.is_published ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-amber-100 text-amber-700 hover:bg-amber-200"}`}>
                    {post.is_published ? <><Eye size={13} /> Published</> : <><EyeOff size={13} /> Draft</>}
                  </button>
                  <button onClick={() => toggle(post.id, "is_featured")}
                    className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold transition-colors ${post.is_featured ? "bg-primary/10 text-primary hover:bg-primary/20" : "bg-secondary text-muted-foreground hover:bg-secondary/80"}`}>
                    {post.is_featured ? "★ Featured" : "☆ Not Featured"}
                  </button>
                  <div className="flex-1" />
                  <button onClick={() => remove(post.id)}
                    className="inline-flex items-center gap-1 rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive hover:bg-destructive/20">
                    <Trash2 size={13} /> Delete Post
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 flex gap-3">
        <button onClick={saveAll} className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:bg-brand-navy-dark transition-colors">
          <Save size={16} /> Save All Posts
        </button>
        <button onClick={() => { setPosts(DEFAULTS.blog_posts); contentStore.setBlogPosts(DEFAULTS.blog_posts); toast.success("Reset!"); }}
          className="inline-flex items-center gap-2 rounded-xl bg-secondary px-4 py-3 text-sm font-medium text-foreground hover:bg-secondary/80 transition-colors">
          Reset to Defaults
        </button>
      </div>
    </div>
  );
};

export default BlogEditor;
