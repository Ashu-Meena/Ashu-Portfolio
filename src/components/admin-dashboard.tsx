"use client";

import React, { useState } from "react";
import { PortfolioData } from "@/lib/data";
import { updatePortfolioData, uploadResume, createOrUpdateBlogPost, deleteBlogPost } from "@/app/actions";
import { Save, Plus, Trash2, ShieldAlert, Upload, PenTool } from "lucide-react";

export function AdminDashboard({ initialData, initialBlogs }: { initialData: PortfolioData, initialBlogs: any[] }) {
  const [data, setData] = useState<PortfolioData>(initialData);
  const [blogs, setBlogs] = useState<any[]>(initialBlogs);
  const [activeTab, setActiveTab] = useState<"profile" | "theme" | "stats" | "projects" | "skills" | "journey" | "experience" | "certs" | "blog">("profile");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === "20112004") {
      setIsAuthorized(true);
    } else {
      alert("INCORRECT PASSWORD.");
      setPassword("");
    }
  }

  async function handleSave() {
    if (!password) {
      alert("Please enter the admin password first.");
      return;
    }
    setIsSaving(true);
    const res = await updatePortfolioData(data, password);
    setIsSaving(false);
    if (res.success) {
      alert("System updated successfully. Changes are now live.");
    } else {
      alert(res.error || "Error updating system.");
    }
  }

  async function handleResumeUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!password) {
      alert("Please enter the admin password first.");
      e.target.value = "";
      return;
    }
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    
    const res = await uploadResume(formData, password);
    setIsUploading(false);
    
    if (res.success) {
      alert("Resume uploaded successfully!");
    } else {
      alert("Failed to upload resume: " + res.error);
    }
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black font-mono p-4">
        <form onSubmit={handleLogin} className="sci-fi-card p-12 flex flex-col items-center gap-8 max-w-md w-full relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-[color:var(--magenta)]"></div>
          <ShieldAlert className="text-[color:var(--magenta)] w-20 h-20 animate-pulse" />
          <div className="text-center">
            <h1 className="text-3xl font-black text-white uppercase tracking-widest mb-2">Restricted Area</h1>
            <p className="text-[color:var(--muted-foreground)] text-sm tracking-widest">ENTER SYSTEM OVERRIDE CODE</p>
          </div>
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black/50 border-2 border-[color:var(--magenta)] px-6 py-4 text-center text-xl text-white tracking-[0.5em] focus:outline-none focus:border-white transition-colors"
            autoFocus
          />
          <button 
            type="submit"
            className="w-full py-4 bg-[color:var(--magenta)] text-black font-black uppercase tracking-widest hover:bg-white transition-colors"
            style={{ clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)" }}
          >
            Authenticate
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8 pt-24 font-mono pb-32">
      <div className="flex items-center justify-between mb-12 border-b-2 border-[color:var(--accent)] pb-6">
        <div>
          <h1 className="text-4xl font-black text-[color:var(--foreground)] tracking-widest uppercase flex items-center gap-4">
            <ShieldAlert className="text-[color:var(--magenta)] w-10 h-10" />
            Admin Override Panel
          </h1>
          <p className="text-[color:var(--accent)] mt-2">&gt; AUTHENTICATED AS: SYSTEM_ADMIN</p>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-3 bg-[color:var(--accent)] text-black font-bold uppercase hover:bg-white transition-colors"
            style={{ clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)" }}
          >
            <Save className="w-5 h-5" />
            {isSaving ? "Saving..." : "Commit Changes"}
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-8">
        {(["profile", "theme", "stats", "projects", "skills", "journey", "experience", "certs", "blog"] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 uppercase font-bold tracking-widest border border-[color:var(--border)] transition-colors ${
              activeTab === tab 
                ? "bg-[color:var(--accent)] text-black border-transparent" 
                : "bg-[color:var(--secondary)] text-[color:var(--foreground)] hover:border-[color:var(--accent)]"
            }`}
            style={{ clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)" }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="sci-fi-card p-8 min-h-[500px]">
        {activeTab === "profile" && data.profile && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-[color:var(--accent)] border-b border-[color:var(--border)] pb-2 uppercase">Profile Matrix</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="uppercase text-sm text-[color:var(--muted-foreground)] tracking-widest">Name</label>
                <input type="text" value={data.profile.name} onChange={e => setData({...data, profile: {...data.profile, name: e.target.value}})} className="bg-black border border-[color:var(--border)] p-3 text-white focus:border-[color:var(--accent)]" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="uppercase text-sm text-[color:var(--muted-foreground)] tracking-widest">Avatar URL</label>
                <input type="text" value={data.profile.avatarUrl} onChange={e => setData({...data, profile: {...data.profile, avatarUrl: e.target.value}})} className="bg-black border border-[color:var(--border)] p-3 text-white focus:border-[color:var(--accent)]" />
              </div>
              <div className="flex flex-col gap-1 col-span-full">
                <label className="uppercase text-sm text-[color:var(--muted-foreground)] tracking-widest">Tagline</label>
                <input type="text" value={data.profile.tagline} onChange={e => setData({...data, profile: {...data.profile, tagline: e.target.value}})} className="bg-black border border-[color:var(--border)] p-3 text-white focus:border-[color:var(--accent)]" />
              </div>
              <div className="flex flex-col gap-1 col-span-full">
                <label className="uppercase text-sm text-[color:var(--muted-foreground)] tracking-widest">Terminal Text (Comma separated array)</label>
                <textarea rows={4} value={data.profile.terminalText.join("\n")} onChange={e => setData({...data, profile: {...data.profile, terminalText: e.target.value.split("\n")}})} className="bg-black border border-[color:var(--border)] p-3 text-white focus:border-[color:var(--accent)]" />
              </div>
              <div className="flex flex-col gap-1 col-span-full mt-4 p-4 border border-dashed border-[color:var(--border)] bg-[color:var(--secondary)]/30 relative">
                <label className="uppercase text-sm text-[color:var(--accent)] font-bold tracking-widest flex items-center gap-2 mb-2">
                  <Upload className="w-4 h-4" />
                  Upload PDF Resume
                </label>
                <input 
                  type="file" 
                  accept=".pdf" 
                  onChange={handleResumeUpload}
                  disabled={isUploading}
                  className="text-white file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-bold file:bg-[color:var(--accent)] file:text-black hover:file:bg-white transition-colors cursor-pointer"
                />
                {isUploading && <span className="text-sm text-[color:var(--muted-foreground)] mt-2">Uploading to system...</span>}
              </div>
            </div>
          </div>
        )}

        {activeTab === "theme" && data.theme && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-[color:var(--accent)] border-b border-[color:var(--border)] pb-2 uppercase">Theme Presets</h2>
            <div className="flex flex-wrap gap-4 mb-6">
              {[
                { name: "Cyberpunk", avatar: "/avatar-cyberpunk.png", colors: { name: "Cyberpunk", primary: '#00f0ff', secondary: '#111111', accent: '#ff003c', background: '#050505', foreground: '#e0e0e0', magenta: '#fce205' } },
                { name: "Iron Man", avatar: "/avatar-ironman.png", colors: { name: "Iron Man", primary: '#ff0000', secondary: '#220000', accent: '#ffd700', background: '#0f0000', foreground: '#ffffff', magenta: '#ff4500' } },
                { name: "Batman", avatar: "/avatar-batman.png", colors: { name: "Batman", primary: '#111111', secondary: '#000000', accent: '#f1c40f', background: '#0a0a0a', foreground: '#ffffff', magenta: '#333333' } },
                { name: "Space", avatar: "/avatar-space.png", colors: { name: "Space", primary: '#9d4edd', secondary: '#10002b', accent: '#00b4d8', background: '#030014', foreground: '#e0eaff', magenta: '#c77dff' } },
                { name: "Matrix", avatar: "/avatar-matrix.png", colors: { name: "Matrix", primary: '#00ff00', secondary: '#001100', accent: '#00cc00', background: '#000500', foreground: '#00ff00', magenta: '#005500' } },
              ].map(preset => (
                <button
                  key={preset.name}
                  onClick={() => setData({ 
                    ...data, 
                    theme: preset.colors,
                    profile: { ...data.profile, avatarUrl: preset.avatar }
                  })}
                  className="px-6 py-3 font-bold uppercase tracking-widest border border-[color:var(--border)] hover:bg-[color:var(--accent)] hover:text-black transition-colors"
                  style={{ clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)", borderLeft: `4px solid ${preset.colors.accent}` }}
                >
                  {preset.name}
                </button>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-[color:var(--accent)] border-b border-[color:var(--border)] pb-2 uppercase mt-4">Advanced Color Tuning</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {Object.keys(data.theme).filter(k => k !== 'name').map((key) => (
                <div key={key} className="flex flex-col gap-2">
                  <label className="uppercase text-sm text-[color:var(--muted-foreground)] tracking-widest">{key}</label>
                  <div className="flex items-center gap-4">
                    <input 
                      type="color" 
                      value={(data.theme as any)[key]} 
                      onChange={e => setData({
                        ...data, 
                        theme: { ...data.theme, [key]: e.target.value }
                      })}
                      className="w-12 h-12 bg-black border border-[color:var(--border)] cursor-pointer"
                    />
                    <span className="font-mono text-white text-lg">{(data.theme as any)[key]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "stats" && data.stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <h2 className="col-span-full text-2xl font-bold text-[color:var(--accent)] border-b border-[color:var(--border)] pb-2 uppercase">Hero HUD Stats</h2>
            {Object.keys(data.stats).map((key) => (
              <div key={key} className="flex flex-col gap-2">
                <label className="uppercase text-sm text-[color:var(--muted-foreground)] tracking-widest">{key}</label>
                <input 
                  type="number" 
                  value={(data.stats as any)[key]} 
                  onChange={e => setData({
                    ...data, 
                    stats: { ...data.stats, [key]: parseInt(e.target.value) || 0 }
                  })}
                  className="bg-black border border-[color:var(--border)] p-3 text-white focus:outline-none focus:border-[color:var(--accent)]"
                />
              </div>
            ))}
          </div>
        )}

        {activeTab === "projects" && data.projects && (
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between border-b border-[color:var(--border)] pb-2">
              <h2 className="text-2xl font-bold text-[color:var(--accent)] uppercase">Project Matrix</h2>
              <button 
                onClick={() => setData({
                  ...data,
                  projects: [{ id: `proj-${Date.now()}`, title: "New Project", category: "Full Stack", image: "", description: "", techStack: [], results: "", link: "", github: "" }, ...data.projects]
                })}
                className="flex items-center gap-1 text-[color:var(--accent)] hover:text-white"
              >
                <Plus className="w-4 h-4" /> Add Project
              </button>
            </div>
            {data.projects.map((proj, idx) => (
              <div key={proj.id} className="border border-[color:var(--border)] p-6 relative group bg-[color:var(--secondary)]/30">
                <button 
                  onClick={() => {
                    const newProjs = [...data.projects];
                    newProjs.splice(idx, 1);
                    setData({ ...data, projects: newProjs });
                  }}
                  className="absolute top-4 right-4 text-[color:var(--muted-foreground)] hover:text-red-500"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs uppercase text-[color:var(--muted-foreground)]">Title</label>
                    <input type="text" value={proj.title} onChange={e => {
                      const newProjs = [...data.projects];
                      newProjs[idx].title = e.target.value;
                      setData({ ...data, projects: newProjs });
                    }} className="bg-black border border-[color:var(--border)] p-2 text-sm text-white" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs uppercase text-[color:var(--muted-foreground)]">Category</label>
                    <input type="text" value={proj.category} onChange={e => {
                      const newProjs = [...data.projects];
                      newProjs[idx].category = e.target.value;
                      setData({ ...data, projects: newProjs });
                    }} className="bg-black border border-[color:var(--border)] p-2 text-sm text-white" />
                  </div>
                </div>
                <div className="flex flex-col gap-1 mb-4">
                  <label className="text-xs uppercase text-[color:var(--muted-foreground)]">Description</label>
                  <textarea value={proj.description} onChange={e => {
                      const newProjs = [...data.projects];
                      newProjs[idx].description = e.target.value;
                      setData({ ...data, projects: newProjs });
                    }} className="bg-black border border-[color:var(--border)] p-2 text-sm text-white h-24" />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "skills" && data.skills && (
          <div className="flex flex-col gap-8">
            <h2 className="text-2xl font-bold text-[color:var(--accent)] border-b border-[color:var(--border)] pb-2 uppercase">Skills Database</h2>
            {data.skills.map((skillCat, idx) => (
              <div key={idx} className="border border-[color:var(--border)] p-6 bg-[color:var(--secondary)]/30">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs uppercase text-[color:var(--muted-foreground)]">Category Title</label>
                    <input type="text" value={skillCat.title} onChange={e => {
                      const newSkills = [...data.skills];
                      newSkills[idx].title = e.target.value;
                      setData({ ...data, skills: newSkills });
                    }} className="bg-black border border-[color:var(--border)] p-2 text-sm text-white" />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs uppercase text-[color:var(--muted-foreground)]">Skills (Comma separated)</label>
                  <input type="text" value={skillCat.skills.join(", ")} onChange={e => {
                      const newSkills = [...data.skills];
                      newSkills[idx].skills = e.target.value.split(",").map(s => s.trim());
                      setData({ ...data, skills: newSkills });
                    }} className="bg-black border border-[color:var(--border)] p-2 text-sm text-white" />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "journey" && data.journey && (
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between border-b border-[color:var(--border)] pb-2">
              <h2 className="text-2xl font-bold text-[color:var(--accent)] uppercase">Journey Log</h2>
              <button 
                onClick={() => setData({
                  ...data,
                  journey: [...data.journey, { id: Date.now(), title: "New Node", desc: "", year: "2026" }]
                })}
                className="flex items-center gap-1 text-[color:var(--accent)] hover:text-white"
              >
                <Plus className="w-4 h-4" /> Add Node
              </button>
            </div>
            {data.journey.map((node, idx) => (
              <div key={node.id} className="border border-[color:var(--border)] p-6 relative group bg-[color:var(--secondary)]/30">
                <button 
                  onClick={() => {
                    const newJ = [...data.journey];
                    newJ.splice(idx, 1);
                    setData({ ...data, journey: newJ });
                  }}
                  className="absolute top-4 right-4 text-[color:var(--muted-foreground)] hover:text-red-500"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs uppercase text-[color:var(--muted-foreground)]">Title</label>
                    <input type="text" value={node.title} onChange={e => {
                      const newJ = [...data.journey];
                      newJ[idx].title = e.target.value;
                      setData({ ...data, journey: newJ });
                    }} className="bg-black border border-[color:var(--border)] p-2 text-sm text-white" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs uppercase text-[color:var(--muted-foreground)]">Year</label>
                    <input type="text" value={node.year} onChange={e => {
                      const newJ = [...data.journey];
                      newJ[idx].year = e.target.value;
                      setData({ ...data, journey: newJ });
                    }} className="bg-black border border-[color:var(--border)] p-2 text-sm text-white" />
                  </div>
                  <div className="flex flex-col gap-1 col-span-full">
                    <label className="text-xs uppercase text-[color:var(--muted-foreground)]">Description</label>
                    <textarea value={node.desc} onChange={e => {
                      const newJ = [...data.journey];
                      newJ[idx].desc = e.target.value;
                      setData({ ...data, journey: newJ });
                    }} className="bg-black border border-[color:var(--border)] p-2 text-sm text-white h-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "experience" && data.experiences && (
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between border-b border-[color:var(--border)] pb-2">
              <h2 className="text-2xl font-bold text-[color:var(--accent)] uppercase">Experiences</h2>
              <button 
                onClick={() => setData({
                  ...data,
                  experiences: [{ id: Date.now(), company: "New Co", role: "Role", date: "Date", location: "Location", bullets: [], skills: [] }, ...data.experiences]
                })}
                className="flex items-center gap-1 text-[color:var(--accent)] hover:text-white"
              >
                <Plus className="w-4 h-4" /> Add Experience
              </button>
            </div>
            {data.experiences.map((exp, idx) => (
              <div key={exp.id} className="border border-[color:var(--border)] p-6 relative group bg-[color:var(--secondary)]/30">
                <button 
                  onClick={() => {
                    const newE = [...data.experiences];
                    newE.splice(idx, 1);
                    setData({ ...data, experiences: newE });
                  }}
                  className="absolute top-4 right-4 text-[color:var(--muted-foreground)] hover:text-red-500"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs uppercase text-[color:var(--muted-foreground)]">Company</label>
                    <input type="text" value={exp.company} onChange={e => {
                      const newE = [...data.experiences];
                      newE[idx].company = e.target.value;
                      setData({ ...data, experiences: newE });
                    }} className="bg-black border border-[color:var(--border)] p-2 text-sm text-white" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs uppercase text-[color:var(--muted-foreground)]">Role</label>
                    <input type="text" value={exp.role} onChange={e => {
                      const newE = [...data.experiences];
                      newE[idx].role = e.target.value;
                      setData({ ...data, experiences: newE });
                    }} className="bg-black border border-[color:var(--border)] p-2 text-sm text-white" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs uppercase text-[color:var(--muted-foreground)]">Date</label>
                    <input type="text" value={exp.date} onChange={e => {
                      const newE = [...data.experiences];
                      newE[idx].date = e.target.value;
                      setData({ ...data, experiences: newE });
                    }} className="bg-black border border-[color:var(--border)] p-2 text-sm text-white" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs uppercase text-[color:var(--muted-foreground)]">Location</label>
                    <input type="text" value={exp.location} onChange={e => {
                      const newE = [...data.experiences];
                      newE[idx].location = e.target.value;
                      setData({ ...data, experiences: newE });
                    }} className="bg-black border border-[color:var(--border)] p-2 text-sm text-white" />
                  </div>
                  <div className="flex flex-col gap-1 col-span-full">
                    <label className="text-xs uppercase text-[color:var(--muted-foreground)]">Bullets (one per line)</label>
                    <textarea value={exp.bullets.join("\n")} onChange={e => {
                      const newE = [...data.experiences];
                      newE[idx].bullets = e.target.value.split("\n");
                      setData({ ...data, experiences: newE });
                    }} className="bg-black border border-[color:var(--border)] p-2 text-sm text-white h-24" />
                  </div>
                  <div className="flex flex-col gap-1 col-span-full">
                    <label className="text-xs uppercase text-[color:var(--muted-foreground)]">Skills (comma separated)</label>
                    <input type="text" value={exp.skills.join(", ")} onChange={e => {
                      const newE = [...data.experiences];
                      newE[idx].skills = e.target.value.split(",").map(s=>s.trim());
                      setData({ ...data, experiences: newE });
                    }} className="bg-black border border-[color:var(--border)] p-2 text-sm text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "certs" && data.certs && (
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between border-b border-[color:var(--border)] pb-2">
              <h2 className="text-2xl font-bold text-[color:var(--accent)] uppercase">Certifications</h2>
              <button 
                onClick={() => setData({
                  ...data,
                  certs: [...data.certs, { id: Date.now(), name: "New Cert", issuer: "Issuer", date: "2026" }]
                })}
                className="flex items-center gap-1 text-[color:var(--accent)] hover:text-white"
              >
                <Plus className="w-4 h-4" /> Add Cert
              </button>
            </div>
            {data.certs.map((cert, idx) => (
              <div key={cert.id} className="border border-[color:var(--border)] p-6 relative group bg-[color:var(--secondary)]/30">
                <button 
                  onClick={() => {
                    const newC = [...data.certs];
                    newC.splice(idx, 1);
                    setData({ ...data, certs: newC });
                  }}
                  className="absolute top-4 right-4 text-[color:var(--muted-foreground)] hover:text-red-500"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs uppercase text-[color:var(--muted-foreground)]">Name</label>
                    <input type="text" value={cert.name} onChange={e => {
                      const newC = [...data.certs];
                      newC[idx].name = e.target.value;
                      setData({ ...data, certs: newC });
                    }} className="bg-black border border-[color:var(--border)] p-2 text-sm text-white" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs uppercase text-[color:var(--muted-foreground)]">Issuer</label>
                    <input type="text" value={cert.issuer} onChange={e => {
                      const newC = [...data.certs];
                      newC[idx].issuer = e.target.value;
                      setData({ ...data, certs: newC });
                    }} className="bg-black border border-[color:var(--border)] p-2 text-sm text-white" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs uppercase text-[color:var(--muted-foreground)]">Date</label>
                    <input type="text" value={cert.date} onChange={e => {
                      const newC = [...data.certs];
                      newC[idx].date = e.target.value;
                      setData({ ...data, certs: newC });
                    }} className="bg-black border border-[color:var(--border)] p-2 text-sm text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "blog" && (
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between border-b border-[color:var(--border)] pb-2">
              <h2 className="text-2xl font-bold text-[color:var(--accent)] uppercase flex items-center gap-2">
                <PenTool className="w-6 h-6" /> Developer Blog
              </h2>
              <button 
                onClick={() => setBlogs([{ id: "", title: "New Blog Post", slug: `new-post-${Date.now()}`, content: "# New Post\nWrite markdown here...", published: false }, ...blogs])}
                className="flex items-center gap-1 text-[color:var(--accent)] hover:text-white"
              >
                <Plus className="w-4 h-4" /> Add Post
              </button>
            </div>
            {blogs.map((blog, idx) => (
              <div key={blog.id || idx} className="border border-[color:var(--border)] p-6 relative group bg-[color:var(--secondary)]/30">
                <div className="absolute top-4 right-4 flex gap-4">
                  <button 
                    onClick={async () => {
                      if (!password) return alert("Enter password first.");
                      const res = await createOrUpdateBlogPost(blog, password);
                      if (res.success) alert("Blog post saved!");
                      else alert(res.error);
                    }}
                    className="text-[color:var(--accent)] font-bold uppercase text-sm hover:text-white"
                  >
                    Save Post
                  </button>
                  <button 
                    onClick={async () => {
                      if (!blog.id) {
                        const newB = [...blogs];
                        newB.splice(idx, 1);
                        setBlogs(newB);
                        return;
                      }
                      if (!password) return alert("Enter password first.");
                      if (confirm("Are you sure you want to delete this post?")) {
                        const res = await deleteBlogPost(blog.id, password);
                        if (res.success) {
                          const newB = [...blogs];
                          newB.splice(idx, 1);
                          setBlogs(newB);
                        } else alert(res.error);
                      }
                    }}
                    className="text-[color:var(--muted-foreground)] hover:text-red-500"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pr-32">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs uppercase text-[color:var(--muted-foreground)]">Title</label>
                    <input type="text" value={blog.title} onChange={e => {
                      const newB = [...blogs];
                      newB[idx].title = e.target.value;
                      // Auto slugify if it's a new post
                      if (!blog.id) newB[idx].slug = e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                      setBlogs(newB);
                    }} className="bg-black border border-[color:var(--border)] p-2 text-sm text-white" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs uppercase text-[color:var(--muted-foreground)]">Slug (URL)</label>
                    <input type="text" value={blog.slug} onChange={e => {
                      const newB = [...blogs];
                      newB[idx].slug = e.target.value;
                      setBlogs(newB);
                    }} className="bg-black border border-[color:var(--border)] p-2 text-sm text-white" />
                  </div>
                  <div className="flex flex-col gap-1 col-span-full">
                    <label className="text-xs uppercase text-[color:var(--muted-foreground)]">Content (Markdown)</label>
                    <textarea value={blog.content} onChange={e => {
                      const newB = [...blogs];
                      newB[idx].content = e.target.value;
                      setBlogs(newB);
                    }} className="bg-black border border-[color:var(--border)] p-2 text-sm text-white font-mono h-48" />
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={blog.published} onChange={e => {
                      const newB = [...blogs];
                      newB[idx].published = e.target.checked;
                      setBlogs(newB);
                    }} className="w-4 h-4" />
                    <label className="text-sm uppercase text-white font-bold">Published</label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
