"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Terminal, Database, Cloud, Code, Smartphone, Bot, ArrowRight } from "lucide-react";

function GithubIcon(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path></svg>;
}
import { Navbar } from "@/components/navbar";
import { JourneyMap } from "@/components/journey-map";
import { SkillsGalaxy } from "@/components/skills-galaxy";
import { ProjectCenter } from "@/components/project-center";
import { InternshipDashboard } from "@/components/internship-dashboard";
import { GithubDashboard } from "@/components/github-dashboard";
import { CertificationVault } from "@/components/certification-vault";
import { ActivityFeed } from "@/components/activity-feed";
import { ContactSection } from "@/components/contact-section";
import { MouseGlow } from "@/components/mouse-glow";
import { Typewriter } from "@/components/typewriter";
import { CustomCursor } from "@/components/custom-cursor";
import { Hero3D } from "@/components/hero-3d";
import { MagneticButton } from "@/components/magnetic-button";
import { PortfolioData } from "@/lib/data";

// Scroll reveal wrapper component
function RevealSection({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}

function StatCard({ label, value, delay = 0 }: { label: string; value: number; delay?: number }) {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    const totalDuration = 1500;
    const incrementTime = (totalDuration / end) * 5;

    const timer = setInterval(() => {
      start += Math.ceil(end / 20);
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      className="sci-fi-card p-6 flex flex-col items-center justify-center group hover:-translate-y-2 transition-all relative overflow-hidden"
    >
      <div className="relative w-24 h-24 sm:w-32 sm:h-32 mb-4 flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle cx="50%" cy="50%" r="45%" className="fill-none stroke-[color:var(--border)] stroke-[4px]" />
          <motion.circle 
            cx="50%" cy="50%" r="45%" 
            className="fill-none stroke-[color:var(--accent)] stroke-[4px] drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]"
            strokeDasharray="283"
            strokeDashoffset="283"
            initial={{ strokeDashoffset: 283 }}
            whileInView={{ strokeDashoffset: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: delay + 0.5, ease: "easeInOut" }}
          />
        </svg>
        <span className="text-2xl sm:text-3xl font-mono font-bold tracking-tighter text-white glitch-hover">
          {count}
        </span>
      </div>
      <span className="text-xs sm:text-sm font-mono tracking-widest uppercase text-[color:var(--muted-foreground)] group-hover:text-[color:var(--magenta)] transition-colors text-center">
        {label}
      </span>
    </motion.div>
  );
}

export default function HomeClient({ initialData }: { initialData: PortfolioData }) {
  return (
    <main className="min-h-screen bg-[color:var(--background)] text-[color:var(--foreground)] selection:bg-[color:var(--accent)] selection:text-black overflow-x-hidden">
      <CustomCursor />
      <MouseGlow />
      <Navbar />

      <div className="relative pt-16">
        
        {/* Massive Centerpiece Hero */}
        <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-20 px-4 sm:px-8">
          {/* Clean Subtle Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex items-center justify-center">
            <Hero3D />
          </div>

          <div className="z-10 flex flex-col items-start text-left max-w-4xl w-full">
            <div className="flex items-center gap-6 mb-8">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 overflow-hidden border-2 border-[color:var(--accent)] bg-[color:var(--background)] shadow-[0_0_15px_rgba(0,240,255,0.4)]" style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)" }}>
                <Image 
                  src={initialData.profile.avatarUrl}
                  alt={initialData.profile.name}
                  fill
                  className="object-cover p-1 filter contrast-125 saturate-150" 
                />
              </div>
              <div>
                <motion.h1 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl sm:text-5xl font-black tracking-widest text-[color:var(--foreground)] uppercase glitch-hover"
                >
                  {initialData.profile.name}
                </motion.h1>
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex items-center gap-4 text-[color:var(--accent)] mt-3 font-mono text-sm tracking-widest uppercase"
                >
                  <div className="flex items-center gap-2">
                    <span>{initialData.profile.tagline}</span>
                  </div>
                </motion.div>
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-[color:var(--muted-foreground)] leading-relaxed max-w-2xl mb-8 border-l-2 border-[color:var(--accent)] pl-4 font-mono text-sm"
            >
              {initialData.profile.terminalText.map((line, i) => (
                <React.Fragment key={i}>
                  {line}<br/>
                </React.Fragment>
              ))}
            </motion.p>

            <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in-up mb-12" style={{ animationDelay: '0.8s' }}>
                <MagneticButton>
                  <a href="#projects" className="group relative px-8 py-4 bg-[color:var(--foreground)] text-[color:var(--background)] font-bold text-sm uppercase tracking-widest overflow-hidden">
                    <span className="relative z-10 flex items-center gap-2">
                      View Projects <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 h-full w-0 bg-[color:var(--accent)] transition-all duration-300 ease-out group-hover:w-full z-0"></div>
                  </a>
                </MagneticButton>
                
                <MagneticButton>
                  <a href="https://github.com/Ashu-Meena" target="_blank" rel="noopener noreferrer" className="group px-8 py-4 border border-[color:var(--border)] bg-[color:var(--background)]/50 backdrop-blur-sm font-bold text-sm uppercase tracking-widest flex items-center gap-2 hover:border-[color:var(--accent)] transition-colors">
                    <GithubIcon className="w-4 h-4 text-[color:var(--muted-foreground)] group-hover:text-[color:var(--accent)] transition-colors" />
                    GitHub Profile
                  </a>
                </MagneticButton>
              </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
            >
              <StatCard label="Projects" value={initialData.stats.projects} delay={0.4} />
              <StatCard label="Internships" value={initialData.stats.internships} delay={0.5} />
              <StatCard label="Certs" value={initialData.stats.certifications} delay={0.6} />
              <StatCard label="Commits" value={initialData.stats.commits} delay={0.7} />
            </motion.div>
          </div>
          
          {/* Scroll down indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[color:var(--muted-foreground)]"
          >
            <span className="text-xs tracking-[0.3em] uppercase font-bold">Scroll</span>
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-0.5 h-12 bg-gradient-to-b from-[color:var(--accent)] to-transparent rounded-full"
            />
          </motion.div>
        </section>

        {/* Scrolling Content Sections with tighter padding for structure */}
        <div className="w-full max-w-6xl mx-auto space-y-16 pb-32 px-4 sm:px-8 mt-12 relative z-10">
          <RevealSection delay={0.1}>
            <JourneyMap journey={initialData.journey} />
          </RevealSection>
          
          <RevealSection delay={0.1}>
            <SkillsGalaxy skills={initialData.skills} />
          </RevealSection>
          
          <RevealSection delay={0.1}>
            <ProjectCenter projects={initialData.projects} />
          </RevealSection>
          
          <RevealSection delay={0.1}>
            <InternshipDashboard experiences={initialData.experiences} />
          </RevealSection>
          
          <RevealSection delay={0.1}>
            <GithubDashboard />
          </RevealSection>
          
          <RevealSection delay={0.1}>
            <CertificationVault certs={initialData.certs} />
          </RevealSection>
          
          <RevealSection delay={0.1}>
            <ActivityFeed />
          </RevealSection>
          
          <RevealSection delay={0.1}>
            <ContactSection />
          </RevealSection>
        </div>
      </div>
    </main>
  );
}
