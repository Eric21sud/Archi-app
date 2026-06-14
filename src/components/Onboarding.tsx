import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  Brain, 
  ShieldCheck, 
  WifiOff, 
  Cpu, 
  Mic, 
  Rocket,
  ChevronRight,
  Check
} from 'lucide-react';
import archibaldAvatar from '../assets/images/archibald_avatar_1780067466607.png';

interface OnboardingProps {
  onComplete: () => void;
}

const ONBOARDING_STEPS = [
  {
    id: 1,
    title: "Bienvenue dans Archibald",
    subtitle: "Votre majordome numérique personnel",
    text: "Archibald est une intelligence artificielle conçue pour vous accompagner au quotidien.\n\nPosez vos questions, organisez vos projets, retrouvez vos informations importantes et laissez Archibald vous assister naturellement.\n\nSimple, rapide et toujours à portée de main.",
    icon: Bot
  },
  {
    id: 2,
    title: "Une mémoire qui travaille pour vous",
    subtitle: "Archibald se souvient",
    text: "Plus besoin de répéter les mêmes informations.\n\nArchibald peut mémoriser vos projets, vos préférences et les décisions importantes afin de vous aider plus efficacement au fil du temps.\n\nVotre assistant devient de plus en plus utile à mesure que vous l'utilisez.",
    icon: Brain
  },
  {
    id: 3,
    title: "Vos données restent sous votre contrôle",
    subtitle: "Confidentialité avant tout",
    text: "Vos données vous appartiennent.\n\nArchibald est conçu pour protéger votre vie privée. Vos informations restent privées et sous votre contrôle.\n\nVous décidez de ce qui est mémorisé, partagé ou supprimé.",
    icon: ShieldCheck
  },
  {
    id: 4,
    title: "Même sans connexion Internet",
    subtitle: "Disponible partout",
    text: "Même sans Internet, Archibald reste capable d'accéder à votre mémoire, vos projets et vos informations enregistrées.\n\nVotre assistant reste disponible où que vous soyez.",
    icon: WifiOff
  },
  {
    id: 5,
    title: "La meilleure intelligence, automatiquement",
    subtitle: "Une IA qui choisit pour vous",
    text: "Pas besoin de connaître GPT, Claude, Gemini ou d'autres modèles.\n\nArchibald sélectionne automatiquement l'intelligence la plus adaptée à chaque demande pour vous offrir la meilleure expérience possible.\n\nVous posez une question, Archibald s'occupe du reste.",
    icon: Cpu
  },
  {
    id: 6,
    title: "Parlez naturellement",
    subtitle: "Votre assistant vocal personnel",
    text: "Écrivez ou parlez à Archibald.\n\nDemandez une recherche, gérez vos projets, obtenez de l'aide ou retrouvez une information simplement avec votre voix.\n\nComme une conversation naturelle.",
    icon: Mic
  },
  {
    id: 7,
    title: "Prêt à commencer ?",
    subtitle: "Tout est prêt",
    text: "",
    icon: Rocket,
    bullets: [
      "Assistant personnel intelligent",
      "Mémoire persistante",
      "Respect de votre vie privée",
      "Fonctionnement local disponible",
      "Gestion de projets",
      "IA multi-modèles automatique",
      "Assistance vocale"
    ]
  }
];

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const step = ONBOARDING_STEPS[currentStep];
  const Icon = step.icon;
  const isLastStep = currentStep === ONBOARDING_STEPS.length - 1;

  return (
    <div className="fixed inset-0 z-[100] bg-bg-dark flex flex-col pt-8 pb-4 px-6 font-sans overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-glow/10 blur-[100px] pointer-events-none rounded-full translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-600/10 blur-[80px] pointer-events-none rounded-full -translate-x-1/2 translate-y-1/3" />

      {/* Skip button container */}
      <div className="flex justify-end relative z-10 min-h-[28px] -mr-2">
        {!isLastStep && (
          <button 
            onClick={handleSkip}
            className="text-white/40 hover:text-white/80 text-[11px] font-bold uppercase tracking-widest transition-colors px-4 py-1"
          >
            Passer
          </button>
        )}
      </div>

      <div className="flex-1 flex flex-col relative z-10 max-w-sm mx-auto w-full pt-2">
        {/* Absolute container so content changes don't affect button position */}
        <div className="flex-1 relative w-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute inset-0 flex flex-col justify-center"
            >
              <div className="w-full flex flex-col">
                {/* Icon Graphic */}
                <div className="flex justify-center mb-4 mt-2">
              <div className="relative">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
                  className={`w-16 h-16 rounded-full bg-gradient-to-b from-[#0a1526] to-[#040c16] ${currentStep === 0 ? '' : 'border border-cyan-glow/30'} flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.15)] relative z-10 overflow-hidden`}
                >
                  {currentStep === 0 ? (
                    <>
                      <img src={archibaldAvatar} alt="Archi" className="w-full h-full object-cover rounded-full opacity-90 scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-cyan-glow/20 to-transparent rotate-45 pointer-events-none mix-blend-screen opacity-70"></div>
                      <div className="absolute inset-0 rounded-full border border-cyan-glow/60 z-10"></div>
                    </>
                  ) : (
                    <Icon className="w-7 h-7 text-cyan-glow" strokeWidth={1.5} />
                  )}
                </motion.div>
                
                {/* Decorative rings */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[-10px] border border-dashed border-cyan-glow/20 rounded-full"
                />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[-20px] border border-cyan-glow/10 rounded-full"
                />
              </div>
            </div>

            {/* Content Area */}
            <div className="text-center space-y-2.5">
              <h2 className="text-lg sm:text-xl font-display font-medium text-white tracking-wide">
                {step.title}
              </h2>
              
              <div className="inline-block px-3 py-0.5 bg-cyan-glow/10 border border-cyan-glow/20 rounded-full">
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-cyan-glow">
                  {step.subtitle}
                </h3>
              </div>
              
              <div className="mt-3 text-white/70 text-sm sm:text-[15px] leading-snug tracking-wide space-y-3 text-left">
                {step.text.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              {step.bullets && (
                <div className="mt-4 space-y-2.5 text-left bg-black/20 p-4 rounded-2xl border border-white/5 mx-auto max-w-xs">
                  {step.bullets.map((bullet, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + (i * 0.1) }}
                      className="flex items-center gap-3 text-white/80 text-[13px]"
                    >
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>{bullet}</span>
                    </motion.div>
                  ))}
                  <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ delay: 1 }}
                     className="pt-4 text-center text-cyan-glow/80 text-[11px] font-mono tracking-widest uppercase"
                  >
                    Bienvenue dans l'univers Archibald
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>

    {/* Navigation & Progress */}
        <div className="h-[120px] shrink-0 w-full flex flex-col items-center justify-end gap-5 pb-2">
          <div className="flex items-center gap-2">
            {ONBOARDING_STEPS.map((_, idx) => (
              <div key={idx} className="w-6 flex items-center justify-center">
                <div 
                  className={`transition-all duration-500 rounded-full h-1.5 ${
                    idx === currentStep 
                      ? 'w-6 bg-cyan-glow shadow-[0_0_8px_rgba(34,211,238,0.8)]' 
                      : 'w-1.5 bg-white/20'
                  }`}
                />
              </div>
            ))}
          </div>

          <button
            onClick={handleNext}
            className="relative overflow-hidden w-full max-w-[280px] group rounded-2xl bg-gradient-to-r from-cyan-glow/20 to-blue-600/20 border border-cyan-glow/40 hover:border-cyan-glow/70 p-4 transition-all duration-300 hover:shadow-[0_0_25px_rgba(34,211,238,0.3)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-glow/0 via-cyan-glow/20 to-cyan-glow/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            <div className="relative z-10 flex items-center justify-center gap-2">
              <span className="font-bold uppercase tracking-widest text-sm text-white drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
                {isLastStep ? "Commencer" : "Continuer"}
              </span>
              {!isLastStep && <ChevronRight className="w-4 h-4 text-cyan-glow" />}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
