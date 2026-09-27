import React, { useState } from 'react';
import { Gauge, CheckCircle2, XCircle, Zap, ShieldAlert, Sparkles, RefreshCw } from 'lucide-react';

export const SpeedComparisonAudit: React.FC = () => {
  const [isRunningAudit, setIsRunningAudit] = useState(false);
  const [auditProgress, setAuditProgress] = useState(100);

  const handleRunAudit = () => {
    setIsRunningAudit(true);
    setAuditProgress(0);

    const interval = setInterval(() => {
      setAuditProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunningAudit(false);
          return 100;
        }
        return prev + 25;
      });
    }, 250);
  };

  return (
    <section className="py-20 md:py-28 border-t border-white/10 relative bg-gradient-to-b from-transparent via-white/[0.01] to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">
            The Performance Difference
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display text-balance">
            Why custom code beats bloated website builders every single time.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Google ranks fast websites higher, and mobile visitors leave after 3 seconds. See the real benchmark comparison between a typical WordPress theme and custom React engineering.
          </p>
        </div>

        {/* Audit Simulator Box */}
        <div className="bg-[#0C0E14] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="text-sm font-semibold text-white flex items-center gap-2">
                <Gauge className="w-4 h-4 text-emerald-400" />
                <span>Google Lighthouse & Core Web Vitals Benchmark</span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Simulated 4G mobile throttling on actual production builds
              </p>
            </div>

            <button
              onClick={handleRunAudit}
              disabled={isRunningAudit}
              className="px-4 py-2 text-xs font-semibold text-white bg-white/10 hover:bg-white/15 rounded-lg border border-white/10 transition-colors flex items-center gap-2 self-start sm:self-auto disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRunningAudit ? 'animate-spin' : ''}`} />
              <span>{isRunningAudit ? `Auditing (${auditProgress}%)...` : 'Run Live Benchmark'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
            {/* Custom Code Column (Rumpa Koley Build) */}
            <div className="bg-emerald-950/15 border border-emerald-500/30 rounded-xl p-6 relative">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-[11px] font-mono text-emerald-400 font-semibold uppercase">
                    Custom React & Next.js Stack
                  </span>
                  <div className="text-lg font-bold text-white mt-0.5">Handcrafted Engineering</div>
                </div>
                <div className="w-14 h-14 rounded-full border-4 border-emerald-500 flex items-center justify-center bg-emerald-500/10">
                  <span className="text-xl font-mono font-bold text-emerald-400 tabular-nums">99</span>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-emerald-500/20 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">First Contentful Paint (FCP):</span>
                  <span className="font-mono text-emerald-400 font-semibold tabular-nums">0.38s (Instant)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Largest Contentful Paint (LCP):</span>
                  <span className="font-mono text-emerald-400 font-semibold tabular-nums">0.72s</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Cumulative Layout Shift (CLS):</span>
                  <span className="font-mono text-emerald-400 font-semibold tabular-nums">0.00 (Zero layout jump)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Total Page Weight:</span>
                  <span className="font-mono text-emerald-400 font-semibold tabular-nums">~180 KB</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Mobile Bounce Rate:</span>
                  <span className="font-mono text-emerald-400 font-semibold tabular-nums">Under 18%</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-emerald-500/20 text-[11px] text-emerald-300/90 space-y-1.5 font-light">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Zero unnecessary plugins or rogue JavaScript libraries</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Next-gen WebP/AVIF images with automatic srcset responsive sizing</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Clean semantic HTML structure for optimal Google search indexation</span>
                </div>
              </div>
            </div>

            {/* Standard Template Site Column */}
            <div className="bg-rose-950/15 border border-rose-500/30 rounded-xl p-6 relative">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-[11px] font-mono text-rose-400 font-semibold uppercase">
                    Standard Builder / Theme
                  </span>
                  <div className="text-lg font-bold text-white mt-0.5">Heavy Drag & Drop Themes</div>
                </div>
                <div className="w-14 h-14 rounded-full border-4 border-rose-500 flex items-center justify-center bg-rose-500/10">
                  <span className="text-xl font-mono font-bold text-rose-400 tabular-nums">48</span>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-rose-500/20 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">First Contentful Paint (FCP):</span>
                  <span className="font-mono text-rose-400 font-semibold tabular-nums">3.60s (Sluggish)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Largest Contentful Paint (LCP):</span>
                  <span className="font-mono text-rose-400 font-semibold tabular-nums">5.40s</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Cumulative Layout Shift (CLS):</span>
                  <span className="font-mono text-rose-400 font-semibold tabular-nums">0.34 (Shifting buttons)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Total Page Weight:</span>
                  <span className="font-mono text-rose-400 font-semibold tabular-nums">~4.2 MB</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Mobile Bounce Rate:</span>
                  <span className="font-mono text-rose-400 font-semibold tabular-nums">Over 62%</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-rose-500/20 text-[11px] text-rose-300/80 space-y-1.5 font-light">
                <div className="flex items-center gap-1.5">
                  <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>20+ third-party scripts blocking the browser from painting</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>Uncompressed 3MB hero images crushing mobile data limits</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>Monthly recurring subscription costs for plugins that frequently break</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
