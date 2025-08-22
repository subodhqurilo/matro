"use client";

import { useState, useRef } from 'react';
import { Send, Paperclip, X, Image as ImageIcon, FileText } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (text: string) => void;
}

export default function MessageInput({ onSendMessage }: MessageInputProps) {
  const [message, setMessage] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
     
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  

 

  return (
    <div className="p-4 border-t border-gray-200 bg-white">
      {/* File Preview */}
    

      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
       
        
        <div className="flex-1">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="w-full resize-none border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            rows={1}
            style={{ minHeight: "44px", maxHeight: "120px" }}
          />
        </div>
        
        <button
          type="submit"
          disabled={!message.trim() && selectedFiles.length === 0}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white mb-2 p-3 rounded-lg hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <Send className="h-5 w-5" />
        </button>
      </form>

     
    </div>
  );
}