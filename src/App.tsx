import React, { useState, useEffect } from 'react';
import { INITIAL_PROFILE } from './data/portfolioData';
import { DeveloperProfile, Project, ServiceTier } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
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

export default function App() {
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

  // Modals state
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Pre-filled contact inquiry state
  const [prefilledScope, setPrefilledScope] = useState<string>('');
  const [prefilledBudget, setPrefilledBudget] = useState<string>('');

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
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToEstimator = () => {
    const elem = document.getElementById('estimator');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
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
    <div className="min-h-screen bg-[#090A0F] text-slate-100 flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
      {/* Strict 3-zone Top Bar */}
      <Navbar
        profile={profile}
        currency={currency}
        onToggleCurrency={toggleCurrency}
        onOpenContact={() => scrollToContact()}
        onOpenSettings={() => setSettingsOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          profile={profile}
          onOpenContact={() => scrollToContact()}
          onOpenEstimator={scrollToEstimator}
        />

        {/* Selected Projects Bento Grid */}
        <ProjectsSection
          onSelectProject={(proj) => setSelectedProject(proj)}
          onOpenContact={(note) => scrollToContact(note)}
        />

        {/* Services & Pricing Tiers */}
        <ServicesSection
          currency={currency}
          onSelectService={handleSelectService}
          onOpenEstimator={scrollToEstimator}
        />

        {/* Interactive Cost Estimator */}
        <EstimateCalculator
          currency={currency}
          onApplyEstimateToContact={handleApplyEstimate}
        />

        {/* Website Speed & Core Web Vitals Benchmark Proof */}
        <SpeedComparisonAudit />

        {/* About, Skills & 4-Stage Engineering Process */}
        <AboutSection
          profile={profile}
          onOpenContact={() => scrollToContact()}
        />

        {/* Client Testimonials */}
        <TestimonialsSection />

        {/* Engineering Insights & Blog Guides */}
        <BlogSection />

        {/* Frequently Asked Questions */}
        <FaqSection />

        {/* Contact & Intake System */}
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

      {/* Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenContact={(note) => scrollToContact(note)}
      />

      {/* Developer Profile Settings Modal */}
      <ProfileSettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        profile={profile}
        onSaveProfile={handleSaveProfile}
      />
    </div>
  );
}
