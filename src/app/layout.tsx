import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

import { GlobalThemeProvider } from "@/components/theme-provider";
import { getPortfolioData } from "@/lib/data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ashu Meena | Developer Dashboard",
  description: "Interactive personal portfolio and professional journey of Ashu Meena, Android Developer & AI Enthusiast.",
};

import { SoundEngine } from "@/components/sound-engine";
import { HackingGame } from "@/components/hacking-game";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getPortfolioData();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <SoundEngine />
        <HackingGame />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GlobalThemeProvider theme={data.theme}>
            {children}
          </GlobalThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
