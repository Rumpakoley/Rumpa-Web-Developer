import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, Volume2, VolumeX, Monitor, Terminal, Sparkles } from 'lucide-react';
import { DeveloperProfile } from '../types';
import { sound } from '../utils/audio';

interface NavbarProps {
  profile: DeveloperProfile;
  currency: 'INR' | 'USD';
  onToggleCurrency: () => void;
  onOpenContact: () => void;
  onOpenSettings: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  crtEnabled: boolean;
  onToggleCRT: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  currency,
  onToggleCurrency,
  onOpenContact,
  onOpenSettings,
  soundEnabled,
  onToggleSound,
  crtEnabled,
  onToggleCRT,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: '3D Showcase', href: '#showcase', highlight: true },
    { label: 'Bento Grid', href: '#projects' },
    { label: 'Garage CLI', href: '#terminal' },
    { label: 'Services', href: '#services' },
    { label: 'Estimator', href: '#estimator' },
    { label: 'Speed Audit', href: '#speed-audit' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    sound.playClick(750);
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#07090e]/90 backdrop-blur-xl border-b border-cyan-500/20 transition-colors">
      {/* Top telemetry ticker strip */}
      <div className="hidden lg:flex items-center justify-between px-6 py-1 bg-black/60 border-b border-white/5 text-[10px] font-mono text-slate-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            GARAGE OS v2.6.4 [ONLINE]
          </span>
          <span className="text-slate-600">|</span>
          <span>UPTIME: 99.98%</span>
          <span className="text-slate-600">|</span>
          <span className="text-cyan-400">INSPIRATION: BRYANGARAGE.DEV/SHOWCASE</span>
        </div>
        <div className="flex items-center gap-4">
          <span>LATENCY: 12ms</span>
          <span className="text-slate-600">|</span>
          <span>STACK: REACT 19 + TAILWIND + WEB AUDIO</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Terminal badge and Developer Identity */}
        <div className="flex items-center gap-3">
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, '#hero')}
            className="flex items-center gap-2 group"
          >
            <div className="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 transition-colors">
              <Terminal className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors font-display flex items-center gap-1.5">
                {profile.name}
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono font-normal">
                  DEV
                </span>
              </span>
            </div>
          </a>
          <button
            onClick={() => {
              sound.playClick();
              onOpenSettings();
            }}
            title="Edit profile & rates"
            className="text-[10px] font-mono text-slate-400 hover:text-slate-200 transition-colors border border-white/10 rounded px-1.5 py-0.5"
          >
            Config
          </button>
        </div>

        {/* Zone 2: Navigation links */}
        <nav className="hidden md:flex items-center gap-5 text-xs font-mono text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`transition-colors py-1 ${
                link.highlight
                  ? 'text-cyan-300 font-bold border-b border-cyan-400'
                  : 'hover:text-white text-slate-400'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Interactive controls (Audio, CRT, Currency, Contact) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Audio FX Toggle */}
          <button
            onClick={() => {
              onToggleSound();
              sound.playClick();
            }}
            className={`p-2 rounded-lg border text-xs font-mono transition-all flex items-center gap-1 ${
              soundEnabled
                ? 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40'
                : 'bg-black/40 text-slate-500 border-white/10 hover:text-slate-300'
            }`}
            title={soundEnabled ? 'Disable Synthesized Audio' : 'Enable Synthesized Audio (Web Audio API)'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden xl:inline text-[10px]">{soundEnabled ? 'SFX ON' : 'MUTED'}</span>
          </button>

          {/* CRT Filter Toggle */}
          <button
            onClick={() => {
              sound.playClick();
              onToggleCRT();
            }}
            className={`p-2 rounded-lg border text-xs font-mono transition-all flex items-center gap-1 ${
              crtEnabled
                ? 'bg-amber-950/80 text-amber-300 border-amber-500/40'
                : 'bg-black/40 text-slate-500 border-white/10 hover:text-slate-300'
            }`}
            title={crtEnabled ? 'Disable CRT Scanlines' : 'Enable CRT Scanlines'}
          >
            <Monitor className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden xl:inline text-[10px]">{crtEnabled ? 'CRT ON' : 'CRT OFF'}</span>
          </button>

          {/* Currency Toggle */}
          <button
            onClick={() => {
              sound.playClick();
              onToggleCurrency();
            }}
            aria-label="Toggle currency between INR and USD"
            className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono font-medium text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors"
            title="Toggle between INR (₹) and USD ($)"
          >
            <span className={currency === 'INR' ? 'text-cyan-400 font-semibold' : 'text-slate-500'}>₹ INR</span>
            <span className="text-slate-600">/</span>
            <span className={currency === 'USD' ? 'text-cyan-400 font-semibold' : 'text-slate-500'}>$ USD</span>
          </button>

          {/* Primary Action CTA */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenContact();
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg shadow-sm shadow-cyan-600/30 transition-all font-mono whitespace-nowrap"
          >
            <span>Start Mission</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => {
              sound.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="md:hidden p-2 rounded-lg bg-white/5 text-slate-300 hover:text-white border border-white/10"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0d16] border-b border-cyan-500/20 px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="block px-3 py-2 rounded-lg text-sm font-mono text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-300 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => {
                onToggleSound();
                sound.playClick();
              }}
              className="text-xs font-mono text-cyan-400 flex items-center gap-1.5"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Audio: {soundEnabled ? 'ON' : 'OFF'}</span>
            </button>
            <button
              onClick={() => {
                onToggleCRT();
                sound.playClick();
              }}
              className="text-xs font-mono text-amber-400 flex items-center gap-1.5"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>CRT: {crtEnabled ? 'ON' : 'OFF'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
