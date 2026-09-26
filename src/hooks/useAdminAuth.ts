import { useState, useEffect } from "react";

// Hardcoded admin credentials — no Supabase auth required
const ADMIN_EMAIL = "admin@mk.com";
const ADMIN_PASSWORD = "Nepal@123#";
const SESSION_KEY = "mk_admin_session";

export const useAdminAuth = () => {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = localStorage.getItem(SESSION_KEY);
    if (session === ADMIN_EMAIL) {
      setUser({ email: ADMIN_EMAIL });
      setIsAdmin(true);
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    if (email.trim() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem(SESSION_KEY, email.trim());
      setUser({ email: email.trim() });
      setIsAdmin(true);
      return { error: null };
    }
    return { error: { message: "Invalid email or password." } };
  };

  const signOut = async () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
    setIsAdmin(false);
  };

  return { user, isAdmin, loading, signIn, signOut };
};
