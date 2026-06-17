"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ExternalLink } from "lucide-react";

import { PortfolioData } from "@/lib/data";

export function CertificationVault({ certs }: { certs: PortfolioData["certs"] }) {
  return (
    <section className="w-full py-4 bg-[color:var(--secondary)]/30 border-y border-[color:var(--border)]/50 mt-12">
      <h2 className="text-3xl font-bold text-center mb-8">Certification Vault</h2>
      
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8" style={{ perspective: "1000px" }}>
        {certs.map((cert, i) => (
          <motion.div
            key={cert.id}
            initial={{ rotateX: 45, opacity: 0, y: 50 }}
            whileInView={{ rotateX: 0, opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            whileHover={{ y: -10, scale: 1.02, rotateX: 5 }}
            className="glass-card p-1 cursor-pointer group bg-gradient-to-b from-[color:var(--background)] to-[color:var(--secondary)]"
          >
            <div className="w-full h-full p-6 border border-[color:var(--border)] rounded-xl relative overflow-hidden bg-[color:var(--background)] group-hover:border-[color:var(--accent)]/50 transition-colors">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-[color:var(--accent)]/10 rounded-full blur-2xl" />
              
              <ShieldCheck className="w-12 h-12 text-[color:var(--accent)] mb-6 drop-shadow-md" />
              
              <h3 className="text-xl font-bold text-[color:var(--foreground)] mb-2 tracking-tight">{cert.name}</h3>
              <p className="text-[color:var(--muted-foreground)] font-semibold">{cert.issuer}</p>
              
              <div className="mt-8 flex justify-between items-center pt-4 border-t border-[color:var(--border)]">
                <span className="text-sm font-bold bg-[color:var(--secondary)] px-3 py-1 rounded-md">{cert.date}</span>
                <ExternalLink className="w-5 h-5 text-[color:var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
