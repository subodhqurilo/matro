"use client";

import { useState, useEffect } from 'react';
import { Conversation, Message } from '@/types/chat';
import MessageSidebar from '@/app/(dashboard)/messages/_components/MessageSidebar';
import ChatArea from '@/app/(dashboard)/messages/_components/ChatArea';

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    sender: "other",
    timestamp: "8:00 PM",
    avatar: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
  },
  {
    id: 2,
    text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    sender: "me",
    timestamp: "8:00 PM",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
  },
  {
    id: 3,
    text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    sender: "other",
    timestamp: "8:00 PM",
    avatar: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
  },
  {
    id: 4,
    text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    sender: "me",
    timestamp: "8:00 PM",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
  },
];

export default function Home() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Assume the current user's ID (this should come from auth context or similar)
  const currentUserId = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODhjNWVmYTRlYzBjMGFiNmZjZWZkYmIiLCJpYXQiOjE3NTQwNTQ2MzksImV4cCI6MTc1NDY1OTQzOX0.drAfMlhy2OKcPEW5KsylvD8dmr19Xc2FHeP-Mk-aoFQ"; // Replace with actual user ID from auth

  useEffect(() => {
    async function fetchConversations() {
      try {
        setIsLoading(true);
        const response = await fetch('https://bxcfrrl4-3000.inc1.devtunnels.ms/api/message/allUserGet');
        if (!response.ok) {
          throw new Error('Failed to fetch conversations');
        }
        const { success, data } = await response.json();
        if (!success) {
          throw new Error('API returned unsuccessful response');
        }

        // Map API data to Conversation type
        const mappedConversations: Conversation[] = data.map((item: any) => {
          // Determine the other user (not the current user)
          const isCurrentUserRequester = item.requesterId._id === currentUserId;
          const otherUser = isCurrentUserRequester ? item.receiverId : item.requesterId;

          return {
            id: item._id,
            name: `${otherUser.firstName} ${otherUser.lastName}`,
            avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1", // Default avatar
            lastMessage: "No messages yet", // Default, replace with actual last message if available
            isOnline: false, // Default, replace with actual status if available
            unreadCount: 0, // Default, replace with actual count if available
          };
        });

        setConversations(mappedConversations);
        if (mappedConversations.length > 0) {
          setSelectedConversation(mappedConversations[0]);
        }
      } catch (err) {
        setError('Failed to load conversations. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

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