"use client";

import React from "react";
import ReduxProvider from "./redux/ReduxProvider";
import QueryProvider from "./query/QueryProvider";
import { ThemeProvider } from "./theme/ThemeProvider";
import ToastProvider from "./ToastProvider";
import { WishlistProvider } from "@/context/WishlistContext";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <QueryProvider>
        <ThemeProvider defaultTheme="system" storageKey="course-platform-theme">
          <WishlistProvider>
            <ToastProvider />
            {children}
          </WishlistProvider>
        </ThemeProvider>
      </QueryProvider>
    </ReduxProvider>
  );
}

export * from "./theme/ThemeProvider";
