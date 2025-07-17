export interface Conversation {
    id: number;
    name: string;
    avatar: string;
    lastMessage: string;
    isOnline: boolean;
    unreadCount: number;
  }
  
  export interface Message {
    id: number;
    text: string;
    sender: 'me' | 'other';
    timestamp: string;
    avatar: string;
  }