import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/portfolioData';
import { BlogPost } from '../types';
import { BookOpen, ArrowRight, X, Clock, Calendar } from 'lucide-react';

export const BlogSection: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section id="insights" className="py-20 md:py-28 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <div className="text-xs font-mono text-indigo-400 uppercase tracking-wider mb-2">
            Engineering Insights & Guides
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
              className="bg-[#0C0E14] border border-white/10 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-white/20 transition-all cursor-pointer group shadow-xl"
            >
              <div>
                {/* Unboxed Metadata Header */}
                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mb-3">
                  <span className="text-indigo-400 font-semibold">{post.category}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>{post.readTime}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>{post.date}</span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors font-display mb-3 leading-snug">
                  {post.title}
                </h3>

                <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed mb-6">
                  {post.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-indigo-400 font-medium group-hover:translate-x-1 transition-transform">
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#0E111A] border border-white/10 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-5 right-5 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mb-3">
              <span className="text-indigo-400 font-semibold">{selectedPost.category}</span>
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
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg"
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
