import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Brain, Search, Plus, Trash2, Shield, Heart, CheckCircle2, FileText, ArrowRight, Sparkles } from "lucide-react";

interface MemoryItem {
  id: string;
  category: "pref" | "dec" | "sum" | "ctx";
  title: string;
  content: string;
  updatedAt: string;
}

const INITIAL_MEMORIES: MemoryItem[] = [
  {
    id: "mem-1",
    category: "pref",
    title: "Monsieur Éric - Préférences Matinales",
    content: "Café serré servi à 8h00 pile. Pas de sucre. Préfère les résumés vocaux courts des emails importants.",
    updatedAt: "Aujourd'hui, 08:12"
  },
  {
    id: "mem-2",
    category: "dec",
    title: "Hector Domotique - Profil Chauffage",
    content: "Le chauffage Hector doit être abaissé automatiquement à 18°C à partir de 23h00 en cas d'absence prolongée de l'étage.",
    updatedAt: "Hier, 19:32"
  },
  {
    id: "mem-3",
    category: "sum",
    title: "Synthèse - Bibliophile",
    content: "Une bibliothèque de 142 œuvres littéraires indexées. Sagas d'anticipation et philosophie classique définies comme sujets d'apprentissage prioritaires.",
    updatedAt: "3 fév."
  },
  {
    id: "mem-4",
    category: "ctx",
    title: "Sécurité & Authentification",
    content: "Authentification biométrique locale forcée sur l'appareil mobile. Chiffrement de flux direct vers le serveur principal.",
    updatedAt: "8 fév."
  },
  {
    id: "mem-5",
    category: "pref",
    title: "Comparateur Véhicules Électriques",
    content: "Filtrer la recherche de VE prioritaires dotés d'une autonomie supérieure à 450 km WLTP avec capacité de charge rapide > 100 kW.",
    updatedAt: "10 fév."
  },
  {
    id: "mem-6",
    category: "dec",
    title: "Planification Lecture hebdomadaire",
    content: "Générer un plan de lecture de 25 pages chaque mercredi à 20h00 d'après l'ouvrage en cours.",
    updatedAt: "Il y a 3j"
  }
];

export function MemoireTab() {
  const [memories, setMemories] = useState<MemoryItem[]>(INITIAL_MEMORIES);
  const [activeFilter, setActiveFilter] = useState<"all" | "pref" | "dec" | "sum" | "ctx">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Form state
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newCategory, setNewCategory] = useState<"pref" | "dec" | "sum" | "ctx">("pref");

  const categories = [
    { id: "all", label: "TOUTES", icon: Brain },
    { id: "pref", label: "PREF.", icon: Heart },
    { id: "dec", label: "DÉCISIONS", icon: CheckCircle2 },
    { id: "sum", label: "RÉSUMÉS", icon: FileText },
    { id: "ctx", label: "CONTEXTE", icon: Shield }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "pref":
        return "text-pink-400 bg-pink-400/10 border-pink-500/20";
      case "dec":
        return "text-emerald-400 bg-emerald-400/10 border-emerald-500/20";
      case "sum":
        return "text-purple-400 bg-purple-400/10 border-purple-500/20";
      case "ctx":
        return "text-cyan-glow bg-cyan-glow/10 border-cyan-glow/20";
      default:
        return "text-white/40 bg-white/5 border-white/10";
    }
  };

  const handlesAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newItem: MemoryItem = {
      id: `mem-${Date.now()}`,
      category: newCategory,
      title: newTitle,
      content: newContent,
      updatedAt: "À l'instant"
    };

    setMemories([newItem, ...memories]);
    setNewTitle("");
    setNewContent("");
    setShowAddForm(false);
  };

  const handleDelete = (id: string) => {
    setMemories(prev => prev.filter(m => m.id !== id));
  };

  const filteredMemories = memories.filter(mem => {
    const matchesFilter = activeFilter === "all" || mem.category === activeFilter;
    const matchesSearch = mem.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          mem.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden px-4 md:px-6 py-2 select-none">
      {/* Title / Description banner */}
      <div className="mb-4 flex-shrink-0">
        <h2 className="text-sm font-bold tracking-[0.14em] text-cyan-glow flex items-center gap-1.5 uppercase font-mono">
          <Brain className="w-4 h-4" /> NOYAU COGNITIF PERSISTANT
        </h2>
        <p className="text-[10px] text-white/55 tracking-wide mt-0.5">
          Archibald mémorise de façon autonome les préférences, règles de vie, et contextes propres à Monsieur Éric.
        </p>
      </div>

      {/* Memory Search bar and Add Quick Memory */}
      <div className="flex gap-2 items-center mb-4 flex-shrink-0">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-white/30 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher une décision ou préférence..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#030911]/80 hover:bg-[#030911]/95 text-xs text-white placeholder-white/30 rounded-xl py-2.5 pl-9 pr-4 border border-white/5 focus:border-cyan-glow/40 outline-none transition-all"
          />
        </div>
        
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className={`h-[36px] px-3.5 rounded-xl border flex items-center justify-center gap-1.5 text-xs font-semibold tracking-wide transition-all duration-300 active:scale-95
            ${showAddForm 
              ? "bg-rose-500/10 border-rose-500/40 text-rose-500 hover:bg-rose-500/20" 
              : "bg-cyan-glow/10 border-cyan-glow/30 hover:border-cyan-glow/55 text-cyan-glow hover:bg-cyan-glow/20"}`}
        >
          {showAddForm ? <Trash2 className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">{showAddForm ? "Annuler" : "Consigne"}</span>
        </button>
      </div>

      {/* Categories Horizontal Tabs */}
      <div className="flex gap-1 overflow-x-auto pb-3 flex-shrink-0 scrollbar-none scroll-smooth">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeFilter === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id as any)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[9px] font-bold uppercase tracking-[0.1em] pointer-events-auto transition-all duration-300 flex-shrink-0 active:scale-95
                ${isActive
                  ? "bg-cyan-glow/15 border-cyan-glow/45 text-cyan-glow"
                  : "bg-white/[0.02] border-white/5 text-white/50 hover:text-white hover:border-white/20"}`}
            >
              <Icon className="w-3 h-3" />
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/5 pr-1 py-1 space-y-3 relative min-h-0">
        <AnimatePresence mode="wait">
          {showAddForm ? (
            <motion.form
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              onSubmit={handlesAddMemory}
              className="bg-gradient-to-b from-[#071321] to-[#040a12] border border-cyan-glow/20 rounded-2xl p-4 space-y-4 shadow-[0_5px_15px_rgba(0,0,0,0.5)] z-10 relative"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-cyan-glow flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Nouvelle Consigne Cognitive
                </span>
                <span className="text-[8px] font-mono text-white/40">ARCHI-MEMEOR</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] uppercase font-bold text-white/50 tracking-wider">Titre de la mémorisation</label>
                <input
                  type="text"
                  placeholder="Ex: Horaire du thé d'Hector, Capteurs thermiques..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-[#030911]/80 text-xs text-white rounded-lg p-2.5 border border-white/10 focus:border-cyan-glow/40 outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase font-bold text-white/50 tracking-wider">Catégorie</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full bg-[#030911]/80 text-xs text-white/80 rounded-lg p-2 pl-1 border border-white/10 focus:border-cyan-glow/40 outline-none"
                  >
                    <option value="pref">Préférence</option>
                    <option value="dec">Décision</option>
                    <option value="sum">Résumé</option>
                    <option value="ctx">Contexte global</option>
                  </select>
                </div>

                <div className="space-y-1.5 flex flex-col justify-end">
                  <span className="text-[8px] text-white/30 italic leading-tight mb-2">Les consignes modifient le comportement général en temps réel.</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] uppercase font-bold text-white/50 tracking-wider">Détail ou Instruction précise</label>
                <textarea
                  placeholder="Inscrivez la règle qu'Archibald doit stocker et appliquer..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  rows={3}
                  className="w-full bg-[#030911]/80 text-xs text-white rounded-lg p-2.5 border border-white/10 focus:border-cyan-glow/40 outline-none resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full h-[36px] bg-gradient-to-r from-cyan-glow/30 to-blue-600/30 hover:from-cyan-glow/40 hover:to-blue-600/40 border border-cyan-glow/40 rounded-xl text-white font-semibold text-xs tracking-wide transition-all shadow-[0_4px_12px_rgba(34,211,238,0.1)] active:scale-[0.98] flex items-center justify-center gap-1.5"
              >
                Graveur de mémoire <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-2.5 pb-4"
            >
              {filteredMemories.length === 0 ? (
                <div className="text-center py-12 text-white/30 text-xs italic">
                  Aucune donnée mémorisée trouvée pour cette catégorie.
                </div>
              ) : (
                filteredMemories.map((mem) => (
                  <motion.div
                    key={mem.id}
                    layoutId={`mem-card-${mem.id}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group relative bg-[#061220]/20 hover:bg-[#061220]/50 border border-white/5 hover:border-cyan-glow/15 p-3.5 rounded-xl transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-2 gap-4">
                      <div className="flex items-center gap-2 min-w-0">
                        {/* Category Tag Badge */}
                        <span className={`text-[8px] font-bold uppercase tracking-[0.1em] px-1.5 py-0.5 rounded border ${getCategoryColor(mem.category)}`}>
                          {mem.category === "pref" ? "PREF" : mem.category === "dec" ? "DECISION" : mem.category === "sum" ? "SYNTHESE" : "CONTEXTE"}
                        </span>
                        
                        <h4 className="text-xs font-bold text-white/90 group-hover:text-white truncate">
                          {mem.title}
                        </h4>
                      </div>

                      {/* Delete Action button */}
                      <button
                        onClick={() => handleDelete(mem.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-rose-500/10 text-white/20 hover:text-rose-500 transition-all active:scale-90"
                        title="Effacer de la mémoire d'Archibald"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-[11px] leading-relaxed text-white/70">
                      {mem.content}
                    </p>

                    <div className="mt-2.5 flex items-center justify-between text-[8px] font-mono text-white/45 pl-1.5 border-l border-white/10">
                      <span>Index : COGNITIF-SECURE</span>
                      <span>Modifié : {mem.updatedAt}</span>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Memory integrity telemetry footer */}
      <div className="pt-2 pb-1 text-center border-t border-white/5 flex-shrink-0 flex items-center justify-between text-[9px] text-white/40 font-mono">
        <span className="flex items-center gap-1"><Brain className="w-3 h-3 text-cyan-glow" /> Cohérence : 98.4%</span>
        <span>Local Stock : {memories.length} entrées</span>
      </div>
    </div>
  );
}
