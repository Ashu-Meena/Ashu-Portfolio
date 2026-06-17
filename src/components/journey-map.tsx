"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import { PortfolioData } from "@/lib/data";

export function JourneyMap({ journey }: { journey: PortfolioData["journey"] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  React.useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".journey-node", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "back.out(1.7)",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full py-4 relative" ref={containerRef}>
      <h2 className="text-3xl font-bold text-center mb-8">Professional Journey</h2>
      
      <div className="relative max-w-4xl mx-auto pl-8 sm:pl-0">
        {/* Vertical Line */}
        <div className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[color:var(--primary)] via-[color:var(--accent)] to-[color:var(--accent)] -translate-x-1/2 rounded-full opacity-50" />
        
        {journey.map((step, index) => (
          <div 
            key={step.id} 
            className={cn(
              "journey-node relative flex items-center mb-8",
              index % 2 === 0 ? "sm:flex-row-reverse" : "sm:flex-row",
              "flex-row"
            )}
          >
            {/* Dot */}
            <div className="absolute left-8 sm:left-1/2 w-5 h-5 rounded-full bg-[color:var(--background)] border-4 border-[color:var(--accent)] -translate-x-1/2 z-10 shadow-[0_0_10px_rgba(230,126,34,0.5)]" />
            
            <div className="w-full sm:w-1/2 pl-12 sm:pl-0 sm:px-12">
              <div 
                onClick={() => setExpandedId(expandedId === step.id ? null : step.id)}
                className={cn(
                  "glass-card p-6 cursor-pointer transition-all duration-300 hover:shadow-[0_0_20px_rgba(230,126,34,0.2)]",
                  expandedId === step.id ? "ring-2 ring-[color:var(--primary)]" : ""
                )}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-[color:var(--foreground)]">{step.title}</h3>
                  <span className="text-sm px-3 py-1 rounded-full bg-[color:var(--secondary)] text-[color:var(--accent)] font-bold">{step.year}</span>
                </div>
                
                <div 
                  className={cn(
                    "overflow-hidden transition-all duration-500 ease-in-out",
                    expandedId === step.id ? "max-h-40 mt-4 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <p className="text-[color:var(--muted-foreground)] leading-relaxed">{step.desc}</p>
                </div>
                
                <div className="mt-4 flex justify-center">
                  <ChevronDown className={cn("w-5 h-5 text-[color:var(--muted-foreground)] transition-transform duration-300", expandedId === step.id && "rotate-180")} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
