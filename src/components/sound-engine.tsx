"use client";

import { useEffect } from "react";
import { useSciFiSounds } from "@/hooks/use-sci-fi-sounds";

export function SoundEngine() {
  const { playHover, playClick } = useSciFiSounds();

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a')) {
        playHover();
      }
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a')) {
        playClick();
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('click', handleClick);
    };
  }, [playHover, playClick]);

  return null;
}
