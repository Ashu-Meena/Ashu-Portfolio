import { Mail, Code2 } from "lucide-react";
import Link from "next/link";

function GithubIcon(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path></svg>;
}

function LinkedinIcon(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;
}

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
            <GithubIcon className="w-5 h-5" />
          </a>
          <a href="https://linkedin.com/in/ashumeena" target="_blank" rel="noopener noreferrer" className="hover:text-[color:var(--accent)] transition-colors">
            <LinkedinIcon className="w-5 h-5" />
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
