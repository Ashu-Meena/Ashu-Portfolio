"use client";

import { useState } from "react";
import { addGuestbookEntry } from "@/app/actions";
import { Send } from "lucide-react";

export function GuestbookForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;
    
    setIsSubmitting(true);
    const res = await addGuestbookEntry(name, message);
    setIsSubmitting(false);
    
    if (res.success) {
      setName("");
      setMessage("");
    } else {
      alert(res.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border border-[color:var(--accent)] p-6 bg-[color:var(--secondary)]/10 flex flex-col gap-4 relative" style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)" }}>
      <div className="absolute bottom-0 right-0 w-[15px] h-[15px] bg-[color:var(--accent)]" style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}></div>
      
      <div>
        <label className="text-xs uppercase text-[color:var(--accent)] font-bold tracking-widest mb-2 block">Your Designation</label>
        <input 
          type="text" 
          required
          placeholder="Name or Alias"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-black border border-[color:var(--border)] px-4 py-3 text-white focus:border-[color:var(--accent)] outline-none transition-colors"
        />
      </div>

      <div>
        <label className="text-xs uppercase text-[color:var(--accent)] font-bold tracking-widest mb-2 block">Transmission</label>
        <textarea 
          required
          placeholder="Enter your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full bg-black border border-[color:var(--border)] px-4 py-3 text-white focus:border-[color:var(--accent)] outline-none transition-colors h-32 resize-none"
        />
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting || !name || !message}
        className="w-full py-4 mt-2 bg-[color:var(--accent)] text-black font-bold uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)" }}
      >
        {isSubmitting ? "Transmitting..." : <><Send className="w-4 h-4" /> Initialize Sequence</>}
      </button>
    </form>
  );
}
