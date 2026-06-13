import { useState, useEffect } from 'react';
import { Background } from './components/Background';
import { Header } from './components/Header';
import { ChatMessages } from './components/ChatMessages';
import { InputArea } from './components/InputArea';
import { BottomNav } from './components/BottomNav';
import { Sidebar } from './components/Sidebar';
import { VocalTab } from './components/VocalTab';
import { MemoireTab } from './components/MemoireTab';
import { ProjetsTab } from './components/ProjetsTab';
import { PlusTab } from './components/PlusTab';
import { ControlCenter, ArchibaldState } from './components/ControlCenter';
import { Chat, Message } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("chat");
  const [isThinking, setIsThinking] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [controlCenterOpen, setControlCenterOpen] = useState(false);
  
  // Account tier can be shifted actively between 'free' and 'premium'
  const [accountTier, setAccountTier] = useState<'free' | 'premium'>('free');
  const [selectedModel, setSelectedModel] = useState<string>("auto");
  const [archiState, setArchiState] = useState<ArchibaldState>('idle');
  const [currentChatId, setCurrentChatId] = useState<string>("chat-1");

  // Keep state synced with focus and thinking changes
  useEffect(() => {
    if (!isThinking) {
      setArchiState(isFocused ? 'listening' : 'idle');
    }
  }, [isFocused, isThinking]);

  const [chats, setChats] = useState<Chat[]>([
    {
      id: "chat-1",
      title: "Majordome Archibald",
      messages: [
        {
          id: 'm1',
          sender: 'user',
          text: 'salut',
          timestamp: '14:40'
        },
        {
          id: 'm2',
          sender: 'archi',
          text: 'Monsieur Éric, bonjour. Comment puis-je vous être utile aujourd\'hui ?',
          timestamp: '14:48'
        }
      ],
      isFavorite: true,
      lastActive: "14:48",
      lastActiveTime: Date.now() - 300000 // 5 minutes ago
    },
    {
      id: "chat-2",
      title: "Hector - Suivi Domotique",
      messages: [
        {
          id: 'mh1',
          sender: 'user',
          text: 'Quelles sont les températures relevées par Hector ?',
          timestamp: 'Hier, 19:30'
        },
        {
          id: 'mh2',
          sender: 'archi',
          text: 'Monsieur Éric, le capteur principal Hector relève 21,4°C dans votre salon et 18,2°C dans la chambre d\'amis.',
          timestamp: 'Hier, 19:32'
        }
      ],
      isFavorite: false,
      lastActive: "Hier",
      lastActiveTime: Date.now() - 24 * 3600 * 1000 // Yesterday
    },
    {
      id: "chat-3",
      title: "Recherche Lecture IA",
      messages: [
        {
          id: 'ml1',
          sender: 'user',
          text: 'Fais-moi un résumé de ma bibliothèque de lecture.',
          timestamp: '3 fév.'
        },
        {
          id: 'ml2',
          sender: 'archi',
          text: 'Bien reçu. Votre catalogue contient 142 ouvrages suivis. Vos trois thèmes d\'excellence actuels sont : les sagas d\'anticipation, la philosophie classique et l\'histoire de la cybernétique.',
          timestamp: '3 fév.'
        }
      ],
      isFavorite: false,
      lastActive: "3 fév.",
      lastActiveTime: Date.now() - 10 * 24 * 3600 * 1000 // 10 days ago
    }
  ]);

  const activeChat = chats.find(c => c.id === currentChatId) || chats[0] || {
    id: "fallback",
    title: "Discussion",
    messages: []
  };

  const currentMessages = activeChat.messages;

  const handleSend = (text: string) => {
    const targetChatId = currentChatId;
    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    // Add user message
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: timeString
    };
    
    setChats(prev => prev.map(chat => {
      if (chat.id === targetChatId) {
        const updatedMessages = [...chat.messages, newMessage];
        const title = chat.title === "Nouvelle discussion" || chat.title === "Nouvelle conversation"
          ? (text.length > 22 ? text.substring(0, 19) + "..." : text)
          : chat.title;
        return {
          ...chat,
          messages: updatedMessages,
          title,
          lastActive: timeString,
          lastActiveTime: Date.now()
        };
      }
      return chat;
    }));

    setIsThinking(true);
    setArchiState('analyzing');
    
    // Animate details transitions
    const step2 = setTimeout(() => {
      setArchiState('executing');
    }, 700);

    const step3 = setTimeout(() => {
      setArchiState('replying');
    }, 1500);
    
    // Simulate AI response delay
    setTimeout(() => {
      clearTimeout(step2);
      clearTimeout(step3);
      
      const replyNow = new Date();
      const replyTimeString = `${replyNow.getHours().toString().padStart(2, '0')}:${replyNow.getMinutes().toString().padStart(2, '0')}`;
      
      const welcomeMessages = [
        "Demande reçue, Monsieur Éric. Ma matrice d'analyse est en cours d'exécution et Archibald est à vos côtés.",
        "Ma connexion est opérationnelle. Entendu, Monsieur Éric, j'ai pris note de vos consignes.",
        "Votre assistant Archibald est à votre entière disposition. J'enregistre vos directives de ce pas.",
        "Analyse de votre requête en cours... Je mets tout en œuvre pour vous apporter la réponse optimale."
      ];
      
      const randomText = text.toLowerCase().includes('salut') || text.toLowerCase().includes('bonjour')
        ? "Bonjour Monsieur Éric, de retour ! Que puis-je mettre en œuvre pour vous en ce moment ?"
        : welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];

      const replyMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'archi',
        text: randomText,
        timestamp: replyTimeString
      };

      setChats(prev => prev.map(chat => {
        if (chat.id === targetChatId) {
          return {
            ...chat,
            messages: [...chat.messages, replyMessage],
            lastActive: replyTimeString,
            lastActiveTime: Date.now()
          };
        }
        return chat;
      }));
      
      setIsThinking(false);
      setArchiState(isFocused ? 'listening' : 'idle');
    }, 2200);
  };

  const handleNewChat = () => {
    const newId = `chat-${Date.now()}`;
    const newChat: Chat = {
      id: newId,
      title: "Nouvelle discussion",
      messages: [],
      lastActive: "À l'instant",
      lastActiveTime: Date.now()
    };
    setChats(prev => [newChat, ...prev]);
    setCurrentChatId(newId);
  };

  const handleToggleFavorite = (id: string) => {
    setChats(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, isFavorite: !c.isFavorite };
      }
      return c;
    }));
  };

  const handleDeleteChat = (id: string) => {
    setChats(prev => {
      const remaining = prev.filter(c => c.id !== id);
      if (id === currentChatId) {
        if (remaining.length > 0) {
          setCurrentChatId(remaining[0].id);
        } else {
          const newId = `chat-${Date.now()}`;
          const newChat: Chat = {
            id: newId,
            title: "Nouvelle discussion",
            messages: [],
            lastActive: "À l'instant",
            lastActiveTime: Date.now()
          };
          setCurrentChatId(newId);
          return [newChat];
        }
      }
      return remaining;
    });
  };

  const hologramStatus = archiState === 'listening' ? 'listening' : (archiState === 'idle' ? 'idle' : 'thinking');

  return (
    <div className="relative w-full h-full flex flex-col bg-bg-dark font-sans overflow-hidden">
      <Background isThinking={isThinking && activeTab === 'chat'} />
      
      <div className="flex flex-col h-full w-full max-w-lg mx-auto relative z-10">
        <Header 
          onMenuClick={() => setSidebarOpen(true)} 
          onControlClick={() => setControlCenterOpen(true)} 
        />
        
        <div className="flex-1 flex flex-col min-h-0 relative z-10">
          {activeTab === 'chat' && (
            <>
              <ChatMessages 
                messages={currentMessages} 
                isThinking={isThinking} 
                hologramStatus={hologramStatus} 
              />
              <InputArea onSend={handleSend} onFocusChange={setIsFocused} />
            </>
          )}

          {activeTab === 'vocal' && (
            <VocalTab onBackToChat={() => setActiveTab('chat')} />
          )}

          {activeTab === 'memoire' && (
            <MemoireTab />
          )}

          {activeTab === 'projets' && (
            <ProjetsTab />
          )}

          {activeTab === 'plus' && (
            <PlusTab />
          )}
        </div>
        
        <BottomNav activeTab={activeTab} onTabSelected={setActiveTab} />
      </div>

      <Sidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        chats={chats}
        currentChatId={currentChatId}
        onSelectChat={setCurrentChatId}
        onNewChat={handleNewChat}
        onToggleFavorite={handleToggleFavorite}
        onDeleteChat={handleDeleteChat}
        onNavigateTab={setActiveTab}
      />

      <ControlCenter 
        isOpen={controlCenterOpen}
        onClose={() => setControlCenterOpen(false)}
        currentState={archiState}
        accountTier={accountTier}
        setAccountTier={setAccountTier}
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
      />
    </div>
  );
}
