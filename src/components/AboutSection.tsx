import React from 'react';
import { DeveloperProfile } from '../types';
import { SKILL_CATEGORIES, DEVELOPMENT_PROCESS } from '../data/portfolioData';
import { Code, Cpu, Award, CheckCircle2, ArrowRight } from 'lucide-react';

interface AboutSectionProps {
  profile: DeveloperProfile;
  onOpenContact: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile, onOpenContact }) => {
  return (
    <section id="about" className="py-20 md:py-28 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* About Story & Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          <div className="lg:col-span-5">
            <div className="text-xs font-mono text-indigo-400 uppercase tracking-wider mb-2">
              Background & Philosophy
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display text-balance">
              Developer in code. Partner in business growth.
            </h2>

            {/* Clean Monogram / Avatar Presentation */}
            <div className="mt-8 p-6 rounded-2xl bg-[#0D101A] border border-white/10 flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-display font-extrabold text-2xl shadow-lg shadow-indigo-600/30">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div className="text-lg font-bold text-white font-display">{profile.name}</div>
                <div className="text-xs text-indigo-400 font-mono">{profile.role}</div>
                <div className="text-xs text-slate-400 mt-1">{profile.location}</div>
              </div>
            </div>

            <div className="mt-6 space-y-2 text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Years of Active Engineering: {profile.yearsExperience}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                <span>Completed Business Projects: {profile.projectsCompleted}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Client Satisfaction Rating: {profile.satisfactionRate}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 text-slate-300 text-sm sm:text-base font-light leading-relaxed">
            <p>
              I believe your website is your company's most important salesperson. When an interested client searches for your services, they decide whether to trust you within the first 3 seconds of landing on your page.
            </p>
            <p>
              Too many businesses get burned by bloated drag-and-drop templates or agencies that disappear after launch. My approach is different: I work with you directly 1-on-1. No account managers, no outsourcing, no bloated code.
            </p>
            <p>
              I focus relentlessly on three fundamentals:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="font-semibold text-white text-xs mb-1 font-mono uppercase tracking-wide">
                  1. Speed First
                </div>
                <p className="text-xs text-slate-400">
                  Sub-second loading times to ensure zero drop-off on mobile devices.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="font-semibold text-white text-xs mb-1 font-mono uppercase tracking-wide">
                  2. Conversion Design
                </div>
                <p className="text-xs text-slate-400">
                  Clear copy hierarchy and frictionless CTAs that prompt users to act.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="font-semibold text-white text-xs mb-1 font-mono uppercase tracking-wide">
                  3. Clean Architecture
                </div>
                <p className="text-xs text-slate-400">
                  Clean TypeScript and modern React that your team can scale with ease.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Skills Grid */}
        <div className="mb-24">
          <div className="max-w-2xl mb-10">
            <div className="text-xs font-mono text-indigo-400 uppercase tracking-wider mb-2">
              Technical Stack & Competencies
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display">
              Built on battle-tested modern web standards.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SKILL_CATEGORIES.map((category) => (
              <div
                key={category.title}
                className="bg-[#0C0E14] border border-white/10 rounded-2xl p-6"
              >
                <h4 className="text-base font-bold text-white font-display mb-4 pb-3 border-b border-white/5">
                  {category.title}
                </h4>
                <div className="space-y-3">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="flex items-center justify-between text-xs">
                      <span className={`font-medium ${skill.highlight ? 'text-white' : 'text-slate-300'}`}>
                        {skill.name}
                      </span>
                      <span className="font-mono text-slate-500 text-[11px]">{skill.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4-Step Engineering Roadmap complying with Section 1.B */}
        <div id="process">
          <div className="max-w-2xl mb-12">
            <div className="text-xs font-mono text-indigo-400 uppercase tracking-wider mb-2">
              How We Work Together
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display text-balance">
              The 4-stage roadmap from idea to production launch.
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-2">
              A transparent, milestone-driven process with zero guesswork.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DEVELOPMENT_PROCESS.map((p) => (
              <div
                key={p.step}
                className="bg-[#0C0E14] border border-white/10 rounded-2xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="text-3xl font-extrabold text-indigo-400 font-mono mb-4">
                    {p.step}.
                  </div>
                  <h4 className="text-lg font-bold text-white font-display mb-2">
                    {p.title}
                  </h4>
                  <p className="text-slate-300 text-xs leading-relaxed font-light mb-6">
                    {p.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 text-[11px] space-y-1 font-mono">
                  <div className="text-slate-400">
                    Duration: <span className="text-slate-200">{p.duration}</span>
                  </div>
                  <div className="text-indigo-400">
                    Key: <span className="text-slate-300">{p.deliverable}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
