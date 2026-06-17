"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import { PortfolioData } from "@/lib/data";

function GithubIcon(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path></svg>;
}

function TiltCard({ item, onClick, children }: { item: any, onClick: () => void, children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(springY, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-10deg", "10deg"]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      layoutId={`card-container-${item.id}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
      }}
      className="sci-fi-card cursor-pointer overflow-hidden group relative h-[300px]"
    >
      <div style={{ transform: "translateZ(30px)" }} className="absolute inset-0 z-10 pointer-events-none">
        {/* Adds 3D depth to content */}
      </div>
      {children}
    </motion.div>
  );
}

const CATEGORIES = ["All", "Mobile App", "Web Development", "AI / Legal Tech", "Full Stack"];

export function ProjectCenter({ projects }: { projects: PortfolioData["projects"] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = projects.filter(p => activeFilter === "All" || p.category === activeFilter);

  return (
    <section className="w-full py-4 relative">
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-3xl font-bold text-center mb-6 text-[color:var(--foreground)]">Project Experience Center</h2>
        
        {/* Dynamic Interactive Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`relative px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                activeFilter === cat ? "text-[color:var(--background)]" : "text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)] bg-[color:var(--secondary)]"
              }`}
            >
              {activeFilter === cat && (
                <motion.div 
                  layoutId="active-filter-pill"
                  className="absolute inset-0 bg-[color:var(--foreground)] rounded-full z-0"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8" style={{ perspective: "1000px" }}>
        <AnimatePresence mode="popLayout">
          {filteredProjects.map(item => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, type: "spring" }}
            >
              <TiltCard item={item} onClick={() => setSelectedId(item.id)}>
                <motion.img 
                  layoutId={`image-${item.id}`} 
                  src={item.image} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <motion.div className="absolute bottom-0 left-0 p-6 w-full" layoutId={`content-${item.id}`}>
                  <motion.span className="text-[color:var(--accent)] font-bold text-sm mb-2 block tracking-wider uppercase" layoutId={`category-${item.id}`}>{item.category}</motion.span>
                  <motion.h3 className="text-white text-3xl font-bold" layoutId={`title-${item.id}`}>{item.title}</motion.h3>
                </motion.div>
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selectedId && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-[color:var(--background)]/80 backdrop-blur-xl" 
              onClick={() => setSelectedId(null)} 
            />
            
            <motion.div 
              layoutId={`card-container-${selectedId}`}
              className="bg-[color:var(--background)] w-full max-w-4xl h-[90vh] sm:h-auto sm:max-h-[90vh] rounded-2xl overflow-y-auto relative z-10 shadow-2xl border border-[color:var(--border)]"
            >
              <button 
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {projects.filter(p => p.id === selectedId).map(project => (
                <div key={project.id} className="flex flex-col">
                  <div className="relative h-64 sm:h-96 w-full">
                    <motion.img layoutId={`image-${project.id}`} src={project.image} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--background)] to-transparent" />
                  </div>
                  
                  <div className="p-8 -mt-20 relative z-10">
                    <motion.span layoutId={`category-${project.id}`} className="text-[color:var(--accent)] font-bold tracking-wider uppercase mb-2 block">{project.category}</motion.span>
                    <motion.h2 layoutId={`title-${project.id}`} className="text-4xl font-extrabold mb-6 text-[color:var(--foreground)]">{project.title}</motion.h2>
                    
                    <div className="prose dark:prose-invert max-w-none">
                      <p className="text-lg text-[color:var(--muted-foreground)] leading-relaxed mb-8 font-medium">
                        {project.description}
                      </p>
                      
                      <div className="grid sm:grid-cols-2 gap-8 mb-8">
                        <div className="glass-card p-6 border-none bg-[color:var(--secondary)]/50">
                          <h4 className="font-bold text-lg mb-4 text-[color:var(--foreground)]">Tech Stack</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.techStack.map(tech => (
                              <span key={tech} className="px-3 py-1.5 bg-[color:var(--background)] text-[color:var(--foreground)] rounded-xl text-sm font-semibold border border-[color:var(--border)] shadow-sm">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="glass-card p-6 border-none bg-[color:var(--secondary)]/50">
                          <h4 className="font-bold text-lg mb-4 text-[color:var(--foreground)]">Impact & Results</h4>
                          <p className="text-[color:var(--muted-foreground)] font-medium leading-relaxed">{project.results}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 pt-4 border-t border-[color:var(--border)]">
                        <a href={project.github} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[color:var(--foreground)] text-[color:var(--background)] font-bold hover:scale-105 transition-transform shadow-lg">
                          <GithubIcon className="w-5 h-5" /> View Source
                        </a>
                        <a href={project.link} className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-[color:var(--border)] hover:border-[color:var(--primary)] hover:text-[color:var(--primary)] transition-all font-bold bg-[color:var(--background)]">
                          <ExternalLink className="w-5 h-5" /> Live Demo
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
