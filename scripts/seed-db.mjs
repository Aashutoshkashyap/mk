/**
 * Seed script: populates all Supabase tables with current website content.
 * Run with: node scripts/seed-db.mjs
 */
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://frqtzqyjwfkwwgxucqfx.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZycXR6cXlqd2Zrd3dneHVjcWZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3MjMwNjIsImV4cCI6MjA4OTI5OTA2Mn0.7hd2F7Hk_mriBSQ3wT-qAQ_9LOwa1sOJXrdtLakBARo";

const sb = createClient(SUPABASE_URL, SUPABASE_KEY);

async function upsert(table, data, onConflict) {
  const opts = onConflict ? { onConflict } : {};
  const { error } = await sb.from(table).upsert(data, opts);
  if (error) {
    console.error(`❌ ${table}:`, error.message);
  } else {
    console.log(`✅ ${table} seeded`);
  }
}

async function insertIfEmpty(table, data) {
  const { data: existing } = await sb.from(table).select("id").limit(1);
  if (existing && existing.length > 0) {
    console.log(`⏭  ${table} already has data — skipping`);
    return;
  }
  const { error } = await sb.from(table).insert(data);
  if (error) {
    console.error(`❌ ${table}:`, error.message);
  } else {
    console.log(`✅ ${table} seeded`);
  }
}

// ─── HERO ────────────────────────────────────────────────────────────────────
await upsert("hero_section", {
  title: "Pioneering Nepal's Critical Infrastructure & Modern Landmarks.",
  description:
    "Tier-1 General Contracting and Civil Infrastructure engineering. From arterial national highway corridors and long-span river bridges to hydraulic river training and civic complexes, MK Engineering and Construction builds with uncompromised precision and Zero-Harm safety standards across Nepal.",
  cta_text: "Explore Our Projects",
  cta_link: "/projects",
  secondary_cta_text: "Engineering Verticals",
  secondary_cta_link: "/services",
  subtitle: "Class-A Licensed Contractor · Heavy Civil Engineering",
});

// ─── STATS ───────────────────────────────────────────────────────────────────
await insertIfEmpty("stats", [
  { icon_name: "Building2", value: "120+", label: "Projects Delivered", sort_order: 0 },
  { icon_name: "Award", value: "₨ 18B", label: "Works Executed", sort_order: 1 },
  { icon_name: "Users", value: "850+", label: "Engineers & Crew", sort_order: 2 },
  { icon_name: "MapPin", value: "32", label: "Districts Reached", sort_order: 3 },
]);

// ─── ABOUT ───────────────────────────────────────────────────────────────────
await upsert("about_section", {
  heading: "Engineering Nepal's Infrastructure With Technical Excellence & Reliability",
  subheading: "Class-A Licensed · 25+ Years · 32 Districts",
  description:
    "MK Construction Company Pvt. Ltd. (formerly M.K. Builders & Construction Company Private Limited) is a Class-A licensed contractor delivering major national highways, long-span river crossings, hydraulic river training, and civil engineering infrastructure across 32 districts of Nepal. Supported by an extensive in-house heavy equipment fleet and over 850 engineers and technicians, we guarantee schedule certainty, structural durability, and Zero-Harm safety standards.",
  vision_title: "Our Vision",
  vision_text:
    "To be Nepal's most trusted and technically advanced infrastructure contractor — building the roads, bridges, and civic structures that drive national development for generations.",
  mission_title: "Our Mission",
  mission_text:
    "Deliver every project on time, within budget, and to the highest engineering standards — while maintaining a Zero-Harm safety culture and contributing positively to the communities we serve.",
  image_url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1600",
});

// ─── SERVICES ────────────────────────────────────────────────────────────────
await insertIfEmpty("services", [
  {
    title: "Roads & Highways",
    description:
      "National highways, feeder roads, and rural access infrastructure built to DoR specifications with subgrade stabilisation, asphalt surfacing, and drainage engineering.",
    icon_name: "Truck",
    sort_order: 0,
  },
  {
    title: "Bridge Engineering",
    description:
      "Steel, RCC, and pre-stressed concrete bridges — including long-span river crossings — designed and constructed to IRC and NBC load standards.",
    icon_name: "Bridge",
    sort_order: 1,
  },
  {
    title: "River Training & Flood Control",
    description:
      "Gabion spurs, revetments, bank protection works, and floodplain management engineering to protect communities and infrastructure assets.",
    icon_name: "Waves",
    sort_order: 2,
  },
  {
    title: "NBC Structures & Buildings",
    description:
      "Nepal Building Code-compliant civic and commercial structures: government offices, schools, hospitals, and community infrastructure.",
    icon_name: "Building2",
    sort_order: 3,
  },
  {
    title: "Hydropower Civil Works",
    description:
      "Civil construction for run-of-river hydropower projects — headworks, intake structures, penstocks, powerhouse foundations, and switchyard platforms.",
    icon_name: "Zap",
    sort_order: 4,
  },
  {
    title: "Water Supply & Sanitation",
    description:
      "Municipal bulk water transmission mains, distribution networks, overhead tank construction, sewerage systems, and WASH infrastructure.",
    icon_name: "Droplets",
    sort_order: 5,
  },
]);

// ─── CORE VALUES ─────────────────────────────────────────────────────────────
await insertIfEmpty("core_values", [
  {
    title: "Structural Integrity",
    description: "Every structure we build exceeds code requirements — engineered for decades of reliable service.",
    icon_name: "Shield",
    sort_order: 0,
  },
  {
    title: "Zero-Harm Safety",
    description: "ISO 45001-certified safety management — our crew goes home safe every day, without exception.",
    icon_name: "HeartHandshake",
    sort_order: 1,
  },
  {
    title: "Schedule Certainty",
    description: "Disciplined project planning and resource deployment deliver on-time completion across all scales.",
    icon_name: "Clock",
    sort_order: 2,
  },
  {
    title: "Technical Excellence",
    description: "BIM 5D technology, GPS-guided grading, and in-house QC labs ensure precision at every stage.",
    icon_name: "Award",
    sort_order: 3,
  },
  {
    title: "Community Partnership",
    description: "Local hiring, skills development, and transparent stakeholder engagement in every district we serve.",
    icon_name: "Users",
    sort_order: 4,
  },
  {
    title: "Environmental Stewardship",
    description: "LEED-aligned practices, minimal site disturbance, and responsible spoil management on all projects.",
    icon_name: "Leaf",
    sort_order: 5,
  },
]);

// ─── FAQs ────────────────────────────────────────────────────────────────────
await insertIfEmpty("faqs", [
  {
    question: "What types of projects does MK Engineering and Construction handle?",
    answer:
      "We handle the full spectrum of heavy civil and infrastructure works: national highways, feeder roads, steel and RCC bridges, river training spurs, NBC structures, hydropower civil works, and municipal water supply & sanitation projects across Nepal.",
    sort_order: 0,
  },
  {
    question: "Is MK Engineering and Construction a Class-A licensed contractor?",
    answer:
      "Yes. We hold a Class-A contractor licence under the Department of Roads and are ISO 9001 (Quality) and ISO 45001 (Safety) certified, qualifying us for the highest-value government and donor-funded infrastructure contracts.",
    sort_order: 1,
  },
  {
    question: "How many districts in Nepal has MK delivered projects in?",
    answer:
      "MK Engineering and Construction has active or completed projects in 32 districts across Nepal, including remote hilly and terai regions, supported by our in-house heavy equipment mobilisation capability.",
    sort_order: 2,
  },
  {
    question: "What is MK's project delivery methodology?",
    answer:
      "We follow a five-stage Turnkey EPC framework: Feasibility & Survey → Detailed Design → Procurement & Mobilisation → Construction & QC → Commissioning & Handover. This ensures systematic delivery with full documentation at each milestone.",
    sort_order: 3,
  },
  {
    question: "Does MK have in-house engineering and equipment capability?",
    answer:
      "Yes. Our in-house fleet includes graders, excavators, rollers, concrete batching plants, and crushing units. Our engineering team of 850+ professionals manages design, surveying, quality control, and site supervision internally.",
    sort_order: 4,
  },
  {
    question: "How can I contact MK Engineering and Construction for a tender or inquiry?",
    answer:
      "You can reach us via the Contact page on this website, call our Kathmandu office, or email info@mkconstruction.com.np. We respond to all pre-qualification and tender inquiries within 2 business days.",
    sort_order: 5,
  },
]);

// ─── CONTACT INFO ────────────────────────────────────────────────────────────
await insertIfEmpty("contact_info", [
  {
    icon_name: "MapPin",
    title: "Head Office",
    details: ["Kathmandu, Nepal", "Lazimpat, Ward No. 2"],
    action_label: "Get Directions",
    action_href: "https://maps.google.com",
    sort_order: 0,
  },
  {
    icon_name: "Phone",
    title: "Phone",
    details: ["+977-1-4XXXXXX", "+977-98XXXXXXXX"],
    action_label: "Call Us",
    action_href: "tel:+97714000000",
    sort_order: 1,
  },
  {
    icon_name: "Mail",
    title: "Email",
    details: ["info@mkconstruction.com.np", "projects@mkconstruction.com.np"],
    action_label: "Send Email",
    action_href: "mailto:info@mkconstruction.com.np",
    sort_order: 2,
  },
  {
    icon_name: "Clock",
    title: "Office Hours",
    details: ["Sunday – Friday: 9:00 AM – 6:00 PM", "Saturday: Closed"],
    sort_order: 3,
  },
]);

// ─── PRE-FOOTER CTA ──────────────────────────────────────────────────────────
await upsert("prefooter_cta", {
  heading: "Ready to Build Nepal's Next Landmark?",
  description:
    "Partner with Nepal's leading Tier-1 EPC contractor for your next road, bridge, hydropower, or civil infrastructure project. Let's build something extraordinary together.",
  cta_text: "Start a Project Conversation",
  cta_link: "/contact",
});

// ─── SITE SETTINGS ───────────────────────────────────────────────────────────
await upsert("site_settings", {
  company_name: "MK Engineering & Construction",
  logo_url: "/images/mk-logo.png",
});

// ─── TESTIMONIALS ────────────────────────────────────────────────────────────
await insertIfEmpty("testimonials", [
  {
    name: "Er. Ramesh Thapa",
    role: "Project Director, Department of Roads",
    content:
      "MK Engineering delivered our Prithvi Highway rehabilitation project six weeks ahead of schedule. Their quality of asphalt work and drainage construction is among the best we've seen from any Class-A contractor in Nepal.",
    rating: 5,
    sort_order: 0,
  },
  {
    name: "Anjana Shrestha",
    role: "CEO, Himalayan Infrastructure Fund",
    content:
      "We've co-financed three bridge projects with MK. Their technical documentation, site safety standards, and financial transparency made our due diligence straightforward. Highly recommended for donor-funded infrastructure work.",
    rating: 5,
    sort_order: 1,
  },
  {
    name: "Bikram Rai",
    role: "District Engineer, Solukhumbu",
    content:
      "Delivering a river training project in Solukhumbu during monsoon season is no small feat. MK mobilised the right equipment and crew, maintained safety protocols, and handed over a structure that has protected the community for two consecutive flood seasons.",
    rating: 5,
    sort_order: 2,
  },
]);

// ─── BLOG POSTS ──────────────────────────────────────────────────────────────
await insertIfEmpty("blog_posts", [
  {
    title: "MK Engineering Completes 3.2 km Suspension Bridge Over Sunkoshi River",
    slug: "sunkoshi-suspension-bridge-completion",
    excerpt:
      "The 3.2 km multi-span suspension bridge connecting two remote communities over the Sunkoshi River has been officially inaugurated, reducing travel time from 6 hours to 20 minutes.",
    content:
      "MK Engineering and Construction has successfully completed the 3.2 km suspension bridge over the Sunkoshi River, a landmark infrastructure project that will transform connectivity for over 50,000 residents in the eastern hill districts...\n\nThe project, funded by the Department of Roads under the Strategic Roads Network, was completed within the contracted timeline despite challenges posed by monsoon flooding and remote site conditions.",
    category: "Project Milestone",
    author: "MK Communications Team",
    is_published: true,
    is_featured: true,
    thumbnail_url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "ISO 45001:2018 Recertification: Our Zero-Harm Safety Journey",
    slug: "iso-45001-recertification-zero-harm",
    excerpt:
      "MK Engineering and Construction successfully completed its ISO 45001:2018 recertification audit with zero non-conformances — a testament to our unwavering commitment to Zero-Harm safety.",
    content:
      "Safety is not a compliance checkbox at MK Engineering — it is embedded into every process, every site, and every person on our team. Our successful ISO 45001:2018 recertification with zero non-conformances reflects years of building a genuine safety culture...\n\nKey highlights from the audit included our digital safety observation system, real-time incident reporting, and PPE compliance tracking across all active sites.",
    category: "Company News",
    author: "HSE Department",
    is_published: true,
    is_featured: false,
    thumbnail_url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "National Highway Rehabilitation: Lessons From 400km of Asphalt Engineering",
    slug: "national-highway-rehabilitation-lessons",
    excerpt:
      "After completing rehabilitation work on over 400km of national highway corridors, our engineering team shares the key technical lessons that drive durable, cost-effective road construction in Nepal's challenging terrain.",
    content:
      "Nepal's topographic diversity presents unique engineering challenges: from the terai plains where subgrade stability is the primary concern, to the mountain zones where drainage engineering and slope stabilisation are critical...\n\nOver the past decade, MK Engineering has rehabilitated over 400km of national highway corridors. Here are the five most important technical lessons we've learned along the way.",
    category: "Technical Insights",
    author: "Chief Engineer, Roads Division",
    is_published: true,
    is_featured: true,
    thumbnail_url: "https://images.unsplash.com/photo-1621600411688-4be93cd68504?auto=format&fit=crop&q=80&w=800",
  },
]);

console.log("\n🎉 Seed complete! All tables have been populated.");
console.log("   → Admin panel should now show all content");
console.log("   → Website will display seeded data (Supabase takes priority over fallbacks)");
