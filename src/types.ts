export type Message = {
  id: string;
  sender: 'user' | 'archi';
  text: string;
  timestamp: string;
  isThinking?: boolean;
};

export type Chat = {
  id: string;
  title: string;
  messages: Message[];
  isFavorite?: boolean;
  lastActive: string; // Formatting like "14:48", "Hier", "3 fév."
  lastActiveTime: number; // raw milliseconds for exact sorting
};

export type Project = {
  id: string;
  name: string;
  icon: 'hector' | 'archibald' | 'lecture' | 've';
  activity: string;
};
