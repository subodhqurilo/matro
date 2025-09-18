"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Paperclip, X, Image as ImageIcon, FileText } from "lucide-react";

interface MessageInputProps {
  onSendMessage: (text: string, files?: File[]) => void;
  replyingMessage?: { text: string; id: string }; 
  onCancelReply?: () => void;  
  disabled?: boolean;  
}

export default function MessageInput({ onSendMessage, replyingMessage, onCancelReply, disabled }: MessageInputProps) {
  const [message, setMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() && selectedFiles.length === 0) return;
    onSendMessage(message.trim(), selectedFiles);
    setMessage("");
    setSelectedFiles([]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles((prev) => [...prev, ...Array.from(e.target.files)]);
      e.target.value = "";
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setSelectedFiles((prev) => [...prev, ...Array.from(e.dataTransfer.files)]);
    }
  };

  return (
    <div
      className={`p-4 border-t border-gray-200 bg-white ${isDragging ? "bg-indigo-50 border-indigo-400" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {selectedFiles.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedFiles.map((file, index) => (
            <div key={index} className="flex items-center bg-gray-100 px-2 py-1 rounded-lg border border-gray-200">
              {file.type.startsWith("image/") ? (
                <ImageIcon className="w-4 h-4 mr-1 text-gray-600" />
              ) : (
                <FileText className="w-4 h-4 mr-1 text-gray-600" />
              )}
              <span className="text-xs truncate max-w-[120px]">{file.name}</span>
              <button type="button" onClick={() => removeFile(index)}>
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        {/* Attach File Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled} // <-- applied
          className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Paperclip className="w-5 h-5 text-gray-600" />
        </button>
        <input type="file" multiple ref={fileInputRef} onChange={handleFileChange} className="hidden" />

        {/* Message Textarea */}
        <div className="flex-1">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={disabled ? "You cannot send messages" : "Type your message..."} // <-- optional
            disabled={disabled} // <-- applied
            className="w-full resize-none border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            rows={1}
            style={{ minHeight: "44px", maxHeight: "200px" }}
          />
        </div>

        {/* Send Button */}
        <button
          type="submit"
          disabled={disabled || (!message.trim() && selectedFiles.length === 0)} // <-- applied
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-3 rounded-lg hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <Send className="h-5 w-5" />
        </button>
      </form>

      {isDragging && <p className="text-sm text-indigo-600 mt-2">Drop files here to upload</p>}
    </div>
  );
}
