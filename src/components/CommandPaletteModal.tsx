import React, { useState, useEffect } from 'react';
import { Search, Terminal, Cpu, Layers, DollarSign, Activity, Mail, Volume2, Monitor, ArrowRight, X } from 'lucide-react';
import { sound } from '../utils/audio';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (target: string) => void;
  onToggleSound: () => void;
  soundEnabled: boolean;
  onToggleCRT: () => void;
  crtEnabled: boolean;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onToggleSound,
  soundEnabled,
  onToggleCRT,
  crtEnabled,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        sound.playClick();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const commands = [
    { id: 'showcase', label: '3D Timeline Showcase', category: 'Navigation', icon: Cpu, action: () => onNavigate('showcase') },
    { id: 'projects', label: 'Selected Projects Matrix', category: 'Navigation', icon: Layers, action: () => onNavigate('projects') },
    { id: 'terminal', label: 'Garage CLI Interactive Terminal', category: 'Navigation', icon: Terminal, action: () => onNavigate('terminal') },
    { id: 'services', label: 'Services & Fixed Pricing', category: 'Commercial', icon: DollarSign, action: () => onNavigate('services') },
    { id: 'estimator', label: 'Instant Cost Estimator', category: 'Commercial', icon: DollarSign, action: () => onNavigate('estimator') },
    { id: 'speed', label: 'Speed & Core Web Vitals Audit', category: 'Engineering', icon: Activity, action: () => onNavigate('speed-audit') },
    { id: 'contact', label: 'Say Hi / Project Transmission', category: 'Direct', icon: Mail, action: () => onNavigate('contact') },
    { id: 'sound', label: `Toggle Audio SFX (${soundEnabled ? 'ON' : 'OFF'})`, category: 'Preferences', icon: Volume2, action: () => onToggleSound() },
    { id: 'crt', label: `Toggle Retro CRT Scanlines (${crtEnabled ? 'ON' : 'OFF'})`, category: 'Preferences', icon: Monitor, action: () => onToggleCRT() },
  ];

  const filtered = commands.filter(c => 
    c.label.toLowerCase().includes(query.toLowerCase()) || 
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="w-full max-w-xl bg-[#111217] border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden font-mono text-xs"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-[#0d0e12]">
          <Search className="w-4 h-4 text-amber-400" />
          <input
            autoFocus
            type="text"
            placeholder="Type a destination or command... (e.g. 'showcase', 'pricing', 'contact')"
            value={query}
            onChange={(e) => {
              sound.playKey();
              setQuery(e.target.value);
            }}
            className="flex-1 bg-transparent text-white placeholder-slate-500 text-sm focus:outline-none"
          />
          <kbd className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-slate-400">
            ESC
          </kbd>
        </div>

        {/* Command List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-slate-500">
              No matching routines found.
            </div>
          ) : (
            filtered.map((cmd) => {
              const Icon = cmd.icon;
              return (
                <button
                  key={cmd.id}
                  onClick={() => {
                    sound.playClick(900);
                    cmd.action();
                    onClose();
                  }}
                  className="w-full p-2.5 rounded-xl hover:bg-amber-500/10 text-slate-300 hover:text-amber-300 flex items-center justify-between group transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-black/40 border border-white/5 group-hover:border-amber-500/30 text-amber-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-white font-medium group-hover:text-amber-200">{cmd.label}</div>
                      <div className="text-[10px] text-slate-500">{cmd.category}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-amber-400 transition-opacity" />
                </button>
              );
            })
          )}
        </div>

        {/* Footer Hint */}
        <div className="px-4 py-2.5 bg-black/50 border-t border-white/5 text-[10px] text-slate-500 flex items-center justify-between">
          <span>Jump to system coordinates</span>
          <span>Press ESC to exit</span>
        </div>
      </div>
    </div>
  );
};
