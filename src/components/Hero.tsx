import React from 'react';
import { ArrowRight, MessageCircle, Calendar, Sparkles, CheckCircle2, Zap, ShieldCheck } from 'lucide-react';
import { DeveloperProfile } from '../types';

interface HeroProps {
  profile: DeveloperProfile;
  onOpenContact: (prefillNote?: string) => void;
  onOpenEstimator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ profile, onOpenContact, onOpenEstimator }) => {
  const whatsappUrl = `https://wa.me/${profile.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    `Hi ${profile.name}, I found your portfolio and I would like to discuss building a website for my business.`
  )}`;

  return (
    <section id="hero" className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Background ambient radial glow */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[340px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl">
          {/* Availability Status as clean unboxed text */}
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono tracking-wide mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold">{profile.availability}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">Avg. turnaround {profile.avgDeliveryWeeks} weeks</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">Direct 1-on-1 development</span>
          </div>

          {/* Primary Display Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6 font-display text-balance">
            I build fast, modern websites that convert visitors into paying clients.
          </h1>

          {/* Value proposition prose */}
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-8 max-w-2xl font-light">
            Skip bloated template builders that drag down your search rankings. I design and code custom, responsive web applications using React, Next.js, and TypeScript that load in under 1 second and establish instant brand credibility.
          </p>

          {/* Primary CTAs & Direct Contact */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <button
              onClick={() => onOpenContact()}
              className="px-6 py-3.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-600/25 transition-all flex items-center gap-2"
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenEstimator}
              className="px-6 py-3.5 text-sm font-semibold text-slate-200 bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/15 rounded-xl transition-all flex items-center gap-2"
            >
              <span>Instant Cost Calculator</span>
              <Sparkles className="w-4 h-4 text-indigo-400" />
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3.5 text-sm font-medium text-emerald-400 hover:text-emerald-300 bg-emerald-950/30 hover:bg-emerald-950/50 border border-emerald-500/20 rounded-xl transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Quick WhatsApp Chat</span>
            </a>
          </div>

          {/* Claim-to-Proof Quantitative Adjacency */}
          <div className="pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">99+</div>
              <div className="text-xs text-slate-400 mt-1">Lighthouse Speed Score</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">{profile.projectsCompleted}</div>
              <div className="text-xs text-slate-400 mt-1">Delivered Websites</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">0.4s</div>
              <div className="text-xs text-slate-400 mt-1">Average Page Load</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">{profile.satisfactionRate}</div>
              <div className="text-xs text-slate-400 mt-1">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack Ribbon */}
      <div className="mt-14 pt-6 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider shrink-0">
              Core Technologies I Build With:
            </span>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-300 font-medium">
              <span className="hover:text-white transition-colors">React 19</span>
              <span aria-hidden="true" className="text-slate-700">/</span>
              <span className="hover:text-white transition-colors">Next.js</span>
              <span aria-hidden="true" className="text-slate-700">/</span>
              <span className="hover:text-white transition-colors">TypeScript</span>
              <span aria-hidden="true" className="text-slate-700">/</span>
              <span className="hover:text-white transition-colors">Tailwind CSS</span>
              <span aria-hidden="true" className="text-slate-700">/</span>
              <span className="hover:text-white transition-colors">Node.js & Express</span>
              <span aria-hidden="true" className="text-slate-700">/</span>
              <span className="hover:text-white transition-colors">Python</span>
              <span aria-hidden="true" className="text-slate-700">/</span>
              <span className="hover:text-white transition-colors">Stripe & Webhooks</span>
              <span aria-hidden="true" className="text-slate-700">/</span>
              <span className="hover:text-white transition-colors">Vercel & AWS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
