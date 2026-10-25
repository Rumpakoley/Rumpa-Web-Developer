import React, { useState } from 'react';
import { Project } from '../types';
import { X, ExternalLink, Github, CheckCircle2, ArrowRight, Cpu, Terminal, Network, ShieldCheck, Activity } from 'lucide-react';
import { ProjectMockupFrame } from './ProjectMockupFrame';
import { sound } from '../utils/audio';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenContact: (note: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onOpenContact }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'logs'>('overview');

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#111218] border border-amber-500/30 rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto p-5 sm:p-8 relative shadow-2xl shadow-amber-950/40">
        
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick(600);
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-lg bg-white/5 hover:bg-amber-500/20 text-slate-400 hover:text-amber-300 transition-colors border border-white/10"
          aria-label="Close inspector modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Metadata */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400 mb-2">
          <span className="px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-500/30 font-semibold">
            {project.status || 'SHIPPED'}
          </span>
          <span className="text-slate-500">|</span>
          <span className="text-orange-400 font-semibold">{project.type}</span>
          <span className="text-slate-500">|</span>
          <span>{project.client}</span>
          <span className="text-slate-500">|</span>
          <span>{project.completionYear}</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight mb-2">
          {project.title}
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed mb-6 font-light max-w-2xl">
          {project.subtitle}
        </p>

        {/* Modal Sub-Tabs: Overview vs Architecture vs Terminal Logs */}
        <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-3">
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('overview');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Interactive Overview</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('architecture');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
              activeTab === 'architecture'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span>System Architecture Flow</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('logs');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
              activeTab === 'logs'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Deployment Telemetry</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <ProjectMockupFrame project={project} onOpenDetails={() => {}} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-black/50 border border-rose-500/20">
                <h3 className="text-xs font-mono font-semibold text-rose-400 mb-2 uppercase tracking-wider">
                  The Problem & Bottlenecks
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/50 border border-amber-500/20">
                <h3 className="text-xs font-mono font-semibold text-amber-400 mb-2 uppercase tracking-wider">
                  The Engineering Solution
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-3">
                Key Architectural Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 p-2.5 rounded-lg bg-black/50 border border-white/5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ARCHITECTURE FLOW */}
        {activeTab === 'architecture' && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-black/60 border border-amber-500/30">
              <div className="text-xs font-mono text-amber-400 mb-4 flex items-center justify-between">
                <span>SYSTEM TOPOLOGY PIPELINE</span>
                <span className="text-amber-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  LATENCY &lt; 20ms
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-center">
                  <div className="text-[10px] font-mono text-amber-400 uppercase mb-1">01. CLIENT / UI</div>
                  <div className="text-xs font-bold text-white mb-1">
                    {project.architecture?.frontend || 'React 19 + TypeScript'}
                  </div>
                  <div className="text-[10px] text-slate-400">Zero-overhead runtime</div>
                </div>

                <div className="p-3.5 rounded-xl bg-orange-950/40 border border-orange-500/30 text-center">
                  <div className="text-[10px] font-mono text-orange-400 uppercase mb-1">02. EDGE ROUTING</div>
                  <div className="text-xs font-bold text-white mb-1">
                    {project.architecture?.deployment || 'Vercel Global Edge'}
                  </div>
                  <div className="text-[10px] text-slate-400">Global Anycast CDN</div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#201815] border border-amber-500/30 text-center">
                  <div className="text-[10px] font-mono text-amber-400 uppercase mb-1">03. BACKEND API</div>
                  <div className="text-xs font-bold text-white mb-1">
                    {project.architecture?.backend || 'Serverless Node API'}
                  </div>
                  <div className="text-[10px] text-slate-400">Isolated Lambdas</div>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-center">
                  <div className="text-[10px] font-mono text-amber-400 uppercase mb-1">04. PERSISTENCE</div>
                  <div className="text-xs font-bold text-white mb-1">
                    {project.architecture?.databaseOrCache || 'PostgreSQL & Redis'}
                  </div>
                  <div className="text-[10px] text-slate-400">ACID Safe Cache</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-black/50 border border-white/10 text-center">
                <div className="text-2xl font-bold font-mono text-amber-400">99+</div>
                <div className="text-[10px] font-mono text-slate-400 mt-0.5">Lighthouse Perf</div>
              </div>
              <div className="p-3 rounded-xl bg-black/50 border border-white/10 text-center">
                <div className="text-2xl font-bold font-mono text-orange-400">0.38s</div>
                <div className="text-[10px] font-mono text-slate-400 mt-0.5">LCP Paint</div>
              </div>
              <div className="p-3 rounded-xl bg-black/50 border border-white/10 text-center">
                <div className="text-2xl font-bold font-mono text-amber-300">0.00</div>
                <div className="text-[10px] font-mono text-slate-400 mt-0.5">CLS Shift</div>
              </div>
              <div className="p-3 rounded-xl bg-black/50 border border-white/10 text-center">
                <div className="text-2xl font-bold font-mono text-orange-300">12ms</div>
                <div className="text-[10px] font-mono text-slate-400 mt-0.5">INP Input Latency</div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TERMINAL LOGS */}
        {activeTab === 'logs' && (
          <div className="bg-[#0a0b0e] border border-amber-500/30 rounded-xl p-4 font-mono text-xs text-slate-300 space-y-2">
            <div className="text-amber-400 border-b border-white/10 pb-2 mb-3">
              $ tail -f /var/log/deployments/{project.id}.log
            </div>
            {(project.terminalLogs || [
              `BUILD: Optimizing bundle chunk distribution for ${project.id}`,
              'EDGE: Assets propagated to 300+ edge locations',
              'HEALTH: HTTP 200 OK across all synthetic tests',
              'STATUS: Online in production cluster',
            ]).map((log, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-slate-600">[{new Date().toLocaleTimeString()}]</span>
                <span className="text-amber-400">✓</span>
                <span>{log}</span>
              </div>
            ))}
            <div className="pt-2 text-amber-300 flex items-center gap-1.5 animate-pulse">
              <span>● SYSTEM NOMINAL: 0 ERRORS</span>
            </div>
          </div>
        )}

        {/* Tech Stack Breakdown */}
        <div className="my-6 pt-4 border-t border-white/10">
          <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
            Technologies & Libraries Deployed
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span>Verified Metric:</span>
            <span className="text-amber-400 font-bold text-sm">{project.keyMetric.value}</span>
            <span className="hidden sm:inline">{project.keyMetric.label}</span>
          </div>

          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-all"
                title="View GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
            )}

            <button
              onClick={() => {
                sound.playClick(900);
                onClose();
                onOpenContact(`I'd like to build a project with architecture similar to ${project.title}`);
              }}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-500 rounded-xl shadow-lg shadow-amber-600/25 transition-all flex items-center gap-1.5 font-mono"
            >
              <span>Initialize Project Like This</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
