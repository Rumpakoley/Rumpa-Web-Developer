import { Project, ServiceTier, Testimonial, BlogPost, DeveloperProfile, SkillCategory } from '../types';

export const INITIAL_PROFILE: DeveloperProfile = {
  name: "Rumpa Koley",
  role: "Full-Stack Web Developer & UI Engineer",
  tagline: "I build fast, high-converting websites and modern web applications that help businesses win customers.",
  bio: "I'm a developer who bridges engineering and clean design. Rather than bloated page builders that take 6 seconds to load, I build custom web experiences with React, TypeScript, and Tailwind CSS that achieve 95+ Google Lighthouse scores, look stunning on every screen, and turn visitors into paying clients.",
  email: "rumpakoley255@gmail.com",
  whatsapp: "+919876543210",
  location: "Kolkata, India · Available Worldwide",
  availability: "Available for Q2/Q3 Projects",
  github: "https://github.com/rumpakoley",
  linkedin: "https://www.linkedin.com/in/rumpa-koley-22820032b",
  yearsExperience: "2026",
  projectsCompleted: "3+",
  satisfactionRate: "100%",
  avgDeliveryWeeks: "1-2",
};

export const PROJECTS: Project[] = [
  // ==========================================
  // UPPER AXIS: SIDE PROJECTS
  // ==========================================
  {
    id: "ai-interior-design",
    title: "AI Interior Design Platform",
    subtitle: "An AI-powered interior design and shopping platform, with system design covering data flow (DFD) and database structure (ER diagram).",
    category: "ai",
    track: "side_project",
    status: "IN DESIGN",
    badge: "IN DESIGN",
    client: "Architecture & System Design",
    completionYear: "2026",
    timeline: "System Design Phase",
    type: "AI Platform & System Design",
    accentColor: "#F59E0B",
    problem: "Generative room redesign applications often fail at real-world fulfillment due to un-normalized spatial schemas and decoupled furniture catalog relations.",
    solution: "Engineered comprehensive Data Flow Diagrams (DFD Level 0-2) and a 3NF normalized Entity-Relationship (ER) model to connect spatial style recommendations directly with itemized retail carts.",
    keyMetric: {
      value: "Complete",
      label: "DFD + ER complete",
    },
    techStack: ["React", "TypeScript", "Python", "System Design", "Tailwind CSS"],
    features: [
      "End-to-end Data Flow Diagrams (DFD Level 0, Level 1, Level 2)",
      "Normalized Entity-Relationship (ER) database schema for spatial assets & products",
      "Style preference vector embedding ingestion pipeline design",
      "Dimension-aware furniture catalog aggregation and checkout flow",
    ],
    liveUrl: "https://github.com/rumpakoley",
    githubUrl: "https://github.com/rumpakoley",
    architecture: {
      frontend: "React + TypeScript + Tailwind CSS UI Blueprints",
      backend: "Python / FastAPI Data Ingestion Pipeline Design",
      databaseOrCache: "PostgreSQL 3NF Relational Schema (ER Model)",
      deployment: "System Design & Architecture Specification",
    },
    terminalLogs: [
      "DESIGN: DFD Level 0 Context Diagram validated",
      "SCHEMA: PostgreSQL 3NF Entity-Relationship model compiled",
      "DATAFLOW: Room asset vectorization pipeline mapped",
      "STATUS: System architecture & schema documentation complete",
    ],
  },

  // ==========================================
  // LOWER AXIS: CLIENT WORK
  // ==========================================
  {
    id: "pichhutaaney",
    title: "Pichhutaaney",
    subtitle: "Website for an intuitive Indian supper club: bilingual dish gallery, video reels, and a reservation and waitlist form.",
    category: "business",
    track: "commercial",
    status: "LIVE",
    badge: "LIVE",
    client: "Pichhutaaney Supper Club",
    completionYear: "2026",
    timeline: "Live in Production",
    type: "Bespoke Culinary & Reservation Platform",
    accentColor: "#EA580C",
    problem: "An intimate Kolkata supper club required a rich cultural web presence featuring bilingual Bengali storytelling, immersive dish reels, and direct waitlist booking without commission platforms.",
    solution: "Designed and developed an editorial React web experience featuring Cormorant Garamond and Noto Serif Bengali typography, smooth interactive dish reels, and a waitlist intake system.",
    keyMetric: {
      value: "96",
      label: "Lighthouse Mobile: 96",
    },
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
    features: [
      "Bilingual English & Bengali typography with smooth scroll narrative",
      "Editorial culinary gallery featuring immersive dish video reels",
      "Direct supper club waitlist & dining reservation intake form",
      "Mobile-optimized progressive image hydration with zero layout shift",
    ],
    liveUrl: "https://www.pichhutaaney.com",
    githubUrl: "https://github.com/rumpakoley",
    architecture: {
      frontend: "React 19 + TypeScript + Tailwind CSS + Framer Motion",
      backend: "Vercel Edge Platform",
      databaseOrCache: "Client State & Intake Dispatch",
      deployment: "Vercel Production Edge",
    },
    terminalLogs: [
      "CLIENT: Pichhutaaney production build online",
      "FONTS: Cormorant Garamond & Noto Serif Bengali hydrated",
      "RESERVATION: Waitlist intake gateway operational",
      "STATUS: Production deployment live at pichhutaaney.com",
    ],
  },
  {
    id: "the-morphiq",
    title: "The Morphiq",
    subtitle: "A gallery-style website where an artist showcases her paintings.",
    category: "business",
    track: "commercial",
    status: "LIVE",
    badge: "LIVE",
    client: "Fine Art Client",
    completionYear: "2026",
    timeline: "Live in Production",
    type: "Fine Art Exhibition & Gallery Platform",
    accentColor: "#EA580C",
    problem: "A contemporary fine artist needed an elegant, distraction-free digital gallery to present her acrylic, ink, and watercolor painting series with precise artwork specifications and collector inquiries.",
    solution: "Crafted a minimalist, high-speed gallery website with progressive high-fidelity image loading, exhibition categories, artwork dimensions/mediums, and direct acquisition inquiry dispatch.",
    keyMetric: {
      value: "98",
      label: "Lighthouse Mobile: 98",
    },
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
    features: [
      "Progressive high-fidelity painting image loading with zero CLS",
      "Categorized series exhibitions (Lacuna, Ink, Acrylic & Watercolors)",
      "Artwork dimension, year, medium, and framing metadata display",
      "Collector inquiry dispatch channel for private acquisitions",
    ],
    liveUrl: "https://www.themorphiq.com",
    githubUrl: "https://github.com/rumpakoley",
    architecture: {
      frontend: "React 19 + TypeScript + Tailwind CSS + Framer Motion",
      backend: "Vercel Edge Platform",
      databaseOrCache: "Curated Artwork Catalog Specification",
      deployment: "Vercel Production Edge",
    },
    terminalLogs: [
      "EXHIBIT: Cataloging Lacuna, watercolor & acrylic works",
      "IMAGES: Progressive artwork hydration nominal",
      "INQUIRY: Collector communication bridge online",
      "STATUS: Production gallery live at themorphiq.com",
    ],
  },
];

export const SERVICES: ServiceTier[] = [
  {
    id: "landing-page",
    name: "High-Converting Landing Page",
    tagline: "Designed specifically to turn paid ad traffic or visitors into paying leads",
    startingPriceINR: 14999,
    startingPriceUSD: 249,
    turnaroundTime: "5 - 7 Days",
    idealFor: "Startups, consultants, product launches & local service providers",
    deliverables: [
      "Custom responsive single-page architecture (No WordPress templates)",
      "Compelling layout crafted for conversion (Hero, Proof, FAQs, Intake)",
      "Interactive contact form with direct email/WhatsApp alerts",
      "95+ Google Lighthouse mobile speed score guaranteed",
      "Basic on-page SEO meta tags & OpenGraph social cards",
      "14 days of post-launch maintenance & copy adjustments",
    ],
  },
  {
    id: "business-website",
    name: "Complete Business Website",
    tagline: "A comprehensive multi-page digital presence that establishes premium brand credibility",
    startingPriceINR: 29999,
    startingPriceUSD: 499,
    turnaroundTime: "10 - 14 Days",
    isPopular: true,
    idealFor: "Small to mid-size businesses, agencies, clinics, and professional firms",
    deliverables: [
      "Up to 5 custom-crafted pages (Home, About, Services, Case Studies, Contact)",
      "Tailored design aligned with your brand colors, typography, and voice",
      "Custom interactive elements (quote calculators, booking widgets, service filters)",
      "Full local SEO setup with Schema.org JSON-LD structured data",
      "Direct integration with Calendly, WhatsApp, and automated form notifications",
      "30 days of post-launch support and video walkthrough guide",
    ],
  },
  {
    id: "ecommerce-webapp",
    name: "E-Commerce or Custom Web App",
    tagline: "Robust full-stack web applications with authentication, payments, or product carts",
    startingPriceINR: 54999,
    startingPriceUSD: 899,
    turnaroundTime: "3 - 4 Weeks",
    idealFor: "D2C brands, boutique shops, SaaS MVPs, and automated client portals",
    deliverables: [
      "Modern React / Next.js / Node.js architecture with database persistence",
      "Product catalog with search, categorization, and persistent shopping cart",
      "Secure payment gateway integration (Stripe, Razorpay, or PayPal)",
      "Customer dashboard or admin management portal for orders/content",
      "Automated transactional emails and order fulfillment webhooks",
      "60 days of post-deployment support and code documentation",
    ],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    author: "Enakshi",
    role: "Founder & Culinary Host",
    company: "Pichhutaaney Supper Club",
    location: "Kolkata, India",
    quote: "Rumpa captured the exact soul and visual cadence of Pichhutaaney. The dual-language typography, smooth reels, and seamless waitlist reservation form gave our intimate dining table an authentic digital home that our guests constantly admire.",
    metric: "96",
    metricLabel: "Lighthouse Mobile Score",
    initials: "EK",
    accent: "#EA580C",
  },
  {
    id: "test-2",
    author: "Elena",
    role: "Visual Artist",
    company: "The Morphiq Gallery",
    location: "Kolkata, India",
    quote: "Before working with Rumpa, sharing my paintings meant sending scattered social media links. Now I have a museum-grade digital exhibition where every brushstroke and dimension is showcased with pristine performance.",
    metric: "98",
    metricLabel: "Lighthouse Mobile Score",
    initials: "MO",
    accent: "#F59E0B",
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend Engineering",
    skills: [
      { name: "React 19 / React.js", level: "Expert", highlight: true },
      { name: "TypeScript", level: "Advanced", highlight: true },
      { name: "Tailwind CSS", level: "Expert", highlight: true },
      { name: "Framer Motion", level: "Advanced", highlight: true },
      { name: "Vite & Modern Build Tooling", level: "Expert" },
      { name: "Responsive UI/UX & Mobile Speed", level: "Expert" },
    ],
  },
  {
    title: "Game & Systems Architecture",
    skills: [
      { name: "Unity Engine 6", level: "Intermediate", highlight: true },
      { name: "C# Scripting", level: "Intermediate", highlight: true },
      { name: "Finite State Machines", level: "Advanced" },
      { name: "Data Flow Diagrams (DFD)", level: "Advanced" },
      { name: "Entity-Relationship (ER) Modeling", level: "Advanced" },
      { name: "Python / Data Ingestion", level: "Proficient" },
    ],
  },
  {
    title: "Performance & Deployment",
    skills: [
      { name: "Google Lighthouse Mobile Optimization", level: "Expert", highlight: true },
      { name: "Core Web Vitals Tuning", level: "Expert" },
      { name: "Vercel Production Edge", level: "Advanced" },
      { name: "Git & GitHub Version Control", level: "Advanced" },
      { name: "Semantic HTML5 & Accessibility", level: "Expert" },
      { name: "Audio Web APIs & Micro-Interactions", level: "Advanced" },
    ],
  },
];

export const DEVELOPMENT_PROCESS = [
  {
    step: "01",
    title: "Architecture & System Design",
    description: "We map out user flows, data flow diagrams (DFD), database schemas (ER), and core performance targets before coding.",
    duration: "Day 1 - 2",
    deliverable: "System architecture breakdown & DFD roadmap",
  },
  {
    step: "02",
    title: "UI Design & Responsive Layouts",
    description: "Custom editorial interface crafted to match your exact brand identity with responsive typography and fluid micro-interactions.",
    duration: "Day 3 - 5",
    deliverable: "Interactive design sign-off",
  },
  {
    step: "03",
    title: "Frontend Engineering & Speed Tuning",
    description: "Custom React and TypeScript architecture with clean modular code, zero bloat, and verified 95+ Google Lighthouse scores.",
    duration: "Day 6 - 10",
    deliverable: "Staging deployment for live preview",
  },
  {
    step: "04",
    title: "Launch & Production Handover",
    description: "Global edge deployment on Vercel, DNS routing, SSL, search metadata indexing, and full code ownership handover.",
    duration: "Day 11 - 14",
    deliverable: "Live website & source repository handover",
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "speed-matters",
    title: "Why A 1-Second Delay on Your Business Website Is Costing You 20% in Conversions",
    readTime: "4 min read",
    date: "2026",
    category: "Performance",
    summary: "Google's research reveals that 53% of mobile visits are abandoned if pages take longer than 3 seconds to load. Here is why bloated template sites fail and how modern code fixes it.",
    content: [
      "Every millisecond of latency creates friction between your customer's impulse and their purchase decision. When a page stutters, users hesitate, lose confidence, and click the back button.",
      "Traditional WordPress installations with 25 different plugins load megabytes of unminified CSS and render-blocking scripts before displaying even the headline.",
      "By building with modern React, responsive image sets, and zero-runtime Tailwind CSS, we strip away all unnecessary baggage to achieve instant sub-second paint times.",
    ],
  },
];

export const FAQS = [
  {
    question: "How long does it typically take to build a website?",
    answer: "A focused landing page takes 5 to 7 days from start to launch. A complete custom website or gallery takes 10 to 14 days, and bespoke web applications take 3 to 4 weeks depending on scope.",
  },
  {
    question: "Do you build on WordPress, or do you code from scratch?",
    answer: "I specialize in custom-coded web development using React, TypeScript, and modern edge tooling. This ensures your site loads under a second, doesn't break from rogue plugin updates, and isn't vulnerable to WordPress security exploits.",
  },
  {
    question: "Can I inspect the code and host on my own domain?",
    answer: "Yes, 100% of the code is yours upon deployment. I assist you with custom domain setup, DNS configuration, and lightning-fast global edge hosting on Vercel.",
  },
];
