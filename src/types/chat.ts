export interface Conversation {
  id: string;
  name: string;
  avatar?: string;
  lastMessage?: string;       // store the last message text
  isOnline: boolean;
  unreadCount?: number;       // track unread messages
  messages?: {                // optional array of all messages
    sender: string;
    text: string;
    timestamp?: string;
  }[];
}



export interface MessageFile {
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
}

export interface Message {
  id: string;            // final ID from server
  tempId?: string;       // temporary ID for optimistic updates
  senderId: string;
  receiverId: string;
  text?: string;
  sender: "me" | "other";
  avatar?: string;
  files?: MessageFile[];
  replyTo?: Message;
  timestamp: string;
}

export interface SocketMessage {
  _id?: string;
  tempId?: string;        // server echoes back tempId
  senderId: string;
  receiverId: string;
  messageText: string;
  createdAt?: string;
  files?: MessageFile[];
  replyTo?: SocketMessage;
}
