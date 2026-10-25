import React, { useState, useEffect } from 'react';
import { DeveloperProfile, Project } from '../types';
import { sound } from '../utils/audio';
import { Terminal, Send, Search, ExternalLink, Play, SkipForward, Maximize2, MoreHorizontal } from 'lucide-react';

interface BryanGarageLandingHeroProps {
  profile: DeveloperProfile;
  onOpenCommandPalette: () => void;
  onOpenContact: (note?: string) => void;
  onOpenShowcase: () => void;
  onSelectProject?: (project: Project) => void;
}

export const BryanGarageLandingHero: React.FC<BryanGarageLandingHeroProps> = ({
  profile,
  onOpenCommandPalette,
  onOpenContact,
  onOpenShowcase,
  onSelectProject,
}) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [terminalVisible, setTerminalVisible] = useState<boolean>(true);
  const [terminalInteractive, setTerminalInteractive] = useState<boolean>(false);
  const [terminalInput, setTerminalInput] = useState<string>('');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'BOOT: Garage CLI v1.8 online (x86_64)',
    'ROUTINES: showcase, projects, skills, contact, clear',
  ]);

  // Dynamic live clock matching screenshot: "08:49:27 AM  ASIA/CALCUTTA"
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      // Timezone identifier or ASIA/CALCUTTA
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone.toUpperCase();
      setCurrentTime(`${timeStr}  ${tz}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard press listener for "PRESS ANY KEY"
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (!terminalInteractive) {
        sound.playTerminalSuccess();
        setTerminalInteractive(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [terminalInteractive]);

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    sound.playTerminalSuccess();
    setTerminalLogs(prev => [...prev, `> ${cmd}`]);

    if (cmd === 'showcase' || cmd === 'timeline' || cmd === 'play') {
      setTerminalLogs(prev => [...prev, '✓ Navigating to 3D Timeline Chain...']);
      setTimeout(() => onOpenShowcase(), 300);
    } else if (cmd === 'contact' || cmd === 'hi') {
      setTerminalLogs(prev => [...prev, '✓ Opening communication dispatch...']);
      setTimeout(() => onOpenContact(), 300);
    } else if (cmd === 'clear') {
      setTerminalLogs([]);
    } else {
      setTerminalLogs(prev => [...prev, `Command '${cmd}' logged. Type 'showcase' or 'contact'.`]);
    }
    setTerminalInput('');
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between bg-garage-scanlines text-slate-200 overflow-hidden px-4 sm:px-8 pt-6 pb-12 select-none border-b border-amber-500/20">
      
      {/* Background warm amber flame blur at bottom */}
      <div 
        aria-hidden="true" 
        className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[750px] sm:w-[900px] h-[350px] bg-gradient-to-t from-amber-600/25 via-orange-500/15 to-transparent rounded-full blur-[110px] pointer-events-none" 
      />

      {/* ======================================================== */}
      {/* TOP HEADER BAR (Exact match to reference site)           */}
      {/* ======================================================== */}
      <div className="relative z-20 flex items-center justify-end gap-5 text-xs font-mono">
        {/* Jump to Command Palette Button */}
        <button
          onClick={() => {
            sound.playClick();
            onOpenCommandPalette();
          }}
          className="px-3 py-1.5 rounded-full bg-[#18191f] hover:bg-[#22242c] border border-white/10 hover:border-amber-500/40 text-slate-300 hover:text-white transition-all flex items-center gap-2"
          title="Open command palette (Ctrl+K)"
        >
          <span className="text-slate-400">Jump to</span>
          <kbd className="px-1.5 py-0.5 rounded bg-black/50 border border-white/10 text-[10px] text-slate-300 font-sans">
            ⌘ K
          </kbd>
          <span className="text-amber-400 font-bold">&gt;_</span>
        </button>

        {/* Live Clock & Timezone */}
        <div className="hidden md:block text-[11px] text-slate-400 tracking-wider">
          {currentTime || '08:49:27 AM  ASIA/CALCUTTA'}
        </div>

        {/* Hide / Show Terminal Toggle */}
        <button
          onClick={() => {
            sound.playClick();
            setTerminalVisible(!terminalVisible);
          }}
          className="text-[11px] text-slate-400 hover:text-white transition-colors flex items-center gap-1"
        >
          <span>{terminalVisible ? 'HIDE TERMINAL' : 'SHOW TERMINAL'}</span>
          <span className="text-amber-400 font-bold">&gt;</span>
        </button>

        {/* Say Hi Action */}
        <button
          onClick={() => {
            sound.playClick(900);
            onOpenContact('Hello Rumpa! Reaching out from your AI Garage.');
          }}
          className="text-[11px] text-slate-300 hover:text-amber-400 transition-colors flex items-center gap-1.5"
        >
          <span>SAY HI</span>
          <Send className="w-3 h-3 text-amber-400" />
        </button>
      </div>

      {/* ======================================================== */}
      {/* EDITORIAL HERO STATEMENT (Exact match to reference)      */}
      {/* ======================================================== */}
      <div className="relative z-10 max-w-4xl mx-auto mt-8 sm:mt-12 px-2 text-left">
        <h1 className="text-2xl sm:text-4xl md:text-[42px] leading-[1.3] font-normal tracking-tight text-slate-400 font-sans">
          <span className="font-mono font-black text-white text-3xl sm:text-5xl tracking-widest inline-block mr-2 uppercase">
            AI
          </span>{' '}
          <strong className="text-white font-black tracking-tight uppercase">
            GARAGE
          </strong>{' '}
          <span className="text-slate-300 font-medium">by</span>{' '}
          <strong className="text-white font-bold underline decoration-amber-500/40 underline-offset-4">
            {profile.name}
          </strong>
          . Born in Kolkata, building fast, award-caliber web experiences for founders worldwide. Four years in: architecting headless commerce at <strong className="text-white font-semibold">Lumina Atelier</strong>, real-time SaaS telemetry at <strong className="text-white font-semibold">Pulse Systems</strong>, and high-performance booking engines. Now building generative UI canvas tools and high-speed web engines.
        </h1>

        <p className="mt-6 text-xs sm:text-sm text-slate-500 font-light max-w-2xl leading-relaxed">
          I believe software is the most malleable medium we have, and the modern web is the most interesting thing to happen to it.
        </p>
      </div>

      {/* ======================================================== */}
      {/* CENTERPIECE: FLOATING GARAGE CLI v1.8 WINDOW             */}
      {/* ======================================================== */}
      {terminalVisible && (
        <div className="relative z-20 max-w-xl w-full mx-auto mt-8 sm:mt-12 transition-all">
          <div className="rounded-2xl border border-amber-500/30 bg-[#14151a]/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
            
            {/* Window Chrome Header */}
            <div className="px-4 py-3 bg-[#191a21] border-b border-white/10 flex items-center justify-between text-xs font-mono">
              {/* Traffic light dots */}
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-600/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-800/40" />
                <span className="text-[11px] text-slate-400 ml-2">
                  Garage CLI v1.8 › [ play ] [ ⏭ ]
                </span>
              </div>

              {/* Status / controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    sound.playTerminalSuccess();
                    setTerminalInteractive(!terminalInteractive);
                  }}
                  className="text-amber-400 hover:text-amber-300 font-bold text-[11px] animate-pulse transition-colors"
                >
                  {terminalInteractive ? 'interactive mode' : 'click to play'}
                </button>
                <div className="text-slate-500 flex items-center gap-1.5">
                  <MoreHorizontal className="w-3.5 h-3.5" />
                  <button onClick={onOpenShowcase} title="Fullscreen 3D Showcase">
                    <Maximize2 className="w-3 h-3 hover:text-white transition-colors" />
                  </button>
                </div>
              </div>
            </div>

            {/* CRT Display Chamber */}
            <div 
              className="relative p-6 sm:p-8 bg-[#0a0b0e] border-t border-amber-500/10 min-h-[260px] flex flex-col justify-between font-mono cursor-pointer"
              onClick={() => {
                if (!terminalInteractive) {
                  sound.playTerminalSuccess();
                  setTerminalInteractive(true);
                }
              }}
            >
              {/* Background amber telemetry graphs */}
              <div className="absolute inset-0 opacity-15 pointer-events-none p-4 flex flex-col justify-between">
                <div className="flex justify-between text-[9px] text-amber-500">
                  <span>SYS_LOAD: 14%</span>
                  <span>IO_PAGE: 0x8F</span>
                </div>
                {/* Horizontal bar histogram */}
                <div className="flex items-end gap-1 h-16 w-full opacity-30">
                  {[20, 35, 60, 45, 80, 50, 65, 40, 75, 90, 40, 60, 30, 70, 55, 85, 45].map((h, i) => (
                    <div 
                      key={i} 
                      className="flex-1 bg-amber-500 rounded-t-sm"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>

              {/* Interactive Mode Content */}
              {terminalInteractive ? (
                <div className="relative z-10 space-y-3 text-xs">
                  <div className="text-amber-400 font-bold flex items-center justify-between border-b border-amber-500/20 pb-2">
                    <span>GARAGE CLI // SESSION ACTIVE</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenShowcase();
                      }}
                      className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 hover:bg-amber-500/40 text-[10px] transition-colors"
                    >
                      OPEN 3D TIMELINE ➔
                    </button>
                  </div>
                  <div className="space-y-1 text-slate-300 max-h-36 overflow-y-auto">
                    {terminalLogs.map((log, i) => (
                      <div key={i} className="text-[11px]">{log}</div>
                    ))}
                  </div>

                  {/* Terminal Input */}
                  <form onSubmit={handleTerminalSubmit} className="pt-2 flex items-center gap-2 border-t border-white/10">
                    <span className="text-amber-400 font-bold">&gt;</span>
                    <input
                      type="text"
                      placeholder="Type 'showcase', 'contact', or 'clear'..."
                      value={terminalInput}
                      onChange={(e) => {
                        sound.playKey();
                        setTerminalInput(e.target.value);
                      }}
                      className="flex-1 bg-transparent text-amber-200 placeholder-slate-600 focus:outline-none text-xs font-mono"
                    />
                  </form>
                </div>
              ) : (
                /* The Signature Wireframe Globe & "GARAGE CLI" Amber Logo (Exact to screenshot) */
                <div className="relative z-10 flex flex-col items-center justify-center py-6 text-center">
                  
                  {/* Wireframe elliptical ring */}
                  <div className="relative flex items-center justify-center">
                    <div className="w-56 h-28 border border-amber-500/40 rounded-[50%] absolute wireframe-orbit pointer-events-none" />
                    <div className="w-48 h-20 border border-amber-500/30 rounded-[50%] absolute pointer-events-none" />

                    {/* Massive Glowing Amber Logo */}
                    <h2 className="text-3xl sm:text-4xl font-black tracking-widest text-amber-400 uppercase font-mono glow-amber-text z-10">
                      GARAGE CLI
                    </h2>
                  </div>

                  {/* Flashing "PRESS ANY KEY" prompt */}
                  <div className="mt-6 text-xs font-mono font-bold tracking-widest text-amber-400 animate-pulse">
                    PRESS ANY KEY
                  </div>
                </div>
              )}

              {/* Bottom Telemetry readout */}
              <div className="relative z-10 flex items-center justify-between text-[9px] text-slate-500 border-t border-white/5 pt-3 mt-2">
                <span>02MS AWAITING INPUT</span>
                <span className="text-amber-500/80">0 KEYS REGISTERED</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* RIGHT EDGE AWWWARDS HONORS RIBBON (Exact to screenshot)  */}
      {/* ======================================================== */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden md:block">
        <a
          href="https://bryangarage.dev/showcase"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-black font-mono font-bold py-3 px-1.5 flex flex-col items-center justify-center rounded-l-md shadow-2xl hover:bg-slate-200 transition-colors cursor-pointer group"
          title="Inspired by Bryan Garage Awwwards Winner"
        >
          <span className="text-xs font-black mb-2 tracking-tighter">W.</span>
          <span className="text-[10px] tracking-widest uppercase [writing-mode:vertical-rl] rotate-180 font-bold">
            Honors
          </span>
        </a>
      </div>
    </section>
  );
};
