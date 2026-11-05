import React from 'react';
import { ServiceTier } from '../types';
import { SERVICES } from '../data/portfolioData';
import { Check, Clock, ArrowRight } from 'lucide-react';

interface ServicesSectionProps {
  currency: 'INR' | 'USD';
  onSelectService: (service: ServiceTier) => void;
  onOpenEstimator?: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  currency,
  onSelectService,
}) => {
  return (
    <section id="services" className="py-16 md:py-20 border-t border-amber-500/20 relative bg-[#0c0d10] bg-garage-scanlines">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-amber-950/60 border border-amber-500/40 text-amber-400 mb-2">
            <span>// SERVICES & PRICING</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight font-display text-balance">
            Transparent pricing. Zero hidden fees. Built right the first time.
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1.5">
            High-craft custom code, guaranteed sub-second speeds, and direct 1-on-1 communication.
          </p>
        </div>

        {/* 3 Compact Service Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.map((service) => {
            const price = currency === 'INR'
              ? `₹${service.startingPriceINR.toLocaleString('en-IN')}`
              : `$${service.startingPriceUSD.toLocaleString('en-US')}`;

            return (
              <div
                key={service.id}
                className={`rounded-2xl p-6 flex flex-col justify-between transition-all relative ${
                  service.isPopular
                    ? 'bg-[#14151a] border-2 border-amber-500 shadow-2xl shadow-amber-500/15'
                    : 'bg-[#101116] border border-amber-500/20 hover:border-amber-500/40'
                }`}
              >
                {service.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-gradient-to-r from-amber-500 to-orange-500 text-black text-[10px] font-mono font-bold rounded-full uppercase tracking-wider shadow-md shadow-amber-500/20">
                    Most Popular Choice
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h3 className="text-lg font-bold text-white tracking-tight font-display">
                      {service.name}
                    </h3>
                  </div>

                  <p className="text-slate-300 text-xs leading-relaxed mb-4 font-light min-h-[34px]">
                    {service.tagline}
                  </p>

                  {/* Starting Price & Turnaround */}
                  <div className="pt-3 border-t border-amber-500/15 pb-4">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Starting At</div>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums tracking-tight">
                        {price}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">one-time</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-amber-300 mt-1.5 font-mono">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>{service.turnaroundTime} Delivery</span>
                    </div>
                  </div>

                  {/* Deliverables List */}
                  <div className="space-y-2 pt-4 border-t border-white/5 mb-6">
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                      Everything Included:
                    </span>
                    {service.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-3 text-[11px] text-slate-400 bg-white/[0.02] p-2 rounded-lg border border-white/5">
                    <span className="text-slate-300 font-medium">Ideal for: </span>
                    {service.idealFor}
                  </div>

                  <button
                    onClick={() => onSelectService(service)}
                    className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                      service.isPopular
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black shadow-lg shadow-amber-500/20'
                        : 'bg-white/5 hover:bg-amber-500/15 text-white border border-white/10 hover:border-amber-500/30'
                    }`}
                  >
                    <span>Inquire About This Package</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
