import React, { useState } from 'react';
import { Project } from '../types';
import { PROJECTS } from '../data/portfolioData';
import { ProjectMockupFrame } from './ProjectMockupFrame';
import { ArrowUpRight, Cpu } from 'lucide-react';
import { sound } from '../utils/audio';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
  onOpenContact: (note?: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject, onOpenContact }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'ai' | 'ecommerce' | 'saas' | 'business' | 'landing'>('all');

  const filteredProjects = activeFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeFilter);

  const filterTabs = [
    { id: 'all', label: 'All Projects' },
    { id: 'ai', label: 'AI & Canvas Labs' },
    { id: 'ecommerce', label: 'E-Commerce' },
    { id: 'saas', label: 'SaaS & Telemetry' },
    { id: 'business', label: 'Business Websites' },
    { id: 'landing', label: 'Sales Funnels' },
  ] as const;

  return (
    <section id="projects" className="py-20 md:py-28 border-t border-amber-500/20 relative bg-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" />
              <span>Matrix Case Studies</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display text-balance">
              Engineered for measurable commercial impact.
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              Each build is handcrafted from scratch with clean React and TypeScript architecture, maximizing conversion velocity and sub-second load times.
            </p>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-xl overflow-x-auto max-w-full">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playClick();
                  setActiveFilter(tab.id);
                }}
                className={`px-3 py-1.5 text-xs font-mono rounded-lg whitespace-nowrap transition-all ${
                  activeFilter === tab.id
                    ? 'bg-amber-600 text-white font-semibold shadow-sm shadow-amber-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-[#111218] border border-amber-500/20 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-amber-500/50 transition-all shadow-xl hover:shadow-2xl hover:shadow-amber-950/20"
            >
              <div>
                {/* Metadata Header */}
                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mb-3">
                  <span className="text-amber-400 font-medium">{project.type}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>{project.client}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>{project.completionYear}</span>
                </div>

                {/* Project Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-display mb-2">
                  {project.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6 font-light">
                  {project.subtitle}
                </p>

                {/* Interactive Mockup Frame */}
                <div className="mb-6">
                  <ProjectMockupFrame project={project} onOpenDetails={onSelectProject} />
                </div>

                {/* Problem vs Solution Summary */}
                <div className="space-y-3 mb-6 text-xs text-slate-300">
                  <div className="p-3.5 rounded-xl bg-black/50 border border-white/5">
                    <span className="font-mono text-rose-400 font-semibold block mb-1">Obstacle:</span>
                    <span className="font-light">{project.problem}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-black/50 border border-white/5">
                    <span className="font-mono text-amber-400 font-semibold block mb-1">Architecture Delivered:</span>
                    <span className="font-light">{project.solution}</span>
                  </div>
                </div>
              </div>

              <div>
                {/* Key Metric & Claim-to-Proof */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between mb-4">
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-white font-mono">{project.keyMetric.value}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{project.keyMetric.label}</div>
                  </div>
                  <div className="flex flex-wrap gap-1 max-w-[200px] justify-end">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span key={tech} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      sound.playClick();
                      onSelectProject(project);
                    }}
                    className="flex-1 py-2.5 text-xs font-mono font-medium rounded-xl bg-amber-950/60 hover:bg-amber-950 border border-amber-500/40 text-amber-300 hover:text-white transition-all text-center flex items-center justify-center gap-1.5"
                  >
                    <span>Inspect System Specs</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      sound.playClick();
                      onOpenContact(`I would like a website with similar architecture to ${project.title}`);
                    }}
                    className="py-2.5 px-4 text-xs font-mono font-semibold rounded-xl bg-amber-600 hover:bg-amber-500 text-white transition-all whitespace-nowrap"
                  >
                    Inquire Similar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
