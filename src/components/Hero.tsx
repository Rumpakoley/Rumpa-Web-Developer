import React from 'react';
import { ArrowRight, MessageCircle, Sparkles, Terminal, Cpu, ArrowUpRight, ShieldCheck, Activity } from 'lucide-react';
import { DeveloperProfile } from '../types';
import { sound } from '../utils/audio';

interface HeroProps {
  profile: DeveloperProfile;
  onOpenContact: (prefillNote?: string) => void;
  onOpenEstimator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ profile, onOpenContact, onOpenEstimator }) => {
  const whatsappUrl = `https://wa.me/${profile.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    `Hi ${profile.name}, I found your tech showcase and I'd like to discuss a web project.`
  )}`;

  const scrollToShowcase = () => {
    sound.playClick();
    document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTerminal = () => {
    sound.playClick();
    document.getElementById('terminal')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-tech-grid">
      {/* Background ambient radial glow */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" 
      />
      <div 
        aria-hidden="true" 
        className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl">
          
          {/* Terminal boot chip */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold">{profile.availability}</span>
            <span className="text-slate-600">·</span>
            <span>Avg. Turnaround {profile.avgDeliveryWeeks} Weeks</span>
            <span className="text-slate-600">·</span>
            <span className="hidden sm:inline">Kolkata & Worldwide</span>
          </div>

          {/* Primary Display Headline */}
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.1] mb-6 font-display text-balance">
            Building fast, award-caliber websites & interactive applications.
          </h1>

          {/* Value proposition prose */}
          <p className="text-base sm:text-xl text-slate-300 leading-relaxed mb-8 max-w-2xl font-light">
            Skip bloated template builders that drag down your search rankings. I architect bespoke web applications and interactive digital experiences with React 19, TypeScript, and modern edge runtimes that load in under 1 second and convert visitors into loyal clients.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 mb-12">
            <button
              onClick={scrollToShowcase}
              className="px-6 py-3.5 text-xs sm:text-sm font-semibold text-white bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 rounded-xl shadow-lg shadow-cyan-600/30 transition-all flex items-center gap-2 font-mono"
            >
              <Cpu className="w-4 h-4" />
              <span>Explore 3D Timeline</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={scrollToTerminal}
              className="px-5 py-3.5 text-xs sm:text-sm font-medium text-slate-200 bg-black/60 hover:bg-black/90 active:bg-black border border-cyan-500/30 rounded-xl transition-all flex items-center gap-2 font-mono"
            >
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>Open Garage CLI</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onOpenEstimator();
              }}
              className="px-5 py-3.5 text-xs sm:text-sm font-medium text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all flex items-center gap-2 font-mono"
            >
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Instant Cost Calculator</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="px-4 py-3.5 text-xs sm:text-sm font-medium text-emerald-400 hover:text-emerald-300 bg-emerald-950/40 hover:bg-emerald-950/60 border border-emerald-500/30 rounded-xl transition-all flex items-center gap-2 font-mono"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Direct</span>
            </a>
          </div>

          {/* Telemetry quantitative metrics */}
          <div className="pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-3 rounded-xl bg-black/30 border border-white/5">
              <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">99+</div>
              <div className="text-xs text-slate-400 mt-1 font-mono">Lighthouse Perf</div>
            </div>
            <div className="p-3 rounded-xl bg-black/30 border border-white/5">
              <div className="text-2xl sm:text-3xl font-bold text-cyan-400 font-mono tabular-nums">{profile.projectsCompleted}</div>
              <div className="text-xs text-slate-400 mt-1 font-mono">Delivered Systems</div>
            </div>
            <div className="p-3 rounded-xl bg-black/30 border border-white/5">
              <div className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono tabular-nums">0.38s</div>
              <div className="text-xs text-slate-400 mt-1 font-mono">Average Page Load</div>
            </div>
            <div className="p-3 rounded-xl bg-black/30 border border-white/5">
              <div className="text-2xl sm:text-3xl font-bold text-purple-400 font-mono tabular-nums">{profile.satisfactionRate}</div>
              <div className="text-xs text-slate-400 mt-1 font-mono">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tech stack badge banner */}
      <div className="mt-12 pt-4 border-t border-cyan-500/10 bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 font-bold">CORE TOOLCHAIN:</span>
              <span>React 19 · TypeScript · Next.js 15 · Tailwind CSS · Node.js · Web Audio API · WebGL Canvas</span>
            </div>
            <div className="text-slate-500 text-[11px]">
              ARCHITECTURE: HIGH-CONVERSION & ZERO BLOAT
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
