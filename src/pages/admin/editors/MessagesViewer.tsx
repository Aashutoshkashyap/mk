import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Mail, Trash2, CheckCircle2, Clock, Phone, User } from "lucide-react";

const MessagesViewer = () => {
  const queryClient = useQueryClient();

  const { data: messages = [], isLoading, error } = useQuery({
    queryKey: ["contact_submissions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from("contact_submissions")
        .update({ status })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact_submissions"] });
      toast.success("Message status updated");
    },
    onError: () => toast.error("Failed to update status"),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("contact_submissions")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact_submissions"] });
      toast.success("Message deleted");
    },
    onError: () => toast.error("Failed to delete message"),
  });

  if (error) {
    return (
      <div className="rounded-2xl border border-destructive/20 bg-destructive/10 p-6 text-destructive flex items-start gap-4">
        <Mail className="h-6 w-6 shrink-0" />
        <div>
          <h3 className="font-bold">Database Error</h3>
          <p className="text-sm opacity-90">Could not load messages. Make sure the 'contact_submissions' table exists.</p>
        </div>
      </div>
    );
  }

  if (isLoading) return <div className="p-8 text-center text-muted-foreground animate-pulse">Loading messages...</div>;

  if (messages.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-12 text-center text-muted-foreground">
        <Mail className="mx-auto h-12 w-12 opacity-20 mb-4" />
        <h3 className="text-lg font-medium text-foreground">No messages yet</h3>
        <p className="mt-1">When visitors use the contact form, their messages will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold font-display text-primary flex items-center gap-2">
          <Mail className="h-5 w-5 text-brand-blue" />
          Contact Submissions
          <span className="ml-2 inline-flex items-center rounded-full bg-brand-blue/10 px-2.5 py-0.5 text-xs font-medium text-brand-blue">
            {messages.length}
          </span>
        </h2>
      </div>

      <div className="grid gap-4">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`relative rounded-xl border p-5 transition-all ${
              msg.status === 'unread' 
                ? 'border-brand-blue/30 bg-brand-blue/5 shadow-sm' 
                : 'border-border bg-card opacity-80'
            }`}
          >
            {msg.status === 'unread' && (
              <span className="absolute top-5 right-5 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-blue"></span>
              </span>
            )}
            
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="space-y-4 flex-1">
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                  <div className="flex items-center gap-1.5 font-medium text-foreground">
                    <User className="h-4 w-4 text-muted-foreground" />
                    {msg.name}
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <a href={`mailto:${msg.email}`} className="hover:text-brand-blue hover:underline">
                      {msg.email}
                    </a>
                  </div>
                  {msg.phone && (
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <a href={`tel:${msg.phone}`} className="hover:text-brand-blue hover:underline">
                        {msg.phone}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 text-muted-foreground text-xs bg-secondary/50 px-2 py-0.5 rounded-md">
                    <Clock className="h-3 w-3" />
                    {new Date(msg.created_at).toLocaleString()}
                  </div>
                </div>
                
                <div className="rounded-lg bg-background/50 border border-border/50 p-4 text-sm text-foreground whitespace-pre-wrap">
                  {msg.message}
                </div>
              </div>

              <div className="flex md:flex-col items-center gap-2 border-t border-border/50 pt-4 md:pt-0 md:border-t-0 md:border-l md:pl-4">
                {msg.status === 'unread' ? (
                  <button
                    onClick={() => updateStatusMutation.mutate({ id: msg.id, status: 'read' })}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-brand-blue/10 px-3 py-2 text-xs font-semibold text-brand-blue hover:bg-brand-blue hover:text-white transition-colors"
                  >
                    <CheckCircle2 className="h-4 w-4" /> Mark Read
                  </button>
                ) : (
                  <button
                    onClick={() => updateStatusMutation.mutate({ id: msg.id, status: 'unread' })}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-secondary px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-secondary/80 transition-colors"
                  >
                    Mark Unread
                  </button>
                )}
                
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this message?")) {
                      deleteMutation.mutate(msg.id);
                    }
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-destructive/20 bg-destructive/10 px-3 py-2 text-xs font-medium text-destructive hover:bg-destructive hover:text-white transition-colors"
                >
                  <Trash2 className="h-4 w-4" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessagesViewer;
