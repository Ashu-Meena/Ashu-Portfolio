"use client";

import React from "react";
import { ThumbsUp, MessageSquare, Share2, Award, Briefcase, FileCode2 } from "lucide-react";

const activities = [
  {
    id: 1,
    type: "achievement",
    icon: Award,
    title: "Won Top 6 at National Hackathon",
    time: "2 weeks ago",
    content: "Thrilled to share that our team 'CodeCrafters' secured a Top 6 position nationally. We built an AI-powered legal assistant to democratize legal aid. Big thanks to my teammates!",
    likes: 124,
    comments: 18,
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    type: "project",
    icon: FileCode2,
    title: "Launched Kaamwallah App",
    time: "1 month ago",
    content: "Just deployed version 1.0 of Kaamwallah! It's a React Native app connecting skilled workers to households. Check out the GitHub repository for the open-source release.",
    likes: 89,
    comments: 5,
  },
  {
    id: 3,
    type: "work",
    icon: Briefcase,
    title: "Started Internship at CodTech",
    time: "3 months ago",
    content: "I'm happy to share that I'm starting a new position as Android Development Intern at CodTech IT Solutions! Excited to learn and contribute to scalable mobile apps.",
    likes: 245,
    comments: 32,
  }
];

export function ActivityFeed() {
  return (
    <section className="w-full py-4 bg-[color:var(--secondary)]/10">
      <h2 className="text-3xl font-bold text-center mb-8">Activity Feed</h2>
      
      <div className="max-w-2xl mx-auto px-4 flex flex-col gap-6">
        {activities.map((activity) => (
          <div key={activity.id} className="glass-card p-0 overflow-hidden bg-[color:var(--background)]">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[color:var(--primary)] to-[color:var(--accent)] p-0.5">
                  <div className="w-full h-full rounded-full border-2 border-[color:var(--background)] overflow-hidden bg-[color:var(--muted)]">
                     <img src="https://api.dicebear.com/9.x/notionists/svg?seed=Ashu&backgroundColor=transparent" alt="Ashu" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-[color:var(--foreground)]">Ashu Meena</h4>
                  <p className="text-xs text-[color:var(--muted-foreground)] flex items-center gap-2 font-medium">
                    <activity.icon className="w-3.5 h-3.5 text-[color:var(--primary)]" />
                    {activity.title} • {activity.time}
                  </p>
                </div>
              </div>

              <p className="text-[color:var(--foreground)] leading-relaxed text-sm mb-4 font-medium">
                {activity.content}
              </p>

              {activity.image && (
                <div className="w-full h-64 rounded-xl overflow-hidden mb-4 border border-[color:var(--border)]">
                  <img src={activity.image} alt="Activity" className="w-full h-full object-cover" />
                </div>
              )}

              <div className="flex items-center gap-4 text-xs text-[color:var(--muted-foreground)] font-bold border-b border-[color:var(--border)] pb-4 mb-2">
                <span className="flex items-center gap-1"><ThumbsUp className="w-3.5 h-3.5 text-[color:var(--primary)]" /> {activity.likes} Likes</span>
                <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5" /> {activity.comments} Comments</span>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 flex justify-center items-center gap-2 py-2.5 rounded-lg hover:bg-[color:var(--secondary)] text-sm font-bold text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)] transition-colors">
                  <ThumbsUp className="w-4 h-4" /> Like
                </button>
                <button className="flex-1 flex justify-center items-center gap-2 py-2.5 rounded-lg hover:bg-[color:var(--secondary)] text-sm font-bold text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)] transition-colors">
                  <MessageSquare className="w-4 h-4" /> Comment
                </button>
                <button className="flex-1 flex justify-center items-center gap-2 py-2.5 rounded-lg hover:bg-[color:var(--secondary)] text-sm font-bold text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)] transition-colors">
                  <Share2 className="w-4 h-4" /> Share
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
