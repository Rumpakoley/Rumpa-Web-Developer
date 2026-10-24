import React, { useState, useEffect } from 'react';
import { INITIAL_PROFILE } from './data/portfolioData';
import { DeveloperProfile, Project, ServiceTier } from './types';
import { BryanGarageShowcase } from './components/BryanGarageShowcase';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TimelineShowcase } from './components/TimelineShowcase';
import { ProjectsSection } from './components/ProjectsSection';
import { GarageCLI } from './components/GarageCLI';
import { ServicesSection } from './components/ServicesSection';
import { EstimateCalculator } from './components/EstimateCalculator';
import { SpeedComparisonAudit } from './components/SpeedComparisonAudit';
import { AboutSection } from './components/AboutSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { BlogSection } from './components/BlogSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ProfileSettingsModal } from './components/ProfileSettingsModal';
import { sound } from './utils/audio';
import { Terminal, Cpu, Layers } from 'lucide-react';

export default function App() {
  // Current view mode: 'showcase' (Bryan Garage 3D Timeline), 'overview' (Full portfolio), or 'terminal'
  const [currentView, setCurrentView] = useState<'showcase' | 'overview' | 'terminal'>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/showcase' || hash === '#showcase') {
        return 'showcase';
      }
    }
    // Default to the flagship 3D Showcase inspired by bryangarage.dev/showcase
    return 'showcase';
  });

  // Developer profile stored in localStorage
  const [profile, setProfile] = useState<DeveloperProfile>(() => {
    const saved = localStorage.getItem('developer_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved profile', e);
      }
    }
    return INITIAL_PROFILE;
  });

  // Currency toggle (INR / USD)
  const [currency, setCurrency] = useState<'INR' | 'USD'>(() => {
    const saved = localStorage.getItem('developer_currency');
    return saved === 'USD' ? 'USD' : 'INR';
  });

  // Audio SFX state
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    return sound.isEnabled();
  });

  // CRT Scanline Shader state
  const [crtEnabled, setCrtEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('garage_crt_enabled');
    return saved === 'true';
  });

  // Modals state
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Pre-filled contact inquiry state
  const [prefilledScope, setPrefilledScope] = useState<string>('');
  const [prefilledBudget, setPrefilledBudget] = useState<string>('');

  const handleSwitchView = (view: 'showcase' | 'overview' | 'terminal') => {
    sound.playClick(900);
    setCurrentView(view);
    if (typeof window !== 'undefined') {
      const newPath = view === 'showcase' ? '/showcase' : '/';
      window.history.pushState(null, '', newPath);
    }
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.setEnabled(next);
  };

  const toggleCRT = () => {
    const next = !crtEnabled;
    setCrtEnabled(next);
    localStorage.setItem('garage_crt_enabled', next ? 'true' : 'false');
  };

  const toggleCurrency = () => {
    const next = currency === 'INR' ? 'USD' : 'INR';
    setCurrency(next);
    localStorage.setItem('developer_currency', next);
  };

  const handleSaveProfile = (updated: DeveloperProfile) => {
    setProfile(updated);
    localStorage.setItem('developer_profile', JSON.stringify(updated));
  };

  const scrollToContact = (note?: string, budget?: string) => {
    if (note) setPrefilledScope(note);
    if (budget) setPrefilledBudget(budget);
    if (currentView === 'showcase') {
      setCurrentView('overview');
      setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToEstimator = () => {
    if (currentView === 'showcase') {
      setCurrentView('overview');
      setTimeout(() => {
        document.getElementById('estimator')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById('estimator')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (service: ServiceTier) => {
    const priceStr = currency === 'INR'
      ? `₹${service.startingPriceINR.toLocaleString('en-IN')}`
      : `$${service.startingPriceUSD.toLocaleString('en-US')}`;
    const scopeNote = `Selected Package: ${service.name} (${service.tagline})\nExpected Turnaround: ${service.turnaroundTime}\nStarting Price: ${priceStr}`;
    scrollToContact(scopeNote, priceStr);
  };

  const handleApplyEstimate = (summary: string, budget: string) => {
    scrollToContact(summary, budget);
  };

  return (
    <div className={`min-h-screen bg-[#05070B] text-slate-100 flex flex-col font-sans selection:bg-cyan-600 selection:text-white ${crtEnabled ? 'crt-mode' : ''}`}>
      
      {/* ========================================================================= */}
      {/* MODE 1: DEDICATED BRYAN GARAGE 3D TIMELINE SHOWCASE (/showcase)          */}
      {/* ========================================================================= */}
      {currentView === 'showcase' ? (
        <BryanGarageShowcase
          profile={profile}
          soundEnabled={soundEnabled}
          onToggleSound={toggleSound}
          crtEnabled={crtEnabled}
          onToggleCRT={toggleCRT}
          onSelectProject={(proj) => setSelectedProject(proj)}
          onOpenContact={(note) => scrollToContact(note)}
          onSwitchView={handleSwitchView}
        />
      ) : (
        /* ========================================================================= */
        /* MODE 2: FULL OVERVIEW / HYBRID GARAGE WORKSTATION                         */
        /* ========================================================================= */
        <>
          {/* Top Floating View Switcher Pill */}
          <div className="sticky top-0 z-50 bg-[#07090e]/90 backdrop-blur-xl border-b border-cyan-500/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  {profile.name} // GARAGE OS
                </span>
              </div>

              {/* View Switcher Tabs */}
              <div className="flex items-center p-1 rounded-xl bg-black/60 border border-white/10 text-xs font-mono">
                <button
                  onClick={() => handleSwitchView('showcase')}
                  className="px-3 py-1 rounded-lg bg-cyan-600 text-white font-semibold shadow-md shadow-cyan-600/30 flex items-center gap-1.5 transition-all"
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>3D Showcase</span>
                </button>

                <button
                  onClick={() => handleSwitchView('overview')}
                  className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                    currentView === 'overview'
                      ? 'bg-white/10 text-white font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Overview</span>
                </button>

                <button
                  onClick={() => handleSwitchView('terminal')}
                  className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                    currentView === 'terminal'
                      ? 'bg-emerald-950 text-emerald-300 font-semibold border border-emerald-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>CLI</span>
                </button>
              </div>

              {/* Audio & CRT Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleSound}
                  className="text-xs font-mono text-cyan-400 p-1.5 rounded-lg border border-white/10 bg-black/40 hover:bg-white/5"
                  title="Toggle SFX"
                >
                  {soundEnabled ? '🔊 SFX' : '🔇 MUTED'}
                </button>
              </div>
            </div>
          </div>

          {/* Main Navigation */}
          <Navbar
            profile={profile}
            currency={currency}
            onToggleCurrency={toggleCurrency}
            onOpenContact={() => scrollToContact()}
            onOpenSettings={() => setSettingsOpen(true)}
            soundEnabled={soundEnabled}
            onToggleSound={toggleSound}
            crtEnabled={crtEnabled}
            onToggleCRT={toggleCRT}
          />

          <main className="flex-1">
            {/* Hero Section */}
            <Hero
              profile={profile}
              onOpenContact={() => scrollToContact()}
              onOpenEstimator={scrollToEstimator}
            />

            {/* Bryan Garage Scroll Gate Prompt */}
            <div className="py-8 bg-black/60 border-y border-cyan-500/20 text-center font-mono">
              <div className="max-w-2xl mx-auto px-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs sm:text-sm">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span>rumpa@garage ~ % showcase --3d-timeline</span>
                </div>
                <div className="mt-3">
                  <button
                    onClick={() => handleSwitchView('showcase')}
                    className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-bold shadow-lg shadow-cyan-600/30 transition-all"
                  >
                    ENTER 3D TIMELINE CHAMBER ➔
                  </button>
                </div>
              </div>
            </div>

            {/* Embedded 3D Timeline Section */}
            <TimelineShowcase
              onSelectProject={(proj) => setSelectedProject(proj)}
              onOpenContact={(note) => scrollToContact(note)}
            />

            {/* Selected Projects Matrix */}
            <ProjectsSection
              onSelectProject={(proj) => setSelectedProject(proj)}
              onOpenContact={(note) => scrollToContact(note)}
            />

            {/* Interactive Garage CLI Terminal */}
            <GarageCLI
              profile={profile}
              soundEnabled={soundEnabled}
              onToggleSound={toggleSound}
              crtEnabled={crtEnabled}
              onToggleCRT={toggleCRT}
              onSelectProject={(proj) => setSelectedProject(proj)}
              onOpenContact={(note) => scrollToContact(note)}
            />

            {/* Services & Pricing Tiers */}
            <ServicesSection
              currency={currency}
              onSelectService={handleSelectService}
              onOpenEstimator={scrollToEstimator}
            />

            {/* Cost Estimator */}
            <EstimateCalculator
              currency={currency}
              onApplyEstimateToContact={handleApplyEstimate}
            />

            {/* Speed Audit Benchmark */}
            <SpeedComparisonAudit />

            {/* About & Skills */}
            <AboutSection
              profile={profile}
              onOpenContact={() => scrollToContact()}
            />

            {/* Client Testimonials */}
            <TestimonialsSection />

            {/* Engineering Insights */}
            <BlogSection />

            {/* FAQs */}
            <FaqSection />

            {/* High-Tech Contact Intake */}
            <ContactSection
              profile={profile}
              currency={currency}
              prefilledScope={prefilledScope}
              prefilledBudget={prefilledBudget}
            />
          </main>

          {/* Footer */}
          <Footer
            profile={profile}
            onOpenSettings={() => setSettingsOpen(true)}
          />
        </>
      )}

      {/* Case Study Deep Inspector Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenContact={(note) => scrollToContact(note)}
      />

      {/* Profile Settings Modal */}
      <ProfileSettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        profile={profile}
        onSaveProfile={handleSaveProfile}
      />
    </div>
  );
}
