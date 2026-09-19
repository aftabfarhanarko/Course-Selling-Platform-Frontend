"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Bookmark,
  Heart,
  Tag,
  MessageSquare,
  Sparkles,
  ChevronRight,
  Send,
  Eye,
  BookOpen,
  CheckCircle2,
  Copy,
  ThumbsUp,
} from "lucide-react";
import { BLOG_POSTS } from "@/data/blogData";

interface BlogDetailsProps {
  params: {
    slug: string;
  };
}

export default function BlogDetailsPage({ params }: BlogDetailsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const post = BLOG_POSTS.find((p) => p.slug === params.slug) || BLOG_POSTS[0];

  if (!post) {
    notFound();
  }

  // Related articles (excluding current)
  const relatedPosts = BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 3);

  // Interactive States
  const [likesCount, setLikesCount] = useState<number>(post.likes || 142);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [copiedToast, setCopiedToast] = useState<boolean>(false);

  // Comments state
  const [comments, setComments] = useState<
    { id: string; name: string; role: string; avatar: string; text: string; date: string; likes: number }[]
  >([
    {
      id: "c1",
      name: "Marcus Sterling",
      role: "Senior Full-Stack Engineer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      text: "This article breaks down Next.js Server Actions brilliantly! The explanation on revalidatePath vs revalidateTag saved our team hours of debugging.",
      date: "2 days ago",
      likes: 12,
    },
    {
      id: "c2",
      name: "Elena Rostova",
      role: "Tech Lead @ CloudScale",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      text: "Super clean breakdown of architecture patterns. Looking forward to integrating these performance practices into our production pipeline.",
      date: "1 day ago",
      likes: 8,
    },
  ]);

  const [newCommentText, setNewCommentText] = useState("");

  const handleLike = () => {
    if (isLiked) {
      setLikesCount((prev) => prev - 1);
      setIsLiked(false);
    } else {
      setLikesCount((prev) => prev + 1);
      setIsLiked(true);
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 3000);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment = {
      id: Date.now().toString(),
      name: "You (Student)",
      role: "Software Developer",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
      text: newCommentText.trim(),
      date: "Just now",
      likes: 0,
    };

    setComments([newComment, ...comments]);
    setNewCommentText("");
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#F8FAFC] pt-14 sm:pt-20 pb-24 overflow-hidden relative">
      {/* Background Decorative Blur Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full bg-[#E0E7FF]/50 blur-3xl" />
        <div className="absolute top-1/2 -left-32 w-[550px] h-[550px] rounded-full bg-[#EEF2FF]/60 blur-3xl" />
      </div>

      {/* Copy Toast Alert */}
      {copiedToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-900 text-white font-bold text-xs sm:text-sm shadow-2xl border border-slate-700 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Link copied to clipboard!
        </div>
      )}

      <div className="w-full max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* ── BREADCRUMB & CATEGORY ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex items-center justify-between gap-4"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-[#5B50E6] transition-all duration-300 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4 text-[#5B50E6]" /> Back to Articles
          </Link>

          <div className="flex items-center gap-2">
            <span className="px-4 py-1.5 rounded-full bg-[#5B50E6] text-white text-xs sm:text-sm font-bold shadow-md">
              {post.category}
            </span>
          </div>
        </motion.div>

        {/* ── HERO BANNER ── */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative w-full rounded-3xl sm:rounded-[32px] overflow-hidden shadow-2xl border border-slate-800/90 min-h-[400px] sm:min-h-[480px] md:min-h-[520px] flex flex-col justify-end group"
        >
          <img
            src={post.image}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-900/35" />

          {/* Content Overlay */}
          <div className="relative z-10 p-6 sm:p-10 md:p-12 space-y-4 sm:space-y-6 max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-semibold text-slate-300">
              <span className="flex items-center gap-1.5 text-slate-200">
                <Calendar className="w-4 h-4 text-indigo-400" /> {post.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-slate-200">
                <Clock className="w-4 h-4 text-indigo-400" /> {post.readTime}
              </span>
              {post.views && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <Eye className="w-4 h-4" /> {post.views} Views
                  </span>
                </>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {post.title}
            </h1>

            {/* Author Bar */}
            <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-white/20">
              <div className="flex items-center gap-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-12 h-12 rounded-2xl object-cover border border-white/30 shadow-md"
                />
                <div>
                  <h4 className="text-sm font-extrabold text-white">{post.author.name}</h4>
                  <p className="text-xs text-slate-300 font-medium">{post.author.role}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5">
                <button
                  onClick={handleLike}
                  className={`px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm border transition-all duration-300 flex items-center gap-2 shadow-md ${
                    isLiked
                      ? "bg-rose-600 border-rose-500 text-white shadow-rose-600/30"
                      : "bg-white/10 hover:bg-white/20 text-white border-white/20"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? "fill-white" : ""}`} />
                  <span>{likesCount}</span>
                </button>

                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`p-2.5 rounded-2xl border transition-all duration-300 shadow-md ${
                    isBookmarked
                      ? "bg-[#5B50E6] border-[#5B50E6] text-white"
                      : "bg-white/10 hover:bg-white/20 text-white border-white/20"
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-white" : ""}`} />
                </button>

                <button
                  onClick={handleCopyLink}
                  className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all duration-300 flex items-center gap-2 shadow-md"
                >
                  <Share2 className="w-4 h-4" /> Share
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── MAIN LAYOUT GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Main Content Area (Col-span 8) */}
          <div className="lg:col-span-8 space-y-10 sm:space-y-12">
            
            {/* Article Box */}
            <motion.article
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-white/90 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 text-slate-700"
            >
              {/* Executive Summary Lead Box */}
              <div className="p-6 bg-gradient-to-r from-indigo-50/90 to-slate-50 border-l-4 border-[#5B50E6] rounded-r-2xl space-y-2 border-slate-200/80 shadow-xs">
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#5B50E6]" /> Key Takeaways & Overview
                </h3>
                <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              {/* Formatted Article Content */}
              <div
                className="prose prose-slate max-w-none prose-headings:font-extrabold prose-headings:text-slate-900 prose-h2:text-xl sm:prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-p:text-slate-600 prose-p:text-sm sm:prose-p:text-base prose-p:leading-relaxed prose-li:text-sm sm:prose-li:text-base prose-blockquote:border-l-4 prose-blockquote:border-[#5B50E6] prose-blockquote:bg-slate-50 prose-blockquote:p-4 prose-blockquote:rounded-r-xl"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Topic Tags */}
              <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
                <Tag className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-bold text-slate-500 mr-1">Tags:</span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200/60"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Author Bio Box */}
              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-start gap-4 bg-slate-50/80 p-6 rounded-2xl border border-slate-200/80">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-14 h-14 rounded-2xl object-cover shadow-sm border border-slate-200 shrink-0"
                />
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-extrabold text-slate-900">{post.author.name}</h4>
                    <span className="text-xs px-3 py-0.5 rounded-full bg-indigo-50 text-[#5B50E6] font-bold">
                      Verified Author
                    </span>
                  </div>
                  <p className="text-xs text-[#5B50E6] font-bold">{post.author.role}</p>
                  <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed pt-1">
                    Senior software lead and contributor at EduNova. Dedicated to building world-class full-stack applications and mentoring the next generation of engineers.
                  </p>
                </div>
              </div>
            </motion.article>

            {/* ── COMMENTS SECTION ── */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-white/90 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#5B50E6]" /> Discussion ({comments.length})
                </h3>
              </div>

              {/* Add Comment Form */}
              <form onSubmit={handleAddComment} className="space-y-3">
                <textarea
                  rows={3}
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder="Share your thoughts or ask a question about this article..."
                  className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#5B50E6] focus:bg-white focus:ring-2 focus:ring-[#5B50E6]/20 transition-all"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#5B50E6] hover:bg-[#4D42DB] text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-[#5B50E6]/30 hover:scale-105"
                  >
                    Post Comment <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>

              {/* Existing Comments List */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/70 space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={comment.avatar}
                          alt={comment.name}
                          className="w-9 h-9 rounded-xl object-cover border border-slate-200"
                        />
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900">{comment.name}</h4>
                          <p className="text-[11px] text-slate-500 font-medium">{comment.role}</p>
                        </div>
                      </div>
                      <span className="text-[11px] text-slate-400 font-medium">{comment.date}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 font-normal leading-relaxed pl-12">
                      {comment.text}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* Sidebar (Col-span 4) */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* Outline Widget */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-white/90 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-6 shadow-sm space-y-4"
            >
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#5B50E6]" /> Article Outline
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 font-medium border-l-2 border-slate-200 pl-3.5">
                <li className="hover:text-[#5B50E6] cursor-pointer transition-colors font-bold text-[#5B50E6]">
                  1. Executive Overview & Core Concepts
                </li>
                <li className="hover:text-[#5B50E6] cursor-pointer transition-colors">
                  2. Architectural Performance Highlights
                </li>
                <li className="hover:text-[#5B50E6] cursor-pointer transition-colors">
                  3. Production Implementation Code
                </li>
                <li className="hover:text-[#5B50E6] cursor-pointer transition-colors">
                  4. Summary & Best Practices
                </li>
              </ul>
            </motion.div>

            {/* Course CTA Banner Widget */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-7 shadow-xl text-white space-y-4 border border-slate-700/60"
            >
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-xs font-bold text-indigo-300 border border-white/10">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> EduNova Certified Track
              </div>
              <h3 className="text-xl font-extrabold leading-snug">
                Master Software Engineering & System Architecture
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Build real production applications with 1-on-1 code reviews from lead architects.
              </p>
              <Link
                href="/courses"
                className="inline-flex w-full items-center justify-center py-3.5 rounded-2xl bg-[#5B50E6] hover:bg-[#4D42DB] text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-[#5B50E6]/30 hover:scale-105"
              >
                Explore Courses Track
              </Link>
            </motion.div>

          </aside>
        </div>

        {/* ── RECOMMENDED RELATED ARTICLES ── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="pt-10 border-t border-slate-200/80 space-y-8"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#5B50E6] uppercase tracking-wider">Related Reading</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Recommended Architecture Articles
              </h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200 text-xs font-bold text-slate-700 hover:text-[#5B50E6] transition-all shadow-xs"
            >
              View All Articles <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {relatedPosts.map((rPost, idx) => (
              <motion.div
                key={rPost.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
              >
                <Link
                  href={`/blog/${rPost.slug}`}
                  className="group bg-white/90 backdrop-blur-xl border border-slate-200/90 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[#5B50E6]/40 hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="h-48 w-full overflow-hidden bg-slate-100">
                      <img
                        src={rPost.image}
                        alt={rPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </div>
                    <div className="p-6 space-y-2.5">
                      <span className="text-xs font-bold text-[#5B50E6] uppercase tracking-wider">{rPost.category}</span>
                      <h3 className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-[#5B50E6] transition-colors duration-300 line-clamp-2 leading-snug">
                        {rPost.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 font-normal">
                        {rPost.excerpt}
                      </p>
                    </div>
                  </div>
                  <div className="p-6 pt-0">
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-semibold">
                      <span>{rPost.date}</span>
                      <span>{rPost.readTime}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
