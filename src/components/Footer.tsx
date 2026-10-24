import React from 'react';
import { DeveloperProfile } from '../types';
import { Github, Linkedin, Mail, MessageCircle, ArrowUp, Terminal, Cpu } from 'lucide-react';
import { sound } from '../utils/audio';

interface FooterProps {
  profile: DeveloperProfile;
  onOpenSettings: () => void;
}

export const Footer: React.FC<FooterProps> = ({ profile, onOpenSettings }) => {
  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappUrl = `https://wa.me/${profile.whatsapp.replace(/[^0-9]/g, '')}`;

  return (
    <footer className="border-t border-cyan-500/20 bg-[#06080e] text-slate-400 text-xs py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Wordmark & Bio */}
          <div className="space-y-3 md:col-span-2">
            <a href="#hero" className="text-lg font-bold text-white font-display block flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>{profile.name} // TECH GARAGE</span>
            </a>
            <p className="text-slate-400 font-light text-xs max-w-sm leading-relaxed">
              Bespoke full-stack web engineering & interactive UI design with React 19, TypeScript, and high-performance edge infrastructure. 
            </p>
            <div className="text-[11px] font-mono text-cyan-400/80">
              {profile.location} · {profile.availability}
            </div>
            <div className="pt-2">
              <a
                href="https://bryangarage.dev/showcase"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono bg-cyan-950/40 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-950/80 transition-colors"
              >
                <Cpu className="w-3 h-3 text-cyan-400" />
                <span>Showcase design inspired by bryangarage.dev</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-2 font-mono">
            <div className="text-xs text-white font-semibold uppercase tracking-wider mb-3">
              Navigation
            </div>
            <div>
              <a href="#showcase" onClick={() => sound.playClick()} className="hover:text-cyan-300 transition-colors block py-1">
                3D Timeline Showcase
              </a>
              <a href="#projects" onClick={() => sound.playClick()} className="hover:text-cyan-300 transition-colors block py-1">
                Selected Matrix
              </a>
              <a href="#terminal" onClick={() => sound.playClick()} className="hover:text-cyan-300 transition-colors block py-1">
                Garage CLI Terminal
              </a>
              <a href="#services" onClick={() => sound.playClick()} className="hover:text-cyan-300 transition-colors block py-1">
                Services & Pricing
              </a>
              <a href="#estimator" onClick={() => sound.playClick()} className="hover:text-cyan-300 transition-colors block py-1">
                Cost Estimator
              </a>
            </div>
          </div>

          {/* Col 3: Direct Connect */}
          <div className="space-y-2">
            <div className="text-xs font-mono text-white font-semibold uppercase tracking-wider mb-3">
              Direct Transmission
            </div>
            <div>
              <a
                href={`mailto:${profile.email}`}
                className="hover:text-cyan-300 transition-colors block py-1 font-mono text-xs text-slate-300"
              >
                {profile.email}
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 transition-colors block py-1 font-mono text-xs text-slate-300"
              >
                WhatsApp: {profile.whatsapp}
              </a>
              <div className="flex items-center gap-3 pt-3">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                  aria-label="GitHub profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                  aria-label="LinkedIn profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                  aria-label="Direct email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Quiet Footer Copyright Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px]">
          <div className="text-slate-500">
            © {new Date().getFullYear()} {profile.name}. All systems operational. Built with React 19, TypeScript & Web Audio.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                sound.playClick();
                onOpenSettings();
              }}
              className="text-slate-400 hover:text-cyan-300 transition-colors"
            >
              System Config
            </button>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors flex items-center gap-1"
              aria-label="Scroll to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
