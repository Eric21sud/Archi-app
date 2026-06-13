import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  FolderLock, FolderOpen, Layers, CheckCircle2, Circle, 
  BookOpen, Home, Car, Bot, Plus, ArrowLeft, BrainCircuit,
  ClipboardList, FileText, BotIcon, History, Sparkles, Send, RefreshCw
} from "lucide-react";

interface ProjectTask {
  id: string;
  text: string;
  completed: boolean;
}

interface ProjectDoc {
  id: string;
  name: string;
  size: string;
}

interface ProjectAgent {
  id: string;
  name: string;
  role: string;
}

interface DetailedProject {
  id: string;
  name: string;
  icon: "hector" | "archibald" | "lecture" | "ve" | "custom";
  syncStatus: "synced" | "updating" | "offline";
  activity: string;
  memory: string;
  tasks: ProjectTask[];
  docs: ProjectDoc[];
  agents: ProjectAgent[];
  history: string[];
}

const INITIAL_PROJECTS: DetailedProject[] = [
  {
    id: "hector",
    name: "Hector Domotique",
    icon: "hector",
    syncStatus: "synced",
    activity: "Il y a 2h",
    memory: "Raccordé aux interfaces IoT de la demeure principale. Gère le chauffage, la consommation électrique, et l'alarme extérieure du garage.",
    tasks: [
      { id: "ht-1", text: "Vérifier la température de la chambre d'amis (cible 18°C)", completed: true },
      { id: "ht-2", text: "Ajuster le profil de veille nocturne du salon", completed: false },
      { id: "ht-3", text: "Analyser le pic de charge observé mardi à 18h", completed: false }
    ],
    docs: [
      { id: "hd-1", name: "spec_iot_hector_v2.pdf", size: "1.4 MB" },
      { id: "hd-2", name: "schema_electrique_domo.png", size: "3.2 MB" }
    ],
    agents: [
      { id: "ha-1", name: "Hector Sensor Bot", role: "Superviseur Thermique" }
    ],
    history: [
      "22:30 - Chauffage régulé à 18°C (mode nuit)",
      "19:30 - Demande température reçue par l'utilisateur",
      "08:00 - Rapport de consommation hebdomadaire envoyé"
    ]
  },
  {
    id: "archibald",
    name: "Majordome Archibald",
    icon: "archibald",
    syncStatus: "synced",
    activity: "Actif",
    memory: "Système de contrôle central exécutant le microcode Archi-Noyau v4.1. Coordonne les autres agents et gère le canal vocal sécurisé.",
    tasks: [
      { id: "at-1", text: "Optimiser le temps de latence de la synthèse vocale", completed: true },
      { id: "at-2", text: "Réviser les security tokens de l'api Gemini", completed: true },
      { id: "at-3", text: "Affiner le filtrage des contextes dans la Mémoire", completed: false }
    ],
    docs: [
      { id: "ad-1", name: "architecture_systeme_archi.pdf", size: "2.1 MB" },
      { id: "ad-2", name: "api_gemini_integration.md", size: "45 KB" }
    ],
    agents: [
      { id: "aa-1", name: "Archi Core Agent", role: "Superviseur Général" },
      { id: "aa-2", name: "Miro Vocal Engine", role: "Synthétiseur de voix" }
    ],
    history: [
      "14:48 - Première conversation amorcée pour la journée",
      "08:12 - Démarrage des modules d'analyse cognitive",
      "04:00 - Sauvegarde automatique de l'index de mémoire local"
    ]
  },
  {
    id: "lecture",
    name: "Application Lecture",
    icon: "lecture",
    syncStatus: "updating",
    activity: "Hier",
    memory: "Suivi personnalisé et analyse de la bibliothèque littéraire d'Éric. Analyse automatique des thèmes d'anticipation et de cybernétique.",
    tasks: [
      { id: "lt-1", text: "Indexation des 14 ouvrages reçus en février", completed: true },
      { id: "lt-2", text: "Générer un résumé court de 'La Cybernétique' de Wiener", completed: false },
      { id: "lt-3", text: "Mettre à jour les recommandations de romans d'anticipation", completed: false }
    ],
    docs: [
      { id: "ld-1", name: "catalogue_bibliotheque_full.xlsx", size: "850 KB" }
    ],
    agents: [
      { id: "la-1", name: "Lector Advisor", role: "Indexeur & Critique Littéraire" }
    ],
    history: [
      "Hier - Recommandation de 3 nouveaux ouvrages de SF classique",
      "03 fév. - Analyse de 142 livres indexés réalisée"
    ]
  },
  {
    id: "ve",
    name: "Comparateur Véhicules Électriques",
    icon: "ve",
    syncStatus: "offline",
    activity: "3 fév.",
    memory: "Base de connaissances et critères de sélection de véhicules électriques d'excellence. Filtre principal : autonomie > 450 km.",
    tasks: [
      { id: "vt-1", text: "Importer les spécifications de la dernière Tesla Model 3", completed: true },
      { id: "vt-2", text: "Ajouter le critère de charge rapide bidirectionnelle (V2L)", completed: false }
    ],
    docs: [
      { id: "vd-1", name: "grille_comparative_ve_2026.pdf", size: "4.8 MB" }
    ],
    agents: [
      { id: "va-1", name: "VE Scanner Bot", role: "Moissonneur de données automobiles" }
    ],
    history: [
      "3 fév. - Sauvegarde de la grille comparative",
      "29 janv. - Ajout du filtre autonomie minimale 450km"
    ]
  }
];

export function ProjetsTab() {
  const [projects, setProjects] = useState<DetailedProject[]>(INITIAL_PROJECTS);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Create project form states
  const [pName, setPName] = useState("");
  const [pMemory, setPMemory] = useState("");
  const [pIcon, setPIcon] = useState<DetailedProject["icon"]>("custom");

  const selectedProject = projects.find(p => p.id === selectedProjectId);

  const getProjIconElement = (iconName: string, className = "w-5 h-5") => {
    switch (iconName) {
      case "hector":
        return <Home className={`${className} text-emerald-400`} />;
      case "archibald":
        return <Bot className={`${className} text-cyan-glow`} />;
      case "lecture":
        return <BookOpen className={`${className} text-purple-400`} />;
      case "ve":
        return <Car className={`${className} text-amber-500`} />;
      default:
        return <Layers className={`${className} text-blue-400`} />;
    }
  };

  const getSyncStatusBadge = (status: string) => {
    switch (status) {
      case "synced":
        return <span className="flex items-center gap-1 text-[8px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20 font-mono font-bold"><RefreshCw className="w-2.5 h-2.5 animate-none" /> SYNCHRONISÉ</span>;
      case "updating":
        return <span className="flex items-center gap-1 text-[8px] bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded-full border border-purple-500/20 font-mono font-bold"><RefreshCw className="w-2.5 h-2.5 animate-spin" /> EN COURS</span>;
      default:
        return <span className="flex items-center gap-1 text-[8px] bg-white/5 text-white/40 px-2 py-0.5 rounded-full border border-white/10 font-mono font-bold">HORS LIGNE</span>;
    }
  };

  const handleToggleTask = (projectId: string, taskId: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          tasks: p.tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t)
        };
      }
      return p;
    }));
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pName.trim()) return;

    const id = `project-${Date.now()}`;
    const newProj: DetailedProject = {
      id,
      name: pName,
      icon: pIcon,
      syncStatus: "synced",
      activity: "Actif",
      memory: pMemory || "Moyeu de stockage pour les notes et instructions de ce nouveau projet.",
      tasks: [
        { id: `${id}-t1`, text: "Définir la feuille de route initiale", completed: false }
      ],
      docs: [],
      agents: [
        { id: `${id}-a1`, name: `${pName} Assistant`, role: "Stagiaire Virtuel" }
      ],
      history: ["À l'instant - Création du projet"]
    };

    setProjects([newProj, ...projects]);
    setPName("");
    setPMemory("");
    setShowAddForm(false);
    setSelectedProjectId(id);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden px-4 md:px-6 py-2 select-none">
      <AnimatePresence mode="wait">
        {!selectedProjectId && !showAddForm ? (
          /* PROJECTS GRID SCREEN */
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col h-full overflow-hidden"
          >
            {/* Header Description */}
            <div className="flex justify-between items-center mb-4 flex-shrink-0">
              <div>
                <h2 className="text-sm font-bold tracking-[0.14em] text-cyan-glow flex items-center gap-1.5 uppercase font-mono">
                  <FolderLock className="w-4 h-4" /> COMPARTIMENT PROJETS
                </h2>
                <p className="text-[10px] text-white/55 tracking-wide mt-0.5">
                  Suivi multi-agents de vos chantiers prioritaires, mémoires et checklists d'activité.
                </p>
              </div>

              {/* Add Project Button */}
              <button
                onClick={() => setShowAddForm(true)}
                className="w-8 h-8 rounded-full bg-cyan-glow/10 border border-cyan-glow/30 flex items-center justify-center hover:bg-cyan-glow/20 text-cyan-glow transition-all active:scale-90"
                title="Ajouter un projet d'excellence"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Grid Container */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/5 pr-1 py-1 grid grid-cols-1 sm:grid-cols-2 gap-3 min-h-0 pb-4">
              {projects.map((proj) => {
                const totalTasks = proj.tasks.length;
                const completedTasks = proj.tasks.filter(t => t.completed).length;
                const percent = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

                return (
                  <motion.div
                    key={proj.id}
                    layoutId={`p-card-${proj.id}`}
                    whileHover={{ scale: 1.01, borderColor: "rgba(34, 211, 238, 0.25)" }}
                    onClick={() => setSelectedProjectId(proj.id)}
                    className="p-4 rounded-2xl bg-[#061220]/20 border border-white/5 cursor-pointer flex flex-col justify-between transition-all duration-300 relative group"
                  >
                    {/* Glowing effect inside project card */}
                    <div className="absolute top-0 right-12 w-12 h-12 bg-cyan-glow/5 blur-[25px] rounded-full pointer-events-none group-hover:bg-cyan-glow/10 transition-colors" />

                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-9 h-9 rounded-xl bg-[#0c1c2e]/60 border border-white/10 flex items-center justify-center group-hover:border-cyan-glow/30 transition-colors">
                          {getProjIconElement(proj.icon)}
                        </div>
                        {getSyncStatusBadge(proj.syncStatus)}
                      </div>

                      <h3 className="text-sm font-bold text-white group-hover:text-cyan-glow transition-colors">
                        {proj.name}
                      </h3>

                      <p className="text-[10px] text-white/50 mt-1.5 leading-relaxed line-clamp-2">
                        {proj.memory}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/5 flex flex-col gap-2">
                      <div className="flex items-center justify-between text-[8px] font-mono text-white/40">
                        <span>Checklist: {completedTasks}/{totalTasks} ({percent}%)</span>
                        <span>Activité : {proj.activity}</span>
                      </div>
                      
                      {/* Percent Slider */}
                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-cyan-glow/70 to-blue-500/80 rounded-full transition-all duration-350"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ) : showAddForm ? (
          /* CREATE NEW PROJECT FORM */
          <motion.form
            key="add-form"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onSubmit={handleCreateProject}
            className="flex-1 flex flex-col justify-between bg-gradient-to-b from-[#071321] to-[#040a12] border border-cyan-glow/20 rounded-2xl p-5 space-y-4 shadow-[0_5px_15px_rgba(0,0,0,0.5)] h-full mb-3 overflow-y-auto"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-white/5">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="p-1 rounded-md bg-white/5 hover:bg-white/10 text-white/70"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase font-mono tracking-widest text-cyan-glow">Ajouter un Chantier</span>
                  <span className="text-[8px] text-white/40 font-mono">WORKSPACE SYNC</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] uppercase font-bold text-white/50 tracking-wider">Nom du Projet</label>
                <input
                  type="text"
                  placeholder="Ex: Hector Domotique, Comparateur, etc."
                  value={pName}
                  onChange={(e) => setPName(e.target.value)}
                  className="w-full bg-[#030911]/80 text-xs text-white rounded-lg p-2.5 border border-white/10 focus:border-cyan-glow/40 outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] uppercase font-bold text-white/50 tracking-wider">Icône Thématique</label>
                <div className="grid grid-cols-4 gap-2">
                  {(["hector", "archibald", "lecture", "ve", "custom"] as any[]).map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setPIcon(icon)}
                      className={`h-11 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all active:scale-95
                        ${pIcon === icon
                          ? "bg-cyan-glow/15 border-cyan-glow/45 text-cyan-glow"
                          : "bg-white/[0.02] border-white/10 text-white/50 hover:text-white"}`}
                    >
                      {getProjIconElement(icon, "w-4.5 h-4.5")}
                      <span className="text-[6.5px] uppercase font-mono font-bold">{icon === "custom" ? "Autre" : icon}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] uppercase font-bold text-white/50 tracking-wider">Mémoire contextuelle d'ancrage</label>
                <textarea
                  placeholder="Quels sont les objectifs d'Archibald sur ce projet ? Décrivez les faits à son attention..."
                  value={pMemory}
                  onChange={(e) => setPMemory(e.target.value)}
                  rows={4}
                  className="w-full bg-[#030911]/80 text-xs text-white rounded-lg p-2.5 border border-white/10 focus:border-cyan-glow/40 outline-none resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-[36px] bg-gradient-to-r from-cyan-glow/30 to-blue-600/30 hover:from-cyan-glow/40 hover:to-blue-600/40 border border-cyan-glow/40 rounded-xl text-white font-semibold text-xs tracking-wide transition-all shadow-[0_4px_12px_rgba(34,211,238,0.1)] active:scale-[0.98] flex items-center justify-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" /> Créer le conteneur du projet
            </button>
          </motion.form>
        ) : (
          /* DETAILED PROJECT FOLDER WORKSPACE */
          <motion.div
            key="details"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col h-full overflow-hidden"
          >
            {/* Top Workspace Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/5 flex-shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <button
                  onClick={() => setSelectedProjectId(null)}
                  className="p-1 px-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all active:scale-95"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div className="min-w-0">
                  <h3 className="text-xs font-mono text-cyan-glow/65 tracking-[0.1em] uppercase font-bold">WORKSPACE PROJET</h3>
                  <h2 className="text-sm font-black text-white truncate">{selectedProject?.name}</h2>
                </div>
              </div>
              
              {selectedProject && getSyncStatusBadge(selectedProject.syncStatus)}
            </div>

            {/* Scrollable multi-submodules dashboard */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/5 pr-1 py-3 space-y-4 min-h-0 pb-6">
              
              {/* Module 1: Dedicated Memory */}
              <div className="bg-[#061220]/15 border border-white/5 rounded-xl p-3">
                <h4 className="text-[10px] font-mono uppercase font-bold text-cyan-glow/85 tracking-widest flex items-center gap-1.5 mb-1.5">
                  <BrainCircuit className="w-3.5 h-3.5" /> Mémoire Cognitive Dédiée
                </h4>
                <p className="text-[11px] leading-relaxed text-white/70">
                  {selectedProject?.memory}
                </p>
              </div>

              {/* Module 2: Interactive Tasks Checklist */}
              <div className="bg-[#061220]/15 border border-white/5 rounded-xl p-3">
                <h4 className="text-[10px] font-mono uppercase font-bold text-cyan-glow/85 tracking-widest flex items-center gap-1.5 mb-2.5">
                  <ClipboardList className="w-3.5 h-3.5" /> Tâches d'activité & Jalons
                </h4>
                <div className="space-y-2">
                  {selectedProject?.tasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => handleToggleTask(selectedProject.id, task.id)}
                      className="flex items-baseline gap-2 cursor-pointer group select-none py-0.5"
                    >
                      {task.completed ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 relative top-0.5" />
                      ) : (
                        <Circle className="w-3.5 h-3.5 text-white/20 group-hover:text-cyan-glow/70 flex-shrink-0 relative top-0.5" />
                      )}
                      
                      <span className={`text-[11px] transition-all ${task.completed ? 'line-through text-white/35 font-medium' : 'text-white/75 group-hover:text-white'}`}>
                        {task.text}
                      </span>
                    </div>
                  ))}
                  {selectedProject?.tasks.length === 0 && (
                    <p className="text-[10px] text-white/35 italic">Aucune tâche enregistrée</p>
                  )}
                </div>
              </div>

              {/* Module 3 & 4 Grid: Associated Documents & Active Agents */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Documents library */}
                <div className="bg-[#061220]/15 border border-white/5 rounded-xl p-3 flex flex-col justify-between">
                  <div>
                    <h4 className="text-[10px] font-mono uppercase font-bold text-cyan-glow/85 tracking-widest flex items-center gap-1.5 mb-2">
                      <FileText className="w-3.5 h-3.5" /> Bibliothèque Documents
                    </h4>
                    
                    <div className="space-y-1.5">
                      {selectedProject?.docs.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between text-[10px] bg-white/[0.02] border border-white/5 hover:border-white/10 px-2 py-1.5 rounded-lg">
                          <span className="text-white/75 font-medium truncate max-w-[100px]">{doc.name}</span>
                          <span className="text-[8px] font-mono text-white/40">{doc.size}</span>
                        </div>
                      ))}
                      {selectedProject?.docs.length === 0 && (
                        <p className="text-[10px] text-white/35 italic py-2">Aucun matériel rattaché</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Connected agents */}
                <div className="bg-[#061220]/15 border border-white/5 rounded-xl p-3 flex flex-col justify-between">
                  <div>
                    <h4 className="text-[10px] font-mono uppercase font-bold text-cyan-glow/85 tracking-widest flex items-center gap-1.5 mb-2">
                      <BotIcon className="w-3.5 h-3.5" /> Agents Connectés ({selectedProject?.agents.length})
                    </h4>
                    
                    <div className="space-y-1.5">
                      {selectedProject?.agents.map((ag) => (
                        <div key={ag.id} className="flex flex-col text-[10px] bg-cyan-glow/5 border border-cyan-glow/15 px-2 py-1.5 rounded-lg">
                          <span className="text-cyan-glow font-bold truncate">{ag.name}</span>
                          <span className="text-[8px] text-white/45 mt-0.5">{ag.role}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Module 5: Activity History Journal */}
              <div className="bg-[#061220]/10 border border-white/5 rounded-xl p-3">
                <h4 className="text-[10px] font-mono uppercase font-bold text-cyan-glow/85 tracking-widest flex items-center gap-1.5 mb-2">
                  <History className="w-3.5 h-3.5" /> Historique des Échanges & Tâches
                </h4>
                <div className="space-y-1.5 pl-1.5 border-l border-white/5">
                  {selectedProject?.history.map((hist, index) => (
                    <div key={index} className="flex items-center gap-1.5 text-[9px] text-white/50">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-glow/20 shrink-0" />
                      <span>{hist}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Database sync parameters diagnostics */}
      <div className="pt-2 pb-1 text-center border-t border-white/5 flex-shrink-0 flex items-center justify-between text-[9px] text-white/40 font-mono">
        <span className="flex items-center gap-1"><FolderOpen className="w-3 h-3 text-cyan-glow" /> Chantiers : {projects.length} enregistrés</span>
        <span className="text-cyan-glow/70 animate-pulse">● SECURE-GRID DIRECTORY</span>
      </div>
    </div>
  );
}
