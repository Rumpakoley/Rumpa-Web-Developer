import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/portfolioData';
import { BlogPost } from '../types';
import { BookOpen, ArrowRight, X, Clock, Calendar } from 'lucide-react';

export const BlogSection: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section id="insights" className="py-20 md:py-28 border-t border-amber-500/20 relative bg-[#0c0d10] bg-garage-scanlines">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-amber-950/60 border border-amber-500/40 text-amber-400 mb-3">
            <span>// ENGINEERING INSIGHTS & GUIDES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display text-balance">
            Insights on web speed, conversion, and architecture.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Practical advice written for founders and business owners navigating technical decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="bg-[#101116] border border-amber-500/20 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/10 transition-all cursor-pointer group shadow-xl"
            >
              <div>
                {/* Metadata Header */}
                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mb-3">
                  <span className="text-amber-400 font-semibold">{post.category}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>{post.readTime}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>{post.date}</span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors font-display mb-3 leading-snug">
                  {post.title}
                </h3>

                <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed mb-6">
                  {post.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-amber-400 font-medium group-hover:translate-x-1 transition-transform">
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#14151a] border border-amber-500/35 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-5 right-5 p-2 rounded-lg bg-white/5 hover:bg-amber-500/20 text-slate-400 hover:text-white transition-colors"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mb-3">
              <span className="text-amber-400 font-semibold">{selectedPost.category}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>{selectedPost.readTime}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>{selectedPost.date}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display mb-6">
              {selectedPost.title}
            </h3>

            <div className="space-y-4 text-slate-300 text-sm sm:text-base font-light leading-relaxed border-t border-white/10 pt-6">
              {selectedPost.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">By Rumpa Koley</span>
              <button
                onClick={() => setSelectedPost(null)}
                className="px-4 py-2 text-xs font-bold text-black bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 rounded-lg shadow-md shadow-amber-500/20"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
