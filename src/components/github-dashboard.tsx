"use client";

import React from "react";
import { GitCommit, GitPullRequest, Star, Activity } from "lucide-react";
import { motion } from "framer-motion";

function GithubIcon(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path></svg>;
}

export function GithubDashboard() {
  const [data, setData] = React.useState<any>(null);

  React.useEffect(() => {
    async function fetchGitData() {
      try {
        const res = await fetch("https://api.github.com/users/Ashu-Meena");
        const json = await res.json();
        
        // Fetch repos for language stats
        const reposRes = await fetch("https://api.github.com/users/Ashu-Meena/repos?per_page=100");
        const repos = await reposRes.json();
        
        let stars = 0;
        const langs: Record<string, number> = {};
        
        if (Array.isArray(repos)) {
          repos.forEach((repo: any) => {
            stars += repo.stargazers_count || 0;
            if (repo.language) {
              langs[repo.language] = (langs[repo.language] || 0) + 1;
            }
          });
        }
        
        const totalLangs = Object.values(langs).reduce((a,b)=>a+b, 0);
        const topLangs = Object.entries(langs)
          .map(([name, count]) => ({ name, percentage: Math.round((count / (totalLangs || 1)) * 100) }))
          .sort((a,b)=>b.percentage - a.percentage)
          .slice(0, 4);
          
        setData({
          user: json,
          stars,
          topLangs
        });
      } catch (err) {
        console.error("Failed to fetch github data");
      }
    }
    fetchGitData();
  }, []);

  const languageColors: Record<string, string> = {
    "Kotlin": "bg-purple-500",
    "Java": "bg-orange-500",
    "TypeScript": "bg-blue-500",
    "JavaScript": "bg-yellow-400",
    "HTML": "bg-red-500",
    "CSS": "bg-blue-300"
  };

  return (
    <section className="w-full py-4">
      <h2 className="text-3xl font-bold text-center mb-8">GitHub Command Center</h2>
      
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 glass-card p-6 flex flex-col relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--primary)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div className="flex items-center gap-3">
              <GithubIcon className="w-6 h-6 text-[color:var(--foreground)]" />
              <h3 className="text-xl font-bold">Ashu-Meena</h3>
            </div>
            {data?.user?.avatar_url && (
              <img src={data.user.avatar_url} alt="GitHub Avatar" className="w-12 h-12 rounded-full border-2 border-[color:var(--border)]" />
            )}
          </div>
          
          <div className="flex-1 flex flex-col justify-center relative z-10">
            <p className="text-[color:var(--muted-foreground)] mb-4">{data?.user?.bio || "Android Developer & Open Source Contributor"}</p>
            <div className="flex gap-4">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-[color:var(--foreground)]">{data?.user?.followers || 0}</span>
                <span className="text-xs uppercase text-[color:var(--muted-foreground)]">Followers</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-[color:var(--foreground)]">{data?.user?.following || 0}</span>
                <span className="text-xs uppercase text-[color:var(--muted-foreground)]">Following</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-[color:var(--foreground)]">{data?.user?.public_repos || 0}</span>
                <span className="text-xs uppercase text-[color:var(--muted-foreground)]">Repositories</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <StatBox icon={GitCommit} label="Public Repos" value={data?.user?.public_repos || 0} color="text-green-500" />
          <StatBox icon={GitPullRequest} label="Followers" value={data?.user?.followers || 0} color="text-purple-500" />
          <StatBox icon={Star} label="Stars Earned" value={data?.stars || 0} color="text-[color:var(--accent)]" />
        </div>
        
        <div className="md:col-span-3 glass-card p-6">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-3"><Activity className="w-5 h-5 text-[color:var(--accent)]" /> Top Languages</h3>
          <div className="flex flex-wrap gap-6">
            {data?.topLangs ? data.topLangs.map((l: any) => (
              <LanguageBar key={l.name} name={l.name} percentage={l.percentage} color={languageColors[l.name] || "bg-gray-500"} />
            )) : (
              <div className="text-[color:var(--muted-foreground)] text-sm animate-pulse">Loading language data...</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatBox({ icon: Icon, label, value, color }: any) {
  return (
    <div className="glass-card p-6 flex items-center gap-4 hover:-translate-y-1 transition-transform">
      <div className={`p-3 rounded-xl bg-[color:var(--background)] border border-[color:var(--border)] shadow-sm ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <div className="text-2xl font-bold text-[color:var(--foreground)]">{value}</div>
        <div className="text-sm font-semibold text-[color:var(--muted-foreground)]">{label}</div>
      </div>
    </div>
  );
}

function LanguageBar({ name, percentage, color }: any) {
  return (
    <div className="flex-1 min-w-[150px]">
      <div className="flex justify-between text-sm font-bold mb-2 text-[color:var(--foreground)]">
        <span>{name}</span>
        <span>{percentage}%</span>
      </div>
      <div className="h-3 w-full bg-[color:var(--secondary)] rounded-full overflow-hidden border border-[color:var(--border)]/50">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className={`h-full ${color} rounded-full`} 
        />
      </div>
    </div>
  );
}
