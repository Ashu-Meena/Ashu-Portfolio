"use client";

import * as React from "react";
import { Moon, Sun, Briefcase, Code2, MessageSquare, PenTool } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { MagneticButton } from "./magnetic-button";

export function Navbar() {
  const { setTheme, theme } = useTheme();
  const [isRecruiterMode, setIsRecruiterMode] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleRecruiterMode = () => {
    setIsRecruiterMode(!isRecruiterMode);
    document.body.classList.toggle('recruiter-mode');
  };

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
      <nav className="pointer-events-auto glass-card px-2 py-2 sm:px-4 sm:py-3 rounded-full flex items-center gap-4 sm:gap-6 shadow-lg border border-[color:var(--border)] bg-[color:var(--background)]/70 backdrop-blur-2xl">
        <div className="flex items-center gap-3 font-bold tracking-tight">
          <div className="w-8 h-8 rounded-full bg-[color:var(--foreground)] flex items-center justify-center text-[color:var(--background)] shadow-sm">
            AM
          </div>
          <span className="hidden sm:inline-block text-sm font-extrabold">
            Ashu Meena
          </span>
        </div>

        <div className="h-4 w-px bg-[color:var(--border)]" />

        <div className="flex items-center gap-2">
          <MagneticButton>
            <Link 
              href="/guestbook"
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 bg-[color:var(--secondary)] text-[color:var(--accent)] hover:bg-[color:var(--accent)] hover:text-black border border-[color:var(--accent)]/50"
            >
              <MessageSquare className="w-3.5 h-3.5" /> Guestbook
            </Link>
          </MagneticButton>
          
          <MagneticButton>
            <Link 
              href="/blog"
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 bg-transparent hover:bg-[color:var(--secondary)] text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)] border border-transparent"
            >
              <PenTool className="w-3.5 h-3.5" /> Blog
            </Link>
          </MagneticButton>

          <div className="h-4 w-px bg-[color:var(--border)] mx-1 hidden md:block" />

          <MagneticButton>
            <button
              onClick={toggleRecruiterMode}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-bold transition-all duration-300",
                isRecruiterMode 
                  ? "bg-[color:var(--foreground)] text-[color:var(--background)] shadow-sm"
                  : "bg-transparent hover:bg-[color:var(--secondary)] text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)]"
              )}
            >
              {isRecruiterMode ? <Briefcase className="w-3.5 h-3.5" /> : <Code2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline-block">
                {isRecruiterMode ? "Recruiter" : "Developer"}
              </span>
            </button>
          </MagneticButton>

          <MagneticButton>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-[color:var(--secondary)] text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)] transition-colors"
            >
              {mounted && theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
          </MagneticButton>
        </div>
      </nav>
    </div>
  );
}
