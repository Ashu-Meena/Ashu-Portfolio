"use client";

import React from "react";
import { Building2, Calendar, MapPin, Award } from "lucide-react";

import { PortfolioData } from "@/lib/data";

export function InternshipDashboard({ experiences }: { experiences: PortfolioData["experiences"] }) {
  return (
    <section className="w-full py-4 max-w-4xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Experience Dashboard</h2>

      <div className="flex flex-col gap-8 relative">
        <div className="absolute left-8 sm:left-12 top-10 bottom-10 w-0.5 bg-[color:var(--border)]" />
        
        {experiences.map(exp => (
          <ExperienceCard 
            key={exp.id}
            company={exp.company}
            role={exp.role}
            date={exp.date}
            location={exp.location}
            bullets={exp.bullets}
            skills={exp.skills}
          />
        ))}
      </div>
    </section>
  );
}

function ExperienceCard({ company, role, date, location, bullets, skills }: any) {
  return (
    <div className="glass-card p-6 sm:p-8 flex flex-col sm:flex-row gap-6 relative overflow-hidden group ml-6 sm:ml-0">
      {/* Accent strip */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[color:var(--primary)] to-[color:var(--accent)] opacity-50 group-hover:opacity-100 transition-opacity" />
      
      <div className="w-16 h-16 rounded-xl bg-[color:var(--background)] flex items-center justify-center shrink-0 border border-[color:var(--border)] shadow-md z-10 group-hover:scale-110 transition-transform">
        <Building2 className="w-8 h-8 text-[color:var(--primary)]" />
      </div>
      
      <div className="flex-1">
        <h3 className="text-2xl font-bold text-[color:var(--foreground)] tracking-tight">{role}</h3>
        <h4 className="text-lg font-semibold text-[color:var(--primary)] mt-1">{company}</h4>
        
        <div className="flex flex-wrap gap-4 mt-3 text-sm text-[color:var(--muted-foreground)] font-medium">
          <span className="flex items-center gap-1.5 bg-[color:var(--secondary)] px-2 py-1 rounded-md"><Calendar className="w-4 h-4" /> {date}</span>
          <span className="flex items-center gap-1.5 bg-[color:var(--secondary)] px-2 py-1 rounded-md"><MapPin className="w-4 h-4" /> {location}</span>
        </div>

        <ul className="mt-6 space-y-3">
          {bullets.map((bullet: string, i: number) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-[color:var(--accent)] mt-2 w-1.5 h-1.5 rounded-full bg-[color:var(--accent)] shrink-0 shadow-[0_0_8px_rgba(230,126,34,0.8)]" />
              <span className="text-[color:var(--muted-foreground)] leading-relaxed font-medium">{bullet}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-2 pt-6 border-t border-[color:var(--border)]/50">
          {skills.map((skill: string) => (
            <span key={skill} className="flex items-center gap-1.5 px-3 py-1.5 bg-[color:var(--background)] border border-[color:var(--border)] rounded-lg text-xs font-bold text-[color:var(--foreground)] shadow-sm hover:border-[color:var(--accent)] transition-colors cursor-default">
              <Award className="w-3.5 h-3.5 text-[color:var(--accent)]" />
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
