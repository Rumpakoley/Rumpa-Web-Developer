import React, { useState } from 'react';
import { Project } from '../types';
import { PROJECTS } from '../data/portfolioData';
import { ProjectMockupFrame } from './ProjectMockupFrame';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
  onOpenContact: (note?: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject, onOpenContact }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'ecommerce' | 'saas' | 'business' | 'landing'>('all');

  const filteredProjects = activeFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeFilter);

  const filterTabs = [
    { id: 'all', label: 'All Projects' },
    { id: 'ecommerce', label: 'E-Commerce' },
    { id: 'saas', label: 'SaaS & Web Apps' },
    { id: 'business', label: 'Business Websites' },
    { id: 'landing', label: 'Landing Pages' },
  ] as const;

  return (
    <section id="projects" className="py-20 md:py-28 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono text-indigo-400 uppercase tracking-wider mb-2">
              Featured Case Studies
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display text-balance">
              Engineered for measurable commercial impact.
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              Each project is built from scratch with clean React and TypeScript code, tailored to solve a specific business obstacle and maximize conversions.
            </p>
          </div>

          {/* Interactive Filter Tabs (Functional Button Controls complying with 1.A) */}
          <div className="flex items-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-xl overflow-x-auto max-w-full">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  activeFilter === tab.id
                    ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
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
              className="bg-[#0C0E14] border border-white/10 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-white/20 transition-all shadow-xl"
            >
              <div>
                {/* Unboxed Metadata Header (No static pills) */}
                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mb-3">
                  <span className="text-indigo-400 font-medium">{project.type}</span>
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
                <div className="space-y-3 mb-6 text-xs sm:text-sm">
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="font-semibold text-rose-400 block mb-1">The Challenge:</span>
                    <p className="text-slate-300 font-light leading-relaxed">{project.problem}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="font-semibold text-emerald-400 block mb-1">The Solution:</span>
                    <p className="text-slate-300 font-light leading-relaxed">{project.solution}</p>
                  </div>
                </div>

                {/* Measurable Outcome Metric */}
                <div className="p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-500/20 flex items-center justify-between mb-6">
                  <div>
                    <span className="text-xs text-slate-300 block">{project.keyMetric.label}</span>
                    <span className="text-2xl font-extrabold text-white font-mono tabular-nums">
                      {project.keyMetric.value}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider">
                    Verified Outcome
                  </span>
                </div>

                {/* Tech Stack List as clean text items */}
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  {project.techStack.map((tech, i) => (
                    <span
                      key={tech}
                      className="text-xs font-mono text-slate-300 bg-white/5 px-2.5 py-1 rounded-md border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => onSelectProject(project)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-white/10 hover:bg-white/15 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <span>Full Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onOpenContact(`Inquiry regarding similar project to "${project.title}"`)}
                  className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Need something similar? Let's talk →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
