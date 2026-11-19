import React, { useState } from 'react';
import { Project } from '../types';
import { Swords, Network, Utensils, Palette, Calendar, Check, ArrowRight, ExternalLink } from 'lucide-react';
import { sound } from '../utils/audio';

interface ProjectMockupFrameProps {
  project: Project;
  onOpenDetails: (project: Project) => void;
}

export const ProjectMockupFrame: React.FC<ProjectMockupFrameProps> = ({ project, onOpenDetails }) => {
  // Pokémon Chronicles State
  const [battleHp, setBattleHp] = useState(84);
  const [battleLog, setBattleLog] = useState('Wild Encounter ready. Select an attack.');

  // AI Interior Design State
  const [activeSchemaTab, setActiveSchemaTab] = useState<'DFD' | 'ER'>('DFD');

  // Pichhutaaney State
  const [waitlistSent, setWaitlistSent] = useState(false);
  const [activeDish, setActiveDish] = useState<'Ilish' | 'Khichuri' | 'Kosha'>('Ilish');

  // The Morphiq State
  const [selectedSeries, setSelectedSeries] = useState<'Lacuna' | 'Ink' | 'Watercolors'>('Lacuna');
  const [inquirySent, setInquirySent] = useState(false);

  const handleAttack = (move: string, damage: number) => {
    sound.playClick(900);
    setBattleHp(prev => Math.max(0, prev - damage));
    setBattleLog(`Used ${move}! Enemy took ${damage} damage.`);
  };

  const handleWaitlistSubmit = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick(850);
    setWaitlistSent(true);
    setTimeout(() => setWaitlistSent(false), 3000);
  };

  const handleInquirySubmit = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick(850);
    setInquirySent(true);
    setTimeout(() => setInquirySent(false), 3000);
  };

  return (
    <div className="w-full bg-[#101116] border border-amber-500/20 rounded-xl overflow-hidden shadow-2xl transition-all hover:border-amber-500/50 group">
      {/* Browser chrome header bar */}
      <div className="px-4 py-2.5 bg-[#14151a] border-b border-white/5 flex items-center justify-between text-xs text-slate-400 font-mono">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          <span className="ml-2 font-mono text-[11px] text-slate-400 truncate max-w-[180px] sm:max-w-xs">
            {project.liveUrl?.replace('https://', '') || `${project.id}.local`}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-amber-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            {project.status || 'LOG 2026'}
          </span>
        </div>
      </div>

      {/* Interactive Mockup Body based on project category */}
      <div className="p-4 sm:p-5 min-h-[260px] flex flex-col justify-between select-none">
        
        {/* Project 1: Pokémon Chronicles */}
        {project.id === 'pokemon-chronicles' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 text-xs">
              <div className="flex items-center gap-2">
                <Swords className="w-4 h-4 text-amber-400" />
                <span className="font-semibold text-white font-mono">UNITY TURN-BASED COMBAT LOOP</span>
              </div>
              <span className="text-[11px] font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                Unity 6 Engine
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
              {/* Battle Stage */}
              <div className="p-3 bg-black/60 border border-amber-500/30 rounded-lg space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-white font-bold">RIVAL ENCOUNTER</span>
                  <span className="text-amber-400">{battleHp} / 100 HP</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-300"
                    style={{ width: `${(battleHp / 100) * 100}%` }}
                  />
                </div>
                <div className="text-[11px] font-mono text-slate-400 italic pt-1 truncate">
                  {battleLog}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleAttack('Thunderbolt', 32)}
                  className="p-2 rounded bg-amber-500/20 hover:bg-amber-500/40 border border-amber-500/40 text-amber-300 font-mono text-xs font-semibold text-left transition-colors"
                >
                  ⚡ Thunderbolt
                </button>
                <button
                  onClick={() => handleAttack('Iron Tail', 24)}
                  className="p-2 rounded bg-white/5 hover:bg-white/15 border border-white/10 text-slate-200 font-mono text-xs font-semibold text-left transition-colors"
                >
                  ⚔ Iron Tail
                </button>
                <button
                  onClick={() => handleAttack('Quick Attack', 16)}
                  className="p-2 rounded bg-white/5 hover:bg-white/15 border border-white/10 text-slate-200 font-mono text-xs font-semibold text-left transition-colors"
                >
                  💨 Quick Attack
                </button>
                <button
                  onClick={() => {
                    sound.playClick(600);
                    setBattleHp(100);
                    setBattleLog('Full HP restored with Potion.');
                  }}
                  className="p-2 rounded bg-emerald-500/20 hover:bg-emerald-500/40 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-semibold text-left transition-colors"
                >
                  🧪 Potion (+HP)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Project 2: AI Interior Design Platform */}
        {project.id === 'ai-interior-design' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 text-xs">
              <div className="flex items-center gap-2">
                <Network className="w-4 h-4 text-amber-400" />
                <span className="font-semibold text-white font-mono">SYSTEM DESIGN & DATA PIPELINE</span>
              </div>
              <div className="flex items-center gap-1 bg-white/5 p-0.5 rounded text-[11px]">
                <button
                  onClick={() => setActiveSchemaTab('DFD')}
                  className={`px-2 py-0.5 rounded font-mono ${
                    activeSchemaTab === 'DFD' ? 'bg-amber-500 text-black font-bold' : 'text-slate-400'
                  }`}
                >
                  DFD Flow
                </button>
                <button
                  onClick={() => setActiveSchemaTab('ER')}
                  className={`px-2 py-0.5 rounded font-mono ${
                    activeSchemaTab === 'ER' ? 'bg-amber-500 text-black font-bold' : 'text-slate-400'
                  }`}
                >
                  ER Schema
                </button>
              </div>
            </div>

            {activeSchemaTab === 'DFD' ? (
              <div className="p-3 bg-black/60 border border-amber-500/20 rounded-lg space-y-2 font-mono text-[11px]">
                <div className="text-amber-400 font-semibold">// DATA FLOW DIAGRAM (LEVEL 0 - 2)</div>
                <div className="flex items-center gap-2 text-slate-300 flex-wrap">
                  <span className="px-2 py-1 bg-white/5 rounded border border-white/10">1. Room Scan Input</span>
                  <span className="text-amber-400">➔</span>
                  <span className="px-2 py-1 bg-white/5 rounded border border-white/10">2. Vector Ingestion</span>
                  <span className="text-amber-400">➔</span>
                  <span className="px-2 py-1 bg-amber-500/20 text-amber-300 rounded border border-amber-500/40">3. Spatial Furniture Matching</span>
                  <span className="text-amber-400">➔</span>
                  <span className="px-2 py-1 bg-white/5 rounded border border-white/10">4. Itemized Cart</span>
                </div>
                <div className="text-slate-400 text-[10px] pt-1">
                  Normalized data flow ensuring spatial vectors map directly to live SKU inventories.
                </div>
              </div>
            ) : (
              <div className="p-3 bg-black/60 border border-amber-500/20 rounded-lg space-y-1.5 font-mono text-[11px]">
                <div className="text-amber-400 font-semibold">// RELATIONAL ENTITY SCHEMA (3NF)</div>
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div className="p-2 bg-white/5 rounded border border-white/10">
                    <div className="text-amber-300 font-bold">RoomLayout</div>
                    <div className="text-slate-400">id, user_id, dimensions, style_vector</div>
                  </div>
                  <div className="p-2 bg-white/5 rounded border border-white/10">
                    <div className="text-amber-300 font-bold">FurnitureSKU</div>
                    <div className="text-slate-400">sku_id, name, length_cm, price, in_stock</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Project 3: Pichhutaaney */}
        {project.id === 'pichhutaaney' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 text-xs">
              <div className="flex items-center gap-2">
                <Utensils className="w-4 h-4 text-orange-400" />
                <span className="font-serif italic text-amber-300 text-sm">Pichhutaaney // Supper Club</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                Lighthouse: 96
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
              <div className="p-3 bg-[#14151a] border border-orange-500/30 rounded-lg space-y-1">
                <div className="text-xs font-semibold text-white">
                  {activeDish === 'Ilish' && 'Bhapa Ilish & Mustard Emulsion'}
                  {activeDish === 'Khichuri' && 'Gobindobhog Bhog Khichuri & Ghee'}
                  {activeDish === 'Kosha' && 'Slow-Braised Mangsho & Luchi'}
                </div>
                <div className="text-[11px] text-slate-400">
                  Intuitive Indian dining table, travel recipes & kitchen memories.
                </div>
                <div className="flex gap-1 pt-2">
                  {(['Ilish', 'Khichuri', 'Kosha'] as const).map(dish => (
                    <button
                      key={dish}
                      onClick={() => setActiveDish(dish)}
                      className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                        activeDish === dish ? 'bg-orange-500/30 text-orange-300 border border-orange-500/40' : 'text-slate-400'
                      }`}
                    >
                      {dish}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleWaitlistSubmit}
                  className="w-full py-2 px-3 text-xs font-bold text-black bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{waitlistSent ? 'Reservation Waitlist Requested ✓' : 'Join Supper Club Waitlist'}</span>
                </button>
                <div className="text-[10px] text-slate-400 text-center font-mono">
                  Direct booking · Live at pichhutaaney.com
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Project 4: The Morphiq */}
        {project.id === 'the-morphiq' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 text-xs">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-orange-400" />
                <span className="font-semibold text-white tracking-wider">THE MORPHIQ // FINE ART</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                Lighthouse: 98
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
              <div className="p-3 bg-[#14151a] border border-orange-500/30 rounded-lg space-y-1">
                <div className="text-xs font-semibold text-white">
                  {selectedSeries === 'Lacuna' && 'LACUNA (2026) — Ink & Acrylic'}
                  {selectedSeries === 'Ink' && 'Ephemeral Form — Black India Ink'}
                  {selectedSeries === 'Watercolors' && 'Coastal Solitude — Wet-on-Wet'}
                </div>
                <div className="text-[11px] text-slate-400">
                  Handmade cotton paper · Dimensions: A4 (8.27 × 11.69 inches)
                </div>
                <div className="flex gap-1 pt-2">
                  {(['Lacuna', 'Ink', 'Watercolors'] as const).map(series => (
                    <button
                      key={series}
                      onClick={() => setSelectedSeries(series)}
                      className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                        selectedSeries === series ? 'bg-orange-500/30 text-orange-300 border border-orange-500/40' : 'text-slate-400'
                      }`}
                    >
                      {series}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleInquirySubmit}
                  className="w-full py-2 px-3 text-xs font-bold text-black bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{inquirySent ? 'Acquisition Inquiry Logged ✓' : 'Inquire For Acquisition'}</span>
                </button>
                <div className="text-[10px] text-slate-400 text-center font-mono">
                  Museum-grade gallery · Live at themorphiq.com
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom card footer */}
        <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
          <span className="text-slate-400 font-mono text-[11px]">{project.timeline} Build Timeline</span>
          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                  sound.playClick(850);
                }}
                className="text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1 transition-colors text-[11px] font-mono"
              >
                <span>Live Site</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            <button
              onClick={() => onOpenDetails(project)}
              className="text-slate-300 hover:text-white font-medium flex items-center gap-1 transition-colors text-[11px] font-mono"
            >
              <span>Architecture Specs</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
