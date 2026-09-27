import React from 'react';
import { DeveloperProfile } from '../types';
import { Github, Linkedin, Mail, MessageCircle, ArrowUp } from 'lucide-react';

interface FooterProps {
  profile: DeveloperProfile;
  onOpenSettings: () => void;
}

export const Footer: React.FC<FooterProps> = ({ profile, onOpenSettings }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappUrl = `https://wa.me/${profile.whatsapp.replace(/[^0-9]/g, '')}`;

  return (
    <footer className="border-t border-white/10 bg-[#07080C] text-slate-400 text-xs py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Wordmark & Bio */}
          <div className="space-y-3 md:col-span-2">
            <a href="#hero" className="text-lg font-bold text-white font-display block">
              {profile.name}
            </a>
            <p className="text-slate-400 font-light text-xs max-w-sm leading-relaxed">
              Bespoke freelance web development with modern React, TypeScript, and Node.js. High-converting landing pages, e-commerce storefronts, and full-stack web applications for ambitious businesses.
            </p>
            <div className="text-[11px] font-mono text-slate-500">
              {profile.location}
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-2">
            <div className="text-xs font-mono text-white font-semibold uppercase tracking-wider mb-3">
              Navigation
            </div>
            <div>
              <a href="#projects" className="hover:text-white transition-colors block py-1">
                Selected Work
              </a>
              <a href="#services" className="hover:text-white transition-colors block py-1">
                Services & Pricing
              </a>
              <a href="#estimator" className="hover:text-white transition-colors block py-1">
                Cost Estimator
              </a>
              <a href="#process" className="hover:text-white transition-colors block py-1">
                Engineering Roadmap
              </a>
              <a href="#about" className="hover:text-white transition-colors block py-1">
                About & Skills
              </a>
            </div>
          </div>

          {/* Col 3: Direct Connect */}
          <div className="space-y-2">
            <div className="text-xs font-mono text-white font-semibold uppercase tracking-wider mb-3">
              Direct Contact
            </div>
            <div>
              <a
                href={`mailto:${profile.email}`}
                className="hover:text-white transition-colors block py-1 font-mono"
              >
                {profile.email}
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 transition-colors block py-1 font-mono"
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
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-slate-500 font-mono text-[11px]">
            © {new Date().getFullYear()} {profile.name}. All rights reserved. Handcrafted with React & Tailwind.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenSettings}
              className="text-[11px] text-slate-400 hover:text-white transition-colors"
            >
              Developer Profile Settings
            </button>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors flex items-center gap-1"
              aria-label="Scroll to top of page"
            >
              <span className="text-[11px] font-mono">Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
