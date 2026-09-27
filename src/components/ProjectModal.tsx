import React from 'react';
import { Project } from '../types';
import { X, ExternalLink, Github, CheckCircle2, ArrowRight } from 'lucide-react';
import { ProjectMockupFrame } from './ProjectMockupFrame';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenContact: (note: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onOpenContact }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0C0E16] border border-white/15 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          aria-label="Close case study modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-2">
          <span className="text-indigo-400 font-semibold">{project.type}</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>{project.client}</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>{project.completionYear}</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight mb-2">
          {project.title}
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed mb-6 font-light max-w-2xl">
          {project.subtitle}
        </p>

        {/* Interactive Mockup Simulation Preview */}
        <div className="mb-8">
          <ProjectMockupFrame project={project} onOpenDetails={() => {}} />
        </div>

        {/* Deep Dive Case Study Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
            <h3 className="text-sm font-semibold text-rose-400 font-display mb-2">
              The Problem & Pain Points
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              {project.problem}
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
            <h3 className="text-sm font-semibold text-emerald-400 font-display mb-2">
              The Engineering Solution
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Key Features Implemented */}
        <div className="mb-8">
          <h3 className="text-xs font-mono text-indigo-400 uppercase tracking-wider mb-3">
            Key Architecture & Features Delivered
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {project.features.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Breakdown */}
        <div className="mb-8 pt-4 border-t border-white/10">
          <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
            Technology Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
            <span>Verified Metric:</span>
            <span className="text-emerald-400 font-bold text-sm">{project.keyMetric.value}</span>
            <span>{project.keyMetric.label}</span>
          </div>

          <button
            onClick={() => {
              onClose();
              onOpenContact(`I'd like to discuss a project similar to ${project.title}`);
            }}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all flex items-center gap-1.5"
          >
            <span>Build a site like this for my business</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
