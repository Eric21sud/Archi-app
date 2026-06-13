import { Paperclip, Mic, ArrowUp } from "lucide-react";
import React, { useState } from "react";
import { motion } from "motion/react";

export function InputArea({ onSend, onFocusChange }: { onSend: (text: string) => void, onFocusChange?: (focused: boolean) => void }) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="relative z-20 px-4 md:px-5 pb-4 w-full">
      <form 
        onSubmit={handleSubmit}
        className="relative flex items-center bg-[#07121d]/50 backdrop-blur-[40px] border border-cyan-glow/20 rounded-[2.5rem] pl-5 pr-1.5 py-1.5 shadow-[0_15px_45px_rgba(0,0,0,0.65),0_0_15px_rgba(34,211,238,0.08)] group transition-all duration-300 focus-within:border-cyan-glow/55 focus-within:shadow-[0_0_25px_rgba(34,211,238,0.25)] focus-within:bg-[#07121d]/65 overflow-hidden"
      >
        <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-cyan-glow/20 group-focus-within:via-cyan-glow/50 to-transparent pointer-events-none transition-colors duration-300"></div>

        <button type="button" className="p-2 text-white/40 hover:text-cyan-glow transition-colors active:scale-95">
          <Paperclip className="w-[1.125rem] h-[1.125rem] md:w-5 md:h-5 flex-shrink-0" />
        </button>
        
          <input 
            type="text" 
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => onFocusChange?.(true)}
            onBlur={() => onFocusChange?.(false)}
            placeholder="Écrire à Archi..." 
            className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/30 font-sans px-4 text-[15px] py-3 tracking-wide w-full min-w-0"
          />
        
        <div className="flex items-center gap-1 pr-1 flex-shrink-0">
          <button type="button" className="relative p-2 text-white/40 hover:text-cyan-glow transition-colors active:scale-95 group/mic">
            <Mic className="w-[1.125rem] h-[1.125rem] md:w-5 md:h-5 relative z-10" />

            {/* Listening state ring when mic is supposedly active (soft animated ring) */}
            <motion.div 
               animate={{ opacity: [0, 0.4, 0], scale: [0.8, 1.2, 0.8] }}
               transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
               className="absolute inset-0 bg-cyan-glow rounded-full blur-md opacity-0 group-hover/mic:opacity-100" />
            <motion.div 
               animate={{ scale: [1, 1.5, 1], opacity: [0, 0.3, 0] }}
               transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
               className="absolute inset-0 rounded-full border border-cyan-glow/50 hidden group-hover/mic:block" />
          </button>
          
          <button 
            type="submit"
            className="w-9 h-9 ml-1 rounded-full bg-gradient-to-tr from-[#15aabf] to-[#22d3ee]/80 flex items-center justify-center shadow-[0_0_12px_rgba(34,211,238,0.25)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_18px_rgba(34,211,238,0.4)] active:scale-95 overflow-hidden relative group/send"
          >
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/send:opacity-100 transition-opacity"></div>
            <ArrowUp className="w-4 h-4 text-[#020409] relative z-10 group-hover/send:-translate-y-0.5 transition-transform duration-300" strokeWidth={2.5} />
          </button>
        </div>
      </form>
    </div>
  );
}
