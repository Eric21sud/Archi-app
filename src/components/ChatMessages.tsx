import { Check } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { Message } from "../types";
import archibaldAvatar from "../assets/images/archibald_avatar_1780067466607.png";
import React, { useEffect, useRef } from "react";
import { CentralHologram, HologramStatus } from "./CentralHologram";

type Props = {
  key?: React.Key;
  message: Message;
};

export function ChatMessages({ 
  messages, 
  isThinking, 
  hologramStatus 
}: { 
  messages: Message[], 
  isThinking: boolean, 
  hologramStatus: HologramStatus 
}) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Set up Framer Motion scroll tracker on the messages container
  const { scrollY } = useScroll({ container: containerRef });

  // Map vertical scroll offset to opacity, scale, and slide up translation
  const opacity = useTransform(scrollY, [0, 150], [1, 0]);
  const scale = useTransform(scrollY, [0, 150], [1, 0.82]);
  const y = useTransform(scrollY, [0, 150], [0, -40]);
  const pointerEvents = useTransform(scrollY, (value) => value > 120 ? "none" : "auto");

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  return (
    <div 
      ref={containerRef}
      className="relative z-20 flex-1 overflow-y-auto px-4 sm:px-5 pb-6 flex flex-col pt-2 scrollbar-hide scroll-smooth"
    >
      {/* Interactive visual presence representing Archi's holographic physical body */}
      <motion.div style={{ opacity, scale, y, pointerEvents }} className="flex-shrink-0 origin-center">
        <CentralHologram status={hologramStatus} />
      </motion.div>

      {messages.map((msg, index) => {
        const prevMsg = index > 0 ? messages[index - 1] : null;
        let showAvatar = true;
        if (prevMsg && msg.sender === prevMsg.sender) {
          showAvatar = false;
        }
        return <MessageBubble key={msg.id} message={msg} showAvatar={showAvatar} />
      })}
      {isThinking && (
        <ThinkingBubble showAvatar={messages.length === 0 || messages[messages.length - 1].sender !== 'archi'} />
      )}
      <div ref={bottomRef} className="h-6 flex-shrink-0" />
    </div>
  );
}

function MessageBubble({ message, showAvatar = true }: { key?: React.Key; message: Message; showAvatar?: boolean }) {
  const isUser = message.sender === 'user';

  if (isUser) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 15, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={`flex flex-col items-end w-full ${showAvatar ? 'mt-6' : 'mt-2'}`}
      >
        <div className="w-fit min-w-[100px] max-w-[85%] px-5 py-3 rounded-[1.6rem] rounded-tr-md bg-[#0a192f]/40 backdrop-blur-[40px] border border-cyan-glow/20 border-r-cyan-glow/40 border-t-cyan-glow/40 text-[14px] shadow-[0_15px_30px_-5px_rgba(0,0,0,0.6)] text-white relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-l from-cyan-glow/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-l from-cyan-glow/50 via-cyan-glow/10 to-transparent pointer-events-none"></div>
          <span className="relative z-10 leading-relaxed drop-shadow-md font-light inline-block">{message.text}</span>
        </div>
        <div className="flex items-center gap-1 mt-1.5 text-white/50 text-[10px] uppercase font-mono tracking-wider mr-2">
          <span>{message.timestamp}</span>
          <Check className="w-3.5 h-3.5 text-cyan-glow opacity-90" />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`flex flex-col w-full relative pl-6 sm:pl-8 group/msg ${showAvatar ? 'pt-4 mt-2' : 'pt-1 mt-1'}`}
    >
      <div className={`w-fit min-w-[200px] max-w-[90%] sm:max-w-[85%] px-5 pb-4 rounded-[1.6rem] ${showAvatar ? 'pt-8 rounded-tl-md' : 'pt-4'} bg-[#051121]/40 backdrop-blur-[40px] border border-cyan-glow/20 text-[14px] relative shadow-[0_15px_30px_-5px_rgba(0,0,0,0.8)] text-white group-hover/msg:border-cyan-glow/30 transition-colors duration-500`}>
        
        {/* Holographic inner reflection */}
        <div className={`absolute inset-0 bg-gradient-to-br from-cyan-glow/10 via-transparent to-transparent opacity-80 pointer-events-none rounded-[1.6rem] ${showAvatar ? 'rounded-tl-md' : ''}`}></div>
        <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none rounded-[1.6rem] ${showAvatar ? 'rounded-tl-md' : ''}`}></div>
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-cyan-glow/50 via-cyan-glow/10 to-transparent pointer-events-none"></div>

        {/* Avatar and Label overlapping the top-left */}
        {showAvatar && (
        <div className="absolute -top-[17px] -left-[17px] flex items-center gap-3.5 pointer-events-none">
          <div className="relative w-[44px] h-[44px] flex-shrink-0 shadow-[0_0_15px_rgba(0,200,255,0.2)] rounded-full group/avatar z-20 pointer-events-auto">
            {/* Subtle breathing glow */}
            <motion.div 
              animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.08, 1] }} 
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-1.5 rounded-full border border-cyan-glow/40 blur-[2px]"
            ></motion.div>
            
            {/* Soft particles converging */}
            <motion.div 
               animate={{ x: [8, 0], y: [8, 0], opacity: [0, 0.8, 0], scale: [0.5, 1, 0.5] }}
               transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.2 }}
               className="absolute -top-1 -right-1 w-1 h-1 bg-cyan-glow rounded-full blur-[0.5px]" />
            <motion.div 
               animate={{ x: [-10, 0], y: [12, 0], opacity: [0, 0.8, 0], scale: [0.5, 1, 0.5] }}
               transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 0.8 }}
               className="absolute -bottom-1.5 -left-1 w-1 h-1 bg-cyan-glow rounded-full blur-[0.5px]" />

            <div className="absolute -inset-0.5 rounded-full border border-cyan-glow/60 opacity-80 z-10 group-hover/avatar:scale-105 transition-transform duration-500"></div>
            <div className="w-[44px] h-[44px] bg-gradient-to-b from-[#1a1f26] to-[#0a0f18] rounded-full flex items-center justify-center shadow-inner relative overflow-hidden z-20">
              <img src={archibaldAvatar} alt="Archi" className="w-full h-full object-cover rounded-full opacity-90 scale-105" />
              {/* Holographic reflection across the avatar */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-cyan-glow/10 to-transparent rotate-45 pointer-events-none mix-blend-screen opacity-50"></div>
            </div>
          </div>
          
          {/* Author Label */}
          <div className="flex items-center gap-1.5 font-mono tracking-wider pt-2 opacity-90">
            <motion.div 
               animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.2, 0.9] }} 
               transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
               className="w-1 h-1 rounded-full bg-cyan-glow shadow-[0_0_6px_rgba(0,229,255,1)]"
            />
            <span className="text-cyan-glow uppercase tracking-widest font-display text-[10.5px] font-bold drop-shadow-[0_0_4px_rgba(0,229,255,0.4)]">Archi</span>
          </div>
        </div>
        )}
        
        {/* Text Content */}
        <div className={`relative z-10 ${showAvatar ? 'mt-0.5' : 'mt-0'} mb-1`}>
          <motion.p 
            initial={showAvatar ? { opacity: 0, y: 5 } : {}}
            animate={showAvatar ? { opacity: 1, y: 0 } : {}}
            transition={showAvatar ? { duration: 0.5 } : {}}
            className="leading-relaxed text-slate-50 drop-shadow-md font-light w-full break-words"
          >
            {message.text}
          </motion.p>
        </div>

        <div className="absolute bottom-2.5 right-4 font-mono tracking-wider z-10">
          <span className="text-white/30 text-[10px] uppercase">{message.timestamp}</span>
        </div>
      </div>
    </motion.div>
  );
}

function ThinkingBubble({ showAvatar = true }: { showAvatar?: boolean }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`flex flex-col w-full relative pl-6 sm:pl-8 group/msg ${showAvatar ? 'pt-4 mt-2' : 'pt-1 mt-1'}`}
    >
      <div className={`w-fit min-w-[200px] max-w-[90%] sm:max-w-[85%] px-5 pb-4 rounded-[1.6rem] ${showAvatar ? 'pt-8 rounded-tl-md' : 'pt-4'} bg-[#051121]/40 backdrop-blur-[40px] border border-cyan-glow/20 relative shadow-[0_15px_30px_-5px_rgba(0,0,0,0.8)]`}>
        
        <div className={`absolute inset-0 bg-gradient-to-br from-cyan-glow/10 via-transparent to-transparent opacity-80 pointer-events-none rounded-[1.6rem] ${showAvatar ? 'rounded-tl-md' : ''}`}></div>
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-cyan-glow/40 via-cyan-glow/10 to-transparent pointer-events-none"></div>

        {/* Avatar overlapping top-left */}
        {showAvatar && (
        <div className="absolute -top-[17px] -left-[17px] flex items-center gap-3.5 pointer-events-none">
          <div className="relative w-[44px] h-[44px] flex-shrink-0 z-20 pointer-events-auto group/avatar">
            <motion.div 
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-2 rounded-full border border-cyan-glow/40 blur-[2px]"
            ></motion.div>
            <motion.div 
              animate={{ boxShadow: ["0 0 10px rgba(0,240,255,0.4)", "0 0 20px rgba(0,240,255,0.8)", "0 0 10px rgba(0,240,255,0.4)"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-0.5 rounded-full border border-cyan-glow/70"
            ></motion.div>
            {/* Particles for thinking... */}
            <motion.div 
               animate={{ y: [8, -4, 8], opacity: [0, 1, 0] }}
               transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
               className="absolute top-0 left-[0px] w-1 h-1 bg-cyan-glow rounded-full blur-[1px]" />
            <motion.div 
               animate={{ y: [12, -8, 12], opacity: [0, 1, 0] }}
               transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
               className="absolute bottom-0 right-[0px] w-1.5 h-1.5 bg-cyan-glow rounded-full blur-[1px]" />

            <div className="w-[44px] h-[44px] bg-gradient-to-b from-[#1a1f26] to-[#0a0f18] rounded-full flex items-center justify-center shadow-inner relative overflow-hidden z-10 group-hover/avatar:opacity-100 transition-opacity">
              <img src={archibaldAvatar} alt="Archi" className="w-full h-full object-cover rounded-full opacity-90 scale-105" />
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-cyan-glow/20 to-transparent rotate-45 pointer-events-none mix-blend-screen opacity-70"></div>
            </div>
          </div>
        </div>
        )}

        {/* Thinking Content */}
        <div className={`flex flex-col items-start space-y-2 relative z-10 pl-1 ${showAvatar ? 'mt-0.5' : 'mt-0'}`}>
          <p className="text-cyan-glow/90 text-[12px] font-medium tracking-tight drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">Archi analyse votre demande...</p>
          <div className="flex space-x-1.5 ml-1">
            <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0 }} className="w-1.5 h-1.5 bg-cyan-glow rounded-full shadow-[0_0_5px_rgba(0,229,255,0.8)]"></motion.div>
            <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.15 }} className="w-1.5 h-1.5 bg-cyan-glow/80 rounded-full shadow-[0_0_5px_rgba(0,229,255,0.6)]"></motion.div>
            <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.3 }} className="w-1.5 h-1.5 bg-cyan-glow/40 rounded-full shadow-[0_0_5px_rgba(0,229,255,0.4)]"></motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
