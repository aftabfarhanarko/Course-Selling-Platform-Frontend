"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Calendar,
  Clock,
  ArrowRight,
  Search,
  Sparkles,
  Eye,
  Heart,
  Bookmark,
  X,
  TrendingUp,
  Filter,
} from "lucide-react";
import { BLOG_POSTS, BlogPost } from "@/data/blogData";

export default function BlogPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [likedPosts, setLikedPosts] = useState<{ [key: string]: number }>({});

  const categories = ["All", "Development", "UI Design", "Backend", "AI & Tech", "Career"];

  const featuredPost = BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleLike = (post: BlogPost, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const currentLikes = likedPosts[post.id] ?? (post.likes || 0);
    const isLiked = likedPosts[post.id] !== undefined && likedPosts[post.id] > (post.likes || 0);
    setLikedPosts((prev) => ({
      ...prev,
      [post.id]: isLiked ? (post.likes || 0) : currentLikes + 1,
    }));
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-[#F8FAFC] pt-16 sm:pt-24 pb-24 overflow-hidden relative">
      {/* Decorative Blur Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full bg-[#E0E7FF]/50 blur-3xl" />
        <div className="absolute top-1/3 -left-32 w-[550px] h-[550px] rounded-full bg-[#EEF2FF]/60 blur-3xl" />
      </div>

      <div className="w-full max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
        
        {/* ── PAGE HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#5B50E6]/10 text-[#5B50E6] text-xs sm:text-sm font-bold tracking-wide uppercase">
            <Sparkles className="w-4 h-4 text-[#5B50E6]" /> EduNova Insights & Architecture Blog
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
            Explore Articles, Guides & Industry Best Practices
          </h1>
          <p className="text-slate-600 text-sm sm:text-lg lg:text-xl leading-relaxed font-medium max-w-2xl mx-auto">
            Stay ahead with actionable insights written by lead software architects, product designers, and senior engineers.
          </p>
        </motion.div>

        {/* ── FEATURED ARTICLE HERO BANNER ── */}
        {featuredPost && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="mb-12 sm:mb-16"
          >
            <div className="group relative rounded-3xl sm:rounded-[32px] overflow-hidden shadow-2xl border border-slate-800/90 min-h-[440px] sm:min-h-[500px] md:min-h-[540px] flex flex-col justify-end">
              {/* Image Background */}
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-900/30" />

              {/* Header Badges */}
              <div className="absolute top-6 left-6 right-6 flex items-center justify-between pointer-events-none">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-extrabold shadow-lg">
                  <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
                  <span>Featured Story</span>
                </div>
                <span className="hidden sm:inline-flex px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-indigo-200 text-xs sm:text-sm font-black uppercase tracking-wider">
                  {featuredPost.category}
                </span>
              </div>

              {/* Bottom Glass Overlay Content */}
              <div className="relative z-10 p-6 sm:p-10 md:p-12 max-w-4xl space-y-4 sm:space-y-5">
                <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-semibold text-slate-300">
                  <span className="flex items-center gap-1.5 text-slate-200">
                    <Calendar className="w-4 h-4 text-indigo-400" /> {featuredPost.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5 text-slate-200">
                    <Clock className="w-4 h-4 text-indigo-400" /> {featuredPost.readTime}
                  </span>
                  {featuredPost.views && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                        <Eye className="w-4 h-4" /> {featuredPost.views} Views
                      </span>
                    </>
                  )}
                </div>

                <Link href={`/blog/${featuredPost.slug}`}>
                  <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white group-hover:text-indigo-300 transition-colors duration-500 leading-tight tracking-tight">
                    {featuredPost.title}
                  </h2>
                </Link>

                <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed font-normal line-clamp-2 max-w-3xl">
                  {featuredPost.excerpt}
                </p>

                <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-white/20">
                  <div className="flex items-center gap-3">
                    <img
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl object-cover border border-white/30 shadow-md"
                    />
                    <div>
                      <h4 className="text-sm font-extrabold text-white">{featuredPost.author.name}</h4>
                      <p className="text-xs text-slate-300 font-medium">{featuredPost.author.role}</p>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-[#5B50E6] hover:bg-[#4D42DB] text-white font-bold text-xs sm:text-sm transition-all duration-300 shadow-xl shadow-[#5B50E6]/40 hover:scale-105"
                  >
                    Read Full Article <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── FILTER & SEARCH BAR ── */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/80 backdrop-blur-xl p-4 sm:p-5 rounded-3xl border border-slate-200/80 shadow-md"
        >
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mr-1 shrink-0">
              <Filter className="w-3.5 h-3.5 text-[#5B50E6]" /> Topics:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 shrink-0 ${
                  selectedCategory === cat
                    ? "bg-[#5B50E6] text-white shadow-md shadow-[#5B50E6]/30 scale-105"
                    : "bg-slate-100/80 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900 border border-slate-200/60"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by keyword, topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#5B50E6] focus:bg-white focus:ring-2 focus:ring-[#5B50E6]/20 transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </motion.div>

        {/* ── ARTICLES GRID ── */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch mb-20">
            {filteredPosts.map((post, idx) => {
              const isBookmarked = bookmarkedIds.includes(post.id);
              const postLikes = likedPosts[post.id] ?? (post.likes || 0);
              const isLiked = likedPosts[post.id] !== undefined && likedPosts[post.id] > (post.likes || 0);

              // 1. Horizontal Featured Wide Card (Index 0 if not main featured)
              if (idx === 0) {
                return (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.15 }}
                    transition={{ duration: 0.7, delay: idx * 0.1, ease: "easeOut" }}
                    className="md:col-span-2 group bg-white/90 backdrop-blur-md border border-slate-200/90 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:border-[#5B50E6]/40 hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-12 h-full">
                      <div className="sm:col-span-5 relative h-60 sm:h-full min-h-[260px] bg-slate-100 overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <span className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-xs font-bold text-[#5B50E6] shadow-sm border border-white/60">
                          {post.category}
                        </span>
                      </div>

                      <div className="sm:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-5">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 text-xs font-semibold text-slate-400">
                              <span className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5 text-[#5B50E6]" /> {post.date}
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5 text-[#5B50E6]" /> {post.readTime}
                              </span>
                            </div>
                            <button
                              onClick={(e) => toggleBookmark(post.id, e)}
                              className={`p-2 rounded-xl border transition-all ${
                                isBookmarked
                                  ? "bg-indigo-50 border-[#5B50E6] text-[#5B50E6]"
                                  : "bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600"
                              }`}
                            >
                              <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-[#5B50E6]" : ""}`} />
                            </button>
                          </div>

                          <Link href={`/blog/${post.slug}`}>
                            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 group-hover:text-[#5B50E6] transition-colors duration-300 leading-snug">
                              {post.title}
                            </h3>
                          </Link>

                          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal line-clamp-3">
                            {post.excerpt}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <img
                              src={post.author.avatar}
                              alt={post.author.name}
                              className="w-9 h-9 rounded-xl object-cover border border-slate-200 shadow-sm"
                            />
                            <div>
                              <h4 className="text-xs font-extrabold text-slate-900">{post.author.name}</h4>
                              <p className="text-[11px] text-slate-400 font-medium">{post.author.role}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <button
                              onClick={(e) => toggleLike(post, e)}
                              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                                isLiked
                                  ? "bg-rose-50 border-rose-200 text-rose-600"
                                  : "bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-700"
                              }`}
                            >
                              <Heart className={`w-3.5 h-3.5 ${isLiked ? "fill-rose-500 text-rose-500" : ""}`} />
                              <span>{postLikes}</span>
                            </button>

                            <Link
                              href={`/blog/${post.slug}`}
                              className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-slate-900 hover:bg-[#5B50E6] text-white font-bold text-xs transition-all duration-300 gap-1.5 shadow-sm"
                            >
                              Read <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              }

              // 2. Dark Premium Card (Index 3)
              if (idx === 3) {
                return (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.15 }}
                    transition={{ duration: 0.7, delay: idx * 0.1, ease: "easeOut" }}
                    className="group bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 backdrop-blur-md border border-slate-700/60 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-indigo-500/50 hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between text-white p-6 sm:p-7 space-y-6"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold text-indigo-300 border border-white/10">
                          {post.category}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-slate-400">{post.readTime}</span>
                          <button
                            onClick={(e) => toggleBookmark(post.id, e)}
                            className="p-1.5 text-slate-400 hover:text-white"
                          >
                            <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-indigo-400 text-indigo-400" : ""}`} />
                          </button>
                        </div>
                      </div>

                      <Link href={`/blog/${post.slug}`}>
                        <h3 className="text-lg sm:text-xl font-extrabold text-white group-hover:text-indigo-300 transition-colors leading-snug">
                          {post.title}
                        </h3>
                      </Link>

                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-9 h-9 rounded-xl object-cover border border-slate-700 shadow-sm"
                        />
                        <div>
                          <h4 className="text-xs font-extrabold text-slate-200">{post.author.name}</h4>
                          <p className="text-[11px] text-slate-400 font-medium">{post.author.role}</p>
                        </div>
                      </div>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-white/10 hover:bg-indigo-600 text-white font-bold text-xs transition-all duration-300 gap-1.5 border border-white/10 shadow-sm"
                      >
                        Read <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </motion.article>
                );
              }

              // 3. Standard Card
              return (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{ duration: 0.7, delay: idx * 0.1, ease: "easeOut" }}
                  className="group bg-white/90 backdrop-blur-md border border-slate-200/90 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:border-[#5B50E6]/40 hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between"
                >
                  <div>
                    {/* Image Container */}
                    <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs font-bold text-[#5B50E6] shadow-sm border border-white/50">
                        {post.category}
                      </span>
                      <button
                        onClick={(e) => toggleBookmark(post.id, e)}
                        className={`absolute top-3.5 right-3.5 p-2 rounded-full backdrop-blur-md transition-all shadow-md ${
                          isBookmarked
                            ? "bg-[#5B50E6] text-white"
                            : "bg-white/80 text-slate-700 hover:bg-white"
                        }`}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? "fill-white" : ""}`} />
                      </button>
                    </div>

                    {/* Body Content */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-3 text-xs font-semibold text-slate-400">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#5B50E6]" /> {post.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#5B50E6]" /> {post.readTime}
                        </span>
                      </div>

                      <Link href={`/blog/${post.slug}`}>
                        <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 group-hover:text-[#5B50E6] transition-colors duration-300 line-clamp-2 leading-snug">
                          {post.title}
                        </h3>
                      </Link>

                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="p-6 pt-0">
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-9 h-9 rounded-xl object-cover border border-slate-200 shadow-sm"
                        />
                        <div>
                          <h4 className="text-xs font-extrabold text-slate-900">{post.author.name}</h4>
                          <p className="text-[11px] text-slate-400 font-medium">{post.author.role}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => toggleLike(post, e)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                            isLiked
                              ? "bg-rose-50 border-rose-200 text-rose-600"
                              : "bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-700"
                          }`}
                        >
                          <Heart className={`w-3.5 h-3.5 ${isLiked ? "fill-rose-500 text-rose-500" : ""}`} />
                          <span>{postLikes}</span>
                        </button>

                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center justify-center px-3 py-1.5 rounded-xl bg-slate-100 group-hover:bg-[#5B50E6] text-slate-700 group-hover:text-white font-bold text-xs transition-all duration-300 gap-1 shadow-xs"
                        >
                          Read <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 space-y-3 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">No articles found matching your query</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">Try resetting filters or searching with different keywords.</p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-2 px-6 py-2.5 rounded-xl bg-[#5B50E6] text-white font-bold text-xs shadow-md"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* ── NEWSLETTER SUBSCRIPTION CARD ── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl text-white flex flex-col lg:flex-row items-center justify-between gap-8"
        >
          <div className="space-y-3 max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-indigo-300 text-xs font-bold border border-white/10">
              <TrendingUp className="w-3.5 h-3.5 text-amber-400" /> Weekly Architecture Digest
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Get Tech Insights Delivered Directly To Your Inbox
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
              Join 25,000+ developers receiving our curated weekly breakdown of Next.js, AI system design, and software engineering architecture.
            </p>
          </div>

          <div className="w-full lg:w-auto shrink-0 space-y-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you for subscribing to EduNova Tech Weekly!");
              }}
              className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
            >
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                className="px-5 py-3.5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-indigo-400 focus:bg-white/15 transition-all w-full sm:w-72"
              />
              <button
                type="submit"
                className="px-7 py-3.5 rounded-2xl bg-[#5B50E6] hover:bg-[#4D42DB] text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-[#5B50E6]/30 hover:scale-105 shrink-0"
              >
                Subscribe Free
              </button>
            </form>
            <p className="text-[11px] text-slate-400 text-center lg:text-left font-medium">
              No spam ever. Unsubscribe anytime with 1-click.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
