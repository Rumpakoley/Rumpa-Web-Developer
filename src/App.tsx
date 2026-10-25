import React, { useState, useEffect } from 'react';
import { INITIAL_PROFILE } from './data/portfolioData';
import { DeveloperProfile, Project, ServiceTier } from './types';
import { BryanGarageLandingHero } from './components/BryanGarageLandingHero';
import { BryanGarageShowcase } from './components/BryanGarageShowcase';
import { CommandPaletteModal } from './components/CommandPaletteModal';
import { Navbar } from './components/Navbar';
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
import { CustomCursor } from './components/CustomCursor';
import { BootPreloader } from './components/BootPreloader';
import { sound } from './utils/audio';

export default function App() {
  // View mode: 'landing' (Default landing page matching reference screenshot) or 'showcase' (Fullscreen 3D chamber)
  const [currentView, setCurrentView] = useState<'landing' | 'showcase'>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/showcase' || hash === '#showcase') {
        return 'showcase';
      }
    }
    return 'landing';
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
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [isBooting, setIsBooting] = useState(true);

  // Pre-filled contact inquiry state
  const [prefilledScope, setPrefilledScope] = useState<string>('');
  const [prefilledBudget, setPrefilledBudget] = useState<string>('');

  // Ensure page always starts at top on initial load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.hash === '' && window.location.pathname !== '/showcase') {
        window.scrollTo(0, 0);
      }
    }
  }, []);

  const handleSwitchView = (view: 'landing' | 'showcase') => {
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

  const scrollToSection = (targetId: string) => {
    if (targetId === 'showcase') {
      handleSwitchView('showcase');
      return;
    }
    if (currentView === 'showcase') {
      setCurrentView('landing');
      setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = (note?: string, budget?: string) => {
    if (note) setPrefilledScope(note);
    if (budget) setPrefilledBudget(budget);
    scrollToSection('contact');
  };

  const scrollToEstimator = () => {
    scrollToSection('estimator');
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
    <div className={`min-h-screen bg-[#0e0f13] text-slate-100 flex flex-col font-sans selection:bg-amber-600 selection:text-white ${crtEnabled ? 'crt-mode' : ''}`}>
      {/* Boot Preloader System */}
      {isBooting && <BootPreloader onComplete={() => setIsBooting(false)} />}

      {/* Bryan Garage Signature Paper Plane Cursor */}
      <CustomCursor />
      
      {/* ========================================================================= */}
      {/* VIEW 1: FULL-SCREEN BRYAN GARAGE 3D TIMELINE SHOWCASE (/showcase)        */}
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
          onSwitchView={(v) => handleSwitchView(v === 'showcase' ? 'showcase' : 'landing')}
        />
      ) : (
        /* ========================================================================= */
        /* VIEW 2: THE SIGNATURE BRYAN GARAGE LANDING PAGE (Exact match to image)   */
        /* ========================================================================= */
        <>
          {/* Top Hero Landing Header (Matches Reference Screenshot) */}
          <BryanGarageLandingHero
            profile={profile}
            onOpenCommandPalette={() => setCommandPaletteOpen(true)}
            onOpenContact={(note) => scrollToContact(note)}
            onOpenShowcase={() => handleSwitchView('showcase')}
            onSelectProject={(proj) => setSelectedProject(proj)}
          />

          {/* Sticky Secondary Navigation */}
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
            onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          />

          <main className="flex-1">
            {/* Embedded 3D Timeline Chain Section */}
            <TimelineShowcase
              onSelectProject={(proj) => setSelectedProject(proj)}
              onOpenContact={(note) => scrollToContact(note)}
            />

            {/* Selected Projects Bento Grid */}
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

            {/* Website Speed & Core Web Vitals Benchmark */}
            <SpeedComparisonAudit />

            {/* About, Skills & Engineering Roadmap */}
            <AboutSection
              profile={profile}
              onOpenContact={() => scrollToContact()}
            />

            {/* Testimonials */}
            <TestimonialsSection />

            {/* Engineering Insights */}
            <BlogSection />

            {/* Frequently Asked Questions */}
            <FaqSection />

            {/* Contact Intake Terminal */}
            <ContactSection
              profile={profile}
              currency={currency}
              prefilledScope={prefilledScope}
              prefilledBudget={prefilledBudget}
            />
          </main>

          {/* Quiet Footer */}
          <Footer
            profile={profile}
            onOpenSettings={() => setSettingsOpen(true)}
          />
        </>
      )}

      {/* Interactive Command Palette Modal (Ctrl+K / ⌘K) */}
      <CommandPaletteModal
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onNavigate={scrollToSection}
        onToggleSound={toggleSound}
        soundEnabled={soundEnabled}
        onToggleCRT={toggleCRT}
        crtEnabled={crtEnabled}
      />

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
