"use client";

import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import Image from 'next/image';
import { Conversation } from '@/types/chat';

interface ApiUser {
  _id: string;
  firstName: string;
  lastName: string;
  profileImage: string;
}

interface MessageSidebarProps {
  selectedConversation: Conversation;
  onSelectConversation: (conversation: Conversation) => void;
  onCloseSidebar: () => void;
}

export default function MessageSidebar({
  selectedConversation,
  onSelectConversation,
  onCloseSidebar,
}: MessageSidebarProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
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
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response:', data);

        if (data.success && Array.isArray(data.data)) {
          const mappedConversations: Conversation[] = data.data.map((user: ApiUser) => ({
            id: user._id,
            name: `${user.firstName} ${user.lastName}`,
            avatar: user.profileImage,
            lastMessage: '', // Default value
          }));
          setConversations(mappedConversations);
        } else {
          setError('Failed to load users: Invalid response format');
        }
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredConversations = conversations.filter((conversation) =>
    conversation.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-100 bg-white border-r border-gray-200 flex flex-col h-full px-4 py-4">
      <div className="border shadow-2xl rounded-2xl border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-gray-900">Messages</h1>
            <button
              onClick={onCloseSidebar}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <X size={20} />
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {loading && <div className="p-4 text-center text-gray-500">Loading...</div>}
        {error && <div className="p-4 text-center text-red-500">{error}</div>}

        {!loading && !error && (
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => {
                  onSelectConversation(conversation);
                  onCloseSidebar();
                }}
                className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedConversation.id === conversation.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Image
                      src={conversation.avatar}
                      alt={conversation.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900 truncate">{conversation.name}</h3>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}