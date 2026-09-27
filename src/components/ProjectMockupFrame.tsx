import React, { useState } from 'react';
import { Project } from '../types';
import { ShoppingBag, TrendingUp, Calendar, Check, ExternalLink, ArrowRight } from 'lucide-react';

interface ProjectMockupFrameProps {
  project: Project;
  onOpenDetails: (project: Project) => void;
}

export const ProjectMockupFrame: React.FC<ProjectMockupFrameProps> = ({ project, onOpenDetails }) => {
  // Lumina Atelier state
  const [cartCount, setCartCount] = useState(2);
  const [addedItem, setAddedItem] = useState(false);

  // Pulse Metrics state
  const [timeRange, setTimeRange] = useState<'7D' | '30D' | '90D'>('30D');

  // Artisan Table state
  const [activeMenuTab, setActiveMenuTab] = useState<'Starters' | 'Mains' | 'Wine'>('Mains');
  const [tableBooked, setTableBooked] = useState(false);

  // Strata Advisory state
  const [adSpend, setAdSpend] = useState(5000);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!addedItem) {
      setCartCount(prev => prev + 1);
      setAddedItem(true);
      setTimeout(() => setAddedItem(false), 2000);
    }
  };

  const handleBookTable = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTableBooked(true);
    setTimeout(() => setTableBooked(false), 3000);
  };

  return (
    <div className="w-full bg-[#0E1017] border border-white/10 rounded-xl overflow-hidden shadow-2xl transition-all hover:border-white/20 group">
      {/* Browser chrome header bar */}
      <div className="px-4 py-2.5 bg-[#141622] border-b border-white/5 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          <span className="ml-2 font-mono text-[11px] text-slate-400 truncate max-w-[180px] sm:max-w-xs">
            {project.liveUrl?.replace('https://', '')}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            99 Score
          </span>
        </div>
      </div>

      {/* Interactive Mockup Body based on project category */}
      <div className="p-4 sm:p-5 min-h-[260px] flex flex-col justify-between select-none">
        {project.id === 'lumina-atelier' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-2.5 text-xs">
              <span className="font-semibold tracking-wider text-slate-200">LUMINA ATELIER</span>
              <div className="flex items-center gap-3 text-slate-400">
                <span>Collections</span>
                <span>Journal</span>
                <span className="text-white flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded">
                  <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
                  <span className="font-mono text-xs">{cartCount}</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 items-center">
              <div className="bg-gradient-to-br from-stone-900 to-stone-800 p-3 rounded-lg border border-white/5 relative overflow-hidden">
                <div className="text-[10px] text-amber-400 font-mono">AUTUMN / WINTER 25</div>
                <div className="text-sm font-semibold text-white mt-1">Structured Wool Overcoat</div>
                <div className="text-xs text-slate-400 font-mono mt-1">₹18,500 / $220</div>
                <button
                  onClick={handleAddToCart}
                  className="mt-3 w-full py-1.5 px-2 text-[11px] font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded transition-colors flex items-center justify-center gap-1"
                >
                  {addedItem ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3 h-3" />
                      <span>Quick Add</span>
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-2 text-xs text-slate-400">
                <div className="p-2.5 rounded bg-white/[0.02] border border-white/5">
                  <div className="text-white font-medium">Headless Architecture</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Next.js 15 & Stripe Checkout</div>
                </div>
                <div className="p-2.5 rounded bg-white/[0.02] border border-white/5">
                  <div className="text-emerald-400 font-medium">0.38s First Contentful Paint</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">+148% Mobile Conversion Rate</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {project.id === 'pulse-metrics' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-500" />
                <span className="font-semibold text-white">Pulse Analytics</span>
              </div>
              <div className="flex items-center gap-1 bg-white/5 p-0.5 rounded text-[11px]">
                {(['7D', '30D', '90D'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={(e) => {
                      e.stopPropagation();
                      setTimeRange(tab);
                    }}
                    className={`px-2 py-0.5 rounded font-mono ${
                      timeRange === tab ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="p-2.5 bg-white/[0.02] border border-white/5 rounded-lg">
                <div className="text-[10px] text-slate-400">Total ARR</div>
                <div className="text-base font-bold text-white font-mono mt-0.5">
                  {timeRange === '7D' ? '$84,200' : timeRange === '30D' ? '$118,500' : '$342,000'}
                </div>
                <div className="text-[10px] text-emerald-400 mt-0.5 flex items-center gap-0.5">
                  <TrendingUp className="w-2.5 h-2.5" /> +24.8%
                </div>
              </div>
              <div className="p-2.5 bg-white/[0.02] border border-white/5 rounded-lg">
                <div className="text-[10px] text-slate-400">Query Time</div>
                <div className="text-base font-bold text-indigo-400 font-mono mt-0.5">0.28s</div>
                <div className="text-[10px] text-slate-400 mt-0.5">50k+ rows</div>
              </div>
              <div className="p-2.5 bg-white/[0.02] border border-white/5 rounded-lg">
                <div className="text-[10px] text-slate-400">Active Seats</div>
                <div className="text-base font-bold text-white font-mono mt-0.5">1,480</div>
                <div className="text-[10px] text-emerald-400 mt-0.5">99.98% up</div>
              </div>
            </div>

            {/* Simulated interactive mini chart */}
            <div className="h-14 flex items-end gap-1.5 pt-2 px-1 border-t border-white/5">
              {[40, 65, 55, 80, 72, 95, 88, 100, 84, 92, 110, 125].map((val, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1 group/bar">
                  <div
                    style={{ height: `${(val / 125) * 44}px` }}
                    className="w-full bg-gradient-to-t from-indigo-600/40 to-indigo-500 rounded-t transition-all group-hover/bar:to-indigo-400"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {project.id === 'artisan-table' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 text-xs">
              <span className="font-serif italic text-emerald-400 text-sm">Artisan Table & Wine</span>
              <div className="flex items-center gap-1">
                {(['Starters', 'Mains', 'Wine'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenuTab(tab);
                    }}
                    className={`px-2 py-0.5 text-[11px] rounded ${
                      activeMenuTab === tab ? 'bg-emerald-950/60 text-emerald-300 font-medium' : 'text-slate-400'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 items-center">
              <div className="p-3 bg-emerald-950/20 border border-emerald-500/20 rounded-lg">
                <div className="text-xs font-semibold text-white">
                  {activeMenuTab === 'Mains'
                    ? 'Truffle Porcini Risotto'
                    : activeMenuTab === 'Starters'
                    ? 'Burrata & Heirloom Fig'
                    : 'Chianti Classico Riserva'}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Aged arborio, black winter truffle, parmigiano</div>
                <div className="text-xs font-mono text-emerald-400 mt-2 font-medium">₹1,250 / $16</div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleBookTable}
                  className="w-full py-2 px-3 text-xs font-medium text-emerald-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{tableBooked ? 'Reserved: Table for 2' : 'Reserve Tonight (8:00 PM)'}</span>
                </button>
                <div className="text-[11px] text-slate-400 text-center font-mono">
                  Direct booking · 0% commission fees
                </div>
              </div>
            </div>
          </div>
        )}

        {project.id === 'strata-advisory' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 text-xs">
              <span className="font-bold text-white tracking-tight">STRATA PARTNERS</span>
              <span className="text-[11px] text-pink-400 font-mono">Interactive Funnel Demo</span>
            </div>

            <div className="bg-pink-950/15 border border-pink-500/20 p-3.5 rounded-lg">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300">Monthly Ad Traffic Spend:</span>
                <span className="font-mono font-bold text-pink-400">${adSpend.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="25000"
                step="1000"
                value={adSpend}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => setAdSpend(Number(e.target.value))}
                className="w-full mt-2 accent-pink-500 cursor-pointer"
              />
              <div className="mt-3 pt-2.5 border-t border-pink-500/20 flex items-center justify-between text-xs">
                <span className="text-slate-400">Recaptured Revenue at 4.8% Conv:</span>
                <span className="font-mono font-bold text-emerald-400 text-sm">
                  +${Math.round(adSpend * 3.4).toLocaleString()}/mo
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>Conversion: 1.4% → 4.8%</span>
              <span className="text-slate-300">Calendly Sync Built-in</span>
            </div>
          </div>
        )}

        {/* Bottom card footer */}
        <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
          <span className="text-slate-400 font-mono text-[11px]">{project.timeline} Build Timeline</span>
          <button
            onClick={() => onOpenDetails(project)}
            className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 transition-colors"
          >
            <span>Case Study Details</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
