export interface MessageFile {
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
  sender: 'me' | 'other';
  avatar: string;
  isRead?: boolean;
  createdAt?: string;
  updatedAt?: string;
  files?: MessageFile[];
}

export interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  isOnline?: boolean;
  unreadCount?: number;
}