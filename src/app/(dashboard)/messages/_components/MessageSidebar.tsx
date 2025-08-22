"use client";

import { useState } from "react";
import { Search, X, Users, User, LogOut } from "lucide-react";
import Image from "next/image";
import { Conversation } from "@/types/chat";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  profileImage?: string;
}

interface MessageSidebarProps {
  conversations: Conversation[];
  selectedConversation: Conversation | null;
  currentUser: User | null;
  onSelectConversation: (conversation: Conversation) => void;
  onCloseSidebar: () => void;
  onLogout: () => void;
  onRetry: () => void;
}

export default function MessageSidebar({ 
  conversations,
  selectedConversation,
  currentUser,
  onSelectConversation,
  onCloseSidebar,
  onLogout,
  onRetry,
}: MessageSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = conversations.filter((conversation) =>
    conversation.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full bg-white shadow-xl flex flex-col h-full">
  

      {/* Search */}
      <div className="p-4 ">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Users List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          <div className="flex items-center space-x-2 mb-3 px-2">
            <Users className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-500">
              Contacts ({filteredConversations.length})
            </span>
          </div>

          {conversations.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <User className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No users loaded</p>
              <button
                onClick={onRetry}
                className="mt-2 text-indigo-600 text-sm hover:underline"
              >
                Retry loading users
              </button>
            </div>
          ) : filteredConversations.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <User className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No users found</p>
            </div>
          ) : (
            filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => onSelectConversation(conversation)}
                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedConversation?.id === conversation.id
                    ? "bg-indigo-50 border-l-4 border-indigo-500"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="relative">
                  {conversation.avatar ? (
                    <Image
                      src={conversation.avatar}
                      alt={conversation.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {conversation.name?.charAt(0)?.toUpperCase() || "?"}
                      {conversation.name?.split(" ")[1]?.charAt(0)?.toUpperCase() || ""}
                    </div>
                  )}
                  {conversation.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">{conversation.name}</h3>
                  <p className="text-sm text-gray-500 truncate">
                    {conversation.lastMessage || `ID: ${conversation.id.slice(-8)}`}
                  </p>
                </div>
                { (conversation.unreadCount ?? 0) > 0 && (
  <div className="bg-indigo-500 text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center">
    {conversation.unreadCount}
  </div>
)}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
