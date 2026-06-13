import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Compass, Users, BookOpen, Settings, Sliders, PlayCircle, Cpu, Wifi, ShieldCheck, 
  ChevronRight, ArrowLeft, Bot, FileText, Check, LayoutGrid, Radio, RefreshCw, HardDrive, BatteryCharging 
} from "lucide-react";

type SubSection = "none" | "agents" | "docs" | "settings" | "integrations" | "tools" | "diagnostics" | "sysinfo";

export function PlusTab() {
  const [activeSection, setActiveSection] = useState<SubSection>("none");
  const [syncedState, setSyncedState] = useState<Record<string, boolean>>({
    homeAssistant: true,
    booksApi: false,
    teslaApi: true
  });
  const [themeMode, setThemeMode] = useState("holo");
  const [voiceModel, setVoiceModel] = useState("miro");
  const [laserIntensity, setLaserIntensity] = useState(70);

  const toggleIntegration = (key: string) => {
    setSyncedState(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const menuItems = [
    { id: "agents", label: "Agents Spécialisés", desc: "Configuration des rôles cognitifs", icon: Users, color: "text-purple-400 group-hover:bg-purple-500/10" },
    { id: "docs", label: "Documents", desc: "Bibliothèque documentaire commune", icon: BookOpen, color: "text-blue-400 group-hover:bg-blue-500/10" },
    { id: "settings", label: "Paramètres & Design", desc: "Voix, thème et laser holographique", icon: Settings, color: "text-cyan-glow group-hover:bg-cyan-glow/10" },
    { id: "integrations", label: "Intégrations", desc: "Hector IoT, APIs partenaires rattachées", icon: Radio, color: "text-emerald-400 group-hover:bg-emerald-500/10" },
    { id: "tools", label: "Boîte à Outils", desc: "Notifications, scripts autonomes, calendrier", icon: Sliders, color: "text-amber-500 group-hover:bg-amber-500/10" },
    { id: "diagnostics", label: "Diagnostics", desc: "Télémétrie active du conteneur", icon: Wifi, color: "text-rose-450 group-hover:bg-rose-500/10" },
    { id: "sysinfo", label: "Informations Système", desc: "Caractéristiques d'Archi-Noyau v4.1", icon: Cpu, color: "text-white/60 group-hover:bg-white/10" },
  ];

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden px-4 md:px-6 py-2 select-none">
      <AnimatePresence mode="wait">
        {activeSection === "none" ? (
          /* MAIN GRID FOR PLUS OPTION */
          <motion.div
            key="plus-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col h-full overflow-hidden"
          >
            {/* Header */}
            <div className="mb-4 flex-shrink-0">
              <h2 className="text-sm font-bold tracking-[0.14em] text-cyan-glow flex items-center gap-1.5 uppercase font-mono">
                <LayoutGrid className="w-4 h-4" /> CONSOLE DE CONFIGURATION
              </h2>
              <p className="text-[10px] text-white/55 tracking-wide mt-0.5">
                Accédez aux fonctionnalités secondaires, intégrations physiques et réglages système d'Archibald.
              </p>
            </div>

            {/* Menu List */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/5 pr-1 py-1 space-y-2.5 min-h-0 pb-6">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveSection(item.id as SubSection)}
                    className="group flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-[#061220]/20 to-transparent border border-white/5 hover:border-cyan-glow/20 hover:from-[#061220]/45 hover:to-[#0c1c2e]/10 transition-all duration-300 cursor-pointer active:scale-[0.99]"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className={`w-9 h-9 rounded-lg bg-[#0c1c2e]/60 border border-white/10 flex items-center justify-center transition-all ${item.color}`}>
                        <Icon className="w-4.5 h-4.5" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-white group-hover:text-cyan-glow transition-colors">
                          {item.label}
                        </h4>
                        <span className="text-[9px] text-white/45 truncate block">
                          {item.desc}
                        </span>
                      </div>
                    </div>

                    <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-cyan-glow group-hover:translate-x-0.5 transition-all" />
                  </div>
                );
              })}
            </div>
          </motion.div>
        ) : (
          /* DETAILED SUB-SECTION PANELS */
          <motion.div
            key="sub-panel"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col h-full overflow-hidden"
          >
            {/* Top Return Header */}
            <div className="flex items-center gap-2.5 pb-3 border-b border-white/5 mb-3 flex-shrink-0">
              <button
                onClick={() => setActiveSection("none")}
                className="p-1 px-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all active:scale-95"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <h3 className="text-[9px] font-mono text-cyan-glow/65 tracking-[0.1em] uppercase font-bold">CONSOLE SECONDAIRE</h3>
                <h2 className="text-sm font-black text-white">
                  {menuItems.find(m => m.id === activeSection)?.label}
                </h2>
              </div>
            </div>

            {/* Scrollable Panel Contents */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/5 pr-1 py-1 space-y-4 min-h-0 pb-6 text-white text-xs">
              
              {/* PANELS DEFINITION: 1. AGENTS */}
              {activeSection === "agents" && (
                <div className="space-y-3">
                  <p className="text-[10px] text-white/50 italic leading-relaxed">
                    Définissez la personnalité et les rôles spécialisés d'Archibald en fonction du contexte de discussion.
                  </p>
                  
                  <div className="space-y-2.5">
                    <div className="p-3.5 rounded-xl bg-gradient-to-r from-purple-500/10 to-transparent border border-purple-500/15">
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <Bot className="w-4 h-4 text-purple-400" />
                        <h4 className="font-bold text-white">Archi Domotique</h4>
                      </div>
                      <p className="text-[10px] text-white/70 leading-relaxed">Spécialisé dans les API physiques et les capteurs d'Hector Domotique. Optimisé pour l'économie d'énergie.</p>
                      <span className="text-[8px] font-mono bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full mt-2 inline-block">CHARGÉ</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-gradient-to-r from-blue-500/10 to-transparent border border-blue-500/15">
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <BookOpen className="w-4 h-4 text-blue-400" />
                        <h4 className="font-bold text-white">Archi Bibliophile (Lector Advisor)</h4>
                      </div>
                      <p className="text-[10px] text-white/70 leading-relaxed">Configure les thèmes littéraires, indexe les nouvelles sorties SF/anticipation et propose des synthèses adaptées.</p>
                      <span className="text-[8px] font-mono bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full mt-2 inline-block">MÉMOIRE ACTIVE</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-gradient-to-r from-cyan-glow/10 to-transparent border border-cyan-glow/15">
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <Users className="w-4 h-4 text-cyan-glow" />
                        <h4 className="font-bold text-white">Archi Général</h4>
                      </div>
                      <p className="text-[10px] text-white/70 leading-relaxed">Majordome numérique de Monsieur Éric pour la gestion globale de l'agenda, mails, et la prise de notes quotidiennes.</p>
                      <span className="text-[8px] font-mono bg-cyan-glow/20 text-cyan-glow px-2 py-0.5 rounded-full mt-2 inline-block">DÉFAUT</span>
                    </div>
                  </div>
                </div>
              )}

              {/* PANELS DEFINITION: 2. DOCUMENTS */}
              {activeSection === "docs" && (
                <div className="space-y-4">
                  <div className="border border-white/5 bg-[#030911]/50 rounded-xl p-3.5 text-center">
                    <p className="text-[11px] text-white/80 font-medium">Déposer des fichiers pour Archibald</p>
                    <p className="text-[9px] text-white/40 mt-1 max-w-[200px] mx-auto">PDF, Images, Excel ou Textes pour alimenter les contextes de vos projets.</p>
                    <div className="border border-dashed border-cyan-glow/20 hover:border-cyan-glow/40 bg-cyan-glow/[0.01] hover:bg-cyan-glow/[0.03] rounded-lg py-5 px-3 mt-3.5 cursor-pointer transition-colors text-cyan-glow font-bold text-[10px] tracking-wide uppercase">
                      Parcourir les fichiers ou glisser-déposer
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-mono uppercase tracking-wider text-white/40 mb-2">Fichiers Indexés (3)</h4>
                    <div className="space-y-2">
                      <div className="p-2.5 rounded-lg bg-white/2 flex items-center justify-between border border-white/5 hover:border-cyan-glow/15">
                        <div className="flex items-center gap-2">
                          <FileText className="w-3.5 h-3.5 text-cyan-glow" />
                          <span className="text-[10px] text-white/85 font-medium">spec_iot_hector_v2.pdf</span>
                        </div>
                        <span className="text-[8px] font-mono text-white/40">1.4 MB</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-white/2 flex items-center justify-between border border-white/5 hover:border-cyan-glow/15">
                        <div className="flex items-center gap-2">
                          <FileText className="w-3.5 h-3.5 text-purple-400" />
                          <span className="text-[10px] text-white/85 font-medium">catalogue_bibliotheque_full.xlsx</span>
                        </div>
                        <span className="text-[8px] font-mono text-white/40">850 KB</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-white/2 flex items-center justify-between border border-white/5 hover:border-cyan-glow/15">
                        <div className="flex items-center gap-2">
                          <FileText className="w-3.5 h-3.5 text-amber-500" />
                          <span className="text-[10px] text-white/85 font-medium">grille_comparative_ve_2026.pdf</span>
                        </div>
                        <span className="text-[8px] font-mono text-white/40">4.8 MB</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* PANELS DEFINITION: 3. SETTINGS */}
              {activeSection === "settings" && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase font-bold text-white/50 tracking-wider">Thème Holographique</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setThemeMode("holo")}
                        className={`py-2 rounded-xl border text-[10px] font-bold tracking-wide transition-all
                          ${themeMode === "holo" 
                            ? "bg-cyan-glow/15 border-cyan-glow/50 text-cyan-glow shadow-[0_0_10px_rgba(34,211,238,0.15)]" 
                            : "bg-white/2 border-white/10 text-white/60"}`}
                      >
                        Bleu Nuit & Cyan Lumineux
                      </button>
                      <button
                        onClick={() => setThemeMode("cosmic")}
                        className={`py-2 rounded-xl border text-[10px] font-bold tracking-wide transition-all
                          ${themeMode === "cosmic" 
                            ? "bg-purple-950/20 border-purple-500/50 text-purple-400" 
                            : "bg-white/2 border-white/10 text-white/65"}`}
                      >
                        Crépusculaire & Violet Cosmic
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase font-bold text-white/50 tracking-wider">Modulateur Synthèse Vocale</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setVoiceModel("miro")}
                        className={`py-2 rounded-xl border text-[10px] font-bold tracking-wide transition-all
                          ${voiceModel === "miro" 
                            ? "bg-cyan-glow/15 border-cyan-glow/50 text-cyan-glow" 
                            : "bg-white/2 border-white/10 text-white/65"}`}
                      >
                        Miro (Français Premium)
                      </button>
                      <button
                        onClick={() => setVoiceModel("hector-v")}
                        className={`py-2 rounded-xl border text-[10px] font-bold tracking-wide transition-all
                          ${voiceModel === "hector-v" 
                            ? "bg-cyan-glow/15 border-cyan-glow/50 text-cyan-glow" 
                            : "bg-white/2 border-white/10 text-white/65"}`}
                      >
                        Sébastien (Français Standard)
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-[9px] uppercase font-bold text-white/50 tracking-wider">Intensité Laser de Veille</label>
                      <span className="font-mono text-[9px] text-cyan-glow">{laserIntensity}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={laserIntensity}
                      onChange={(e) => setLaserIntensity(Number(e.target.value))}
                      className="w-full accent-cyan-glow"
                    />
                  </div>

                  <div className="pt-2">
                    <button 
                      onClick={() => {
                        alert("Le cache local d'Archibald a été nettoyé et ré-indexé pour Monsieur Éric.");
                      }}
                      className="w-full py-2.5 bg-rose-500/10 border border-rose-500/35 hover:bg-rose-500/20 text-rose-500 font-bold text-[10px] tracking-widest uppercase rounded-xl transition-all"
                    >
                      Effacer le Cache de Session
                    </button>
                  </div>
                </div>
              )}

              {/* PANELS DEFINITION: 4. INTEGRATIONS */}
              {activeSection === "integrations" && (
                <div className="space-y-3">
                  <p className="text-[10px] text-white/50 italic leading-relaxed">
                    Connectez Archibald en direct à vos plateformes et services IoT domestiques.
                  </p>

                  <div className="space-y-2.5">
                    {/* Home assistant */}
                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/2 border border-white/5 hover:border-cyan-glow/15 transition-all">
                      <div className="flex items-center gap-3">
                        <Wifi className="w-5 h-5 text-emerald-400" />
                        <div>
                          <h4 className="font-bold text-white">Home Assistant IoT (Hector)</h4>
                          <span className="text-[8px] text-white/45 block">Raccordé au serveur de l'étage principal</span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => toggleIntegration("homeAssistant")}
                        className={`px-3 py-1 text-[8.5px] font-bold tracking-wider rounded-lg uppercase border transition-all active:scale-95
                          ${syncedState.homeAssistant 
                            ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400" 
                            : "bg-white/5 border-white/10 text-white/50"}`}
                      >
                        {syncedState.homeAssistant ? "CONNECTÉ" : "DISJOINT"}
                      </button>
                    </div>

                    {/* Google books */}
                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/2 border border-white/5 hover:border-cyan-glow/15 transition-all">
                      <div className="flex items-center gap-3">
                        <BookOpen className="w-5 h-5 text-purple-400" />
                        <div>
                          <h4 className="font-bold text-white">Application Littéraire API</h4>
                          <span className="text-[8px] text-white/45 block">Synchronisation de bibliothèque de lecture</span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => toggleIntegration("booksApi")}
                        className={`px-3 py-1 text-[8.5px] font-bold tracking-wider rounded-lg uppercase border transition-all active:scale-95
                          ${syncedState.booksApi 
                            ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400" 
                            : "bg-white/5 border-white/10 text-white/50"}`}
                      >
                        {syncedState.booksApi ? "CONNECTÉ" : "RELIER"}
                      </button>
                    </div>

                    {/* Tesla EV */}
                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/2 border border-white/5 hover:border-cyan-glow/15 transition-all">
                      <div className="flex items-center gap-3">
                        <Sliders className="w-5 h-5 text-amber-500" />
                        <div>
                          <h4 className="font-bold text-white">API Autonomie Vélo & Véhicules</h4>
                          <span className="text-[8px] text-white/45 block">Consultation des données des constructeurs</span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => toggleIntegration("teslaApi")}
                        className={`px-3 py-1 text-[8.5px] font-bold tracking-wider rounded-lg uppercase border transition-all active:scale-95
                          ${syncedState.teslaApi 
                            ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400" 
                            : "bg-white/5 border-white/10 text-white/50"}`}
                      >
                        {syncedState.teslaApi ? "CONNECTÉ" : "RELIER"}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* PANELS DEFINITION: 5. TOOLS */}
              {activeSection === "tools" && (
                <div className="space-y-4">
                  <div className="p-3 bg-white/2 border border-white/5 rounded-xl">
                    <h4 className="font-bold text-white mb-1.5 flex items-center gap-1.5"><Sliders className="w-3.5 h-3.5 text-cyan-glow" /> Planificateur de Notifications</h4>
                    <p className="text-[10px] text-white/60 leading-relaxed mb-3">Programmez qu'Archibald vous sollicite ou effectue une vérification d'après de simples règles.</p>
                    <button 
                      onClick={() => alert("Notification programmée d'ici 3 heures pour Monsieur Éric.")}
                      className="px-3.5 py-1.5 bg-cyan-glow/15 border border-cyan-glow/30 hover:border-cyan-glow text-cyan-glow font-bold text-[9px] tracking-wider rounded-lg uppercase"
                    >
                      Ajouter une alerte
                    </button>
                  </div>

                  <div className="p-3 bg-white/2 border border-white/5 rounded-xl">
                    <h4 className="font-bold text-white mb-1">Missions d'arrière-plan</h4>
                    <div className="space-y-2 mt-2">
                      <div className="flex justify-between items-center text-[10px] text-white/80">
                        <span>Indexation de la liseuse</span>
                        <span className="text-emerald-400 font-mono">OK</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] text-white/80">
                        <span>Abonnement de réveil vocal</span>
                        <span className="text-cyan-glow font-mono">ACTIF</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* PANELS DEFINITION: 6. DIAGNOSTICS */}
              {activeSection === "diagnostics" && (
                <div className="space-y-3">
                  <p className="text-[10px] text-white/50 italic leading-relaxed">
                    Télémétrie fonctionnelle en temps réel des liaisons physiques et calculs logiques.
                  </p>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                      <Wifi className="w-5 h-5 text-cyan-glow mx-auto mb-1.5" />
                      <span className="text-[9px] uppercase tracking-wider text-white/40 block">Latence Réseau</span>
                      <span className="text-xs font-mono font-black text-white mt-0.5 block">14 ms (Stable)</span>
                    </div>

                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                      <HardDrive className="w-5 h-5 text-purple-400 mx-auto mb-1.5" />
                      <span className="text-[9px] uppercase tracking-wider text-white/40 block">Stockage Local</span>
                      <span className="text-xs font-mono font-black text-white mt-0.5 block">148.4 MB / 1 GB</span>
                    </div>

                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                      <Cpu className="w-5 h-5 text-emerald-400 mx-auto mb-1.5" />
                      <span className="text-[9px] uppercase tracking-wider text-white/40 block">Charge Moteur AI</span>
                      <span className="text-xs font-mono font-black text-white mt-0.5 block">4.2%</span>
                    </div>

                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                      <BatteryCharging className="w-5 h-5 text-amber-500 mx-auto mb-1.5" />
                      <span className="text-[9px] uppercase tracking-wider text-white/40 block">Alimentation Hector</span>
                      <span className="text-xs font-mono font-black text-white mt-0.5 block">Batterie 94%</span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-rose-950/15 border border-rose-500/20 rounded-xl mt-2.5">
                    <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest flex items-center gap-1.5 mb-1.5"><ShieldCheck className="w-3.5 h-3.5 text-rose-500" /> État de Chiffrement</span>
                    <p className="text-[9.5px] leading-relaxed text-white/60">L'intégralité des flux transitant par Archibald bénéficie d'une clé de session privée chiffrée de bout en bout.</p>
                  </div>
                </div>
              )}

              {/* PANELS DEFINITION: 7. SYSTEM INFORMATION */}
              {activeSection === "sysinfo" && (
                <div className="space-y-4">
                  <div className="flex flex-col items-center py-4 bg-[#051121]/50 border border-white/5 rounded-2xl relative overflow-hidden">
                    {/* Background flare */}
                    <div className="absolute top-0 w-32 h-32 bg-cyan-glow/5 blur-2xl rounded-full" />
                    
                    <Bot className="w-12 h-12 text-cyan-glow animate-pulse relative z-10" />
                    <span className="text-xs font-black text-white mt-2 relative z-10 font-mono tracking-widest">ARCHIBALD CORE</span>
                    <span className="text-[8px] font-mono text-cyan-glow/70 tracking-widest mt-0.5 relative z-10">ARCHI-NOYAU v4.1-STABLE</span>
                  </div>

                  <div className="border border-white/5 bg-white/[0.01] rounded-xl overflow-hidden font-mono text-[9.5px] divide-y divide-white/5">
                    <div className="p-2.5 flex justify-between">
                      <span className="text-white/40">Architecte Initiateur :</span>
                      <span className="text-white/80 font-bold">Monsieur Éric v.p.</span>
                    </div>
                    <div className="p-2.5 flex justify-between">
                      <span className="text-white/40">Statut du Noyau :</span>
                      <span className="text-emerald-400 font-bold">SOUVERAIN / ACTIF</span>
                    </div>
                    <div className="p-2.5 flex justify-between">
                      <span className="text-white/40">Langue Cognitive :</span>
                      <span className="text-white/80 font-bold">Français (France)</span>
                    </div>
                    <div className="p-2.5 flex justify-between">
                      <span className="text-white/40">Compitation Système :</span>
                      <span className="text-white/60 font-bold">NodeJS LTS / React 19 / TWC v4</span>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Database system core footer indicator */}
      <div className="pt-2 pb-1 text-center border-t border-white/5 flex-shrink-0 flex items-center justify-between text-[9px] text-white/40 font-mono">
        <span className="flex items-center gap-1"><Cpu className="w-3 h-3 text-cyan-glow" /> Système : Securisé</span>
        <span>Version : 4.1.2</span>
      </div>
    </div>
  );
}
