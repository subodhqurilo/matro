"use client";

import { useState, useEffect } from 'react';
import { Phone, Video, Info, Menu } from 'lucide-react';
import { Conversation, Message } from '@/types/chat';
import MessageInput from './MessageInput';
import MessageBubble from './MessageBubble';
import Image from 'next/image';

interface ChatAreaProps {
  conversation: Conversation;
  initialMessages: Message[]; // Renamed to initialMessages to avoid confusion
  onOpenSidebar: () => void;
}

export default function ChatArea({ 
  conversation, 
  initialMessages, 
  onOpenSidebar 
}: ChatAreaProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  // Fetch messages for the current conversation
  const fetchMessagesForConversation = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('No authentication token found');

      const currentUserId = await getCurrentUserId();
      if (!currentUserId) throw new Error('No current user ID found');

      const response = await fetch(`https://bxcfrrl4-3000.inc1.devtunnels.ms/api/message?currentUserId=6881d5faa3181f3102796f95`, {
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
        // Filter messages for the current conversation
        const conversationMessages = result.data.filter((msg: any) => 
          msg.senderId === conversation.id || msg.receiverId === conversation.id
        );

        // Process messages to add sender information
        const processedMessages: Message[] = conversationMessages.map((msg: any) => ({
          id: msg._id,
          senderId: msg.senderId,
          receiverId: msg.receiverId,
          text: msg.messageText,
          isRead: msg.isRead,
          timestamp: msg.timestamp,
          createdAt: msg.createdAt,
          updatedAt: msg.updatedAt,
          sender: msg.senderId === currentUserId ? 'me' : 'other',
          avatar: msg.senderId === currentUserId ? '/my-avatar.png' : conversation.avatar,
        }));
        
        setMessages(processedMessages);
      } else {
        setMessages([]);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      setMessages([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch messages when conversation changes
  useEffect(() => {
    if (conversation) {
      setIsLoading(true);
      fetchMessagesForConversation();
    }
  }, [conversation.id]);

  const onSendMessage = async (text: string) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('No authentication token found');

      const currentUserId = await getCurrentUserId();
      if (!currentUserId) throw new Error('No current user ID found');

      const response = await fetch('https://bxcfrrl4-3000.inc1.devtunnels.ms/api/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include if API requires authentication
        },
        body: JSON.stringify({
          receiverId: conversation.id, // Assuming conversation.id is the receiverId
          messageText: text,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const result = await response.json();
      const newMessage: Message = {
        id: result.data._id,
        senderId: result.data.senderId,
        receiverId: result.data.receiverId,
        text: result.data.messageText,
        isRead: result.data.isRead,
        timestamp: result.data.timestamp,
        createdAt: result.data.createdAt,
        updatedAt: result.data.updatedAt,
        sender: result.data.senderId === currentUserId ? 'me' : 'other',
        avatar: result.data.senderId === currentUserId ? '/my-avatar.png' : conversation.avatar, // Adjust avatar logic
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      // Optionally show a toast/notification to the user
    }
  };

  return (
    <div className="flex flex-col h-full bg-white px-4 py-4 shadow-2xl">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button 
              onClick={onOpenSidebar}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu size={20} />
            </button>
            
            <div className="relative">
              <Image
                src={conversation?.avatar || "/default-avatar.png"}
                alt={conversation?.name || "User"}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover"
              />
              {conversation.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            
            <div>
              <h2 className="font-semibold text-gray-900">{conversation?.name || "User"}</h2>
              <p className="text-sm text-gray-500">#CU6798H</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Loading messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">No messages yet. Start a conversation!</p>
          </div>
        ) : (
          messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))
        )}
      </div>

      {/* Message Input */}
      <MessageInput onSendMessage={onSendMessage} />
    </div>
  );
}