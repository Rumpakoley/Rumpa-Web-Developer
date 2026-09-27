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
} from 'lucide-react';

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
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Update budget when currency or prefill changes
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
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in your name, email, and project details.');
      return;
    }

    setSubmitting(true);
    setErrorMessage('');

    // Simulate successful submission and store in local session history
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);

      const existingInquiries = JSON.parse(localStorage.getItem('dev_portfolio_inquiries') || '[]');
      existingInquiries.push({
        ...formData,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('dev_portfolio_inquiries', JSON.stringify(existingInquiries));
    }, 900);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello ${profile.name}! My name is ${formData.name || 'there'}. I'm interested in building a ${
      formData.projectType
    } with an estimated budget of ${formData.budget}. Message: ${formData.message || 'Looking forward to connecting!'}`
  );

  const whatsappUrl = `https://wa.me/${profile.whatsapp.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`;

  const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(
    `New Web Project Inquiry: ${formData.projectType} - ${formData.name}`
  )}&body=${encodeURIComponent(
    `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nProject Type: ${formData.projectType}\nBudget: ${formData.budget}\nTimeline: ${formData.timeline}\n\nProject Details:\n${formData.message}`
  )}`;

  return (
    <section id="contact" className="py-20 md:py-28 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact & Availability */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="text-xs font-mono text-indigo-400 uppercase tracking-wider mb-2">
                Get In Touch
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display text-balance">
                Let's build something exceptional together.
              </h2>
              <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
                Have an upcoming project, redesign idea, or need an estimate? Tell me about your business goals and I will respond personally within 4 hours.
              </p>
            </div>

            {/* Direct Quick Action Buttons */}
            <div className="space-y-3">
              {/* WhatsApp direct */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-emerald-950/20 hover:bg-emerald-950/40 border border-emerald-500/30 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">Chat on WhatsApp</div>
                    <div className="text-[11px] text-emerald-400/90 font-mono">{profile.whatsapp}</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              {/* Email direct */}
              <div className="p-4 rounded-xl bg-[#0D101A] border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">Direct Email</div>
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-[11px] text-slate-400 hover:text-indigo-400 font-mono transition-colors"
                    >
                      {profile.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="px-2.5 py-1 text-[11px] font-mono rounded bg-white/5 hover:bg-white/10 text-slate-300 flex items-center gap-1 transition-colors"
                  title="Copy email address"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Calendly / Schedule Call */}
              <a
                href={`mailto:${profile.email}?subject=Requesting 15-Minute Discovery Call`}
                className="p-4 rounded-xl bg-[#0D101A] border border-white/10 hover:border-white/20 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-slate-300">
                    <Calendar className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">15-Min Discovery Call</div>
                    <div className="text-[11px] text-slate-400">Review project requirements & scope</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
              </a>
            </div>

            {/* Guarantees Box */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>Quick turnaround: detailed proposal within 24 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>100% code ownership & no vendor lock-in</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Intake Form */}
          <div className="lg:col-span-7 bg-[#0C0E14] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white font-display">Inquiry Sent Successfully!</h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-white font-medium">{formData.name}</span>. I have received your project details and will review the specifications right away.
                </p>

                <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-4">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg flex items-center gap-2 shadow"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Ping on WhatsApp directly</span>
                  </a>

                  <a
                    href={mailtoUrl}
                    className="px-4 py-2.5 text-xs font-semibold text-slate-300 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Open in Email Client</span>
                  </a>

                  <button
                    onClick={() => {
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
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-mono underline block w-full mt-2"
                  >
                    Submit another inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border-b border-white/5 pb-4 mb-4">
                  <h3 className="text-xl font-bold text-white font-display">Project Inquiry Form</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Fill out the details below to receive a scoped quote and timeline.
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                    {errorMessage}
                  </div>
                )}

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rahul@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Phone/WhatsApp & Project Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase mb-1.5">
                      WhatsApp / Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase mb-1.5">
                      Project Type
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#141724] border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                    >
                      <option value="Landing Page">Landing Page</option>
                      <option value="Business Website">Complete Business Website</option>
                      <option value="E-Commerce Store">E-Commerce Storefront</option>
                      <option value="Custom Web App / SaaS">Custom Web App / SaaS MVP</option>
                      <option value="Website Redesign / Speed Optimization">Speed & SEO Optimization</option>
                    </select>
                  </div>
                </div>

                {/* Budget & Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase mb-1.5">
                      Estimated Budget ({currency})
                    </label>
                    <input
                      type="text"
                      placeholder={currency === 'INR' ? '₹25,000 - ₹50,000' : '$500 - $1,000'}
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase mb-1.5">
                      Target Launch Date
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#141724] border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                    >
                      <option value="ASAP (within 1-2 weeks)">ASAP (Within 1-2 weeks)</option>
                      <option value="2 - 3 Weeks">Standard (2 - 3 weeks)</option>
                      <option value="Next Month">Next Month</option>
                      <option value="Flexible">Flexible timeline</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-1.5">
                    Project Details & Goals *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Briefly describe what your business does, your target audience, and any reference sites you like..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                  />
                </div>

                {/* Submit button & actions */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto px-7 py-3 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <span>{submitting ? 'Sending inquiry...' : 'Send Project Inquiry'}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={mailtoUrl}
                    className="w-full sm:w-auto px-4 py-3 text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors text-center"
                  >
                    Send via Email App
                  </a>
                </div>

                <div className="text-[11px] text-slate-400 font-mono">
                  Your information is private and will only be used to discuss your website project.
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
