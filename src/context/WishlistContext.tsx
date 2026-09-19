"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

export interface WishlistCourse {
  id: string;
  title: string;
  image?: string;
  price?: number;
  rating?: number | string;
  reviews?: string;
  category?: string;
  potential?: string;
}

interface WishlistContextType {
  wishlist: WishlistCourse[];
  wishlistCount: number;
  isInWishlist: (id: string) => boolean;
  toggleWishlist: (course: WishlistCourse) => void;
  removeFromWishlist: (id: string) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const WISHLIST_STORAGE_KEY = "edunova_wishlist_items";

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<WishlistCourse[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (stored) {
        setWishlist(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load wishlist from localStorage", e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Sync to localStorage on state changes
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
      } catch (e) {
        console.error("Failed to save wishlist to localStorage", e);
      }
    }
  }, [wishlist, isInitialized]);

  const isInWishlist = (id: string) => {
    return wishlist.some((item) => String(item.id) === String(id));
  };

  const toggleWishlist = (course: WishlistCourse) => {
    const courseId = String(course.id);
    const exists = isInWishlist(courseId);

    if (exists) {
      setWishlist((prev) => prev.filter((item) => String(item.id) !== courseId));
      toast.info("Removed from Wishlist", {
        description: `"${course.title}" removed from your saved courses.`,
        duration: 3500,
      });
    } else {
      setWishlist((prev) => [...prev, course]);
      toast.success("Added to Wishlist ❤️", {
        description: `"${course.title}" has been saved to your wishlist.`,
        duration: 3500,
      });
    }
  };

  const removeFromWishlist = (id: string) => {
    const courseId = String(id);
    const target = wishlist.find((item) => String(item.id) === courseId);
    setWishlist((prev) => prev.filter((item) => String(item.id) !== courseId));
    if (target) {
      toast.info("Removed from Wishlist", {
        description: `"${target.title}" removed from your saved courses.`,
      });
    }
  };

  const clearWishlist = () => {
    setWishlist([]);
    toast.info("Wishlist cleared");
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
