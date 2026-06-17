import { Github, Linkedin, Mail, Code2 } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[color:var(--border)] bg-black/50 backdrop-blur-md mt-20 relative overflow-hidden text-sm font-mono text-[color:var(--muted-foreground)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* System Status & Built With */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#00ff00] animate-pulse shadow-[0_0_8px_#00ff00]"></div>
            <span className="uppercase tracking-widest text-xs font-bold text-white">System Online</span>
          </div>
          <p className="flex items-center gap-2 text-xs uppercase tracking-widest">
            <Code2 className="w-4 h-4 text-[color:var(--accent)]" /> 
            Engineered with <span className="text-white">Next.js</span> & <span className="text-white">Supabase</span>
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-6">
          <a href="https://github.com/Ashu-Meena" target="_blank" rel="noopener noreferrer" className="hover:text-[color:var(--accent)] transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <a href="https://linkedin.com/in/ashumeena" target="_blank" rel="noopener noreferrer" className="hover:text-[color:var(--accent)] transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="mailto:ashumeena2420@gmail.com" className="hover:text-[color:var(--accent)] transition-colors">
            <Mail className="w-5 h-5" />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center md:text-right uppercase tracking-widest text-xs">
          <p>&copy; {new Date().getFullYear()} Ashu Meena.</p>
          <p className="mt-1 opacity-50">All systems nominal.</p>
        </div>

      </div>

      {/* Decorative Line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[color:var(--accent)] to-transparent opacity-20"></div>
    </footer>
  );
}
