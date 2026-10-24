import React, { useState, useRef } from 'react';
import { Project, TimelineTrack } from '../types';
import { PROJECTS } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { 
  Sparkles, 
  Terminal, 
  Layers, 
  ExternalLink, 
  Cpu, 
  Calendar, 
  ArrowUpRight, 
  CheckCircle2, 
  Activity, 
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Zap,
  Globe
} from 'lucide-react';

interface TimelineShowcaseProps {
  onSelectProject: (project: Project) => void;
  onOpenContact: (note?: string) => void;
}

export const TimelineShowcase: React.FC<TimelineShowcaseProps> = ({
  onSelectProject,
  onOpenContact,
}) => {
  const [selectedTrack, setSelectedTrack] = useState<'all' | TimelineTrack>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [activeHoverId, setActiveHoverId] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const years = ['all', '2026', '2025', '2024', '2023', '2022'];

  // Filter projects based on track & year
  const filteredProjects = PROJECTS.filter((p) => {
    const matchTrack = selectedTrack === 'all' || p.track === selectedTrack;
    const matchYear = selectedYear === 'all' || p.completionYear === selectedYear;
    return matchTrack && matchYear;
  });

  const upperProjects = filteredProjects.filter((p) => p.track === 'side_project');
  const lowerProjects = filteredProjects.filter((p) => p.track === 'commercial');

  const scrollTimeline = (direction: 'left' | 'right') => {
    sound.playClick(750);
    if (scrollContainerRef.current) {
      const scrollAmount = 480;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    setActiveHoverId(null);
  };

  const handleCardMouseEnter = (id: string) => {
    setActiveHoverId(id);
    sound.playChime(640);
  };

  return (
    <section id="showcase" className="py-20 md:py-28 relative border-t border-cyan-500/20 overflow-hidden bg-tech-grid">
      {/* Ambient background glows */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" 
      />
      <div 
        aria-hidden="true" 
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Top Header Badge & Prompt */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 mb-3">
              <Terminal className="w-3.5 h-3.5" />
              <span>rumpa@garage ~ % ./showcase --3d-timeline</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
              The 3D Timeline Chain
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl font-light">
              An interactive dual-track timeline spanning 2022 to 2026. <span className="text-cyan-400 font-medium">Experimental Garage side projects</span> float above the central axis, while <span className="text-indigo-400 font-medium">production company platforms</span> sit below.
            </p>
          </div>

          {/* Controls: Track filters & Timeline Slider */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Track Switcher */}
            <div className="flex items-center p-1 bg-black/60 border border-white/10 rounded-xl backdrop-blur-md">
              <button
                onClick={() => {
                  sound.playClick();
                  setSelectedTrack('all');
                }}
                className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all ${
                  selectedTrack === 'all'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All Nodes
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setSelectedTrack('side_project');
                }}
                className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all ${
                  selectedTrack === 'side_project'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Side Projects (Above)
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setSelectedTrack('commercial');
                }}
                className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all ${
                  selectedTrack === 'commercial'
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Company Work (Below)
              </button>
            </div>

            {/* Scroll buttons */}
            <div className="hidden sm:flex items-center gap-1.5">
              <button
                onClick={() => scrollTimeline('left')}
                className="p-2 rounded-lg bg-black/60 border border-white/10 hover:border-cyan-500/40 text-slate-300 hover:text-white transition-all"
                title="Scroll timeline left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollTimeline('right')}
                className="p-2 rounded-lg bg-black/60 border border-white/10 hover:border-cyan-500/40 text-slate-300 hover:text-white transition-all"
                title="Scroll timeline right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Year Filter Chips */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          <span className="text-xs font-mono text-slate-500 flex items-center gap-1 mr-1">
            <Calendar className="w-3.5 h-3.5" />
            CHRONO:
          </span>
          {years.map((y) => (
            <button
              key={y}
              onClick={() => {
                sound.playClick();
                setSelectedYear(y);
              }}
              className={`px-3 py-1 text-xs font-mono rounded-md border transition-all ${
                selectedYear === y
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-semibold shadow-sm shadow-cyan-500/20'
                  : 'bg-black/40 border-white/10 text-slate-400 hover:text-slate-200 hover:border-white/20'
              }`}
            >
              {y === 'all' ? 'FULL TIMELINE' : y}
            </button>
          ))}
        </div>

        {/* ======================================================== */}
        {/* HORIZONTAL / INTERACTIVE 3D DUAL-AXIS TIMELINE CHAIN    */}
        {/* ======================================================== */}
        <div 
          ref={scrollContainerRef}
          className="relative overflow-x-auto py-8 no-scrollbar scroll-smooth perspective-container"
        >
          {/* Timeline Wrapper with fixed min-width for true timeline experience */}
          <div className="min-w-[1100px] flex flex-col relative px-4">
            
            {/* UPPER TRACK: Side Projects (Floating Above Axis) */}
            {(selectedTrack === 'all' || selectedTrack === 'side_project') && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4 text-xs font-mono text-cyan-400 tracking-wider">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>▲ UPPER AXIS: GARAGE LABS & EXPERIMENTAL SIDE PROJECTS</span>
                </div>
                <div className="grid grid-cols-5 gap-6">
                  {upperProjects.map((project) => (
                    <div
                      key={project.id}
                      onMouseMove={handleCardMouseMove}
                      onMouseLeave={handleCardMouseLeave}
                      onMouseEnter={() => handleCardMouseEnter(project.id)}
                      className={`card-3d-tilt relative rounded-2xl p-5 border backdrop-blur-xl transition-all cursor-pointer flex flex-col justify-between ${
                        activeHoverId === project.id
                          ? 'bg-slate-900/90 border-cyan-400 shadow-2xl shadow-cyan-500/20'
                          : 'bg-slate-950/70 border-cyan-500/20 hover:border-cyan-500/50'
                      }`}
                      onClick={() => onSelectProject(project)}
                    >
                      {/* Top Pill Row */}
                      <div>
                        <div className="flex items-center justify-between gap-2 text-[10px] font-mono mb-2">
                          <span className="px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 font-semibold">
                            {project.status || 'AI LAB'}
                          </span>
                          <span className="text-slate-400">{project.completionYear}</span>
                        </div>

                        {/* Title */}
                        <h4 className="text-base font-bold text-white tracking-tight font-display mb-1 line-clamp-1">
                          {project.title.split('—')[0]}
                        </h4>
                        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-3 font-light">
                          {project.subtitle}
                        </p>
                      </div>

                      <div>
                        {/* Metric Callout */}
                        <div className="p-2 rounded-lg bg-black/40 border border-white/5 mb-3 flex items-center justify-between">
                          <span className="text-[11px] text-slate-400 font-mono">Metric:</span>
                          <span className="text-xs font-mono font-bold text-cyan-400">{project.keyMetric.value}</span>
                        </div>

                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {project.techStack.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Action link */}
                        <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs font-mono text-cyan-400">
                          <span className="flex items-center gap-1 text-[11px]">
                            Inspect Architecture
                          </span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      {/* Stem connector down to the axis */}
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-gradient-to-b from-cyan-500/60 to-cyan-400" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CENTRAL AXIS: Glowing Timeline Rail */}
            <div className="relative py-6 my-2">
              {/* Rail Line */}
              <div className="h-1 w-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.6)]" />

              {/* Milestones along rail */}
              <div className="absolute inset-0 flex items-center justify-between px-6 pointer-events-none">
                {['2022', '2023', '2024', '2025', '2026'].map((year) => (
                  <div key={year} className="flex flex-col items-center">
                    <div className="w-5 h-5 rounded-full bg-[#090A0F] border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.8)]">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-cyan-300 mt-2 bg-black/80 px-2 py-0.5 rounded border border-cyan-500/30">
                      {year}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* LOWER TRACK: Commercial Work (Sitting Below Axis) */}
            {(selectedTrack === 'all' || selectedTrack === 'commercial') && (
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-4 text-xs font-mono text-indigo-400 tracking-wider">
                  <Globe className="w-3.5 h-3.5" />
                  <span>▼ LOWER AXIS: COMMERCIAL PLATFORMS & CLIENT SYSTEMS</span>
                </div>
                <div className="grid grid-cols-5 gap-6">
                  {lowerProjects.map((project) => (
                    <div
                      key={project.id}
                      onMouseMove={handleCardMouseMove}
                      onMouseLeave={handleCardMouseLeave}
                      onMouseEnter={() => handleCardMouseEnter(project.id)}
                      className={`card-3d-tilt relative rounded-2xl p-5 border backdrop-blur-xl transition-all cursor-pointer flex flex-col justify-between ${
                        activeHoverId === project.id
                          ? 'bg-slate-900/90 border-indigo-400 shadow-2xl shadow-indigo-500/20'
                          : 'bg-slate-950/70 border-indigo-500/20 hover:border-indigo-500/50'
                      }`}
                      onClick={() => onSelectProject(project)}
                    >
                      {/* Stem connector up to the axis */}
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-gradient-to-t from-indigo-500/60 to-indigo-400" />

                      {/* Top Pill Row */}
                      <div>
                        <div className="flex items-center justify-between gap-2 text-[10px] font-mono mb-2">
                          <span className="px-2 py-0.5 rounded bg-indigo-950/80 text-indigo-300 border border-indigo-500/30 font-semibold">
                            {project.status || 'PROD'}
                          </span>
                          <span className="text-slate-400">{project.client}</span>
                        </div>

                        {/* Title */}
                        <h4 className="text-base font-bold text-white tracking-tight font-display mb-1 line-clamp-1">
                          {project.title.split('—')[0]}
                        </h4>
                        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-3 font-light">
                          {project.subtitle}
                        </p>
                      </div>

                      <div>
                        {/* Metric Callout */}
                        <div className="p-2 rounded-lg bg-black/40 border border-white/5 mb-3 flex items-center justify-between">
                          <span className="text-[11px] text-slate-400 font-mono">Impact:</span>
                          <span className="text-xs font-mono font-bold text-indigo-400">{project.keyMetric.value}</span>
                        </div>

                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {project.techStack.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Action link */}
                        <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs font-mono text-indigo-400">
                          <span className="flex items-center gap-1 text-[11px]">
                            Inspect System Specs
                          </span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Status bar for the showcase */}
        <div className="mt-8 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              10 TOTAL NODES MAPPED
            </span>
            <span className="text-slate-600">|</span>
            <span>DUAL-AXIS 3D PERSPECTIVE</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenContact("Hi Rumpa, I'd like to collaborate on a new project.")}
              className="px-4 py-2 rounded-lg bg-cyan-600/30 hover:bg-cyan-600/50 text-cyan-200 border border-cyan-500/40 font-semibold transition-all flex items-center gap-1.5"
            >
              <span>Initialize Project Inquiry</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
