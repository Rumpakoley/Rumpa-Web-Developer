import React, { useState, useEffect, useRef } from 'react';
import { DeveloperProfile, Project } from '../types';
import { sound } from '../utils/audio';
import { Terminal, Send, Search, ExternalLink, Play, SkipForward, Maximize2, MoreHorizontal, Sparkles } from 'lucide-react';

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
}) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [terminalVisible, setTerminalVisible] = useState<boolean>(true);
  const [terminalInteractive, setTerminalInteractive] = useState<boolean>(false);
  const [terminalInput, setTerminalInput] = useState<string>('');
  const [isBlooming, setIsBlooming] = useState<boolean>(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [windowTilt, setWindowTilt] = useState({ x: 0, y: 0 });

  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'BOOT: Garage CLI v1.8 online (x86_64)',
    'ROUTINES: showcase, projects, skills, contact, clear',
  ]);

  // Dynamic live clock: "08:49:27 AM  ASIA/CALCUTTA"
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone.toUpperCase();
      setCurrentTime(`${timeStr}  ${tz}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard listener for "PRESS ANY KEY"
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (!terminalInteractive) {
        triggerTerminalBoot();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [terminalInteractive]);

  // Ambient floating amber embers canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // 35 subtle glowing amber particles
    const particles = Array.from({ length: 35 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.8,
      speedY: Math.random() * 0.45 + 0.2,
      speedX: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.6 + 0.2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;

        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.fillStyle = `rgba(245, 158, 11, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // 3D Mouse Tilt over Hero Section
  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    setWindowTilt({ x: rotateX, y: rotateY });
  };

  const handleHeroMouseLeave = () => {
    setWindowTilt({ x: 0, y: 0 });
  };

  const triggerTerminalBoot = () => {
    sound.playTerminalSuccess();
    setIsBlooming(true);
    setTimeout(() => {
      setIsBlooming(false);
      setTerminalInteractive(true);
    }, 350);
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    sound.playTerminalSuccess();
    setTerminalLogs((prev) => [...prev, `> ${cmd}`]);

    if (cmd === 'showcase' || cmd === 'timeline' || cmd === 'play') {
      setTerminalLogs((prev) => [...prev, '✓ Launching 3D Timeline Chain...']);
      setTimeout(() => onOpenShowcase(), 350);
    } else if (cmd === 'contact' || cmd === 'hi') {
      setTerminalLogs((prev) => [...prev, '✓ Opening communication dispatch...']);
      setTimeout(() => onOpenContact(), 350);
    } else if (cmd === 'clear') {
      setTerminalLogs([]);
    } else {
      setTerminalLogs((prev) => [...prev, `Command '${cmd}' logged. Type 'showcase' or 'contact'.`]);
    }
    setTerminalInput('');
  };

  return (
    <section 
      ref={heroRef}
      onMouseMove={handleHeroMouseMove}
      onMouseLeave={handleHeroMouseLeave}
      className="relative min-h-[92vh] flex flex-col justify-between bg-garage-scanlines text-slate-200 overflow-hidden px-4 sm:px-8 pt-6 pb-12 select-none border-b border-amber-500/20 perspective-container"
    >
      {/* Interactive Cursor Spotlight Glow */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(245, 158, 11, 0.07), transparent 380px)`,
        }}
      />

      {/* Ambient floating amber embers canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none z-0" 
      />

      {/* Background warm amber flame blur at bottom */}
      <div 
        aria-hidden="true" 
        className="absolute bottom-[-90px] left-1/2 -translate-x-1/2 w-[750px] sm:w-[950px] h-[360px] bg-gradient-to-t from-amber-600/30 via-orange-500/18 to-transparent rounded-full blur-[110px] pointer-events-none amber-haze-pulse z-0" 
      />

      {/* ======================================================== */}
      {/* TOP HEADER & EDITORIAL HERO SECTION                      */}
      {/* ======================================================== */}
      <div className="relative z-20 w-full max-w-7xl mx-auto">
        {/* Top Header Row: Jump to Command Palette on Top Right */}
        <div className="flex items-center justify-end animate-hero-fade mb-4 sm:mb-6">
          <button
            onClick={() => {
              sound.playClick();
              onOpenCommandPalette();
            }}
            className="px-3 py-1.5 rounded-full bg-[#18191f] hover:bg-[#22242c] border border-white/10 hover:border-amber-500/40 text-slate-300 hover:text-white transition-all flex items-center gap-2 shadow-sm hover:scale-105 active:scale-95"
            title="Open command palette (Ctrl+K)"
          >
            <span className="text-slate-400">Jump to</span>
            <kbd className="px-1.5 py-0.5 rounded bg-black/50 border border-white/10 text-[10px] text-slate-300 font-sans">
              ⌘ K
            </kbd>
            <span className="text-amber-400 font-bold">&gt;_</span>
          </button>
        </div>

        {/* Main Content Row: Left Hero Statement + Right Telemetry Column (Exact match to reference site) */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-6 lg:gap-12 animate-hero-fade">
          {/* Left Column: Hero Description (Left aligned with cascading transitions) */}
          <div className="max-w-3xl lg:max-w-4xl text-left group">
            <h1 className="text-2xl sm:text-4xl md:text-[40px] lg:text-[44px] leading-[1.3] font-normal tracking-tight text-slate-400 group-hover:text-slate-300 transition-colors duration-500 font-sans text-left">
              {/* Clause 1: AI GARAGE by Rumpa Koley */}
              <span className="animate-clause delay-clause-1 inline">
                <span className="font-mono font-black text-white text-3xl sm:text-5xl tracking-widest inline-block mr-2 uppercase hero-shimmer-title">
                  AI
                </span>{' '}
                <strong className="text-white font-black tracking-tight uppercase mr-2 hero-shimmer-title">
                  GARAGE
                </strong>{' '}
                <span className="text-slate-300 font-medium">by</span>{' '}
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick(900);
                    onOpenContact('Hello Rumpa! Reaching out after reading your AI Garage introduction.');
                  }}
                  onMouseEnter={() => sound.playKey()}
                  className="hero-highlight-link text-white font-bold inline-block text-left"
                  title="Contact Rumpa Koley"
                >
                  {profile.name}
                </button>
                <span className="text-slate-400">.</span>
              </span>{' '}

              {/* Clause 2: Location & Craft */}
              <span className="animate-clause delay-clause-2 inline">
                Born in Kolkata, building fast, award-caliber web experiences for founders worldwide.
              </span>{' '}

              {/* Clause 3: Commercial Track Record - Lumina Atelier */}
              <span className="animate-clause delay-clause-3 inline">
                Four years in: architecting headless commerce at{' '}
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick(850);
                    onOpenShowcase();
                  }}
                  onMouseEnter={() => sound.playKey()}
                  className="hero-highlight-link text-white font-semibold inline-block text-left"
                  title="View Lumina Atelier in 3D Timeline"
                >
                  Lumina Atelier
                </button>
                ,
              </span>{' '}

              {/* Clause 4: Real-time SaaS telemetry - Pulse Systems */}
              <span className="animate-clause delay-clause-4 inline">
                real-time SaaS telemetry at{' '}
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick(850);
                    onOpenShowcase();
                  }}
                  onMouseEnter={() => sound.playKey()}
                  className="hero-highlight-link text-white font-semibold inline-block text-left"
                  title="View Pulse Systems in 3D Timeline"
                >
                  Pulse Systems
                </button>
                , and high-performance booking engines.
              </span>{' '}

              {/* Clause 5: Present Focus */}
              <span className="animate-clause delay-clause-5 inline">
                Now building generative UI canvas tools and high-speed web engines.
              </span>
            </h1>

            {/* Subtext Paragraph with Staggered Slide & Blur Fade Transition */}
            <p className="mt-6 text-xs sm:text-sm text-slate-500 group-hover:text-slate-400 transition-colors duration-500 font-light max-w-2xl leading-relaxed text-left animate-clause delay-clause-sub block">
              I believe software is the most malleable medium we have, and the modern web is the most interesting thing to happen to it.
            </p>
          </div>

          {/* Right Column: Stacked Telemetry & Navigation Actions (Right aligned) */}
          <div className="flex lg:flex-col items-center lg:items-end justify-between sm:justify-end gap-3.5 sm:gap-4 font-mono text-xs shrink-0 w-full lg:w-auto pt-1 border-t lg:border-t-0 border-white/10 lg:pt-0">
            {/* Live Clock & Timezone */}
            <div className="text-[11px] text-slate-400 tracking-wider">
              {currentTime || '08:49:27 AM  ASIA/CALCUTTA'}
            </div>

            {/* Hide / Show Terminal Toggle */}
            <button
              onClick={() => {
                sound.playClick();
                setTerminalVisible(!terminalVisible);
              }}
              className="text-[11px] text-slate-400 hover:text-white transition-colors flex items-center gap-1 group py-0.5"
            >
              <span>{terminalVisible ? 'HIDE TERMINAL' : 'SHOW TERMINAL'}</span>
              <span className="text-amber-400 font-bold group-hover:translate-x-0.5 transition-transform">&gt;</span>
            </button>

            {/* Say Hi Action */}
            <button
              onClick={() => {
                sound.playClick(900);
                onOpenContact('Hello Rumpa! Reaching out from your AI Garage.');
              }}
              className="text-[11px] text-slate-300 hover:text-amber-400 transition-colors flex items-center gap-1.5 group py-0.5"
            >
              <span>SAY HI</span>
              <Send className="w-3 h-3 text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* CENTERPIECE: FLOATING GARAGE CLI v1.8 WINDOW             */}
      {/* ======================================================== */}
      {terminalVisible && (
        <div 
          className="relative z-20 max-w-xl w-full mx-auto mt-8 sm:mt-12 transition-transform duration-200 ease-out animate-hero-fade-delay float-idle"
          style={{
            transform: `perspective(1000px) rotateX(${windowTilt.x}deg) rotateY(${windowTilt.y}deg)`,
          }}
        >
          <div className="rounded-2xl border border-amber-500/35 bg-[#14151a]/95 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden transition-all duration-300 hover:border-amber-400/60 hover:shadow-[0_25px_60px_rgba(245,158,11,0.18)]">
            
            {/* Specular glass reflection bar */}
            <div 
              aria-hidden="true" 
              className="absolute inset-0 pointer-events-none opacity-20 bg-gradient-to-tr from-transparent via-white/10 to-transparent" 
            />

            {/* Window Chrome Header */}
            <div className="px-4 py-3 bg-[#191a21] border-b border-white/10 flex items-center justify-between text-xs font-mono relative z-10">
              {/* Traffic light dots */}
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b]" />
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
                    if (!terminalInteractive) triggerTerminalBoot();
                    else setTerminalInteractive(false);
                  }}
                  className="text-amber-400 hover:text-amber-300 font-bold text-[11px] animate-pulse transition-colors"
                >
                  {terminalInteractive ? 'interactive mode' : 'click to play'}
                </button>
                <div className="text-slate-500 flex items-center gap-1.5">
                  <MoreHorizontal className="w-3.5 h-3.5" />
                  <button 
                    onClick={onOpenShowcase} 
                    title="Fullscreen 3D Showcase"
                    className="hover:scale-110 active:scale-95 transition-transform"
                  >
                    <Maximize2 className="w-3 h-3 hover:text-white transition-colors" />
                  </button>
                </div>
              </div>
            </div>

            {/* CRT Display Chamber */}
            <div 
              className={`relative p-6 sm:p-8 bg-[#0a0b0e] border-t border-amber-500/10 min-h-[260px] flex flex-col justify-between font-mono cursor-pointer overflow-hidden ${
                isBlooming ? 'crt-bloom-anim' : ''
              }`}
              onClick={() => {
                if (!terminalInteractive) {
                  triggerTerminalBoot();
                }
              }}
            >
              {/* Radar Sweep Line Effect */}
              <div className="radar-sweep-line" />

              {/* Background amber telemetry histograms */}
              <div className="absolute inset-0 opacity-15 pointer-events-none p-4 flex flex-col justify-between">
                <div className="flex justify-between text-[9px] text-amber-500">
                  <span>SYS_LOAD: 14%</span>
                  <span>IO_PAGE: 0x8F</span>
                </div>
                {/* Horizontal bar histogram */}
                <div className="flex items-end gap-1 h-16 w-full opacity-35">
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
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                      GARAGE CLI // SESSION ACTIVE
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenShowcase();
                      }}
                      className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 hover:bg-amber-500/40 text-[10px] transition-all flex items-center gap-1 shadow-sm"
                    >
                      <span>OPEN 3D TIMELINE</span>
                      <span>➔</span>
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
                <div className="relative z-10 flex flex-col items-center justify-center py-6 text-center group">
                  
                  {/* Concentric Dual Wireframe Elliptical Rings */}
                  <div className="relative flex items-center justify-center">
                    <div className="w-56 h-28 border border-amber-500/40 rounded-[50%] absolute wireframe-orbit pointer-events-none shadow-[0_0_15px_rgba(245,158,11,0.2)]" />
                    <div className="w-48 h-20 border border-amber-500/30 rounded-[50%] absolute wireframe-orbit-rev pointer-events-none" />

                    {/* Massive Glowing Amber Logo */}
                    <h2 className="text-3xl sm:text-4xl font-black tracking-widest text-amber-400 uppercase font-mono glow-amber-text z-10 transition-transform group-hover:scale-105 duration-300">
                      GARAGE CLI
                    </h2>
                  </div>

                  {/* Flashing "PRESS ANY KEY" prompt */}
                  <div className="mt-6 text-xs font-mono font-bold tracking-widest text-amber-400 animate-pulse flex items-center gap-1.5">
                    <span>PRESS ANY KEY</span>
                    <span className="terminal-cursor" />
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
          className="bg-white text-black font-mono font-bold py-3 px-1.5 flex flex-col items-center justify-center rounded-l-md shadow-2xl hover:bg-amber-400 transition-colors cursor-pointer group hover:-translate-x-1 duration-200"
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
