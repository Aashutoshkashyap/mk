import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

const HARDCODED_ADMIN_EMAIL = "admin@mk.com";
const HARDCODED_ADMIN_PASS = "Nepal@123#";
const LOCAL_STORAGE_KEY = "mk_hardcoded_admin_session";

export const useAdminAuth = () => {
  const [user, setUser] = useState<User | any>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return null;
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) return true;
    } catch (e) {}
    return false;
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if hardcoded admin is saved
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const u = JSON.parse(saved);
        setUser(u);
        setIsAdmin(true);
        setLoading(false);
        return;
      }
    } catch (e) {}

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const u = session?.user ?? null;
      if (u) {
        setUser(u);
        const { data } = await supabase.from("user_roles").select("role").eq("user_id", u.id).eq("role", "admin").maybeSingle();
        setIsAdmin(!!data);
      } else {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
          setUser(JSON.parse(saved));
          setIsAdmin(true);
        } else {
          setUser(null);
          setIsAdmin(false);
        }
      }
      setLoading(false);
    });

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        setUser(JSON.parse(saved));
        setIsAdmin(true);
        setLoading(false);
        return;
      }
      const u = session?.user ?? null;
      setUser(u);
      if (u) {
        const { data } = await supabase.from("user_roles").select("role").eq("user_id", u.id).eq("role", "admin").maybeSingle();
        setIsAdmin(!!data);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const trimmedEmail = email.trim().toLowerCase();
    if (trimmedEmail === HARDCODED_ADMIN_EMAIL.toLowerCase() && password === HARDCODED_ADMIN_PASS) {
      const hardcodedUser = {
        id: "mk-admin-root-01",
        email: HARDCODED_ADMIN_EMAIL,
        user_metadata: { role: "admin", name: "MK Admin" },
        role: "admin",
        aud: "authenticated",
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(hardcodedUser));
      setUser(hardcodedUser);
      setIsAdmin(true);
      return { error: null };
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({ email: trimmedEmail, password });
      return { error };
    } catch (err: any) {
      return { error: { message: err?.message || "Sign in failed" } };
    }
  };

  const signOut = async () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setUser(null);
    setIsAdmin(false);
    try {
      await supabase.auth.signOut();
    } catch (e) {}
  };

  return { user, isAdmin, loading, signIn, signOut };
};
