import React, { useState, useRef, useEffect } from 'react';
import { Project, DeveloperProfile } from '../types';
import { PROJECTS } from '../data/portfolioData';
import { sound } from '../utils/audio';
import {
  Terminal,
  Volume2,
  VolumeX,
  Monitor,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Layers,
  Sparkles,
  Maximize2,
  MoreHorizontal,
  Home,
} from 'lucide-react';

interface BryanGarageShowcaseProps {
  profile: DeveloperProfile;
  soundEnabled: boolean;
  onToggleSound: () => void;
  crtEnabled: boolean;
  onToggleCRT: () => void;
  onSelectProject: (project: Project) => void;
  onOpenContact: (note?: string) => void;
  onSwitchView: (view: 'showcase' | 'overview' | 'terminal') => void;
}

export const BryanGarageShowcase: React.FC<BryanGarageShowcaseProps> = ({
  profile,
  soundEnabled,
  onToggleSound,
  crtEnabled,
  onToggleCRT,
  onSelectProject,
  onOpenContact,
  onSwitchView,
}) => {
  const [scrollX, setScrollX] = useState<number>(0);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // 10 cards ordered chronologically
  const timelineProjects = PROJECTS.slice(0, 10);
  const cardWidth = 360;
  const cardGap = 44;
  const totalWidth = timelineProjects.length * (cardWidth + cardGap);

  // Wheel handling to scrub horizontally
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY !== 0 ? e.deltaY : e.deltaX;
    setScrollX((prev) => {
      const next = Math.max(0, Math.min(totalWidth - 550, prev + delta * 1.5));
      const newIndex = Math.round(next / (cardWidth + cardGap));
      if (newIndex !== activeCardIndex && newIndex >= 0 && newIndex < timelineProjects.length) {
        setActiveCardIndex(newIndex);
        sound.playChime(480 + newIndex * 40);
      }
      return next;
    });
  };

  // Mouse drag handling
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX + scrollX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const next = Math.max(0, Math.min(totalWidth - 550, startX - e.clientX));
    setScrollX(next);
    const newIndex = Math.round(next / (cardWidth + cardGap));
    if (newIndex !== activeCardIndex && newIndex >= 0 && newIndex < timelineProjects.length) {
      setActiveCardIndex(newIndex);
      sound.playChime(480 + newIndex * 40);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Step left or right
  const stepTimeline = (direction: 'left' | 'right') => {
    sound.playClick(850);
    const nextIndex = direction === 'left' 
      ? Math.max(0, activeCardIndex - 1)
      : Math.min(timelineProjects.length - 1, activeCardIndex + 1);
    
    setActiveCardIndex(nextIndex);
    setScrollX(nextIndex * (cardWidth + cardGap));
    sound.playChime(480 + nextIndex * 40);
  };

  // Jump to specific year/index
  const jumpToIndex = (index: number) => {
    sound.playClick(950);
    setActiveCardIndex(index);
    setScrollX(index * (cardWidth + cardGap));
    sound.playChime(480 + index * 40);
  };

  // Key navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        stepTimeline('right');
      } else if (e.key === 'ArrowLeft') {
        stepTimeline('left');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCardIndex]);

  const activeProject = timelineProjects[activeCardIndex] || timelineProjects[0];

  return (
    <div 
      className="relative w-full h-screen overflow-hidden bg-garage-scanlines text-slate-100 flex flex-col justify-between select-none"
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* 3D Atmospheric Warm Amber Lighting */}
      <div 
        aria-hidden="true" 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" 
      />
      <div 
        aria-hidden="true" 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-orange-600/15 rounded-full blur-[160px] pointer-events-none" 
      />

      {/* ======================================================== */}
      {/* TOP HUD: Minimalist Bryan Garage Header                 */}
      {/* ======================================================== */}
      <header className="relative z-30 px-6 py-4 flex items-center justify-between border-b border-white/10 backdrop-blur-md bg-black/50">
        {/* Left: Brand Identity & Mode indicator */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-950/80 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold tracking-tight text-white font-display">
                {profile.name} // AI GARAGE
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-950 text-amber-400 border border-amber-500/40">
                SHOWCASE v3.0
              </span>
            </div>
            <div className="text-[10px] font-mono text-slate-400 flex items-center gap-2">
              <span className="text-amber-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                3D TIMELINE CHAIN
              </span>
              <span className="text-slate-600">|</span>
              <span>10 GLASS CARDS (2022 — 2026)</span>
            </div>
          </div>
        </div>

        {/* Center: Year Timeline Quick Seekers */}
        <div className="hidden md:flex items-center gap-1.5 bg-black/60 p-1 rounded-xl border border-white/10">
          {timelineProjects.map((proj, idx) => (
            <button
              key={proj.id}
              onClick={(e) => {
                e.stopPropagation();
                jumpToIndex(idx);
              }}
              className={`px-2.5 py-1 text-[11px] font-mono rounded-lg transition-all ${
                activeCardIndex === idx
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title={`${proj.completionYear} — ${proj.title.split('—')[0]}`}
            >
              {proj.completionYear}
            </button>
          ))}
        </div>

        {/* Right: Controls & View Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sound Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSound();
            }}
            className={`p-2 rounded-lg border text-xs font-mono transition-all flex items-center gap-1.5 ${
              soundEnabled
                ? 'bg-amber-950/80 text-amber-300 border-amber-500/40'
                : 'bg-black/40 text-slate-500 border-white/10 hover:text-slate-300'
            }`}
            title="Toggle Web Audio SFX"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-amber-400" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden lg:inline text-[10px]">{soundEnabled ? 'SFX ON' : 'MUTED'}</span>
          </button>

          {/* CRT Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleCRT();
            }}
            className={`p-2 rounded-lg border text-xs font-mono transition-all flex items-center gap-1.5 ${
              crtEnabled
                ? 'bg-amber-950/80 text-amber-300 border-amber-500/40'
                : 'bg-black/40 text-slate-500 border-white/10 hover:text-slate-300'
            }`}
            title="Toggle Retro CRT Scanlines"
          >
            <Monitor className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden lg:inline text-[10px]">{crtEnabled ? 'CRT ON' : 'CRT OFF'}</span>
          </button>

          {/* Back to Home / Landing */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              sound.playClick();
              onSwitchView('overview');
            }}
            className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-mono font-semibold shadow-md shadow-amber-600/30 transition-all flex items-center gap-1"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Landing Page</span>
          </button>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 3D SHOWCASE ARENA: The Dual-Track Floating Glass Chain  */}
      {/* ======================================================== */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden perspective-container">
        
        {/* Horizontal Moving Space */}
        <div 
          ref={containerRef}
          className="relative flex items-center h-full transition-transform duration-300 ease-out cursor-grab active:cursor-grabbing"
          style={{
            transform: `translateX(calc(50vw - 180px - ${scrollX}px))`,
          }}
        >
          {/* Central Glowing Timeline Rail running across all cards */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 left-0 h-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.8)] z-0 rounded-full"
            style={{ width: `${totalWidth + 400}px` }}
          />

          {/* 10 Floating Glass Cards */}
          {timelineProjects.map((project, idx) => {
            const isUpper = project.track === 'side_project';
            const isActive = activeCardIndex === idx;
            const xPos = idx * (cardWidth + cardGap);

            return (
              <div
                key={project.id}
                className="absolute flex flex-col items-center z-10 transition-all duration-300"
                style={{
                  left: `${xPos}px`,
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              >
                {/* Connecting Laser Stem to Rail */}
                <div
                  className={`w-0.5 absolute left-1/2 -translate-x-1/2 transition-all ${
                    isUpper ? 'bottom-1/2 h-16' : 'top-1/2 h-16'
                  } ${
                    isActive
                      ? 'bg-gradient-to-b from-amber-400 to-orange-400 shadow-[0_0_10px_#f59e0b]'
                      : 'bg-white/15'
                  }`}
                />

                {/* Central Axis Node Orb */}
                <div 
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full border-2 flex items-center justify-center z-20 cursor-pointer transition-all ${
                    isActive 
                      ? 'bg-amber-950 border-amber-400 shadow-[0_0_15px_#f59e0b] scale-125' 
                      : 'bg-black border-slate-600 hover:border-slate-400'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    jumpToIndex(idx);
                  }}
                >
                  <div className={`w-2.5 h-2.5 rounded-full ${isActive ? 'bg-amber-400 animate-ping' : 'bg-slate-500'}`} />
                </div>

                {/* Year Label on Node */}
                <span 
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 ${
                    isUpper ? 'translate-y-5' : '-translate-y-8'
                  } text-[10px] font-mono px-2 py-0.5 rounded-md border transition-all ${
                    isActive 
                      ? 'bg-amber-950 text-amber-300 border-amber-500/50 font-bold' 
                      : 'bg-black/60 text-slate-500 border-white/5'
                  }`}
                >
                  {project.completionYear}
                </span>

                {/* THE GLASS CARD */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    sound.playClick(900);
                    onSelectProject(project);
                  }}
                  className={`w-[360px] p-6 rounded-2xl backdrop-blur-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer group shadow-2xl ${
                    isUpper ? '-translate-y-[150px]' : 'translate-y-[150px]'
                  } ${
                    isActive
                      ? 'bg-[#181920]/90 border-amber-400 shadow-[0_0_35px_rgba(245,158,11,0.35)] scale-105'
                      : 'bg-[#111217]/70 border-white/10 hover:border-amber-500/40 opacity-75 hover:opacity-100 hover:scale-100'
                  }`}
                >
                  {/* Card Top Row */}
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs font-mono mb-2.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                        isUpper 
                          ? 'bg-amber-950 text-amber-300 border-amber-500/40' 
                          : 'bg-orange-950 text-orange-300 border-orange-500/40'
                      }`}>
                        {isUpper ? 'GARAGE LAB' : 'COMPANY WORK'}
                      </span>
                      <span className="text-slate-400 text-[11px] font-mono">{project.client}</span>
                    </div>

                    <h3 className="text-lg font-bold text-white font-display tracking-tight mb-1 group-hover:text-amber-300 transition-colors line-clamp-1">
                      {project.title.split('—')[0]}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4 font-light">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Card Metrics & Specs */}
                  <div>
                    <div className="p-2.5 rounded-xl bg-black/50 border border-white/5 mb-3 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-400 uppercase">Impact Metric</span>
                      <span className="text-xs font-mono font-bold text-amber-400">{project.keyMetric.value}</span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Bar */}
                    <div className="flex items-center justify-between pt-2.5 border-t border-white/10 text-xs font-mono text-amber-400 group-hover:text-amber-300">
                      <span className="flex items-center gap-1 text-[11px]">
                        Inspect System Architecture
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ======================================================== */}
      {/* BOTTOM CONTROL DOCK: Scrubber & Telemetry               */}
      {/* ======================================================== */}
      <footer className="relative z-30 px-6 py-4 border-t border-white/10 backdrop-blur-md bg-black/50 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left: Active Card Info */}
        <div className="flex items-center gap-3">
          <div className="text-xs font-mono text-slate-400">
            <span className="text-amber-400 font-bold">[{activeCardIndex + 1} / 10]</span>{' '}
            <span className="text-white font-semibold">{activeProject.title.split('—')[0]}</span>
            <span className="hidden md:inline text-slate-500"> · {activeProject.type}</span>
          </div>
        </div>

        {/* Center: Interactive Scrubber Slider */}
        <div className="flex items-center gap-3 w-full sm:w-auto sm:min-w-[320px]">
          <button
            onClick={() => stepTimeline('left')}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-all"
            title="Previous Milestone"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <input
            type="range"
            min={0}
            max={timelineProjects.length - 1}
            value={activeCardIndex}
            onChange={(e) => jumpToIndex(parseInt(e.target.value, 10))}
            className="flex-1 accent-amber-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
          />

          <button
            onClick={() => stepTimeline('right')}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-all"
            title="Next Milestone"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Direct Contact Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sound.playClick();
              onOpenContact(`Hi Rumpa, I explored your 3D Showcase and would like to build a project like ${activeProject.title}`);
            }}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-mono text-xs font-semibold shadow-md shadow-amber-600/30 transition-all flex items-center gap-1.5"
          >
            <span>Initialize Project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </footer>
    </div>
  );
};
