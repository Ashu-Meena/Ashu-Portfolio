"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function HackingGame() {
  const [isActive, setIsActive] = useState(false);
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState<string[]>([]);
  const keysPressed = useRef<string[]>([]);
  const secretSequence = ["h", "a", "c", "k"];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isActive) return;

      keysPressed.current.push(e.key.toLowerCase());
      if (keysPressed.current.length > secretSequence.length) {
        keysPressed.current.shift();
      }

      if (keysPressed.current.join("") === secretSequence.join("")) {
        setIsActive(true);
        setLogs([
          "SYSTEM BREACH DETECTED.",
          "UNAUTHORIZED ACCESS GRANTED.",
          "INITIALIZING OVERRIDE PROTOCOL...",
          "Type 'help' for available commands."
        ]);
        keysPressed.current = [];
      }
    };

    console.log("%c[SYSTEM MESSAGE] %cTerminal access restricted. Manual override code required (hint: h-a-c-k)", "color: red; font-weight: bold; font-size: 14px", "color: lightgreen; font-family: monospace; font-size: 12px");

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isActive]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newLogs = [...logs, `> ${input}`];
    const cmd = input.trim().toLowerCase();

    if (cmd === "help") {
      newLogs.push("Available commands: 'status', 'whoami', 'exit', 'sudo rm -rf /'");
    } else if (cmd === "status") {
      newLogs.push("SYSTEM ONLINE. ALL FIREWALLS BYPASSED.");
    } else if (cmd === "whoami") {
      newLogs.push("guest_user_992. Access level: ROOT.");
    } else if (cmd === "exit") {
      setIsActive(false);
      setInput("");
      return;
    } else if (cmd === "sudo rm -rf /") {
      newLogs.push("NICE TRY. I WROTE THIS SYSTEM.");
      setTimeout(() => {
        setIsActive(false);
      }, 2000);
    } else {
      newLogs.push(`Command not found: ${cmd}`);
    }

    setLogs(newLogs);
    setInput("");
  };

  if (!isActive) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/95 flex flex-col p-8 font-mono text-green-500 overflow-hidden"
      >
        <div className="flex-1 overflow-y-auto flex flex-col justify-end space-y-2 mb-4 text-sm sm:text-base">
          {logs.map((log, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }}
            >
              {log}
            </motion.div>
          ))}
        </div>
        <form onSubmit={handleCommand} className="flex items-center gap-2">
          <span className="text-green-500 font-bold">{">"}</span>
          <input
            autoFocus
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-green-500 font-mono text-sm sm:text-base"
            spellCheck="false"
          />
        </form>
      </motion.div>
    </AnimatePresence>
  );
}
