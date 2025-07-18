"use client";

import { useState } from 'react';

import { Conversation, Message } from '@/types/chat';
import MessageSidebar from '@/app/(dashboard)/messages/_components/MessageSidebar';
import ChatArea from '@/app/(dashboard)/messages/_components/ChatArea';

const conversations: Conversation[] = [
  {

    id: 1,
    name: "Ananya Sharma",
    avatar: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
    lastMessage: "Hey! like your profile",
    isOnline: true,
    unreadCount: 0
  },
  {
    id: 2,
    name: "Ananya Sharma", 
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
    lastMessage: "Hey! like your profile",
    isOnline: false,
    unreadCount: 0
  },
  {
    id: 3,
    name: "Ananya Sharma",
    avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
    lastMessage: "Hey! like your profile", 
    isOnline: true,
    unreadCount: 0
  },
  {
    id: 4,
    name: "Ananya Sharma",
    avatar: "https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
    lastMessage: "Hey! like your profile",
    isOnline: false,
    unreadCount: 0
  },
  {
    id: 5,
    name: "Ananya Sharma",
    avatar: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
    lastMessage: "Hey! like your profile",
    isOnline: true,
    unreadCount: 0
  },
  {
    id: 6,
    name: "Ananya Sharma",
    avatar: "https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
    lastMessage: "Hey! like your profile",
    isOnline: false,
    unreadCount: 0
  },
  {
    id: 7,
    name: "Ananya Sharma",
    avatar: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
    lastMessage: "Hey! like your profile",
    isOnline: true,
    unreadCount: 0
  }
];

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    sender: "other",
    timestamp: "8:00 PM",
    avatar: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1"
  },
  {
    id: 2,
    text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    sender: "me",
    timestamp: "8:00 PM",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1"
  },
  {
    id: 3,
    text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    sender: "other",
    timestamp: "8:00 PM",
    avatar: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1"
  },
  {
    id: 4,
    text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    sender: "me",
    timestamp: "8:00 PM",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1"
  }
];

export default function Home() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation>(conversations[0]);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: messages.length + 1,
      text,
      sender: "me",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
    };
    setMessages([...messages, newMessage]); // Ensure array is maintained
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:static inset-y-0 left-0 z-50 md:z-0 transition-transform duration-200 ease-in-out`}>
        <MessageSidebar 
          conversations={conversations}
          selectedConversation={selectedConversation}
          onSelectConversation={setSelectedConversation}
          onCloseSidebar={() => setIsSidebarOpen(false)}
        />
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        <ChatArea 
          conversation={selectedConversation}
          messages={messages}
          onSendMessage={handleSendMessage}
          onOpenSidebar={() => setIsSidebarOpen(true)}
        />
      </div>
    </div>
  );
}