import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Plus, 
  Search, 
  Star, 
  X, 
  Trash2, 
  MessageSquare, 
  Home, 
  Bot, 
  BookOpen, 
  Car, 
  Compass,
  Layers,
  ChevronRight,
  Settings
} from "lucide-react";
import { Chat, Project } from "../types";

// Static premium projects matching Archibald's tracked projects
const PROJECTS: Project[] = [
  { id: "hector", name: "Hector Domotique", icon: "hector", activity: "Il y a 2h" },
  { id: "archibald", name: "Majordome Archibald", icon: "archibald", activity: "Actif" },
  { id: "lecture", name: "Application Lecture", icon: "lecture", activity: "Hier" },
  { id: "ve", name: "Comparateur VE", icon: "ve", activity: "3 fév." },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  chats: Chat[];
  currentChatId: string;
  onSelectChat: (id: string) => void;
  onNewChat: () => void;
  onToggleFavorite: (id: string) => void;
  onDeleteChat: (id: string) => void;
  onNavigateTab: (tabId: string) => void;
}

export function Sidebar({
  isOpen,
  onClose,
  chats,
  currentChatId,
  onSelectChat,
  onNewChat,
  onToggleFavorite,
  onDeleteChat,
  onNavigateTab,
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const getProjectIcon = (iconName: string) => {
    switch (iconName) {
      case "hector":
        return <Home className="w-4 h-4 text-emerald-400 group-hover:drop-shadow-[0_0_5px_rgba(52,211,153,0.5)]" />;
      case "archibald":
        return <Bot className="w-4 h-4 text-cyan-glow group-hover:drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]" />;
      case "lecture":
        return <BookOpen className="w-4 h-4 text-purple-400 group-hover:drop-shadow-[0_0_5px_rgba(192,132,252,0.5)]" />;
      case "ve":
        return <Car className="w-4 h-4 text-amber-400 group-hover:drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]" />;
      default:
        return <Layers className="w-4 h-4 text-white/50" />;
    }
  };

  // Filter conversations
  const filteredChats = chats.filter((chat) => {
    const query = searchQuery.toLowerCase();
    if (!query) return true;
    
    // Search titles
    if (chat.title.toLowerCase().includes(query)) return true;
    
    // Search within messages
    return chat.messages.some((msg) => msg.text.toLowerCase().includes(query));
  });

  // Split into favorites and normal conversations
  const favoriteChats = filteredChats.filter((c) => c.isFavorite);
  const remainingChats = filteredChats.filter((c) => !c.isFavorite);

  // Sorting: Favorites and remaining chats are sorted by latest activity timestamp (descending)
  const sortedFavorites = [...favoriteChats].sort((a, b) => b.lastActiveTime - a.lastActiveTime);
  const sortedRemaining = [...remainingChats].sort((a, b) => b.lastActiveTime - a.lastActiveTime);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur Overlay overlaying the screen */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[6px] transition-all duration-300 pointer-events-auto"
          />

          {/* Premium Sliding Side Panel */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed top-0 bottom-0 left-0 w-80 max-w-[85vw] z-50 bg-[#040c16]/95 backdrop-blur-[24px] border-r border-cyan-glow/20 flex flex-col shadow-[15px_0_40px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            {/* Hologram aesthetic ambient subtle flare top center */}
            <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-cyan-glow/30 to-transparent pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-32 bg-cyan-glow/5 blur-[50px] pointer-events-none rounded-full" />

            {/* Sidebar Header Section */}
            <div className="p-4 flex items-center justify-between border-b border-white/5 relative">
              <div className="flex flex-col">
                <span className="text-[15px] font-bold tracking-[0.14em] text-cyan-glow uppercase">
                  ARCHIBALD
                </span>
                <span className="text-[8px] text-white/55 tracking-widest uppercase font-semibold">
                  Panneau de Contrôle
                </span>
              </div>
              
              <button 
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/15 hover:border-cyan-glow/30 hover:text-cyan-glow transition-all active:scale-95 text-white/60"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Container (Scrollable) */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-6 scrollbar-thin scrollbar-thumb-white/10 select-none">
              
              {/* New Subject Action Button */}
              <div>
                <button
                  onClick={() => {
                    onNewChat();
                    onNavigateTab('chat');
                    onClose();
                  }}
                  className="w-full relative flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-glow/15 to-blue-600/10 hover:from-cyan-glow/25 hover:to-blue-600/20 border border-cyan-glow/30 hover:border-cyan-glow/50 text-white font-medium text-[13px] tracking-wide transition-all duration-300 shadow-[0_4px_15px_rgba(34,211,238,0.15)] hover:shadow-[0_4px_22px_rgba(34,211,238,0.3)] active:scale-[0.98] group"
                >
                  <Plus className="w-4 h-4 text-cyan-glow group-hover:scale-110 transition-transform" />
                  Nouvelle conversation
                </button>
              </div>

              {/* Advanced Interactive Search Bar */}
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Search className="w-3.5 h-3.5 text-white/30 group-focus-within:text-cyan-glow transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#081524]/60 hover:bg-[#081524]/85 focus:bg-[#081524]/90 border border-white/5 focus:border-cyan-glow/40 rounded-xl py-2 pl-9 pr-4 text-xs text-white placeholder-white/30 outline-none transition-all duration-300"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="absolute inset-y-0 right-3 flex items-center text-white/30 hover:text-white/60 text-[10px]"
                  >
                    Effacer
                  </button>
                )}
              </div>

              {/* Conversations History Stack */}
              <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40 font-mono">
                    Conversations
                  </span>
                  <span className="text-[9px] bg-cyan-glow/10 text-cyan-glow px-2 py-0.5 rounded-full border border-cyan-glow/20 font-mono font-bold">
                    {filteredChats.length}
                  </span>
                </div>

                {filteredChats.length === 0 ? (
                  <div className="text-center py-6 text-white/30 text-xs italic">
                    Aucun résultat trouvé
                  </div>
                ) : (
                  <div className="space-y-1.5 max-h-[200px] overflow-y-auto pr-1">
                    
                    {/* Render PINNED FAVORITES section first */}
                    {sortedFavorites.map((chat) => (
                      <motion.div
                        layoutId={`chat-item-${chat.id}`}
                        key={chat.id}
                        className={`group relative flex items-center justify-between p-2.5 rounded-xl border transition-all duration-300 cursor-pointer ${
                          chat.id === currentChatId
                            ? "bg-cyan-glow/10 border-cyan-glow/45 shadow-[0_0_12px_rgba(34,211,238,0.1)] text-cyan-glow"
                            : "bg-[#061220]/40 border-white/5 hover:border-cyan-glow/20 hover:bg-[#061220]/75 text-white/80 hover:text-white"
                        }`}
                      >
                        <div 
                          onClick={() => {
                            onSelectChat(chat.id);
                            onNavigateTab('chat');
                            onClose();
                          }}
                          className="flex-1 min-w-0 pr-2"
                        >
                          <div className="flex items-center gap-2">
                            <Star className="w-3 h-3 text-amber-400 fill-amber-400/80 flex-shrink-0" />
                            <p className="text-xs font-medium truncate tracking-wide">
                              {chat.title}
                            </p>
                          </div>
                          <span className="text-[9px] text-white/40 font-mono mt-0.5 block pl-5">
                            {chat.lastActive}
                          </span>
                        </div>

                        {/* Interactive actions */}
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleFavorite(chat.id);
                            }}
                            className="p-1 hover:text-amber-400 text-white/40 transition-colors"
                            title="Désépingler des favoris"
                          >
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteChat(chat.id);
                            }}
                            className="p-1 hover:text-rose-450 text-white/40 transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </motion.div>
                    ))}

                    {/* Divider if we have both favorites and standard ones */}
                    {sortedFavorites.length > 0 && sortedRemaining.length > 0 && (
                      <div className="h-[1px] bg-white/5 my-2 mx-1" />
                    )}

                    {/* Render REMAINING standard conversations */}
                    {sortedRemaining.map((chat) => (
                      <motion.div
                        layoutId={`chat-item-${chat.id}`}
                        key={chat.id}
                        className={`group relative flex items-center justify-between p-2.5 rounded-xl border transition-all duration-300 cursor-pointer ${
                          chat.id === currentChatId
                            ? "bg-cyan-glow/10 border-cyan-glow/45 shadow-[0_0_12px_rgba(34,211,238,0.1)] text-cyan-glow"
                            : "bg-white/0 border-transparent hover:border-white/10 hover:bg-white/5 text-white/70 hover:text-white"
                        }`}
                      >
                        <div 
                          onClick={() => {
                            onSelectChat(chat.id);
                            onNavigateTab('chat');
                            onClose();
                          }}
                          className="flex-1 min-w-0 pr-2"
                        >
                          <div className="flex items-center gap-2">
                            <MessageSquare className="w-3.5 h-3.5 text-white/30 group-hover:text-cyan-glow flex-shrink-0" />
                            <p className="text-xs font-medium truncate tracking-wide">
                              {chat.title}
                            </p>
                          </div>
                          <span className="text-[9px] text-white/30 font-mono mt-0.5 block pl-5.5">
                            {chat.lastActive}
                          </span>
                        </div>

                        {/* Actions on hover */}
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleFavorite(chat.id);
                            }}
                            className="p-1 hover:text-amber-300 text-white/30 transition-colors"
                            title="Épingler en favoris"
                          >
                            <Star className="w-3 h-3" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteChat(chat.id);
                            }}
                            className="p-1 hover:text-rose-450 text-white/30 transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Projects Archibald Container Section */}
              <div className="space-y-4 pt-2">
                <div 
                  className="flex items-center gap-1.5 px-1 cursor-pointer hover:text-cyan-glow select-none group"
                  onClick={() => {
                    onNavigateTab('projets');
                    onClose();
                  }}
                >
                  <Compass className="w-3.5 h-3.5 text-cyan-glow" />
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40 group-hover:text-cyan-glow transition-colors font-mono">
                    Projets Actifs
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {PROJECTS.map((project) => (
                    <div
                      key={project.id}
                      onClick={() => {
                        onNavigateTab('projets');
                        onClose();
                      }}
                      className="group flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-[#071321]/50 to-transparent border border-white/5 hover:border-cyan-glow/20 hover:bg-[#071321]/80 transition-all duration-300 cursor-pointer animate-none"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-[#0c1c2e]/70 border border-white/10 flex items-center justify-center group-hover:border-cyan-glow/30 transition-colors">
                          {getProjectIcon(project.icon)}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-semibold text-white/80 group-hover:text-white truncate">
                            {project.name}
                          </h4>
                          <span className="text-[9px] text-white/30 font-mono">
                            Modifié : {project.activity}
                          </span>
                        </div>
                      </div>
                      
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-glow/40 group-hover:bg-cyan-glow shadow-[0_0_4px_rgba(0,229,255,0.4)] transition-all" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Secondary elements (Documents, Agents, Réglages) */}
              <div className="space-y-3 pt-4 border-t border-white/5">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40 px-1 font-mono">
                  Navigation Avancée
                </span>

                <div className="grid grid-cols-1 gap-2">
                  <div
                    onClick={() => {
                      onNavigateTab('plus');
                      onClose();
                    }}
                    className="group flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-[#071321]/30 to-transparent border border-white/5 hover:border-cyan-glow/20 hover:bg-[#071321]/80 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#0c1c2e]/60 border border-white/10 flex items-center justify-center group-hover:border-blue-400/20 transition-colors">
                        <BookOpen className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-white/80 group-hover:text-white">Documents</h4>
                        <span className="text-[8px] text-white/30 font-mono">Index et ressources</span>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-white/20 group-hover:text-cyan-glow transition-transform group-hover:translate-x-0.5" />
                  </div>

                  <div
                    onClick={() => {
                      onNavigateTab('plus');
                      onClose();
                    }}
                    className="group flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-[#071321]/30 to-transparent border border-white/5 hover:border-cyan-glow/20 hover:bg-[#071321]/80 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#0c1c2e]/60 border border-white/10 flex items-center justify-center group-hover:border-purple-400/20 transition-colors">
                        <Bot className="w-4 h-4 text-purple-400" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-white/80 group-hover:text-white">Agents IA</h4>
                        <span className="text-[8px] text-white/30 font-mono">Rôles cognitifs d'excellence</span>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-white/20 group-hover:text-cyan-glow transition-transform group-hover:translate-x-0.5" />
                  </div>

                  <div
                    onClick={() => {
                      onNavigateTab('plus');
                      onClose();
                    }}
                    className="group flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-[#071321]/30 to-transparent border border-white/5 hover:border-cyan-glow/20 hover:bg-[#071321]/80 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#0c1c2e]/60 border border-white/10 flex items-center justify-center group-hover:border-cyan-glow/20 transition-colors">
                        <Settings className="w-4 h-4 text-cyan-glow" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-white/80 group-hover:text-white">Réglages système</h4>
                        <span className="text-[8px] text-white/30 font-mono">Design & synthèse de voix</span>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-white/20 group-hover:text-cyan-glow transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>

            </div>

            {/* Sidebar Footer Panel */}
            <div className="p-4 border-t border-white/5 bg-[#030911]/45 flex items-center justify-between text-[11px] text-white/40">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
                <span className="font-mono text-[9px] uppercase tracking-wider">Archi-Noyau v4.1</span>
              </div>
              <span className="font-mono text-[9px]">Eric v.p.</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
