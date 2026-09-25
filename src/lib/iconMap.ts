import {
  Users, Award, Building2, CheckCircle2, FileCheck, Scale, Calculator, Briefcase,
  GraduationCap, ArrowRight, Shield, Lightbulb, Handshake, TrendingUp, Eye, Target,
  Globe, ClipboardCheck, ShieldCheck, Search, FileText, BarChart3, BookOpen, Landmark,
  Receipt, Users2, Wallet, ScrollText, Gavel, Building, FileKey, BadgeCheck, PieChart,
  HandCoins, Banknote, Factory, Wifi, Truck, Droplets, Zap, Monitor, Heart, Mail,
  MapPin, Phone, Clock, ExternalLink, HardHat, Hammer, Wrench, Construction, Ruler,
  Boxes, Compass, type LucideIcon
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Users, Award, Building2, CheckCircle2, FileCheck, Scale, Calculator, Briefcase,
  GraduationCap, ArrowRight, Shield, Lightbulb, Handshake, TrendingUp, Eye, Target,
  Globe, ClipboardCheck, ShieldCheck, Search, FileText, BarChart3, BookOpen, Landmark,
  Receipt, Users2, Wallet, ScrollText, Gavel, Building, FileKey, BadgeCheck, PieChart,
  HandCoins, Banknote, Factory, Wifi, Truck, Droplets, Zap, Monitor, Heart, Mail,
  MapPin, Phone, Clock, ExternalLink, HardHat, Hammer, Wrench, Construction, Ruler,
  Boxes, Compass,
};

export const getIcon = (name: string): LucideIcon => iconMap[name] || HardHat || CheckCircle2;
export const iconNames = Object.keys(iconMap);
export default iconMap;
