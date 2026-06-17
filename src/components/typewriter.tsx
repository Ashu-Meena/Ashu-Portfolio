"use client";

import React, { useState, useEffect } from "react";

export function Typewriter({ 
  text, 
  delay = 50, 
  startDelay = 0 
}: { 
  text: string; 
  delay?: number;
  startDelay?: number;
}) {
  const [displayText, setDisplayText] = useState("");
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(startTimeout);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;

    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(text.substring(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setCompleted(true);
      }
    }, delay);

    return () => clearInterval(interval);
  }, [text, delay, started]);

  return (
    <span>
      {displayText}
      {!completed && <span className="animate-pulse">_</span>}
    </span>
  );
}
