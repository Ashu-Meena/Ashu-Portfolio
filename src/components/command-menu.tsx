"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { Search, Monitor, PenTool, LayoutDashboard, Terminal, MessageSquare, Briefcase, FileCode2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { setTheme } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  if (!open) return null;

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/50 backdrop-blur-sm">
      <div className="fixed inset-0" onClick={() => setOpen(false)} />
      
      <Command 
        className="relative w-full max-w-2xl bg-[color:var(--background)] border border-[color:var(--border)] rounded-xl shadow-2xl overflow-hidden font-mono"
        shouldFilter={true}
        loop
      >
        <div className="flex items-center border-b border-[color:var(--border)] px-4">
          <Search className="w-5 h-5 text-[color:var(--muted-foreground)]" />
          <Command.Input 
            autoFocus
            placeholder="Type a command or search..." 
            className="flex-1 px-4 py-4 bg-transparent outline-none text-[color:var(--foreground)] placeholder-[color:var(--muted-foreground)]"
          />
          <kbd className="hidden sm:inline-flex px-2 py-1 bg-[color:var(--secondary)] text-[color:var(--muted-foreground)] text-xs rounded border border-[color:var(--border)]">ESC</kbd>
        </div>

        <Command.List className="max-h-[300px] overflow-y-auto p-2 sci-fi-scroll">
          <Command.Empty className="py-6 text-center text-sm text-[color:var(--muted-foreground)]">
            No results found.
          </Command.Empty>

          <Command.Group heading="Navigation" className="text-xs text-[color:var(--muted-foreground)] p-2 uppercase tracking-widest font-bold">
            <Command.Item 
              onSelect={() => runCommand(() => router.push("/"))}
              className="flex items-center gap-2 px-4 py-3 cursor-pointer text-sm text-[color:var(--foreground)] hover:bg-[color:var(--secondary)] hover:text-[color:var(--accent)] rounded-md aria-selected:bg-[color:var(--secondary)] aria-selected:text-[color:var(--accent)] transition-colors"
            >
              <Monitor className="w-4 h-4" /> Home Dashboard
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(() => router.push("/admin"))}
              className="flex items-center gap-2 px-4 py-3 cursor-pointer text-sm text-[color:var(--foreground)] hover:bg-[color:var(--secondary)] hover:text-[color:var(--magenta)] rounded-md aria-selected:bg-[color:var(--secondary)] aria-selected:text-[color:var(--magenta)] transition-colors"
            >
              <LayoutDashboard className="w-4 h-4" /> System Admin Panel
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(() => document.getElementById("projects")?.scrollIntoView({ behavior: 'smooth' }))}
              className="flex items-center gap-2 px-4 py-3 cursor-pointer text-sm text-[color:var(--foreground)] hover:bg-[color:var(--secondary)] hover:text-[color:var(--accent)] rounded-md aria-selected:bg-[color:var(--secondary)] aria-selected:text-[color:var(--accent)] transition-colors"
            >
              <FileCode2 className="w-4 h-4" /> View Projects
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(() => document.getElementById("experience")?.scrollIntoView({ behavior: 'smooth' }))}
              className="flex items-center gap-2 px-4 py-3 cursor-pointer text-sm text-[color:var(--foreground)] hover:bg-[color:var(--secondary)] hover:text-[color:var(--accent)] rounded-md aria-selected:bg-[color:var(--secondary)] aria-selected:text-[color:var(--accent)] transition-colors"
            >
              <Briefcase className="w-4 h-4" /> Experience & Journey
            </Command.Item>
          </Command.Group>

          <Command.Group heading="Features" className="text-xs text-[color:var(--muted-foreground)] p-2 uppercase tracking-widest font-bold mt-2">
            <Command.Item 
              onSelect={() => runCommand(() => router.push("/guestbook"))}
              className="flex items-center gap-2 px-4 py-3 cursor-pointer text-sm text-[color:var(--foreground)] hover:bg-[color:var(--secondary)] hover:text-[color:var(--accent)] rounded-md aria-selected:bg-[color:var(--secondary)] aria-selected:text-[color:var(--accent)] transition-colors"
            >
              <MessageSquare className="w-4 h-4" /> Public Guestbook
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(() => router.push("/blog"))}
              className="flex items-center gap-2 px-4 py-3 cursor-pointer text-sm text-[color:var(--foreground)] hover:bg-[color:var(--secondary)] hover:text-[color:var(--accent)] rounded-md aria-selected:bg-[color:var(--secondary)] aria-selected:text-[color:var(--accent)] transition-colors"
            >
              <PenTool className="w-4 h-4" /> Developer Blog
            </Command.Item>
          </Command.Group>

          <Command.Group heading="Theme Override" className="text-xs text-[color:var(--muted-foreground)] p-2 uppercase tracking-widest font-bold mt-2">
            <Command.Item 
              onSelect={() => runCommand(() => setTheme("light"))}
              className="flex items-center gap-2 px-4 py-3 cursor-pointer text-sm text-[color:var(--foreground)] hover:bg-[color:var(--secondary)] rounded-md aria-selected:bg-[color:var(--secondary)] transition-colors"
            >
              Force Light Mode
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(() => setTheme("dark"))}
              className="flex items-center gap-2 px-4 py-3 cursor-pointer text-sm text-[color:var(--foreground)] hover:bg-[color:var(--secondary)] rounded-md aria-selected:bg-[color:var(--secondary)] transition-colors"
            >
              Force Dark Mode
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  );
}
