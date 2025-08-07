"use client";

import { useState, useEffect } from 'react';
import { Conversation, Message } from '@/types/chat';
import MessageSidebar from '@/app/(dashboard)/messages/_components/MessageSidebar';
import ChatArea from '@/app/(dashboard)/messages/_components/ChatArea';

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Hey, how's it going?",
    sender: "other",
    timestamp: "8:00 PM",
    avatar: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
  },
  {
    id: 2,
    text: "Pretty good, thanks for asking!",
    sender: "me",
    timestamp: "8:02 PM",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
  },
  {
    id: 3,
    text: "Got any plans for the weekend?",
    sender: "other",
    timestamp: "8:03 PM",
    avatar: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
  },
  {
    id: 4,
    text: "Thinking about going hiking, you?",
    sender: "me",
    timestamp: "8:05 PM",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
  },
];

const DEFAULT_AVATAR = "/Images/person.png";

export default function Home() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConversations = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch('https://bxcfrrl4-3000.inc1.devtunnels.ms/api/message/allUserGet')

        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          const mappedConversations: Conversation[] = data.data.map((item: any, idx: number) => {
            // Determine the other user (not the current user)
            // For demo, just use receiverId
            const user = item.receiverId || item.requesterId;
            return {
              id: item._id || idx,
              name: user ? `${user.firstName} ${user.lastName}` : 'Unknown',
              avatar: user && user.avatar ? user.avatar : DEFAULT_AVATAR,
              lastMessage: item.status || '',
              isOnline: false, // API does not provide online status
              unreadCount: 0, // API does not provide unread count
            };
          });
          setConversations(mappedConversations);
          if (mappedConversations.length > 0) {
            setSelectedConversation(mappedConversations[0]);
          }
        } else {
          setError('No conversations found.');
        }
      } catch (err) {
        setError('Failed to load conversations. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchConversations();
  }, []);

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: messages.length + 1,
      text,
      sender: "me",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
    };
    setMessages([...messages, newMessage]);
    
    // Update last message in conversations
    setConversations(conversations.map(conv => 
      conv.id === selectedConversation?.id 
        ? { ...conv, lastMessage: text }
        : conv
    ));
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
        {isLoading ? (
          <div className="p-4">Loading conversations...</div>
        ) : error ? (
          <div className="p-4 text-red-500">{error}</div>
        ) : (
          <MessageSidebar 
            conversations={conversations}
            selectedConversation={selectedConversation || conversations[0]}
            onSelectConversation={setSelectedConversation}
            onCloseSidebar={() => setIsSidebarOpen(false)}
          />
        )}
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <ChatArea 
            conversation={selectedConversation}
            messages={messages}
            onSendMessage={handleSendMessage}
            onOpenSidebar={() => setIsSidebarOpen(true)}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p>Select a conversation to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
}