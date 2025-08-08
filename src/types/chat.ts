export interface Conversation {
    id: string;
    name: string;
    avatar: string;
    lastMessage: string;
    isOnline: boolean;
    unreadCount: number;
  }
 // types/chat.ts
export interface Message {
  id: string; // Maps to _id from API
  senderId: string; // Maps to senderId
  receiverId: string; // Maps to receiverId
  text: string; // Maps to messageText
  isRead: boolean;
  timestamp: string; // ISO string for timestamp
  createdAt: string;
  updatedAt: string;
  sender: 'me' | 'other'; // To determine bubble styling
  avatar: string; // Avatar URL for display
}

