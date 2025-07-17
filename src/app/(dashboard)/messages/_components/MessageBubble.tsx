"use client";

import { Message } from '@/types/chat';
import Image from 'next/image';

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isMe = message.sender === 'me';
  
  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex max-w-xs lg:max-w-md ${isMe ? 'flex-row-reverse' : 'flex-row'} items-end space-x-2`}>
        {!isMe && (
          <Image
            src={message.avatar}
            alt={message.sender}
            width={32}
            height={32}
            className="w-8 h-8 rounded-full object-cover"
          />
        )}
        
        <div className={`px-4 py-2 rounded-2xl ${
          isMe 
            ? 'bg-blue-500 text-white rounded-br-md' 
            : 'bg-gray-200 text-gray-900 rounded-bl-md'
        }`}>
          <p className="text-sm">{message.text}</p>
          <p className={`text-xs mt-1 ${
            isMe ? 'text-blue-100' : 'text-gray-500'
          }`}>
            {new Date(message.timestamp).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </p>
        </div>
        
        {isMe && (
          <Image
            src={message.avatar}
            alt={message.sender}
            width={32}
            height={32}
            className="w-8 h-8 rounded-full object-cover"
          />
        )}
      </div>
    </div>
  );
}