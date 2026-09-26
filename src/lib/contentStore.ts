/**
 * useContentStore — localStorage-backed CMS for MK Engineering & Construction.
 * The admin panel writes here; public components read from here (with hardcoded fallbacks).
 */

// ─── Default content ─────────────────────────────────────────────────────────
export const DEFAULTS = {
  hero: {
    title: "Pioneering Nepal's Critical Infrastructure & Modern Landmarks.",
    description:
      "Tier-1 General Contracting and Civil Infrastructure engineering. From arterial national highway corridors and long-span river bridges to hydraulic river training and civic complexes, MK Engineering and Construction builds with uncompromised precision and Zero-Harm safety standards across Nepal.",
    cta_text: "Explore Our Projects",
    cta_link: "/projects",
    secondary_cta_text: "Engineering Verticals",
    secondary_cta_link: "/services",
    badge: "Class-A Licensed Contractor · Heavy Civil Engineering",
    image_url: "/images/hero.jpg",
  },
  about: {
    heading: "Engineering Nepal's Infrastructure With Technical Excellence & Reliability",
    subheading: "Class-A Licensed · 25+ Years · 32 Districts",
    description:
      "MK Construction Company Pvt. Ltd. is a Class-A licensed contractor delivering major national highways, long-span river crossings, hydraulic river training, and civil engineering infrastructure across 32 districts of Nepal. Supported by an extensive in-house heavy equipment fleet and over 850 engineers and technicians, we guarantee schedule certainty, structural durability, and Zero-Harm safety standards.",
    vision_title: "Our Vision",
    vision_text:
      "To be Nepal's most trusted and technically advanced infrastructure contractor — building the roads, bridges, and civic structures that drive national development for generations.",
    mission_title: "Our Mission",
    mission_text:
      "Deliver every project on time, within budget, and to the highest engineering standards — while maintaining a Zero-Harm safety culture and contributing positively to the communities we serve.",
    image_url:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1600",
  },
  stats: [
    { id: "s1", icon_name: "Building2", value: "120+", label: "Projects Delivered", sort_order: 0 },
    { id: "s2", icon_name: "Award", value: "₨ 18B", label: "Works Executed", sort_order: 1 },
    { id: "s3", icon_name: "Users", value: "850+", label: "Engineers & Crew", sort_order: 2 },
    { id: "s4", icon_name: "MapPin", value: "32", label: "Districts Reached", sort_order: 3 },
  ],
  services: [
    { id: "sv1", title: "Roads & Highways", description: "National highways, feeder roads, and rural access infrastructure built to DoR specifications with subgrade stabilisation, asphalt surfacing, and drainage engineering.", icon_name: "Truck", sort_order: 0 },
    { id: "sv2", title: "Bridge Engineering", description: "Steel, RCC, and pre-stressed concrete bridges — including long-span river crossings — designed and constructed to IRC and NBC load standards.", icon_name: "Workflow", sort_order: 1 },
    { id: "sv3", title: "River Training & Flood Control", description: "Gabion spurs, revetments, bank protection works, and floodplain management engineering to protect communities and infrastructure assets.", icon_name: "Waves", sort_order: 2 },
    { id: "sv4", title: "NBC Structures & Buildings", description: "Nepal Building Code-compliant civic and commercial structures: government offices, schools, hospitals, and community infrastructure.", icon_name: "Building2", sort_order: 3 },
    { id: "sv5", title: "Hydropower Civil Works", description: "Civil construction for run-of-river hydropower projects — headworks, intake structures, penstocks, powerhouse foundations, and switchyard platforms.", icon_name: "Zap", sort_order: 4 },
    { id: "sv6", title: "Water Supply & Sanitation", description: "Municipal bulk water transmission mains, distribution networks, overhead tank construction, sewerage systems, and WASH infrastructure.", icon_name: "Droplets", sort_order: 5 },
  ],
  core_values: [
    { id: "cv1", title: "Structural Integrity", description: "Every structure we build exceeds code requirements — engineered for decades of reliable service.", icon_name: "Shield", sort_order: 0 },
    { id: "cv2", title: "Zero-Harm Safety", description: "ISO 45001-certified safety management — our crew goes home safe every day, without exception.", icon_name: "ShieldCheck", sort_order: 1 },
    { id: "cv3", title: "Schedule Certainty", description: "Disciplined project planning and resource deployment deliver on-time completion across all scales.", icon_name: "Clock", sort_order: 2 },
    { id: "cv4", title: "Technical Excellence", description: "BIM 5D technology, GPS-guided grading, and in-house QC labs ensure precision at every stage.", icon_name: "Award", sort_order: 3 },
    { id: "cv5", title: "Community Partnership", description: "Local hiring, skills development, and transparent stakeholder engagement in every district we serve.", icon_name: "Users", sort_order: 4 },
    { id: "cv6", title: "Environmental Stewardship", description: "LEED-aligned practices, minimal site disturbance, and responsible spoil management on all projects.", icon_name: "Leaf", sort_order: 5 },
  ],
  faqs: [
    { id: "f1", question: "What types of projects does MK Engineering and Construction handle?", answer: "We handle the full spectrum of heavy civil and infrastructure works: national highways, feeder roads, steel and RCC bridges, river training spurs, NBC structures, hydropower civil works, and municipal water supply & sanitation projects across Nepal.", sort_order: 0 },
    { id: "f2", question: "Is MK Engineering and Construction a Class-A licensed contractor?", answer: "Yes. We hold a Class-A contractor licence under the Department of Roads and are ISO 9001 (Quality) and ISO 45001 (Safety) certified, qualifying us for the highest-value government and donor-funded infrastructure contracts.", sort_order: 1 },
    { id: "f3", question: "How many districts in Nepal has MK delivered projects in?", answer: "MK Engineering and Construction has active or completed projects in 32 districts across Nepal, including remote hilly and terai regions, supported by our in-house heavy equipment mobilisation capability.", sort_order: 2 },
    { id: "f4", question: "What is MK's project delivery methodology?", answer: "We follow a five-stage Turnkey EPC framework: Feasibility & Survey → Detailed Design → Procurement & Mobilisation → Construction & QC → Commissioning & Handover. This ensures systematic delivery with full documentation at each milestone.", sort_order: 3 },
    { id: "f5", question: "Does MK have in-house engineering and equipment capability?", answer: "Yes. Our in-house fleet includes graders, excavators, rollers, concrete batching plants, and crushing units. Our engineering team of 850+ professionals manages design, surveying, quality control, and site supervision internally.", sort_order: 4 },
    { id: "f6", question: "How can I contact MK Engineering and Construction for a tender or inquiry?", answer: "You can reach us via the Contact page on this website, call our Kathmandu office, or email info@mkconstruction.com.np. We respond to all pre-qualification and tender inquiries within 2 business days.", sort_order: 5 },
  ],
  testimonials: [
    { id: "t1", name: "Er. Ramesh Thapa", role: "Project Director, Department of Roads", content: "MK Engineering delivered our Prithvi Highway rehabilitation project six weeks ahead of schedule. Their quality of asphalt work and drainage construction is among the best we've seen from any Class-A contractor in Nepal.", rating: 5, sort_order: 0 },
    { id: "t2", name: "Anjana Shrestha", role: "CEO, Himalayan Infrastructure Fund", content: "We've co-financed three bridge projects with MK. Their technical documentation, site safety standards, and financial transparency made our due diligence straightforward. Highly recommended for donor-funded infrastructure work.", rating: 5, sort_order: 1 },
    { id: "t3", name: "Bikram Rai", role: "District Engineer, Solukhumbu", content: "Delivering a river training project in Solukhumbu during monsoon season is no small feat. MK mobilised the right equipment and crew, maintained safety protocols, and handed over a structure that has protected the community for two consecutive flood seasons.", rating: 5, sort_order: 2 },
  ],
  blog_posts: [
    { id: "b1", title: "MK Engineering Completes 3.2 km Suspension Bridge Over Sunkoshi River", slug: "sunkoshi-suspension-bridge-completion", excerpt: "The 3.2 km multi-span suspension bridge connecting two remote communities over the Sunkoshi River has been officially inaugurated, reducing travel time from 6 hours to 20 minutes.", content: "MK Engineering and Construction has successfully completed the 3.2 km suspension bridge over the Sunkoshi River...", category: "Project Milestone", author: "MK Communications Team", is_published: true, is_featured: true, thumbnail_url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=800" },
    { id: "b2", title: "ISO 45001:2018 Recertification: Our Zero-Harm Safety Journey", slug: "iso-45001-recertification-zero-harm", excerpt: "MK Engineering and Construction successfully completed its ISO 45001:2018 recertification audit with zero non-conformances.", content: "Safety is not a compliance checkbox at MK Engineering — it is embedded into every process...", category: "Company News", author: "HSE Department", is_published: true, is_featured: false, thumbnail_url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800" },
    { id: "b3", title: "National Highway Rehabilitation: Lessons From 400km of Asphalt Engineering", slug: "national-highway-rehabilitation-lessons", excerpt: "After completing rehabilitation work on over 400km of national highway corridors, our engineering team shares key technical lessons.", content: "Nepal's topographic diversity presents unique engineering challenges...", category: "Technical Insights", author: "Chief Engineer, Roads Division", is_published: true, is_featured: true, thumbnail_url: "https://images.unsplash.com/photo-1621600411688-4be93cd68504?auto=format&fit=crop&q=80&w=800" },
  ],
  contact_info: [
    { id: "ci1", icon_name: "MapPin", title: "Head Office", details: ["Kathmandu, Nepal", "Lazimpat, Ward No. 2"], action_label: "Get Directions", action_href: "https://maps.google.com", sort_order: 0 },
    { id: "ci2", icon_name: "Phone", title: "Phone", details: ["+977-1-4XXXXXX", "+977-98XXXXXXXX"], action_label: "Call Us", action_href: "tel:+97714000000", sort_order: 1 },
    { id: "ci3", icon_name: "Mail", title: "Email", details: ["info@mkconstruction.com.np", "projects@mkconstruction.com.np"], action_label: "Send Email", action_href: "mailto:info@mkconstruction.com.np", sort_order: 2 },
    { id: "ci4", icon_name: "Clock", title: "Office Hours", details: ["Sunday – Friday: 9:00 AM – 6:00 PM", "Saturday: Closed"], sort_order: 3 },
  ],
  prefooter_cta: {
    heading: "Ready to Build Nepal's Next Landmark?",
    description: "Partner with Nepal's leading Tier-1 EPC contractor for your next road, bridge, hydropower, or civil infrastructure project. Let's build something extraordinary together.",
    cta_text: "Start a Project Conversation",
    cta_link: "/contact",
  },
  site_settings: {
    company_name: "MK Engineering & Construction",
    logo_url: "/images/mk-logo.png",
  },
  gallery_images: [] as any[],
  partners: [] as any[],
};

const PREFIX = "mk_cms_";

// ─── Generic helpers ─────────────────────────────────────────────────────────
function readKey<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeKey<T>(key: string, value: T): void {
  localStorage.setItem(PREFIX + key, JSON.stringify(value));
  // Dispatch a custom event so other tabs/components can react
  window.dispatchEvent(new CustomEvent("mk_cms_update", { detail: { key } }));
}

// ─── Public API ──────────────────────────────────────────────────────────────
export const contentStore = {
  // Single-record sections
  getHero: () => readKey("hero", DEFAULTS.hero),
  setHero: (v: typeof DEFAULTS.hero) => writeKey("hero", v),

  getAbout: () => readKey("about", DEFAULTS.about),
  setAbout: (v: typeof DEFAULTS.about) => writeKey("about", v),

  getPreFooterCta: () => readKey("prefooter_cta", DEFAULTS.prefooter_cta),
  setPreFooterCta: (v: typeof DEFAULTS.prefooter_cta) => writeKey("prefooter_cta", v),

  getSiteSettings: () => readKey("site_settings", DEFAULTS.site_settings),
  setSiteSettings: (v: typeof DEFAULTS.site_settings) => writeKey("site_settings", v),

  // List sections
  getStats: () => readKey("stats", DEFAULTS.stats),
  setStats: (v: typeof DEFAULTS.stats) => writeKey("stats", v),

  getServices: () => readKey("services", DEFAULTS.services),
  setServices: (v: typeof DEFAULTS.services) => writeKey("services", v),

  getCoreValues: () => readKey("core_values", DEFAULTS.core_values),
  setCoreValues: (v: typeof DEFAULTS.core_values) => writeKey("core_values", v),

  getFaqs: () => readKey("faqs", DEFAULTS.faqs),
  setFaqs: (v: typeof DEFAULTS.faqs) => writeKey("faqs", v),

  getTestimonials: () => readKey("testimonials", DEFAULTS.testimonials),
  setTestimonials: (v: typeof DEFAULTS.testimonials) => writeKey("testimonials", v),

  getBlogPosts: () => readKey("blog_posts", DEFAULTS.blog_posts),
  setBlogPosts: (v: typeof DEFAULTS.blog_posts) => writeKey("blog_posts", v),

  getContactInfo: () => readKey("contact_info", DEFAULTS.contact_info),
  setContactInfo: (v: typeof DEFAULTS.contact_info) => writeKey("contact_info", v),

  getGalleryImages: () => readKey("gallery_images", DEFAULTS.gallery_images),
  setGalleryImages: (v: any[]) => writeKey("gallery_images", v),

  getPartners: () => readKey("partners", DEFAULTS.partners),
  setPartners: (v: any[]) => writeKey("partners", v),

  // Messages (contact submissions) — read-only from public side, admin can view
  getMessages: (): any[] => readKey("messages", []),
  addMessage: (msg: { name: string; email: string; phone?: string; message: string }) => {
    const msgs = contentStore.getMessages();
    msgs.unshift({ ...msg, id: crypto.randomUUID(), status: "unread", created_at: new Date().toISOString() });
    writeKey("messages", msgs);
  },
  updateMessageStatus: (id: string, status: string) => {
    const msgs = contentStore.getMessages().map((m: any) => (m.id === id ? { ...m, status } : m));
    writeKey("messages", msgs);
  },
};

export default contentStore;
