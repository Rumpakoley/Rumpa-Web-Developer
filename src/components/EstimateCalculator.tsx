import React, { useState } from 'react';
import { Calculator, Check, Sparkles, ArrowRight, RefreshCw, Send } from 'lucide-react';

interface EstimateCalculatorProps {
  currency: 'INR' | 'USD';
  onApplyEstimateToContact: (summary: string, budget: string) => void;
}

export const EstimateCalculator: React.FC<EstimateCalculatorProps> = ({
  currency,
  onApplyEstimateToContact,
}) => {
  // Config state
  const [projectType, setProjectType] = useState<'landing' | 'business' | 'ecommerce' | 'webapp'>('business');
  const [pageCount, setPageCount] = useState<'single' | 'small' | 'medium' | 'large'>('small');
  const [designState, setDesignState] = useState<'hasDesign' | 'needsDesign'>('needsDesign');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['seo', 'booking']);
  const [timelineSpeed, setTimelineSpeed] = useState<'standard' | 'rush'>('standard');

  const projectTypes = [
    { id: 'landing', label: 'Landing Page', baseINR: 14999, baseUSD: 249, time: '5-7 days' },
    { id: 'business', label: 'Business Website', baseINR: 29999, baseUSD: 499, time: '10-14 days' },
    { id: 'ecommerce', label: 'E-Commerce Store', baseINR: 49999, baseUSD: 799, time: '3 weeks' },
    { id: 'webapp', label: 'Custom Web App (SaaS/Portal)', baseINR: 64999, baseUSD: 1099, time: '4 weeks' },
  ] as const;

  const pageOptions = [
    { id: 'single', label: '1 - 2 Pages', mult: 1.0 },
    { id: 'small', label: '3 - 5 Pages', mult: 1.25 },
    { id: 'medium', label: '6 - 10 Pages', mult: 1.55 },
    { id: 'large', label: '10+ Pages', mult: 1.9 },
  ] as const;

  const addonOptions = [
    { id: 'seo', label: 'Advanced SEO & Schema.org Setup', priceINR: 3500, priceUSD: 50 },
    { id: 'cms', label: 'Content Management System (Sanity/Strapi)', priceINR: 6500, priceUSD: 95 },
    { id: 'payments', label: 'Payment Gateway (Stripe/Razorpay)', priceINR: 5000, priceUSD: 75 },
    { id: 'booking', label: 'Interactive Booking & Calendar Sync', priceINR: 4000, priceUSD: 60 },
    { id: 'animation', label: 'Custom Micro-Interactions & Framer Motion', priceINR: 4500, priceUSD: 65 },
    { id: 'multilingual', label: 'Multi-Language Support (i18n)', priceINR: 6000, priceUSD: 85 },
  ] as const;

  const toggleAddon = (id: string) => {
    setSelectedAddons(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Price calculations
  const selectedTypeObj = projectTypes.find(t => t.id === projectType)!;
  const selectedPageObj = pageOptions.find(p => p.id === pageCount)!;

  let calculatedINR = selectedTypeObj.baseINR * selectedPageObj.mult;
  let calculatedUSD = selectedTypeObj.baseUSD * selectedPageObj.mult;

  if (designState === 'hasDesign') {
    calculatedINR *= 0.85; // 15% discount if client already has Figma mockups
    calculatedUSD *= 0.85;
  }

  addonOptions.forEach(addon => {
    if (selectedAddons.includes(addon.id)) {
      calculatedINR += addon.priceINR;
      calculatedUSD += addon.priceUSD;
    }
  });

  if (timelineSpeed === 'rush') {
    calculatedINR *= 1.2;
    calculatedUSD *= 1.2;
  }

  const finalINR = Math.round(calculatedINR / 500) * 500;
  const finalUSD = Math.round(calculatedUSD / 25) * 25;

  const displayPrice = currency === 'INR'
    ? `₹${finalINR.toLocaleString('en-IN')}`
    : `$${finalUSD.toLocaleString('en-US')}`;

  const estimatedDelivery = timelineSpeed === 'rush' ? '7 - 10 Days (Priority Rush)' : selectedTypeObj.time;

  const handleApply = () => {
    const summary = `Estimated Scope: ${selectedTypeObj.label} (${selectedPageObj.label}), Design: ${
      designState === 'hasDesign' ? 'Figma Ready' : 'Custom Design Needed'
    }, Features: ${selectedAddons.join(', ')}, Timeline: ${estimatedDelivery}.`;
    const budget = currency === 'INR' ? `₹${finalINR.toLocaleString('en-IN')}` : `$${finalUSD.toLocaleString('en-US')}`;
    onApplyEstimateToContact(summary, budget);
  };

  return (
    <section id="estimator" className="py-20 md:py-28 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-mono text-indigo-400 uppercase tracking-wider mb-2">
            Interactive Cost Estimator
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display text-balance">
            Configure your project and get a realistic quote in real time.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            No endless back-and-forth emails. Select your project specifications below to get a transparent baseline cost and timeline.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Panel */}
          <div className="lg:col-span-8 space-y-8 bg-[#0C0E14] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl">
            {/* 1. Project Type */}
            <div>
              <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block mb-3">
                1. Select Project Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {projectTypes.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setProjectType(t.id)}
                    className={`p-4 rounded-xl text-left border transition-all ${
                      projectType === t.id
                        ? 'bg-indigo-950/40 border-indigo-500 text-white shadow-sm'
                        : 'bg-white/[0.02] border-white/10 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <div className="font-semibold text-sm">{t.label}</div>
                    <div className="text-xs text-slate-400 mt-1 font-mono">
                      From {currency === 'INR' ? `₹${t.baseINR.toLocaleString('en-IN')}` : `$${t.baseUSD}`} · {t.time}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Page Scale */}
            <div>
              <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block mb-3">
                2. Number of Pages / Views
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {pageOptions.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setPageCount(p.id)}
                    className={`p-3 rounded-lg text-center text-xs font-medium border transition-colors ${
                      pageCount === p.id
                        ? 'bg-indigo-600 border-indigo-500 text-white font-semibold'
                        : 'bg-white/[0.02] border-white/10 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Design Status */}
            <div>
              <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block mb-3">
                3. Design & Branding Status
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => setDesignState('needsDesign')}
                  className={`p-3.5 rounded-xl text-left border transition-colors ${
                    designState === 'needsDesign'
                      ? 'bg-indigo-950/40 border-indigo-500 text-white'
                      : 'bg-white/[0.02] border-white/10 text-slate-300'
                  }`}
                >
                  <div className="text-sm font-semibold">I need custom design & branding</div>
                  <div className="text-xs text-slate-400 mt-0.5">Wireframes, typography, layouts, visual components</div>
                </button>
                <button
                  onClick={() => setDesignState('hasDesign')}
                  className={`p-3.5 rounded-xl text-left border transition-colors ${
                    designState === 'hasDesign'
                      ? 'bg-indigo-950/40 border-indigo-500 text-white'
                      : 'bg-white/[0.02] border-white/10 text-slate-300'
                  }`}
                >
                  <div className="text-sm font-semibold flex items-center justify-between">
                    <span>I have Figma/designs ready</span>
                    <span className="text-[11px] font-mono text-emerald-400">-15% OFF</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">Design-to-code implementation directly from assets</div>
                </button>
              </div>
            </div>

            {/* 4. Add-on Features */}
            <div>
              <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block mb-3">
                4. Integrations & Advanced Features
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {addonOptions.map(addon => {
                  const isChecked = selectedAddons.includes(addon.id);
                  const addonPrice = currency === 'INR'
                    ? `+₹${addon.priceINR.toLocaleString('en-IN')}`
                    : `+$${addon.priceUSD}`;

                  return (
                    <button
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-3 rounded-lg border text-left flex items-center justify-between transition-colors ${
                        isChecked
                          ? 'bg-white/10 border-indigo-400/60 text-white'
                          : 'bg-white/[0.02] border-white/5 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2 text-xs">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center border ${
                            isChecked ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-white/20'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3" />}
                        </div>
                        <span>{addon.label}</span>
                      </div>
                      <span className="text-[11px] font-mono text-indigo-400 ml-2 shrink-0">{addonPrice}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. Timeline Preference */}
            <div>
              <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block mb-3">
                5. Delivery Timeline
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setTimelineSpeed('standard')}
                  className={`p-3 rounded-lg text-center text-xs font-medium border transition-colors ${
                    timelineSpeed === 'standard'
                      ? 'bg-indigo-950/40 border-indigo-500 text-white'
                      : 'bg-white/[0.02] border-white/10 text-slate-400'
                  }`}
                >
                  Standard Delivery ({selectedTypeObj.time})
                </button>
                <button
                  onClick={() => setTimelineSpeed('rush')}
                  className={`p-3 rounded-lg text-center text-xs font-medium border transition-colors ${
                    timelineSpeed === 'rush'
                      ? 'bg-amber-950/40 border-amber-500 text-amber-200'
                      : 'bg-white/[0.02] border-white/10 text-slate-400'
                  }`}
                >
                  Priority Rush Delivery (+20%)
                </button>
              </div>
            </div>
          </div>

          {/* Sticky Estimate Summary Card */}
          <div className="lg:col-span-4 bg-[#111420] border border-indigo-500/30 rounded-2xl p-6 sm:p-7 shadow-2xl sticky top-24">
            <div className="text-xs font-mono text-indigo-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Calculator className="w-3.5 h-3.5" />
              <span>Instant Estimate Breakdown</span>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="text-xs text-slate-400">Estimated Investment</div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tabular-nums tracking-tight mt-1">
                {displayPrice}
              </div>
              <div className="text-xs text-slate-400 font-mono mt-1">
                Est. Delivery: <span className="text-slate-200 font-semibold">{estimatedDelivery}</span>
              </div>
            </div>

            <div className="space-y-2.5 my-6 text-xs text-slate-300 border-y border-white/10 py-5">
              <div className="flex justify-between">
                <span className="text-slate-400">Project Type:</span>
                <span className="font-medium text-white">{selectedTypeObj.label}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Scope:</span>
                <span className="font-medium text-white">{selectedPageObj.label}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Design:</span>
                <span className="font-medium text-white">
                  {designState === 'hasDesign' ? 'Figma Mockup Ready' : 'Full Custom Design'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Add-ons:</span>
                <span className="font-mono text-indigo-400 font-semibold">{selectedAddons.length} selected</span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleApply}
                className="w-full py-3.5 px-4 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
              >
                <span>Apply & Send Inquiry</span>
                <Send className="w-3.5 h-3.5" />
              </button>

              <p className="text-[11px] text-slate-400 text-center leading-relaxed font-mono">
                50% deposit upon kickoff · 50% upon launch · 14-day warranty included
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
