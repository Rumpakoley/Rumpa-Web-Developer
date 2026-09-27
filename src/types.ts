export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'ecommerce' | 'saas' | 'business' | 'landing';
  client: string;
  completionYear: string;
  timeline: string;
  problem: string;
  solution: string;
  keyMetric: {
    value: string;
    label: string;
  };
  techStack: string[];
  features: string[];
  liveUrl?: string;
  githubUrl?: string;
  accentColor: string;
  badge: string;
  type: string;
}

export interface ServiceTier {
  id: string;
  name: string;
  tagline: string;
  startingPriceINR: number;
  startingPriceUSD: number;
  turnaroundTime: string;
  deliverables: string[];
  idealFor: string;
  isPopular?: boolean;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  location: string;
  metric: string;
  metricLabel: string;
  initials: string;
  accent: string;
}

export interface SkillCategory {
  title: string;
  skills: {
    name: string;
    level: string;
    iconName?: string;
    highlight?: boolean;
  }[];
}

export interface BlogPost {
  id: string;
  title: string;
  readTime: string;
  date: string;
  category: string;
  summary: string;
  content: string[];
}

export interface DeveloperProfile {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  email: string;
  whatsapp: string;
  location: string;
  availability: string;
  github: string;
  linkedin: string;
  twitter?: string;
  yearsExperience: string;
  projectsCompleted: string;
  satisfactionRate: string;
  avgDeliveryWeeks: string;
}

export interface QuoteOption {
  id: string;
  label: string;
  priceINR: number;
  priceUSD: number;
  description?: string;
}
