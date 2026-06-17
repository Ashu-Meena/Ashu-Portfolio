import fs from 'fs/promises';
import path from 'path';
import { supabase, supabaseAdmin } from './supabase';

export interface PortfolioData {
  stats: {
    projects: number;
    internships: number;
    certifications: number;
    commits: number;
  };
  projects: Array<{
    id: string;
    title: string;
    category: string;
    image: string;
    description: string;
    techStack: string[];
    results: string;
    link: string;
    github: string;
  }>;
  skills: Array<{
    title: string;
    icon: string;
    skills: string[];
  }>;
  profile: {
    name: string;
    tagline: string;
    avatarUrl: string;
    terminalText: string[];
  };
  journey: Array<{
    id: number;
    title: string;
    desc: string;
    year: string;
  }>;
  experiences: Array<{
    id: number;
    company: string;
    role: string;
    date: string;
    location: string;
    bullets: string[];
    skills: string[];
  }>;
  certs: Array<{
    id: number;
    name: string;
    issuer: string;
    date: string;
  }>;
  theme: {
    name: string;
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    magenta: string;
  };
}

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'portfolio.json');

export async function getPortfolioData(): Promise<PortfolioData> {
  try {
    // 1. Try to fetch from Supabase Storage first
    const { data, error } = await supabase.storage.from('portfolio_assets').download('portfolio.json');
    if (data) {
      const text = await data.text();
      return JSON.parse(text);
    }
    
    // 2. Fallback to local file if Supabase fails (e.g. first run)
    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error("Error reading portfolio data:", error);
    throw new Error("Failed to read portfolio data");
  }
}

export async function savePortfolioData(data: PortfolioData): Promise<void> {
  try {
    const jsonString = JSON.stringify(data, null, 2);
    
    // Upload to Supabase Storage using Admin Client to bypass RLS
    const { error } = await supabaseAdmin.storage
      .from('portfolio_assets')
      .upload('portfolio.json', jsonString, {
        contentType: 'application/json',
        upsert: true
      });
      
    if (error) {
      console.error("Supabase storage error:", error);
      throw error;
    }
    
    // Also try to update local file for local dev sync, ignore errors on Vercel
    try {
      await fs.writeFile(dataFilePath, jsonString, 'utf8');
    } catch (fsError) {
      // Ignore FS errors in production
    }
    
  } catch (error) {
    console.error("Error saving portfolio data:", error);
    throw new Error("Failed to save portfolio data");
  }
}
