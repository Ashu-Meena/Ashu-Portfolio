"use client";

import React, { createContext, useContext, useEffect } from "react";
import { PortfolioData } from "@/lib/data";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children, ...props }: any) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

type ThemeContextType = PortfolioData["theme"] | null;

const ThemeContext = createContext<ThemeContextType>(null);

export function useThemeContext() {
  return useContext(ThemeContext);
}

export function GlobalThemeProvider({ theme, children }: { theme: PortfolioData["theme"], children: React.ReactNode }) {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      Object.entries(theme).forEach(([key, value]) => {
        if (key !== "name") {
          root.style.setProperty(`--${key}`, value as string);
        }
      });
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}
