import { useState } from "react";
import { Mail, CheckCircle, Trash2, Clock, User } from "lucide-react";
import { toast } from "sonner";
import { contentStore } from "@/lib/contentStore";
import { useMessagesContent } from "@/hooks/useCMS";

const MessagesViewer = () => {
  const messages = useMessagesContent();
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");

  const filtered = messages.filter((m: any) => filter === "all" ? true : m.status === filter);

  const markRead = (id: string) => { contentStore.updateMessageStatus(id, "read"); toast.success("Marked as read"); };
  const deleteMsg = (id: string) => {
    const msgs = contentStore.getMessages().filter((m: any) => m.id !== id);
    localStorage.setItem("mk_cms_messages", JSON.stringify(msgs));
    window.dispatchEvent(new CustomEvent("mk_cms_update", { detail: { key: "messages" } }));
    toast.success("Message deleted");
  };

  const unreadCount = messages.filter((m: any) => m.status === "unread").length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-primary">Messages</h2>
          {unreadCount > 0 && (
            <p className="text-sm text-muted-foreground mt-1">{unreadCount} unread message{unreadCount > 1 ? "s" : ""}</p>
          )}
        </div>
        <div className="flex gap-2">
          {(["all", "unread", "read"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors ${filter === f ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:bg-secondary/80"}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-border p-12 text-center">
          <Mail size={40} className="mx-auto mb-3 text-muted-foreground opacity-30" />
          <p className="text-sm text-muted-foreground">No {filter === "all" ? "" : filter} messages yet.</p>
          <p className="text-xs text-muted-foreground mt-1">Messages from the contact form will appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((msg: any) => (
            <div key={msg.id}
              className={`rounded-2xl border p-5 transition-all ${msg.status === "unread" ? "border-primary/30 bg-primary/5" : "border-border bg-card"}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-foreground">{msg.name}</span>
                    {msg.status === "unread" && (
                      <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">NEW</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground flex-wrap">
                    <span className="flex items-center gap-1"><Mail size={11} />{msg.email}</span>
                    {msg.phone && <span className="flex items-center gap-1"><User size={11} />{msg.phone}</span>}
                    {msg.created_at && (
                      <span className="flex items-center gap-1"><Clock size={11} />
                        {new Date(msg.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-sm text-foreground/80 leading-relaxed">{msg.message}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  {msg.status === "unread" && (
                    <button onClick={() => markRead(msg.id)}
                      className="rounded-lg bg-green-50 p-2 text-green-600 hover:bg-green-100 transition-colors" title="Mark as read">
                      <CheckCircle size={16} />
                    </button>
                  )}
                  <button onClick={() => deleteMsg(msg.id)}
                    className="rounded-lg bg-destructive/10 p-2 text-destructive hover:bg-destructive/20 transition-colors" title="Delete">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessagesViewer;
