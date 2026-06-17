import fs from 'fs/promises';
import path from 'path';

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
    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error("Error reading portfolio data:", error);
    throw new Error("Failed to read portfolio data");
  }
}

export async function savePortfolioData(data: PortfolioData): Promise<void> {
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error("Error saving portfolio data:", error);
    throw new Error("Failed to save portfolio data");
  }
}
