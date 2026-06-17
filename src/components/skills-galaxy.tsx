"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code2, Database, Layout, Smartphone, Cloud, Terminal } from "lucide-react";

import { PortfolioData } from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
  Smartphone: <Smartphone className="w-5 h-5" />,
  Layout: <Layout className="w-5 h-5" />,
  Cloud: <Cloud className="w-5 h-5" />,
  Code2: <Code2 className="w-5 h-5" />,
  Database: <Database className="w-5 h-5" />,
  Terminal: <Terminal className="w-5 h-5" />
};

export function SkillsGalaxy({ skills }: { skills: PortfolioData["skills"] }) {
  return (
    <section className="w-full py-4 relative">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8 border-b border-[color:var(--border)] pb-4">
          <h2 className="text-2xl font-bold text-[color:var(--foreground)]">Technical Expertise</h2>
          <p className="text-[color:var(--muted-foreground)] text-sm mt-1">Categorized breakdown of my core stack and proficiencies.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="sci-fi-card p-6 flex flex-col group hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-4 text-[color:var(--foreground)] font-mono font-bold tracking-widest uppercase border-b border-[color:var(--border)] pb-3 group-hover:text-[color:var(--accent)] transition-colors text-sm">
                <span className="text-[color:var(--accent)]">
                  {iconMap[category.icon] || <Terminal className="w-5 h-5" />}
                </span>
                {category.title}
              </div>
              <ul className="flex flex-wrap gap-2">
                {category.skills.map(skill => (
                  <li 
                    key={skill}
                    className="text-xs px-3 py-1.5 bg-[color:var(--card)] text-[color:var(--secondary-foreground)] border border-[color:var(--border)] font-mono tracking-wider hover:border-[color:var(--accent)] hover:shadow-[0_0_10px_rgba(0,240,255,0.3)] transition-all cursor-default"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
