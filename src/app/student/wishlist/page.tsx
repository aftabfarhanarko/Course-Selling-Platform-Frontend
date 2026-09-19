"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Heart,
  Trash2,
  BookOpen,
  ArrowRight,
  Star,
  Clock,
  Users,
  Sparkles,
  ShoppingBag,
} from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";

export default function StudentWishlistPage() {
  const { wishlist, wishlistCount, removeFromWishlist, clearWishlist } = useWishlist();

  return (
    <div className="min-h-screen bg-slate-50/60 pt-28 pb-20">
      <div className="w-full max-w-[96%] lg:max-w-10/12 mx-auto px-4 sm:px-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-8 border-b border-slate-200/80">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-extrabold uppercase tracking-wider mb-2">
              <Heart className="w-3.5 h-3.5 fill-rose-500" /> Saved Collection
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              My Saved Courses
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm font-medium mt-1">
              Manage all the courses you have bookmarked for future learning.
            </p>
          </div>

          {wishlistCount > 0 && (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={clearWishlist}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-rose-600 hover:border-rose-200 text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" /> Clear All
              </button>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#5B50E6] hover:bg-[#4D42DB] text-white text-xs sm:text-sm font-bold transition-all shadow-md shadow-[#5B50E6]/20 active:scale-95"
              >
                <Sparkles className="w-4 h-4" /> Explore More
              </Link>
            </div>
          )}
        </div>

        {/* Empty State */}
        {wishlistCount === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl border border-slate-200/80 p-10 sm:p-16 text-center max-w-lg mx-auto shadow-sm my-12"
          >
            <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6 text-rose-500 shadow-inner">
              <Heart className="w-10 h-10 stroke-[1.8]" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">
              Your Wishlist is Empty
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm font-medium leading-relaxed mb-6">
              You haven't bookmarked any courses yet. Browse our top-rated engineering programs and click the heart icon to save them here!
            </p>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#5B50E6] hover:bg-[#4D42DB] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#5B50E6]/30 transition-all hover:scale-105 active:scale-95"
            >
              Browse Courses <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        ) : (
          /* Wishlist Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative h-44 bg-slate-100 overflow-hidden">
                    <img
                      src={
                        item.image ||
                        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=700&q=85"
                      }
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3">
                      <button
                        type="button"
                        onClick={() => removeFromWishlist(item.id)}
                        className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md text-rose-500 hover:bg-rose-500 hover:text-white flex items-center justify-center transition-all shadow-md active:scale-90 cursor-pointer"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {item.potential && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-300 text-[10px] font-extrabold border border-white/20">
                        {item.potential}
                      </span>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    {item.category && (
                      <span className="text-[10px] font-extrabold uppercase text-[#5B50E6] tracking-wider block mb-1">
                        {item.category}
                      </span>
                    )}

                    <h3 className="text-sm font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-[#5B50E6] transition-colors mb-3">
                      {item.title}
                    </h3>

                    <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                      <span className="flex items-center gap-1 font-bold text-slate-900">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        {item.rating || "4.9"}
                      </span>
                      <span>•</span>
                      <span>{item.reviews || "1.2k"} reviews</span>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                  <span className="text-base font-extrabold text-slate-900">
                    {typeof item.price === "number" ? `$${item.price}` : item.price || "$99"}
                  </span>
                  <Link
                    href={`/courses/${item.id}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#5B50E6] hover:bg-[#4D42DB] text-white text-xs font-bold transition-all shadow-md shadow-[#5B50E6]/20 active:scale-95"
                  >
                    View Details <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
