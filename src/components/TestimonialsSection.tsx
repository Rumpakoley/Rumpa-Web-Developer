import React from 'react';
import { TESTIMONIALS } from '../data/portfolioData';
import { Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-20 md:py-28 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <div className="text-xs font-mono text-indigo-400 uppercase tracking-wider mb-2">
            Client Testimonials & Outcomes
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display text-balance">
            Trusted by founders, agency directors, and small business owners.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Real outcomes from real collaborations. Here is what clients say about working together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-[#0C0E14] border border-white/10 rounded-2xl p-7 flex flex-col justify-between hover:border-white/20 transition-all shadow-xl"
            >
              <div>
                {/* Metric Proof Badge Header */}
                <div className="flex items-baseline justify-between border-b border-white/5 pb-4 mb-6">
                  <div>
                    <div className="text-2xl font-extrabold text-white font-mono tabular-nums">
                      {t.metric}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">{t.metricLabel}</div>
                  </div>
                  <Quote className="w-5 h-5 text-indigo-400/40" />
                </div>

                {/* Testimonial Quote */}
                <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed italic mb-8">
                  "{t.quote}"
                </p>
              </div>

              {/* Author & Organization Credential (Attributable as per Section 1.H) */}
              <div className="pt-4 border-t border-white/5 flex items-center gap-3">
                <div
                  style={{ backgroundColor: `${t.accent}20`, color: t.accent, borderColor: `${t.accent}40` }}
                  className="w-10 h-10 rounded-full border flex items-center justify-center font-bold text-xs font-mono shrink-0"
                >
                  {t.initials}
                </div>
                <div>
                  <div className="text-xs font-bold text-white font-display">{t.author}</div>
                  <div className="text-[11px] text-slate-400">{t.role}, {t.company}</div>
                  <div className="text-[10px] text-slate-500 font-mono">{t.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
