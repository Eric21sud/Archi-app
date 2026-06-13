import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  depth: number;
  speed: number;
  xOffsetNormal: number;
  xOffsetThinking: number;
}

export function Background({ isThinking }: { isThinking: boolean }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate particles with depth layer properties
    const newParticles = Array.from({ length: 35 }).map((_, i) => {
      const depth = Math.random();
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        depth, // 0 to 1 value for parallax/blur depth
        speed: Math.random() * 15 + 15,
        xOffsetNormal: (Math.random() * 8 - 4) * depth,
        xOffsetThinking: Math.random() * 20 - 10,
      };
    });
    setParticles(newParticles);
  }, []);

  return (
    <div 
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#02050a]"
      style={{ backgroundImage: 'radial-gradient(circle at 50% -10%, #0c2136 0%, #02050a 60%), radial-gradient(circle at 80% 80%, #07121d 0%, #02050a 50%)' }}
    >
      {/* Deep holographic grid fading out */}
      <div 
        className="absolute inset-0 opacity-[0.022] pointer-events-none mix-blend-screen scale-[1.5]" 
        style={{ backgroundImage: 'linear-gradient(rgba(0, 240, 255, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 1) 1px, transparent 1px)', backgroundSize: '60px 60px', transform: 'perspective(1000px) rotateX(60deg) translateY(-100px)' }}
      />

      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#020409]/10 via-transparent to-[#020409]/95 pointer-events-none"></div>

      {/* Volumetric Lights */}
      <div className="absolute w-[800px] h-[500px] bg-[#0c2136]/20 rounded-[100%] top-0 left-1/2 -translate-x-1/2 blur-[120px] pointer-events-none opacity-80 mix-blend-screen" />
      <div className="absolute w-[800px] h-[600px] bg-cyan-900/10 rounded-[100%] top-[20%] left-1/2 -translate-x-1/2 blur-[140px] pointer-events-none opacity-40 mix-blend-screen" />
      <div className="absolute w-[600px] h-[600px] bg-sky-800/10 rounded-[100%] bottom-0 right-0 blur-[150px] pointer-events-none opacity-40 mix-blend-lighten" />

      {/* Subtle depth point lights */}
      <div className="absolute w-2 h-2 bg-cyan-glow/80 rounded-full top-[20%] left-[20%] opacity-40 blur-[4px] shadow-[0_0_15px_rgba(0,229,255,0.8)]" />
      <div className="absolute w-1.5 h-1.5 bg-cyan-glow/70 rounded-full top-[70%] right-[30%] opacity-30 blur-[2px] shadow-[0_0_10px_rgba(0,229,255,0.8)]" />
      <div className="absolute w-3 h-3 bg-cyan-glow/60 rounded-full top-[40%] right-[15%] opacity-20 blur-[6px] shadow-[0_0_20px_rgba(0,229,255,0.6)]" />

      {/* Primary intelligent presence glow */}
      <motion.div 
        initial={{ opacity: 0.1, scale: 0.9 }}
        animate={{ 
          opacity: isThinking ? 0.3 : 0.15,
          scale: isThinking ? 1.3 : 1,
        }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="absolute top-[25%] left-[-10%] w-[450px] h-[450px] bg-cyan-glow/15 rounded-full blur-[120px] pointer-events-none mix-blend-screen"
      />

      {/* Floating particles - Parallax layers */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ 
            x: `${p.x}vw`, 
            y: `${p.y}vh`, 
            opacity: p.depth * 0.4 + 0.1 
          }}
          animate={{
            y: [`${p.y}vh`, `${p.y - (10 + p.depth * 10)}vh`, `${p.y}vh`],
            x: isThinking 
               ? [`${p.x}vw`, `${p.x + p.xOffsetThinking}vw`, `${p.x}vw`] 
               : [`${p.x}vw`, `${p.x + p.xOffsetNormal}vw`, `${p.x}vw`],
            opacity: isThinking ? [p.depth * 0.3, p.depth * 0.8, p.depth * 0.3] : [p.depth * 0.2, p.depth * 0.5, p.depth * 0.2],
          }}
          transition={{
            duration: p.speed,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute rounded-full bg-cyan-glow"
          style={{ 
            width: p.size, 
            height: p.size,
            filter: `blur(${p.depth < 0.3 ? 3 : p.depth < 0.7 ? 1 : 0}px)`,
            boxShadow: p.depth > 0.7 ? '0 0 10px rgba(34,211,238,0.5)' : 'none'
          }}
        />
      ))}
    </div>
  );
}
