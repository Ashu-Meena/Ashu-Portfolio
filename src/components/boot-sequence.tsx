"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LOGS = [
  "INITIALIZING KERNEL...",
  "LOADING MODULES [████████--] 80%",
  "MOUNTING VIRTUAL FILESYSTEM...",
  "ESTABLISHING SECURE CONNECTION...",
  "DECRYPTING PORTFOLIO DATA...",
  "ACCESS GRANTED."
];

export function BootSequence({ children }: { children: React.ReactNode }) {
  const [isBooting, setIsBooting] = useState(true);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    // Only show boot sequence once per session
    const hasBooted = sessionStorage.getItem("has_booted");
    if (hasBooted) {
      setIsBooting(false);
      return;
    }

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < BOOT_LOGS.length) {
        setLogs(prev => [...prev, BOOT_LOGS[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          sessionStorage.setItem("has_booted", "true");
          setIsBooting(false);
        }, 800);
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isBooting && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(10px)", scale: 1.1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[99999] bg-[#020202] text-[#00f0ff] font-mono p-8 flex flex-col justify-end"
          >
            <div className="absolute top-8 left-8 flex items-center gap-4 animate-pulse">
              <div className="w-4 h-4 bg-[#ff00ff]"></div>
              <span className="text-sm font-bold tracking-widest uppercase">SYS.BOOT</span>
            </div>
            
            <div className="space-y-2 mb-12 max-w-2xl text-sm md:text-base">
              {logs.map((log, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-4"
                >
                  <span className="text-white/50">{`[${(i * 0.14).toFixed(3)}]`}</span>
                  <span className={i === BOOT_LOGS.length - 1 ? "text-[#00ff00]" : ""}>{log}</span>
                </motion.div>
              ))}
              <motion.div
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="w-3 h-5 bg-[#00f0ff] mt-4"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isBooting && children}
    </>
  );
}
