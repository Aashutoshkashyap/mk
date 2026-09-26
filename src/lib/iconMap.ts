import {
  Users,
  Award,
  Building2,
  CheckCircle2,
  FileCheck,
  Scale,
  Calculator,
  Briefcase,
  GraduationCap,
  ArrowRight,
  Shield,
  Lightbulb,
  Handshake,
  TrendingUp,
  Eye,
  Target,
  Globe,
  ClipboardCheck,
  ShieldCheck,
  Search,
  FileText,
  BarChart3,
  BookOpen,
  Landmark,
  Receipt,
  Users2,
  Wallet,
  ScrollText,
  Gavel,
  Building,
  FileKey,
  BadgeCheck,
  PieChart,
  HandCoins,
  Banknote,
  Factory,
  Wifi,
  Truck,
  Droplets,
  Zap,
  Monitor,
  Heart,
  Mail,
  MapPin,
  Phone,
  Clock,
  ExternalLink,
  HardHat,
  Hammer,
  Wrench,
  Construction,
  Ruler,
  Boxes,
  Compass,
  Star,
  Leaf,
  Workflow,
  Waves,
  Layers,
  Cpu,
  Radio,
  ShieldAlert,
  type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  Users,
  Award,
  Building2,
  CheckCircle2,
  FileCheck,
  Scale,
  Calculator,
  Briefcase,
  GraduationCap,
  ArrowRight,
  Shield,
  Lightbulb,
  Handshake,
  TrendingUp,
  Eye,
  Target,
  Globe,
  ClipboardCheck,
  ShieldCheck,
  Search,
  FileText,
  BarChart3,
  BookOpen,
  Landmark,
  Receipt,
  Users2,
  Wallet,
  ScrollText,
  Gavel,
  Building,
  FileKey,
  BadgeCheck,
  PieChart,
  HandCoins,
  Banknote,
  Factory,
  Wifi,
  Truck,
  Droplets,
  Zap,
  Monitor,
  Heart,
  Mail,
  MapPin,
  Phone,
  Clock,
  ExternalLink,
  HardHat,
  Hammer,
  Wrench,
  Construction,
  Ruler,
  Boxes,
  Compass,
  Star,
  Leaf,
  Workflow,
  Waves,
  Layers,
  Cpu,
  Radio,
  ShieldAlert,
};

/**
 * Safely resolve a Lucide icon.
 *
 * Never throws for malformed CMS values.
 */
export function getIcon(name: unknown): LucideIcon {
  if (typeof name !== "string") {
    return HardHat;
  }

  const value = name.trim();

  if (!value) {
    return HardHat;
  }

  return (
    iconMap[value] ??
    iconMap[value.toLowerCase()] ??
    HardHat
  );
}

export const iconNames = Object.keys(iconMap);

/**
 * Determines whether a CMS value represents an image/icon URL
 * instead of a Lucide icon name.
 */
export function isImageIcon(name: unknown): boolean {
  if (typeof name !== "string") {
    return false;
  }

  const value = name.trim().toLowerCase();

  if (!value) {
    return false;
  }

  return (
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("data:image/") ||
    value.startsWith("/") ||
    value.startsWith("blob:") ||
    value.endsWith(".svg") ||
    value.includes(".svg?") ||
    value.endsWith(".png") ||
    value.includes(".png?") ||
    value.endsWith(".webp") ||
    value.includes(".webp?") ||
    value.endsWith(".jpg") ||
    value.includes(".jpg?") ||
    value.endsWith(".jpeg") ||
    value.includes(".jpeg?")
  );
}

export default iconMap;
