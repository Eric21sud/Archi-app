import { motion } from "motion/react";
import archibaldAvatar from "../assets/images/archibald_avatar_1780067466607.png";

export type HologramStatus = "idle" | "listening" | "thinking";

type CentralHologramProps = {
  status: HologramStatus;
};

export function CentralHologram({ status }: CentralHologramProps) {
  const isThinking = status === "thinking";
  const isListening = status === "listening";

  // State-specific styles
  let statusText = "Archi En Veille";
  let labelColor = "text-cyan-glow";
  let dotColor = "bg-cyan-glow shadow-[0_0_6px_#22d3ee]";
  let ringColorClass = "border-cyan-glow/30";
  let outerRingColorClass = "border-t-cyan-glow/40 border-b-cyan-glow/40";
  let coreGlow = "rgba(34,211,238,0.2)";

  if (isThinking) {
    statusText = "Matrice Active";
    labelColor = "text-rose-450 drop-shadow-[0_0_6px_rgba(244,63,94,0.4)]";
    dotColor = "bg-rose-500 shadow-[0_0_8px_#f43f5e]";
    ringColorClass = "border-rose-500/30";
    outerRingColorClass = "border-t-rose-500/40 border-b-rose-500/40";
    coreGlow = "rgba(244,63,94,0.3)";
  } else if (isListening) {
    statusText = "Archi À L'Écoute";
    labelColor = "text-emerald-400 drop-shadow-[0_0_6px_rgba(52,211,153,0.4)]";
    dotColor = "bg-emerald-400 shadow-[0_0_8px_#34d399]";
    ringColorClass = "border-emerald-400/30";
    outerRingColorClass = "border-t-emerald-400/40 border-b-emerald-400/40";
    coreGlow = "rgba(52,211,153,0.3)";
  }

  return (
    <div className="relative flex flex-col items-center justify-center my-4 py-3 select-none">
      {/* Hologram Light Cone Background Projection */}
      <div className={`absolute top-[35%] left-1/2 -translate-x-1/2 w-[180px] h-[130px] bg-gradient-to-b ${isThinking ? 'from-rose-500/10' : isListening ? 'from-emerald-500/10' : 'from-cyan-glow/20'} via-cyan-glow/5 to-transparent blur-[15px] rounded-b-full pointer-events-none transform -skew-x-12 opacity-40 transition-colors duration-500`}></div>
      
      {/* Outer Holographic Containment Ring */}
      <div className="relative w-[130px] h-[130px] flex items-center justify-center">
        
        {/* Ring 1: Continuous neon rotative dashes */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: isThinking ? 5 : isListening ? 8 : 15, repeat: Infinity, ease: "linear" }}
          className={`absolute inset-0 rounded-full border border-dashed ${ringColorClass} transition-colors duration-500`}
        />

        {/* Ring 2: Fast counter-rotating outer ring segments */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: isThinking ? 3 : isListening ? 5 : 10, repeat: Infinity, ease: "linear" }}
          className={`absolute -inset-1.5 rounded-full border-2 border-transparent ${outerRingColorClass} transition-colors duration-500`}
        />

        {/* Ring 3: Scanning sweeping dial */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: isThinking ? 1.2 : isListening ? 1.8 : 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-1 rounded-full bg-gradient-to-tr from-cyan-glow/0 via-cyan-glow/10 to-transparent pointer-events-none"
        />

        {/* Ring 4: Pulsing energy orb base */}
        <motion.div
          animate={{ 
            scale: isThinking ? [1, 1.1, 1] : isListening ? [1, 1.07, 1] : [1, 1.04, 1],
            opacity: isThinking ? [0.6, 0.9, 0.6] : isListening ? [0.5, 0.8, 0.5] : [0.4, 0.7, 0.4]
          }}
          transition={{ duration: isThinking ? 1 : isListening ? 1.6 : 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-2 rounded-full bg-cyan-glow/5 border border-cyan-glow/20"
          style={{ boxShadow: `0 0 25px ${coreGlow}` }}
        />

        {/* Interactive sound/data wave particles around the core */}
        {(isThinking || isListening) && (
          <>
            <motion.div
              animate={{ x: [0, 45, 0], y: [0, -35, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className={`absolute w-1 h-1 ${isThinking ? 'bg-rose-500' : 'bg-emerald-400'} rounded-full`}
            />
            <motion.div
              animate={{ x: [0, -40, 0], y: [0, 40, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              className="absolute w-1.5 h-1.5 bg-cyan-glow rounded-full shadow-[0_0_8px_#22d3ee]"
            />
            <motion.div
              animate={{ x: [0, 35, 0], y: [0, 35, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
              className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_8px_#ffffff]"
            />
          </>
        )}

        {/* Holographic scanning line moving vertically */}
        <motion.div
          animate={{ y: [-45, 45, -45] }}
          transition={{ duration: isThinking ? 2.5 : 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-4 right-4 h-[1px] bg-cyan-glow/60 shadow-[0_0_10px_rgba(34,211,238,0.8)] z-10 pointer-events-none"
        />

        {/* Central Core Chamber */}
        <div className={`relative w-[96px] h-[96px] rounded-full bg-gradient-to-b from-[#14233c]/60 to-[#050f1d]/90 p-1 flex items-center justify-center shadow-[inset_0_0_15px_rgba(0,0,0,0.8)] border transition-colors duration-500 ${isThinking ? 'border-rose-500/40' : isListening ? 'border-emerald-400/40' : 'border-cyan-glow/40'} overflow-hidden group`}>
          
          {/* Internal diagnostic UI lines */}
          <div className="absolute inset-0 border-[0.5px] border-cyan-glow/10 rounded-full scale-90 pointer-events-none"></div>
          
          {/* Pulsing visual core (Archi's avatar) */}
          <motion.div 
            animate={{ 
              scale: isThinking ? [0.93, 1.02, 0.93] : isListening ? [0.95, 1.01, 0.95] : [0.97, 1.01, 0.97],
              filter: isThinking 
                ? "drop-shadow(0 0 12px rgba(244,63,94,0.73))" 
                : isListening 
                  ? "drop-shadow(0 0 12px rgba(52,211,153,0.73))" 
                  : "drop-shadow(0 0 4px rgba(34,211,238,0.2))"
            }}
            transition={{ duration: isThinking ? 1.2 : isListening ? 1.8 : 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-full rounded-full relative z-10 overflow-hidden flex items-center justify-center p-[2px]"
          >
            <img 
              src={archibaldAvatar} 
              alt="Archi Avatar" 
              className="w-full h-full object-cover rounded-full opacity-90 scale-105"
            />
            
            {/* Holographic grid overlay */}
            <div className="absolute inset-0 bg-transparent opacity-[0.14] pointer-events-none rounded-full" style={{
              backgroundImage: `radial-gradient(circle, transparent 20%, #000 20%, #000 40%, transparent 40%, transparent 60%, #000 60%, #000 80%, transparent 80%), linear-gradient(0deg, rgba(34,211,238,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.3) 1px, transparent 1px)`,
              backgroundSize: "100% 100%, 4px 4px, 4px 4px"
            }}></div>

            {/* Cyan sweep glaze */}
            <motion.div 
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: isThinking ? 1.5 : 2.2, repeat: Infinity, ease: "linear" }}
              className={`absolute inset-0 bg-gradient-to-b from-transparent ${isThinking ? 'via-rose-500/15' : 'via-cyan-glow/15'} to-transparent pointer-events-none`}
            />
          </motion.div>

          {/* Holographic light reflections */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none z-20"></div>
        </div>

        {/* Orbiting Ring Satellites */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: isThinking ? 4 : isListening ? 6 : 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[-14px] pointer-events-none"
        >
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${isThinking ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,1)]' : isListening ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,1)]' : 'bg-cyan-glow shadow-[0_0_8px_rgba(34,211,238,1)]'}`}></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_6px_rgba(255,255,255,0.8)]"></div>
        </motion.div>
      </div>

      {/* Futuristic status bar indicators */}
      <div className="flex flex-col items-center mt-3 relative z-10">
        <div className="flex items-center gap-1.5 bg-[#051121]/50 border border-cyan-glow/15 px-3 py-1 rounded-full backdrop-blur-md">
          {/* Tiny glowing dot */}
          <motion.div 
            animate={{ 
              opacity: isThinking ? [0.4, 1, 0.4] : [0.9, 0.4, 0.9],
            }}
            transition={{ duration: isThinking ? 0.6 : 1.8, repeat: Infinity, ease: "easeInOut" }}
            className={`w-1.5 h-1.5 rounded-full ${dotColor} transition-colors duration-500`}
          />
          <span className={`font-mono text-[9px] font-bold uppercase tracking-[0.2em] transition-colors duration-500 ${labelColor}`}>
            {statusText}
          </span>
        </div>
      </div>
    </div>
  );
}
