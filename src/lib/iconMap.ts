import React from "react";
import {
  Users, Award, Building2, CheckCircle2, FileCheck, Scale, Calculator, Briefcase,
  GraduationCap, ArrowRight, Shield, Lightbulb, Handshake, TrendingUp, Eye, Target,
  Globe, ClipboardCheck, ShieldCheck, Search, FileText, BarChart3, BookOpen, Landmark,
  Receipt, Users2, Wallet, ScrollText, Gavel, Building, FileKey, BadgeCheck, PieChart,
  HandCoins, Banknote, Factory, Wifi, Truck, Droplets, Zap, Monitor, Heart, Mail,
  MapPin, Phone, Clock, ExternalLink, HardHat, Hammer, Wrench, Construction, Ruler,
  Boxes, Compass, Star, Leaf, Workflow, Waves, Layers, Cpu, Radio, ShieldAlert,
  type LucideIcon
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  Users, Award, Building2, CheckCircle2, FileCheck, Scale, Calculator, Briefcase,
  GraduationCap, ArrowRight, Shield, Lightbulb, Handshake, TrendingUp, Eye, Target,
  Globe, ClipboardCheck, ShieldCheck, Search, FileText, BarChart3, BookOpen, Landmark,
  Receipt, Users2, Wallet, ScrollText, Gavel, Building, FileKey, BadgeCheck, PieChart,
  HandCoins, Banknote, Factory, Wifi, Truck, Droplets, Zap, Monitor, Heart, Mail,
  MapPin, Phone, Clock, ExternalLink, HardHat, Hammer, Wrench, Construction, Ruler,
  Boxes, Compass, Star, Leaf, Workflow, Waves, Layers, Cpu, Radio, ShieldAlert,
};

export const getIcon = (name: any): LucideIcon => {
  if (!name || typeof name !== "string") return HardHat;
  return iconMap[name] || HardHat;
};

export const iconNames = Object.keys(iconMap);

/**
 * Checks safely if an icon string is an image URL or data URI rather than a Lucide icon name.
 */
export function isImageIcon(name: any): boolean {
  if (!name || typeof name !== "string") return false;
  const str = name.trim();
  return (
    str.startsWith("http://") ||
    str.startsWith("https://") ||
    str.startsWith("data:") ||
    str.startsWith("/") ||
    str.startsWith("blob:") ||
    str.includes(".svg") ||
    str.includes(".png") ||
    str.includes(".webp") ||
    str.includes(".jpg") ||
    str.includes(".jpeg")
  );
}

export default iconMap;
