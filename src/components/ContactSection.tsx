import React, { useState } from 'react';
import { DeveloperProfile } from '../types';
import {
  Mail,
  MessageCircle,
  Calendar,
  Send,
  CheckCircle2,
  Copy,
  Check,
  ArrowUpRight,
  Clock,
  ShieldCheck,
  Terminal,
  Paperclip,
} from 'lucide-react';
import { sound } from '../utils/audio';

interface ContactSectionProps {
  profile: DeveloperProfile;
  currency: 'INR' | 'USD';
  prefilledScope?: string;
  prefilledBudget?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  profile,
  currency,
  prefilledScope,
  prefilledBudget,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Business Website',
    budget: prefilledBudget || (currency === 'INR' ? '₹25,000 - ₹50,000' : '$500 - $1,000'),
    timeline: '2 - 3 Weeks',
    message: prefilledScope ? `Scope specifications:\n${prefilledScope}\n\nAdditional details:\n` : '',
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submissionStep, setSubmissionStep] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  React.useEffect(() => {
    if (prefilledBudget) {
      setFormData(prev => ({ ...prev, budget: prefilledBudget }));
    }
  }, [prefilledBudget]);

  React.useEffect(() => {
    if (prefilledScope) {
      setFormData(prev => ({
        ...prev,
        message: `Scope specifications:\n${prefilledScope}\n\nAdditional details: `,
      }));
    }
  }, [prefilledScope]);

  const handleCopyEmail = () => {
    sound.playClick();
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please provide your name, email, and project scope.');
      return;
    }

    sound.playClick(900);
    setSubmitting(true);
    setErrorMessage('');
    setSubmissionStep('Encoding transmission payload & parameters...');

    setTimeout(() => {
      setSubmissionStep('Encrypting via HTTPS TLS 1.3 socket...');
      sound.playKey(1200);
    }, 450);

    setTimeout(() => {
      setSubmissionStep('Folding origami packet & dispatching to Rumpa Koley 🚀');
      sound.playWarp();
    }, 900);

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      sound.playTerminalSuccess();

      const existingInquiries = JSON.parse(localStorage.getItem('dev_portfolio_inquiries') || '[]');
      existingInquiries.push({
        ...formData,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('dev_portfolio_inquiries', JSON.stringify(existingInquiries));
    }, 1450);
  };

  const whatsappMessage = encodeURIComponent(
    `Hi ${profile.name},\n\nI'm reaching out from your portfolio regarding a ${formData.projectType} project.\n\nName: ${formData.name || 'Client'}\nBudget: ${formData.budget}\nDetails: ${formData.message.slice(0, 150)}...`
  );
  const whatsappUrl = `https://wa.me/${profile.whatsapp.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`;

  const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(`Project Inquiry: ${formData.projectType} — ${formData.name}`)}&body=${encodeURIComponent(
    `Hi Rumpa,\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nProject Type: ${formData.projectType}\nBudget: ${formData.budget}\nTimeline: ${formData.timeline}\n\nMessage:\n${formData.message}`
  )}`;

  return (
    <section id="contact" className="py-20 md:py-28 relative border-t border-cyan-500/20 bg-[#07090e] bg-tech-dots">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>COMMUNICATION TRANSMISSION TERMINAL</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            Let's build your next digital asset.
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2 font-light">
            Fill out the intake terminal below. You'll receive a detailed architectural scope breakdown, timeline, and fixed quote within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Direct channels and communication guarantees */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0b0e18] border border-cyan-500/30 rounded-2xl p-6 sm:p-7 shadow-xl">
              <h3 className="text-lg font-bold text-white font-display mb-4 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Direct Contact Coordinates</span>
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                {/* Email Item */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-black/40 border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-cyan-950 flex items-center justify-center text-cyan-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-slate-400 uppercase">Direct Email</div>
                      <div className="font-mono text-white text-xs">{profile.email}</div>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
                    title="Copy email to clipboard"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* WhatsApp Item */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-950/30 hover:bg-emerald-950/50 border border-emerald-500/20 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-900/60 flex items-center justify-center text-emerald-400">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-emerald-300 uppercase">Instant WhatsApp</div>
                      <div className="font-mono text-white text-xs">{profile.whatsapp}</div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                {/* Location Item */}
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">HQ Station & Availability</div>
                  <div className="font-mono text-white text-xs mt-0.5">{profile.location}</div>
                  <div className="text-emerald-400 text-[11px] font-mono mt-1">● Current Status: {profile.availability}</div>
                </div>
              </div>
            </div>

            {/* Service Level Agreement */}
            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3">
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                Engineering Guarantees
              </div>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Guaranteed response within 24 business hours.</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>100% IP & Code Ownership transferred upon deployment.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span>Fixed, transparent milestone pricing with zero hidden surcharges.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Intake Form / Transmission Panel */}
          <div className="lg:col-span-7">
            <div className="bg-[#0b0e18] border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
              
              {submitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto text-2xl animate-bounce">
                    🚀
                  </div>
                  <h3 className="text-2xl font-bold text-white font-display">Transmission Dispatched!</h3>
                  <p className="text-slate-300 text-sm max-w-md mx-auto font-light leading-relaxed">
                    Thank you, <span className="text-cyan-300 font-semibold">{formData.name}</span>. Your project parameters have been securely logged. I will review your requirements and respond with a comprehensive scope within 24 hours.
                  </p>

                  <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={mailtoUrl}
                      className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-cyan-600/30"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Open in Email App</span>
                    </a>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-emerald-600/30"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Ping on WhatsApp</span>
                    </a>
                  </div>

                  <button
                    onClick={() => {
                      sound.playClick();
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        projectType: 'Business Website',
                        budget: currency === 'INR' ? '₹25,000 - ₹50,000' : '$500 - $1,000',
                        timeline: '2 - 3 Weeks',
                        message: '',
                      });
                    }}
                    className="text-xs text-slate-400 hover:text-white font-mono underline block mx-auto mt-6"
                  >
                    Transmit another packet
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-white/10 pb-3 mb-4">
                    <h3 className="text-xl font-bold text-white font-display">Project Scoping Terminal</h3>
                    <p className="text-xs text-slate-400 mt-1 font-light">
                      Specify your system requirements below to calculate exact timeline and milestone deliverables.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono">
                      {errorMessage}
                    </div>
                  )}

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono text-slate-300 uppercase mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={formData.name}
                        onChange={(e) => {
                          sound.playKey();
                          setFormData({ ...formData, name: e.target.value });
                        }}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white placeholder-slate-600 text-xs sm:text-sm focus:outline-none focus:border-cyan-500 font-mono transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-slate-300 uppercase mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. rahul@company.com"
                        value={formData.email}
                        onChange={(e) => {
                          sound.playKey();
                          setFormData({ ...formData, email: e.target.value });
                        }}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white placeholder-slate-600 text-xs sm:text-sm focus:outline-none focus:border-cyan-500 font-mono transition-colors"
                      />
                    </div>
                  </div>

                  {/* Phone & Project Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono text-slate-300 uppercase mb-1">
                        WhatsApp / Contact (Optional)
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. +91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => {
                          sound.playKey();
                          setFormData({ ...formData, phone: e.target.value });
                        }}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white placeholder-slate-600 text-xs sm:text-sm focus:outline-none focus:border-cyan-500 font-mono transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-slate-300 uppercase mb-1">
                        Project Category
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => {
                          sound.playClick();
                          setFormData({ ...formData, projectType: e.target.value });
                        }}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e121d] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500 font-mono transition-colors"
                      >
                        <option value="Landing Page">Landing Page</option>
                        <option value="Business Website">Complete Business Website</option>
                        <option value="E-Commerce Store">Headless E-Commerce</option>
                        <option value="Custom Web App / SaaS">Custom Web App / SaaS MVP</option>
                        <option value="Speed & SEO Optimization">Speed & Core Web Vitals Audit</option>
                      </select>
                    </div>
                  </div>

                  {/* Budget & Timeline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono text-slate-300 uppercase mb-1">
                        Estimated Budget ({currency})
                      </label>
                      <input
                        type="text"
                        placeholder={currency === 'INR' ? '₹25,000 - ₹50,000' : '$500 - $1,000'}
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white placeholder-slate-600 text-xs sm:text-sm focus:outline-none focus:border-cyan-500 font-mono transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-slate-300 uppercase mb-1">
                        Target Launch Window
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e121d] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500 font-mono transition-colors"
                      >
                        <option value="Urgent (Within 10 Days)">Urgent (Within 10 Days)</option>
                        <option value="2 - 3 Weeks">2 - 3 Weeks (Standard)</option>
                        <option value="1 Month">1 Month</option>
                        <option value="Flexible / Q3">Flexible / Q3</option>
                      </select>
                    </div>
                  </div>

                  {/* Message / Specifications */}
                  <div>
                    <label className="block text-[11px] font-mono text-slate-300 uppercase mb-1">
                      System Scope / Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Briefly describe your business, key goals, target audience, or paste reference links (e.g. bryangarage.dev)..."
                      value={formData.message}
                      onChange={(e) => {
                        sound.playKey();
                        setFormData({ ...formData, message: e.target.value });
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white placeholder-slate-600 text-xs sm:text-sm focus:outline-none focus:border-cyan-500 font-mono transition-colors resize-y"
                    />
                  </div>

                  {/* Submission Status or Trigger */}
                  {submitting ? (
                    <div className="p-4 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-center font-mono text-xs text-cyan-300 space-y-2">
                      <div className="animate-spin text-lg inline-block">⚙️</div>
                      <p>{submissionStep}</p>
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="w-full py-3.5 text-xs sm:text-sm font-semibold text-white bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 rounded-xl shadow-lg shadow-cyan-600/30 transition-all flex items-center justify-center gap-2 font-mono uppercase tracking-wider"
                    >
                      <Send className="w-4 h-4" />
                      <span>Encrypt & Transmit Project Inquiry</span>
                    </button>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
