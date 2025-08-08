"use client";

import { useState, useEffect } from 'react';

import MessageSidebar from '@/app/(dashboard)/messages/_components/MessageSidebar';
import ChatArea from '@/app/(dashboard)/messages/_components/ChatArea';
import { Conversation, Message } from '@/types/chat';

export default function Home() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get current user ID from localStorage
  const getCurrentUserId = async (): Promise<string | null> => {
    try {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const parsedData = JSON.parse(userData);
        
        // Try different possible field names for user ID
        const userId = parsedData._id || parsedData.userId || parsedData.id || parsedData.user?._id || parsedData.user?.userId || parsedData.user?.id;
        
        if (userId) {
          return userId;
        }
        
        // If no user ID found, log the structure for debugging
        console.warn('User data structure:', parsedData);
        console.warn('No user ID found in userData. Available fields:', Object.keys(parsedData));
      }
      
      // Fallback: Try to fetch user data from API
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const response = await fetch('https://bxcfrrl4-3000.inc1.devtunnels.ms/api/profile/self', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          
          if (response.ok) {
            const userData = await response.json();
            const userId = userData._id || userData.userId || userData.id || userData.user?._id || userData.user?.userId || userData.user?.id;
            
            if (userId) {
              // Store the user data for future use
              localStorage.setItem('userData', JSON.stringify(userData));
              return userId;
            }
          }
        } catch (apiError) {
          console.error('Error fetching user data from API:', apiError);
        }
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
    return null;
  };

  // Fetch messages for the current user
  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('No authentication token found');

      const currentUserId = await getCurrentUserId();
      if (!currentUserId) throw new Error('No current user ID found');

      const response = await fetch(`https://bxcfrrl4-3000.inc1.devtunnels.ms/api/message?currentUserId=688c58fdac4ea7678d389a8d`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }

      const result = await response.json();
      
      if (result.success && Array.isArray(result.data)) {
        // Process messages to add sender information
        const processedMessages: Message[] = result.data.map((msg: any) => ({
          id: msg._id,
          senderId: msg.senderId,
          receiverId: msg.receiverId,
          text: msg.messageText,
          isRead: msg.isRead,
          timestamp: msg.timestamp,
          createdAt: msg.createdAt,
          updatedAt: msg.updatedAt,
          sender: msg.senderId === currentUserId ? 'me' : 'other',
          avatar: msg.senderId === currentUserId ? '/my-avatar.png' : '/default-avatar.png',
        }));
        
        setMessages(processedMessages);
      } else {
        setMessages([]);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      setError('Failed to fetch messages');
    }
  };

  // Fetch conversations (users)
  const fetchConversations = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('No authentication token found');

      const response = await fetch('https://bxcfrrl4-3000.inc1.devtunnels.ms/api/message/allUserGet', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch conversations');
      }

      const data = await response.json();
      
      if (data.success && Array.isArray(data.data)) {
        const mappedConversations: Conversation[] = data.data.map((user: any) => ({
          id: user._id,
          name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Unknown User',
          avatar: user.profileImage || '/default-avatar.png',
          lastMessage: '',
          isOnline: false,
          unreadCount: 0,
        }));
        
        setConversations(mappedConversations);
        if (mappedConversations.length > 0 && !selectedConversation) {
          setSelectedConversation(mappedConversations[0]);
        }
      } else {
        setConversations([]);
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
      setError('Failed to fetch conversations');
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        await Promise.all([fetchConversations(), fetchMessages()]);
      } catch (error) {
        console.error('Error initializing data:', error);
        setError('Failed to initialize data');
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, []);

  const handleSendMessage = (text: string) => {
    // This will be handled by the ChatArea component
    // We just need to refresh messages after sending
    fetchMessages();
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
          (selectedConversation || conversations.length > 0) ? (
            <MessageSidebar 
              selectedConversation={(selectedConversation ?? conversations[0])!}
              onSelectConversation={(conversation) => setSelectedConversation(conversation)}
              onCloseSidebar={() => setIsSidebarOpen(false)}
            />
          ) : (
            <div className="p-4">No conversations</div>
          )
        )}
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <ChatArea 
            conversation={selectedConversation}
            initialMessages={messages}
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