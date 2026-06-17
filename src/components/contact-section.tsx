"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Send, MapPin, Mail, Download, Loader2, Phone } from "lucide-react";
import { supabase } from "@/lib/supabase";

function GithubIcon(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path></svg>;
}

function LinkedinIcon(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>;
}

function MagneticButton({ children, className, href }: { children: React.ReactNode, className?: string, href?: string }) {
  const ref = useRef<HTMLAnchorElement | HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  function handleMouse(e: React.MouseEvent) {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const center = { x: left + width / 2, y: top + height / 2 };
    const distance = { x: e.clientX - center.x, y: e.clientY - center.y };
    x.set(distance.x * 0.2);
    y.set(distance.y * 0.2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  if (href) {
    return (
      <motion.a
        href={href}
        ref={ref as any}
        onMouseMove={handleMouse}
        onMouseLeave={handleMouseLeave}
        style={{ x: springX, y: springY }}
        className={className}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.div
      ref={ref as any}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ContactSection() {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [chatHistory, setChatHistory] = useState<{role: string, content: string}[]>([
    { role: 'bot', content: "Hi there! 👋 Thanks for checking out my portfolio." },
    { role: 'bot', content: "How can I help you today?" }
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const generateBotResponse = (msg: string) => {
    const lowerMsg = msg.toLowerCase();
    
    if (lowerMsg.includes("skill") || lowerMsg.includes("tech") || lowerMsg.includes("stack")) {
      return "I specialize in Full-Stack Web Development and AI/ML! My core stack includes React.js, Node.js, HTML/CSS, Python, C++, and tools like IBM Watson Studio and MongoDB. Check out the 'Skills Galaxy' above!";
    }
    if (lowerMsg.includes("project") || lowerMsg.includes("work") || lowerMsg.includes("build")) {
      return "I've built several cool projects! Some of my favorites are Unmutemann (a social platform), KanoonSaathi (legal tech with AI), and a Tenant Management System. You can see them in the Project Center!";
    }
    if (lowerMsg.includes("internship") || lowerMsg.includes("experience") || lowerMsg.includes("ibm")) {
      return "I completed an AI/ML internship with IBM SkillsBuild in 2024, where I worked on data analysis and machine learning models using Python! I also won multiple college-level hackathons.";
    }
    if (lowerMsg.includes("contact") || lowerMsg.includes("email") || lowerMsg.includes("reach")) {
      return "You can reach Ashu directly at Ashumeena2420@gmail.com! The message you just sent is also safely stored in our database, so he'll see it soon.";
    }
    if (lowerMsg.includes("resume") || lowerMsg.includes("cv")) {
      return "You can grab my resume by clicking the glowing 'Download Resume' button right above this chat box!";
    }
    if (lowerMsg.includes("hi") || lowerMsg.includes("hello") || lowerMsg.includes("hey")) {
      return "Hello again! I'm Ashu's automated assistant. You can ask me about his skills, projects, or experience!";
    }
    
    return "Thanks for reaching out! I've saved your message to the secure Supabase database. Ashu will get back to you soon. (P.S. Try asking me about my skills or projects!)";
  };

  const handleSendMessage = async () => {
    if (!message.trim() || isSending) return;
    
    const userMsg = message.trim();
    setMessage("");
    setChatHistory(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsSending(true);

    try {
      // 1. Insert user message into Supabase
      const { error: userError } = await supabase.from('messages').insert([{
        role: 'user',
        content: userMsg
      }]);
      
      if (userError) throw userError;

      // 2. Simulate bot typing & reply
      setTimeout(async () => {
        const botReply = generateBotResponse(userMsg);
        setChatHistory(prev => [...prev, { role: 'bot', content: botReply }]);
        
        // Insert bot response to Supabase
        await supabase.from('messages').insert([{
          role: 'bot',
          content: botReply
        }]);
        
        setIsSending(false);
      }, 1500);

    } catch (error) {
      console.error("Error sending message:", error);
      setIsSending(false);
    }
  };

  // Auto-scroll
  React.useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isSending]);

  return (
    <section className="w-full py-4 border-t border-[color:var(--border)]/50">
      <h2 className="text-3xl font-bold text-center mb-8">Get In Touch</h2>
      
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="sci-fi-card p-8 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[color:var(--primary)]/10 rounded-full blur-3xl -z-10 group-hover:bg-[color:var(--primary)]/20 transition-colors" />
          
          <div>
            <h3 className="text-3xl font-extrabold mb-6 tracking-tight">Let's Connect</h3>
            <p className="text-[color:var(--muted-foreground)] font-medium mb-8 leading-relaxed">
              I'm always open to discussing product design work, Android app development, or AI integrations.
            </p>
            
            <div className="space-y-6">
              <a href="mailto:Ashumeena2420@gmail.com" className="flex items-center gap-4 group/item">
                <div className="w-12 h-12 rounded-full bg-[color:var(--secondary)] flex items-center justify-center group-hover/item:bg-[color:var(--primary)] group-hover/item:text-white transition-colors border border-[color:var(--border)]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-[color:var(--muted-foreground)] font-bold">Email</p>
                  <p className="font-bold text-[color:var(--foreground)]">Ashumeena2420@gmail.com</p>
                </div>
              </a>

              <div className="flex items-center gap-4 group/item">
                <div className="w-12 h-12 rounded-full bg-[color:var(--secondary)] flex items-center justify-center group-hover/item:bg-[color:var(--primary)] group-hover/item:text-white transition-colors border border-[color:var(--border)]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-[color:var(--muted-foreground)] font-bold">Phone</p>
                  <p className="font-bold text-[color:var(--foreground)]">+91-7827555428</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 group/item">
                <div className="w-12 h-12 rounded-full bg-[color:var(--secondary)] flex items-center justify-center group-hover/item:bg-[color:var(--accent)] group-hover/item:text-white transition-colors border border-[color:var(--border)]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-[color:var(--muted-foreground)] font-bold">Location</p>
                  <p className="font-bold text-[color:var(--foreground)]">Jaipur, Rajasthan, India</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 flex flex-wrap gap-4">
            <MagneticButton href="https://linkedin.com/in/ashu-meena2420" className="p-3.5 rounded-full border-2 border-[color:var(--border)] bg-[color:var(--background)] hover:bg-[#0A66C2] hover:text-white hover:border-transparent transition-all shadow-sm">
              <LinkedinIcon className="w-5 h-5" />
            </MagneticButton>
            <MagneticButton href="https://github.com/Ashu-Meena" className="p-3.5 rounded-full border-2 border-[color:var(--border)] bg-[color:var(--background)] hover:bg-[color:var(--foreground)] hover:text-[color:var(--background)] hover:border-transparent transition-all shadow-sm">
              <GithubIcon className="w-5 h-5" />
            </MagneticButton>
          <a 
            href={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/portfolio_assets/resume.pdf`}
            download="Ashu_Meena_Resume.pdf"
            className="flex items-center gap-2 bg-[color:var(--secondary)] hover:bg-[color:var(--accent)] hover:text-black border border-[color:var(--border)] px-6 py-3 font-bold uppercase tracking-widest transition-colors ml-auto"
            style={{ clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)" }}
          >
            <Download className="w-5 h-5" />
            Download Resume
          </a>
        </div>
      </div>
        
        {/* Chat Interface */}
        <div className="sci-fi-card flex flex-col h-[500px] overflow-hidden bg-[color:var(--background)]">
          <div className="p-4 border-b border-[color:var(--border)] flex items-center gap-3 bg-[color:var(--secondary)]">
             <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[color:var(--primary)] to-[color:var(--accent)] flex items-center justify-center text-white font-bold text-sm shadow-sm">
                AM
             </div>
             <div>
                <h4 className="font-bold text-sm text-[color:var(--foreground)]">Ashu Meena</h4>
                <p className="text-xs text-green-500 font-bold flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-green-500 inline-block shadow-[0_0_5px_rgba(34,197,94,0.8)]"></span> Online
                </p>
             </div>
          </div>
          
          <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4 bg-[color:var(--background)]">
            {chatHistory.map((msg, idx) => (
              <div key={idx} className={`max-w-[80%] p-4 rounded-2xl border border-[color:var(--border)] shadow-sm ${msg.role === 'user' ? 'self-end bg-[color:var(--primary)] text-white rounded-tr-none' : 'self-start bg-[color:var(--secondary)] text-[color:var(--foreground)] rounded-tl-none'}`}>
                <p className="text-sm font-medium">{msg.content}</p>
              </div>
            ))}
            {isSending && (
              <div className="self-start max-w-[80%] bg-[color:var(--secondary)] p-4 rounded-2xl rounded-tl-none border border-[color:var(--border)] shadow-sm flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-[color:var(--muted-foreground)]" />
                <p className="text-sm font-medium text-[color:var(--muted-foreground)]">Ashu-Bot is typing...</p>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          
          <div className="p-4 border-t border-[color:var(--border)] bg-[color:var(--secondary)]/50">
            <div className="relative">
              <input 
                type="text" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..." 
                disabled={isSending}
                className="w-full bg-[color:var(--background)] border border-[color:var(--border)] rounded-full py-3 pl-5 pr-14 focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)]/50 text-sm font-medium shadow-inner disabled:opacity-50"
              />
              <button 
                onClick={handleSendMessage}
                disabled={isSending || !message.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[color:var(--primary)] text-white hover:scale-105 transition-transform shadow-md disabled:opacity-50 disabled:hover:scale-100"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
