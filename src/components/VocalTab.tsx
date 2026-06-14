import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mic, MicOff, Volume2, VolumeX, Radio, Power } from "lucide-react";

interface VocalTabProps {
  onBackToChat: () => void;
}

export function VocalTab({ onBackToChat }: VocalTabProps) {
  const [isListening, setIsListening] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [statusText, setStatusText] = useState("Archibald est à votre écoute attentive...");
  const [dbLevel, setDbLevel] = useState<number[]>(Array(12).fill(0));

  // Simulate audio wave level movements
  useEffect(() => {
    if (!isListening || isMuted) {
      setDbLevel(Array(12).fill(0));
      return;
    }

    const interval = setInterval(() => {
      setDbLevel(
        Array(12)
          .fill(0)
          .map(() => Math.floor(Math.random() * 45) + 5)
      );
    }, 120);

    return () => clearInterval(interval);
  }, [isListening, isMuted]);

  const handleMicClick = () => {
    if (isMuted) {
      setIsMuted(false);
      setStatusText("Archibald est de nouveau à votre écoute...");
    } else {
      setIsListening(!isListening);
      if (isListening) {
        setStatusText("Session vocale en pause.");
      } else {
        setStatusText("Archibald est à votre écoute attentive...");
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-6 py-4 select-none relative overflow-hidden">
      {/* Upper Title Section */}
      <div className="text-center mt-3 z-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#051121]/50 border border-cyan-glow/15 rounded-full backdrop-blur-md mb-2"
        >
          <Radio className="w-3.5 h-3.5 text-cyan-glow animate-pulse" />
          <span className="font-mono text-[9px] font-bold tracking-[0.2em] text-cyan-glow uppercase">
            CANAL ACOUSTIQUE SÉCURISÉ
          </span>
        </motion.div>
        
        <p className="text-white/80 text-sm font-medium mt-1">
          {statusText}
        </p>
      </div>

      {/* Central Immersive Soundwave Visualizer & Core */}
      <div className="relative flex items-center justify-center my-6 flex-1 min-h-[250px]">
        {/* Ambient Holographic Glow */}
        <div className="absolute w-[240px] h-[240px] bg-cyan-glow/5 blur-[50px] rounded-full pointer-events-none" />

        <div className="relative w-64 h-64 flex items-center justify-center">
          {/* Concentric Wave 3: Outer soft pulse */}
          {isListening && !isMuted && (
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full border border-cyan-glow/10 bg-cyan-glow/[0.01]"
            />
          )}

          {/* Concentric Wave 2: Middle pulse */}
          {isListening && !isMuted && (
            <motion.div
              animate={{ scale: [1, 1.25, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute inset-8 rounded-full border border-cyan-glow/20 bg-cyan-glow/[0.02]"
            />
          )}

          {/* Concentric Wave 1: Inner dynamic ripple */}
          <motion.div
            animate={{
              scale: isListening && !isMuted ? [0.95, 1.12, 0.95] : 1,
              borderColor: isMuted ? "rgba(239, 68, 68, 0.2)" : "rgba(34, 211, 238, 0.3)"
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-16 rounded-full border border-cyan-glow/30 bg-cyan-[#0e1f35]/20 backdrop-blur-sm"
          />

          {/* Sovereign Core Button */}
          <button
            onClick={handleMicClick}
            className={`relative w-28 h-28 rounded-full flex flex-col items-center justify-center border-2 transition-all duration-500 shadow-[0_0_30px_rgba(0,0,0,0.5)] active:scale-95 group z-10 outline-none
              ${
                isMuted
                  ? "bg-rose-950/20 border-rose-500/80 hover:border-rose-500 hover:shadow-[0_0_20px_rgba(244,63,94,0.3)]"
                  : !isListening
                  ? "bg-amber-950/20 border-amber-500/80 hover:border-amber-500 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                  : "bg-gradient-to-b from-[#0c1d33] to-[#040a12] border-cyan-glow hover:border-cyan-glow hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]"
              }`}
          >
            {/* Scanning Laser Line */}
            {isListening && !isMuted && (
              <motion.div
                animate={{ y: [-40, 40, -40] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-3 right-3 h-[1px] bg-cyan-glow/60 shadow-[0_0_8px_rgba(34,211,238,0.8)] pointer-events-none"
              />
            )}

            {/* Icon Render */}
            <AnimatePresence mode="wait">
              {isMuted ? (
                <motion.div
                  key="muted"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                >
                  <MicOff className="w-10 h-10 text-rose-500" />
                </motion.div>
              ) : (
                <motion.div
                  key="active"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className={isListening ? "animate-pulse" : ""}
                >
                  <Mic className={`w-10 h-10 ${isListening ? "text-cyan-glow" : "text-amber-500"}`} />
                </motion.div>
              )}
            </AnimatePresence>

            <span className={`text-[8px] font-mono font-bold tracking-[0.15em] mt-1.5 uppercase ${isMuted ? 'text-rose-450' : 'text-cyan-glow/60 group-hover:text-cyan-glow'}`}>
              {isMuted ? "MUTÉ" : isListening ? "ÉCOUTE SI" : "EN PAUSE"}
            </span>
          </button>
        </div>
      </div>

      {/* Database Decibel Audio Levels Equalizer bar */}
      <div className="h-12 flex items-center justify-center gap-1 px-4 z-10">
        {dbLevel.map((height, idx) => (
          <motion.div
            key={idx}
            animate={{ height: `${height}px` }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`w-[3px] rounded-full transition-colors duration-500
              ${isMuted ? 'bg-rose-500/20' : !isListening ? 'bg-amber-500/20' : 'bg-gradient-to-t from-cyan-glow/30 to-cyan-glow'}`}
          />
        ))}
      </div>

      {/* Bottom Command Center */}
      <div className="flex flex-col items-center gap-4 pt-2 pb-5 z-10">
        {/* Connection Frequency Tag */}
        <div className="flex items-center gap-2 bg-white/[0.02] border border-white/5 rounded-full px-4 py-1.5 backdrop-blur-md">
          <div className={`w-1.5 h-1.5 rounded-full ${isMuted ? 'bg-rose-500' : 'bg-green-400'} animate-pulse shadow-[0_0_6px_#34d399]`} />
          <span className="font-mono text-[8px] tracking-[0.1em] text-white/50 uppercase">
            FRÉQUENCE SYNCHRONISÉE : HIERARCHY-HOLO
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-6 mt-1">
          {/* Toggle mute state */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all active:scale-95
              ${isMuted 
                ? "bg-rose-950/20 border-rose-500/40 text-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.2)]" 
                : "bg-white/5 border-white/10 hover:border-cyan-glow/20 text-white/80 hover:text-cyan-glow"}`}
            title={isMuted ? "Réactiver l'écoute" : "Garder le micro muet"}
          >
            {isMuted ? <MicOff className="w-4.5 h-4.5" /> : <Mic className="w-4.5 h-4.5" />}
          </button>

          {/* Stop Session & Return to Chat */}
          <button
            onClick={onBackToChat}
            className="w-14 h-14 rounded-full bg-rose-500/10 border-2 border-rose-500 flex items-center justify-center hover:bg-rose-500/20 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all duration-300 active:scale-95"
            title="Arrêter la session"
          >
            <Power className="w-5 h-5 text-rose-500" />
          </button>

          {/* Toggle speaker state */}
          <button
            onClick={() => setIsSpeakerOn(!isSpeakerOn)}
            className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all active:scale-95
              ${!isSpeakerOn 
                ? "bg-rose-950/20 border-rose-500/40 text-rose-500" 
                : "bg-white/5 border-white/10 hover:border-cyan-glow/20 text-white/80 hover:text-cyan-glow"}`}
            title={isSpeakerOn ? "Désactiver le haut-parleur" : "Activer le haut-parleur"}
          >
            {isSpeakerOn ? <Volume2 className="w-4.5 h-4.5" /> : <VolumeX className="w-4.5 h-4.5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
