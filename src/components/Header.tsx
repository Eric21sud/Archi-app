import { Menu, Cpu } from "lucide-react";
import { motion } from "motion/react";

interface HeaderProps {
  onMenuClick?: () => void;
  onControlClick?: () => void;
}

export function Header({ onMenuClick, onControlClick }: HeaderProps) {
  return (
    <header className="relative z-20 flex flex-col items-center pt-4 pb-1 px-6">
      {/* Subtle depth/glow behind title */}
      <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[220px] h-[60px] bg-cyan-glow/15 blur-[35px] pointer-events-none shadow-[0_0_60px_rgba(34,211,238,0.15)]"></div>
      
      <div className="flex items-center justify-between w-full h-10">
        <button 
          onClick={onMenuClick}
          className="w-9 h-9 rounded-full bg-white/5 border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-cyan-glow/40 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(34,211,238,0.25)] transition-all duration-300 group active:scale-90"
        >
          <Menu className="w-[1.05rem] h-[1.05rem] text-white/70 group-hover:text-white transition-colors" />
        </button>

        <div className="flex flex-col items-center relative">
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[25px] font-bold tracking-[0.15em] uppercase font-display text-cyan-glow drop-shadow-[0_0_8px_rgba(34,211,238,0.3)] flex leading-none"
          >
            <motion.span animate={{ color: ["#22d3ee", "#e0f2fe", "#22d3ee"], textShadow: ["0 0 10px rgba(34,211,238,0.5)", "0 0 15px rgba(255,255,255,0.8)", "0 0 10px rgba(34,211,238,0.5)"] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>A</motion.span>
            <span className="opacity-90">RCH</span>
            <motion.span animate={{ color: ["#22d3ee", "#e0f2fe", "#22d3ee"], textShadow: ["0 0 10px rgba(34,211,238,0.5)", "0 0 15px rgba(255,255,255,0.8)", "0 0 10px rgba(34,211,238,0.5)"] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>I</motion.span>
          </motion.h1>
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[7.5px] text-white/80 uppercase tracking-[0.41em] -mt-0.5 font-semibold whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] pl-[0.41em] text-center"
          >
            Majordome IA
          </motion.span>
        </div>

        <button 
          onClick={onControlClick}
          className="w-9 h-9 rounded-full bg-white/5 border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-cyan-glow/40 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(34,211,238,0.25)] transition-all duration-300 group active:scale-90"
        >
          <Cpu className="w-[1.1rem] h-[1.1rem] text-white/70 group-hover:text-white transition-colors" />
        </button>
      </div>
    </header>
  );
}
