import React from 'react';
import { ServiceTier } from '../types';
import { SERVICES } from '../data/portfolioData';
import { Check, Clock, ArrowRight, Sparkles } from 'lucide-react';

interface ServicesSectionProps {
  currency: 'INR' | 'USD';
  onSelectService: (service: ServiceTier) => void;
  onOpenEstimator: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  currency,
  onSelectService,
  onOpenEstimator,
}) => {
  return (
    <section id="services" className="py-20 md:py-28 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <div className="text-xs font-mono text-indigo-400 uppercase tracking-wider mb-2">
            Services & Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display text-balance">
            Transparent pricing. Zero hidden fees. Built right the first time.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Whether you need a laser-focused sales landing page or a full bespoke web application, you get high-craft code, guaranteed sub-second speeds, and direct communication.
          </p>
        </div>

        {/* 3 Service Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map((service) => {
            const price = currency === 'INR'
              ? `₹${service.startingPriceINR.toLocaleString('en-IN')}`
              : `$${service.startingPriceUSD.toLocaleString('en-US')}`;

            return (
              <div
                key={service.id}
                className={`rounded-2xl p-7 flex flex-col justify-between transition-all relative ${
                  service.isPopular
                    ? 'bg-[#10131E] border-2 border-indigo-500 shadow-2xl shadow-indigo-500/10'
                    : 'bg-[#0C0E14] border border-white/10 hover:border-white/20'
                }`}
              >
                {service.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-indigo-600 text-white text-[11px] font-mono font-semibold rounded-full uppercase tracking-wider shadow">
                    Most Popular Choice
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-xl font-bold text-white tracking-tight font-display">
                      {service.name}
                    </h3>
                  </div>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-light min-h-[40px]">
                    {service.tagline}
                  </p>

                  {/* Starting Price & Turnaround */}
                  <div className="pt-4 border-t border-white/10 pb-6">
                    <div className="text-[11px] font-mono text-slate-400 uppercase">Starting At</div>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono tabular-nums tracking-tight">
                        {price}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">one-time</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-slate-300 mt-2 font-mono">
                      <Clock className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{service.turnaroundTime} Delivery</span>
                    </div>
                  </div>

                  {/* Deliverables List */}
                  <div className="space-y-3 pt-6 border-t border-white/5 mb-8">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                      Everything Included:
                    </span>
                    {service.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-4 text-[11px] text-slate-400 bg-white/[0.02] p-2.5 rounded-lg border border-white/5">
                    <span className="text-slate-300 font-medium">Ideal for: </span>
                    {service.idealFor}
                  </div>

                  <button
                    onClick={() => onSelectService(service)}
                    className={`w-full py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      service.isPopular
                        ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25'
                        : 'bg-white/10 hover:bg-white/15 text-white'
                    }`}
                  >
                    <span>Inquire About This Package</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Project Estimator Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-purple-950/20 to-slate-900 border border-indigo-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Need a custom scope or specific integrations?</span>
            </div>
            <h3 className="text-xl font-bold text-white font-display">
              Calculate your exact project investment in 60 seconds
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
              Use the interactive quote builder to customize page counts, payment gateways, CMS options, and timeline requirements.
            </p>
          </div>

          <button
            onClick={onOpenEstimator}
            className="px-5 py-3 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-md transition-all whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <span>Open Cost Calculator</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
