import { useState } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Navigate } from "react-router-dom";
import {
  LayoutDashboard, FileText, Users, Settings, Briefcase, Image, MessageSquare,
  BarChart3, LogOut, ChevronRight, Home, Mail, Star, HelpCircle, Quote
} from "lucide-react";
import HeroEditor from "./editors/HeroEditor";
import StatsEditor from "./editors/StatsEditor";
import AboutEditor from "./editors/AboutEditor";
import ServicesEditor from "./editors/ServicesEditor";
import TeamEditor from "./editors/TeamEditor";
import BlogEditor from "./editors/BlogEditor";
import GalleryEditor from "./editors/GalleryEditor";
import ContactEditor from "./editors/ContactEditor";
import CTAEditor from "./editors/CTAEditor";
import MessagesViewer from "./editors/MessagesViewer";
import CoreValuesEditor from "./editors/CoreValuesEditor";
import SettingsEditor from "./editors/SettingsEditor";
import FAQEditor from "./editors/FAQEditor";
import TestimonialsEditor from "./editors/TestimonialsEditor";

const tabs = [
  { id: "hero", label: "Hero Section", icon: Home },
  { id: "stats", label: "Stats", icon: BarChart3 },
  { id: "about", label: "About", icon: Settings },
  { id: "services", label: "Services", icon: Briefcase },
  { id: "team", label: "Team", icon: Users },
  { id: "blog", label: "Blog Posts", icon: FileText },
  { id: "gallery", label: "Gallery", icon: Image },
  { id: "contact", label: "Contact Info", icon: MessageSquare },
  { id: "messages", label: "Messages", icon: Mail },
  { id: "core_values", label: "Core Values", icon: Star },
  { id: "faqs", label: "FAQs", icon: HelpCircle },
  { id: "testimonials", label: "Testimonials", icon: Quote },
  { id: "settings", label: "Site Settings", icon: Settings },
  { id: "cta", label: "Pre-Footer CTA", icon: LayoutDashboard },
];

const AdminDashboard = () => {
  const { user, isAdmin, loading, signOut } = useAdminAuth();
  const [activeTab, setActiveTab] = useState("blog");

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>;
  if (!user) return <Navigate to="/admin/login" />;
  if (!isAdmin) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-secondary/50">
      <h1 className="font-display text-2xl font-bold text-primary">Access Denied</h1>
      <p className="text-muted-foreground">You don't have admin privileges.</p>
      <button onClick={signOut} className="text-brand-blue font-semibold">Sign Out</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-secondary/30 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col shrink-0">
        <div className="p-5 border-b border-border">
          <h2 className="font-display text-lg font-extrabold text-primary">Sharp Edge</h2>
          <p className="text-xs text-muted-foreground">Admin Panel</p>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:bg-secondary hover:text-foreground"
              }`}>
              <tab.icon size={16} />
              {tab.label}
              {activeTab === tab.id && <ChevronRight size={14} className="ml-auto" />}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-border">
          <div className="text-xs text-muted-foreground mb-2 px-4 truncate">{user.email}</div>
          <button onClick={signOut} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors">
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content — all editors stay mounted, only visibility toggles */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-5xl">
          <div style={{ display: activeTab === "hero" ? "block" : "none" }}><HeroEditor /></div>
          <div style={{ display: activeTab === "stats" ? "block" : "none" }}><StatsEditor /></div>
          <div style={{ display: activeTab === "about" ? "block" : "none" }}><AboutEditor /></div>
          <div style={{ display: activeTab === "services" ? "block" : "none" }}><ServicesEditor /></div>
          <div style={{ display: activeTab === "team" ? "block" : "none" }}><TeamEditor /></div>
          <div style={{ display: activeTab === "blog" ? "block" : "none" }}><BlogEditor /></div>
          <div style={{ display: activeTab === "gallery" ? "block" : "none" }}><GalleryEditor /></div>
          <div style={{ display: activeTab === "contact" ? "block" : "none" }}><ContactEditor /></div>
          <div style={{ display: activeTab === "cta" ? "block" : "none" }}><CTAEditor /></div>
          <div style={{ display: activeTab === "messages" ? "block" : "none" }}><MessagesViewer /></div>
          <div style={{ display: activeTab === "core_values" ? "block" : "none" }}><CoreValuesEditor /></div>
          <div style={{ display: activeTab === "faqs" ? "block" : "none" }}><FAQEditor /></div>
          <div style={{ display: activeTab === "testimonials" ? "block" : "none" }}><TestimonialsEditor /></div>
          <div style={{ display: activeTab === "settings" ? "block" : "none" }}><SettingsEditor /></div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
