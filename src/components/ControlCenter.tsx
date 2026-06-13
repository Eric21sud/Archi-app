import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  Cpu, 
  Brain, 
  Users, 
  BarChart3, 
  SlidersHorizontal, 
  Check, 
  Plus, 
  Trash2, 
  Sparkles, 
  Volume2, 
  Network, 
  Database,
  RefreshCw,
  Crown
} from "lucide-react";

export type ArchibaldState = 'idle' | 'listening' | 'analyzing' | 'executing' | 'replying';

interface ControlCenterProps {
  isOpen: boolean;
  onClose: () => void;
  currentState: ArchibaldState;
  accountTier: 'free' | 'premium';
  setAccountTier: (tier: 'free' | 'premium') => void;
  selectedModel: string;
  setSelectedModel: (model: string) => void;
}

export function ControlCenter({
  isOpen,
  onClose,
  currentState,
  accountTier,
  setAccountTier,
  selectedModel,
  setSelectedModel,
}: ControlCenterProps) {
  
  // Real-time memory state stored in local storage to keep it persistent and realistic
  const [memoryItems, setMemoryItems] = useState<string[]>(() => {
    const saved = localStorage.getItem("archibald_memories");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return [
      "Monsieur Éric préfère le café court sans sucre à 8h00.",
      "Identifiant domotique Hector : Serveur local configuré sur l'IP 192.168.1.45.",
      "Recherche en cours : Suivi du comparatif de véhicules électriques pour Tesla Model Y."
    ];
  });

  const [newMemory, setNewMemory] = useState("");

  // Sound and settings preferences
  const [voiceRate, setVoiceRate] = useState<number>(() => {
    return Number(localStorage.getItem("archibald_voice_rate") || "1.0");
  });
  const [voicePitch, setVoicePitch] = useState<number>(() => {
    return Number(localStorage.getItem("archibald_voice_pitch") || "1.0");
  });
  const [selectedVoice, setSelectedVoice] = useState<string>(() => {
    return localStorage.getItem("archibald_selected_voice") || "Holographique Masculin (Défaut)";
  });
  const [autoRouting, setAutoRouting] = useState<boolean>(true);
  const [hectorSync, setHectorSync] = useState<boolean>(true);

  // Keep memory items synced to local storage
  useEffect(() => {
    localStorage.setItem("archibald_memories", JSON.stringify(memoryItems));
  }, [memoryItems]);

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemory.trim()) return;
    setMemoryItems(prev => [newMemory.trim(), ...prev]);
    setNewMemory("");
  };

  const handleDeleteMemory = (indexToDelete: number) => {
    setMemoryItems(prev => prev.filter((_, i) => i !== indexToDelete));
  };

  const handleClearAllMemory = () => {
    if (window.confirm("Voulez-vous vraiment effacer toute la mémoire d'Archibald ? Cette action est irréversible.")) {
      setMemoryItems([]);
    }
  };

  // Map internal state to user language & beautiful colors
  const getStateMeta = (state: ArchibaldState) => {
    switch (state) {
      case 'listening':
        return {
          label: "À l'écoute",
          colorClass: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
          glowClass: "bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.6)]",
          dotColor: "bg-emerald-400",
          desc: "Archibald capture l'audio ou capte la frappe active de Monsieur Éric."
        };
      case 'analyzing':
        return {
          label: "Analyse en cours",
          colorClass: "text-pink-400 bg-pink-500/10 border-pink-500/20",
          glowClass: "bg-pink-400 shadow-[0_0_15px_rgba(244,114,182,0.6)]",
          dotColor: "bg-pink-400",
          desc: "Syntonisation des modèles linguistiques et recherche cognitive."
        };
      case 'executing':
        return {
          label: "Exécution d'une tâche",
          colorClass: "text-orange-400 bg-orange-500/10 border-orange-500/20",
          glowClass: "bg-orange-400 shadow-[0_0_15px_rgba(251,146,60,0.6)]",
          dotColor: "bg-orange-400",
          desc: "Archibald intercepte l'API ou déploie les scripts de commande."
        };
      case 'replying':
        return {
          label: "Réponse en cours",
          colorClass: "text-white bg-white/10 border-white/20",
          glowClass: "bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]",
          dotColor: "bg-white",
          desc: "Synthèse vocale et rendu de la réponse sur le canal."
        };
      case 'idle':
      default:
        return {
          label: "En veille",
          colorClass: "text-cyan-glow bg-cyan-glow/10 border-cyan-glow/20",
          glowClass: "bg-cyan-glow shadow-[0_0_15px_rgba(34,211,238,0.6)]",
          dotColor: "bg-cyan-glow",
          desc: "Système au repos. Prêt à tout moment pour Monsieur Éric."
        };
    }
  };

  const stateMeta = getStateMeta(currentState);

  const availableModels = [
    { id: "auto", name: "Automatique (recommandé)" },
    { id: "gpt", name: "GPT-4o (Créativité)" },
    { id: "gemini", name: "Gemini 1.5 Pro (Raisonnement)" },
    { id: "claude", name: "Claude 3.5 Sonnet (Précision)" },
    { id: "deepseek", name: "DeepSeek-R1 (Raisonnement profond)" },
    { id: "mistral", name: "Mistral Large (Souveraineté)" },
  ];

  const getActiveModelName = () => {
    if (accountTier === 'free' || selectedModel === 'auto') {
      const activeRotation = ["Claude 3.5 Sonnet", "Gemini 1.5 Pro", "GPT-4o"];
      // determine a model based on local timestamp to make it realistic and dynamic
      const idx = Math.floor(Date.now() / 3600000) % activeRotation.length;
      return `${activeRotation[idx]} (Choix Auto)`;
    }
    const found = availableModels.find(m => m.id === selectedModel);
    return found ? found.name : "Claude 3.5 Sonnet";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Glass Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-45 bg-black/60 backdrop-blur-[6px] pointer-events-auto"
          />

          {/* Right Sliding Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 26, stiffness: 220 }}
            className="fixed top-0 bottom-0 right-0 w-85 max-w-[88vw] z-50 bg-[#020810]/95 backdrop-blur-[24px] border-l border-cyan-glow/20 flex flex-col shadow-[-15px_0_40px_rgba(0,0,0,0.9)] overflow-hidden font-sans"
          >
            {/* Ambient Cyan glow inside control center */}
            <div className="absolute top-0 right-12 left-12 h-[1px] bg-gradient-to-r from-transparent via-cyan-glow/25 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-52 h-52 bg-cyan-glow/5 blur-[70px] pointer-events-none rounded-full" />

            {/* Header Section */}
            <div className="p-4 flex items-center justify-between border-b border-white/5 relative">
              <div className="flex flex-col">
                <span className="text-[13px] font-bold tracking-[0.15em] text-cyan-glow uppercase flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  CENTRE DE CONTRÔLE
                </span>
                <span className="text-[8px] text-white/50 tracking-widest uppercase font-semibold">
                  MÉTRIQUES & SYSTÈME COGNITIF
                </span>
              </div>
              
              <button 
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/15 hover:border-cyan-glow/30 hover:text-cyan-glow transition-all active:scale-95 text-white/60"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Account Switcher (Free/Premium Switcher for Demo) */}
            <div className="mx-4 mt-4 px-3 py-2 bg-[#081322]/80 rounded-xl border border-white/5 flex items-center justify-between shadow-inner">
              <div className="flex items-center gap-1.5">
                <Crown className={`w-3.5 h-3.5 ${accountTier === 'premium' ? 'text-amber-400 fill-amber-400/20' : 'text-white/40'}`} />
                <span className="text-[10px] font-semibold text-white/70 uppercase tracking-wider">Abonnement</span>
              </div>
              
              <div className="flex bg-black/40 p-0.5 rounded-lg border border-white/5">
                <button
                  onClick={() => setAccountTier('free')}
                  className={`text-[9px] font-bold uppercase py-1 px-2.5 rounded-md transition-all ${
                    accountTier === 'free' 
                      ? 'bg-white/10 text-white shadow-sm' 
                      : 'text-white/40 hover:text-white/70'
                  }`}
                >
                  Gratuit
                </button>
                <button
                  onClick={() => setAccountTier('premium')}
                  className={`text-[9px] font-bold uppercase py-1 px-2.5 rounded-md transition-all flex items-center gap-1 ${
                    accountTier === 'premium' 
                      ? 'bg-gradient-to-r from-amber-500/20 to-amber-700/20 border border-amber-500/30 text-amber-300 shadow-md' 
                      : 'text-white/40 hover:text-amber-300/75'
                  }`}
                >
                  Premium
                </button>
              </div>
            </div>

            {/* Scrollable Container */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-5 scrollbar-thin scrollbar-thumb-white/10">
              
              {/* 1. ÉTAT D'ARCHIBALD (Living Pulse State Display) */}
              <div className="space-y-2">
                <span className="text-[9px] uppercase tracking-[0.18em] font-bold text-white/40 font-mono">
                  État d'Archibald
                </span>
                <div className={`p-3 rounded-xl border flex flex-col gap-2 transition-all duration-500 relative overflow-hidden ${stateMeta.colorClass}`}>
                  {/* Glowing background flow indicator */}
                  <div className="absolute -right-4 -bottom-4 w-12 h-12 rounded-full opacity-[0.03] bg-white" />
                  
                  <div className="flex items-center gap-3">
                    <div className="relative flex items-center justify-center">
                      <span className={`animate-ping absolute inline-flex h-3 w-3 rounded-full opacity-75 ${stateMeta.dotColor}`} />
                      <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${stateMeta.dotColor}`} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-[0.05em]">
                      {stateMeta.label}
                    </span>
                  </div>
                  <p className="text-[10.5px] leading-relaxed text-white/75 font-sans">
                    {stateMeta.desc}
                  </p>
                </div>
              </div>

              {/* 2. INTELLIGENCE (LLM model selection) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-[0.18em] font-bold text-white/40 font-mono flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-cyan-glow" />
                    Intelligence (LLM)
                  </span>
                  <span className="text-[8px] uppercase tracking-wider font-bold text-white/50 px-2 py-0.5 rounded bg-white/5 font-mono">
                    {accountTier === 'premium' ? "Premium" : "Gratuit"}
                  </span>
                </div>

                {accountTier === 'free' ? (
                  // Free User view
                  <div className="p-3 bg-[#061220]/50 border border-white/5 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-white/80">Mode Automatique</span>
                      <span className="text-[8px] bg-cyan-glow/10 text-cyan-glow border border-cyan-glow/20 px-1.5 py-0.5 rounded font-mono font-bold">ACTIF</span>
                    </div>
                    <p className="text-[10px] text-white/50 leading-relaxed font-sans">
                      "Archibald sélectionne automatiquement le meilleur modèle selon la complexité de votre tâche."
                    </p>
                    <div className="h-[1px] bg-white/5 my-1" />
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-white/40">Actuellement sollicité :</span>
                      <span className="text-white font-mono font-semibold text-cyan-glow">{getActiveModelName()}</span>
                    </div>
                  </div>
                ) : (
                  // Premium user model list choice
                  <div className="p-3 bg-[#061220]/50 border border-cyan-glow/15 rounded-xl space-y-2">
                    <p className="text-[9px] text-white/40 leading-relaxed font-sans mb-1">
                      Sélectionnez le noyau cognitif d'Archibald ou laissez en auto-routage :
                    </p>
                    <div className="grid grid-cols-1 gap-1.5">
                      {availableModels.map((model) => {
                        const isChosen = selectedModel === model.id;
                        return (
                          <button
                            key={model.id}
                            onClick={() => setSelectedModel(model.id)}
                            className={`flex items-center justify-between px-2.5 py-2 rounded-lg border text-left transition-all active:scale-[0.98] ${
                              isChosen
                                ? "bg-cyan-glow/10 border-cyan-glow/40 text-cyan-glow shadow-[0_0_10px_rgba(0,229,255,0.05)]"
                                : "bg-black/20 border-white/5 text-white/60 hover:text-white hover:border-white/10"
                            }`}
                          >
                            <span className="text-[10.5px] font-semibold">{model.name}</span>
                            {isChosen && <Check className="w-3.5 h-3.5 text-cyan-glow" strokeWidth={3} />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* 3. MÉMOIRE COGNITIVE (Durable local memory manager - Fully working add & delete) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-[0.18em] font-bold text-white/40 font-mono flex items-center gap-1">
                    <Brain className="w-3 h-3 text-cyan-glow" />
                    Mémoire d'Archibald
                  </span>
                  <span className="text-[9.5px] text-cyan-glow font-mono font-bold bg-cyan-glow/10 px-2 py-0.5 rounded-full border border-cyan-glow/20">
                    {memoryItems.length} faits
                  </span>
                </div>

                <div className="p-3 bg-[#061220]/50 border border-white/5 rounded-xl space-y-3">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-white/40">Mémoire active :</span>
                    <span className="text-emerald-400 font-bold tracking-wider font-mono uppercase bg-emerald-500/10 px-1.5 py-0.5 rounded text-[8.5px] border border-emerald-500/20 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Optimisée
                    </span>
                  </div>

                  {/* Add memory entry form */}
                  <form onSubmit={handleAddMemory} className="flex gap-1.5 relative">
                    <input
                      type="text"
                      placeholder="Ajouter un souvenir..."
                      value={newMemory}
                      onChange={(e) => setNewMemory(e.target.value)}
                      className="flex-1 bg-black/40 border border-white/5 focus:border-cyan-glow/30 rounded-lg px-2.5 py-1.5 text-[10.5px] text-white placeholder-white/20 outline-none transition-all"
                    />
                    <button
                      type="submit"
                      className="px-2.5 rounded-lg bg-cyan-glow/15 hover:bg-cyan-glow/25 border border-cyan-glow/30 hover:border-cyan-glow/40 text-cyan-glow transition-all active:scale-95 flex items-center justify-center"
                      title="Mémoriser l'information"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </form>

                  {/* Scrollable list of memory entries */}
                  <div className="space-y-1.5 max-h-[140px] overflow-y-auto pr-1">
                    {memoryItems.length === 0 ? (
                      <div className="text-center py-4 text-white/30 text-[9.5px] italic">
                        Aucun fait clé mémorisé.
                      </div>
                    ) : (
                      memoryItems.map((item, index) => (
                        <div
                          key={index}
                          className="group/item flex items-start justify-between p-2 rounded-lg bg-black/20 border border-white/5 hover:border-white/10 transition-all gap-2"
                        >
                          <p className="text-[10px] text-white/70 leading-relaxed font-sans flex-1">
                            {item}
                          </p>
                          <button
                            onClick={() => handleDeleteMemory(index)}
                            className="text-white/30 hover:text-rose-450 p-0.5 transition-colors"
                            title="Oublier cet élément"
                          >
                            <Trash2 className="w-3 h-3 group-hover/item:opacity-100 opacity-60 transition-opacity" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>

                  {memoryItems.length > 0 && (
                    <button
                      onClick={handleClearAllMemory}
                      className="w-full text-center text-[9px] uppercase tracking-wider font-semibold text-rose-450/70 hover:text-rose-450 hover:bg-rose-950/20 py-1 rounded transition-colors"
                    >
                      Effacer toute la mémoire
                    </button>
                  )}
                </div>
              </div>

              {/* 4. AGENTS COGNITIFS ACTIFS */}
              <div className="space-y-2">
                <span className="text-[9px] uppercase tracking-[0.18em] font-bold text-white/40 font-mono flex items-center gap-1">
                  <Users className="w-3 h-3 text-cyan-glow" />
                  Agents Cognitifs
                </span>

                <div className="p-3 bg-[#061220]/50 border border-white/5 rounded-xl space-y-2">
                  <div className="grid grid-cols-1 gap-1.5">
                    {/* Agent 1 */}
                    <div className="flex items-center justify-between p-2 rounded-lg bg-black/20 border border-white/5">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span className="text-[10.5px] font-semibold text-white/80">Agent Recherche</span>
                      </div>
                      <span className="text-[8px] font-mono text-white/30 uppercase">Actif</span>
                    </div>

                    {/* Agent 2 */}
                    <div className="flex items-center justify-between p-2 rounded-lg bg-black/20 border border-white/5">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[10.5px] font-semibold text-white/80">Agent Développement</span>
                      </div>
                      <span className="text-[8px] font-mono text-[#34d399] uppercase font-bold">En tâche</span>
                    </div>

                    {/* Agent 3 */}
                    <div className="flex items-center justify-between p-2 rounded-lg bg-black/20 border border-white/5">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-glow" />
                        <span className="text-[10.5px] font-semibold text-white/80">Agent Mémoire</span>
                      </div>
                      <span className="text-[8px] font-mono text-white/30 uppercase">Prêt</span>
                    </div>

                    {/* Agent 4 */}
                    <div className="flex items-center justify-between p-2 rounded-lg bg-black/20 border border-white/5">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-glow animate-pulse" />
                        <span className="text-[10.5px] font-semibold text-white/80">Agent Domotique (Hector)</span>
                      </div>
                      <span className="text-[8px] font-mono text-cyan-glow uppercase font-bold">Connecté</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. STATISTIQUES CONJECTURALES COGNITIVES */}
              <div className="space-y-2">
                <span className="text-[9px] uppercase tracking-[0.18em] font-bold text-white/40 font-mono flex items-center gap-1">
                  <BarChart3 className="w-3 h-3 text-cyan-glow" />
                  Statistiques
                </span>

                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 bg-[#061220]/50 border border-white/5 rounded-xl flex flex-col justify-between">
                    <span className="text-[8.5px] text-white/40 uppercase font-bold tracking-wider">Conversations</span>
                    <span className="text-sm font-extrabold text-white mt-1 font-mono">3 actives</span>
                  </div>

                  <div className="p-2.5 bg-[#061220]/50 border border-white/5 rounded-xl flex flex-col justify-between">
                    <span className="text-[8.5px] text-white/40 uppercase font-bold tracking-wider">Tâches réalisées</span>
                    <span className="text-sm font-extrabold text-[#34d399] mt-1 font-mono">14 de jour</span>
                  </div>

                  <div className="p-2.5 bg-[#061220]/50 border border-white/5 rounded-xl flex flex-col justify-between col-span-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[8.5px] text-white/40 uppercase font-bold tracking-wider">Uptime Archibald</span>
                      <span className="text-[7.5px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-1 rounded">SYS_OK</span>
                    </div>
                    <span className="text-xs font-semibold text-white/80 mt-1 font-mono">18h 42m (Session v4)</span>
                  </div>
                </div>
              </div>

              {/* 6. PARAMÈTRES AVANCÉS */}
              <div className="space-y-2 pt-2 border-t border-white/5">
                <span className="text-[9px] uppercase tracking-[0.18em] font-bold text-white/40 font-mono flex items-center gap-1">
                  <SlidersHorizontal className="w-3 h-3 text-cyan-glow" />
                  Paramètres Avancés
                </span>

                <div className="p-3 bg-[#061220]/50 border border-white/5 rounded-xl space-y-3">
                  
                  {/* Synthesis voice configurations */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-white/50 flex items-center gap-1">
                        <Volume2 className="w-3 h-3 text-blue-400" />
                        Voix d'Archibald :
                      </span>
                    </div>
                    <select
                      value={selectedVoice}
                      onChange={(e) => {
                        setSelectedVoice(e.target.value);
                        localStorage.setItem("archibald_selected_voice", e.target.value);
                      }}
                      className="w-full bg-black/40 border border-white/5 rounded-lg px-2 py-1 text-[10px] text-white/80 focus:border-cyan-glow/20 outline-none"
                    >
                      <option value="Holographique Masculin (Défaut)">Holographique Masculin</option>
                      <option value="Holographique Féminin">Holographique Féminin</option>
                      <option value="Synthèse Neutre">Synthèse Neutre</option>
                    </select>

                    <div className="space-y-1 pt-1.5">
                      <div className="flex justify-between text-[9px] text-white/40">
                        <span>Fréquence/Débit (Vitesse):</span>
                        <span className="font-mono text-cyan-glow">{voiceRate}x</span>
                      </div>
                      <input
                        type="range"
                        min="0.5"
                        max="2.0"
                        step="0.1"
                        value={voiceRate}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setVoiceRate(val);
                          localStorage.setItem("archibald_voice_rate", val.toString());
                        }}
                        className="w-full h-1 bg-black rounded-lg appearance-none cursor-pointer accent-cyan-glow"
                      />
                    </div>

                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between text-[9px] text-white/40">
                        <span>Hauteur (Tonalité):</span>
                        <span className="font-mono text-cyan-glow">{voicePitch}x</span>
                      </div>
                      <input
                        type="range"
                        min="0.5"
                        max="1.5"
                        step="0.1"
                        value={voicePitch}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setVoicePitch(val);
                          localStorage.setItem("archibald_voice_pitch", val.toString());
                        }}
                        className="w-full h-1 bg-black rounded-lg appearance-none cursor-pointer accent-cyan-glow"
                      />
                    </div>
                  </div>

                  <div className="h-[1px] bg-white/5" />

                  {/* Toggle switches for cognitive features */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-semibold text-white/80 flex items-center gap-1">
                          <Network className="w-3.5 h-3.5 text-purple-400" />
                          Aiguillage automatique
                        </span>
                        <span className="text-[8px] text-white/30">Routage dynamique IA</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={autoRouting}
                          onChange={(e) => setAutoRouting(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-7 h-4 bg-black/60 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white/40 peer-checked:after:bg-cyan-glow after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-cyan-glow/20 border border-white/5" />
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-semibold text-white/80 flex items-center gap-1">
                          <Database className="w-3.5 h-3.5 text-emerald-400" />
                          Synchro Hector Domotique
                        </span>
                        <span className="text-[8px] text-white/30">Actualisation MQTT</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={hectorSync}
                          onChange={(e) => setHectorSync(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-7 h-4 bg-black/60 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white/40 peer-checked:after:bg-cyan-glow after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-cyan-glow/20 border border-white/5" />
                      </label>
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* Sidebar Footer Panel */}
            <div className="p-4 border-t border-white/5 bg-[#010408]/90 flex items-center justify-between text-[11px] text-white/40 relative z-10">
              <div className="flex items-center gap-1.5">
                <RefreshCw className="w-3 h-3 text-cyan-glow animate-spin" style={{ animationDuration: '6s' }} />
                <span className="font-mono text-[9px] uppercase tracking-wider">MATRICE SYNAPTIQUE v4.2</span>
              </div>
              <span className="font-mono text-[9px]">Eric v.p.</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
