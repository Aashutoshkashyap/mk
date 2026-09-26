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

export const getIcon = (name: string): LucideIcon => {
  if (!name) return HardHat;
  return iconMap[name] || HardHat;
};

export const iconNames = Object.keys(iconMap);

/**
 * Checks if an icon string is an image URL or data URI rather than a Lucide icon name.
 */
export function isImageIcon(name: string): boolean {
  if (!name) return false;
  return (
    name.startsWith("http://") ||
    name.startsWith("https://") ||
    name.startsWith("data:") ||
    name.startsWith("/") ||
    name.startsWith("blob:") ||
    name.includes(".svg") ||
    name.includes(".png") ||
    name.includes(".webp") ||
    name.includes(".jpg") ||
    name.includes(".jpeg")
  );
}

export default iconMap;
