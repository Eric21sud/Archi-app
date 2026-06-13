import { MessageSquare, Mic, Brain, FolderOpen, MoreHorizontal } from "lucide-react";
import { motion } from "motion/react";

interface BottomNavProps {
  activeTab: string;
  onTabSelected: (tabId: string) => void;
}

export function BottomNav({ activeTab, onTabSelected }: BottomNavProps) {
  const tabs = [
    { id: 'chat', icon: MessageSquare, label: 'CHAT' },
    { id: 'vocal', icon: Mic, label: 'VOCAL' },
    { id: 'memoire', icon: Brain, label: 'MÉMOIRE' },
    { id: 'projets', icon: FolderOpen, label: 'PROJETS' },
    { id: 'plus', icon: MoreHorizontal, label: 'PLUS' },
  ];

  return (
    <div className="relative z-20 pb-3 pt-1 px-4 flex-shrink-0">
      <div className="flex items-center justify-between px-1 py-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabSelected(tab.id)}
              className={`relative flex flex-col items-center justify-center p-2 transition-all duration-500 space-y-1 min-w-[52px] sm:min-w-[56px] group active:scale-95 outline-none
                ${isActive ? 'text-cyan-glow' : 'text-white/40 hover:text-white/80'}`}
            >
              {isActive && (
                <motion.div 
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-white/5 rounded-xl border border-cyan-glow/20 shadow-[0_0_10px_rgba(34,211,238,0.1)]"
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon className={`w-5 h-5 relative z-10 transition-all duration-300 ${isActive ? 'drop-shadow-[0_0_6px_rgba(34,211,238,0.6)] text-cyan-glow' : 'group-hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.4)] group-hover:-translate-y-0.5 group-hover:text-white/80'}`} strokeWidth={isActive ? 2 : 1.5} />
              <span className={`text-[9px] font-bold uppercase tracking-[0.08em] relative z-10 transition-all duration-300 ${isActive ? 'drop-shadow-[0_0_4px_rgba(34,211,238,0.8)] opacity-100 text-cyan-glow' : 'opacity-60 group-hover:opacity-100 group-hover:text-white/80'}`}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
