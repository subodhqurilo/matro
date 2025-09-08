"use client";
import { useState, useEffect, useRef } from 'react';
import { Phone, Video, Info, Menu } from 'lucide-react';
import Image from "next/image";
import { Socket } from "socket.io-client";
import { Conversation, Message, MessageFile } from '@/types/chat';
import MessageInput from './MessageInput';
import MessageBubble from './MessageBubble';

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  profileImage?: string;
}

interface SocketMessage {
  _id?: string;
  senderId: string;
  receiverId: string;
  messageText: string;
  createdAt?: string;
  files?: MessageFile[];
}

interface ChatAreaProps {
  conversation: Conversation;
  currentUser: User | null;
  socket: Socket;
  onOpenSidebar: () => void;
  onMessageSent: () => void;
}

export default function ChatArea({
  conversation,
  currentUser,
  socket,
  onOpenSidebar,
  onMessageSent
}: ChatAreaProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

  // Auto scroll to bottom
  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  // Check if user is at bottom of messages
  const isAtBottom = () => {
    if (!messagesContainerRef.current) return true;

    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    const threshold = 100; // 100px threshold

    return scrollTop + clientHeight >= scrollHeight - threshold;
  };

  // Handle scroll events to determine if we should auto-scroll
  const handleScroll = () => {
    setShouldAutoScroll(isAtBottom());
  };

  // Auto-scroll when messages change
  useEffect(() => {
    if (shouldAutoScroll) {
      scrollToBottom();
    }
  }, [messages, shouldAutoScroll]);

  // Scroll to bottom immediately when conversation changes
  useEffect(() => {
    if (conversation) {
      setShouldAutoScroll(true);
      // Use instant scroll when switching conversations
      setTimeout(() => scrollToBottom('instant'), 100);
    }
  }, [conversation.id]);

  // Socket message listeners
  useEffect(() => {
    if (!currentUser || !conversation) return;

    console.log("💬 Setting up message listeners for:", conversation.name);

    // Request message history
    socket.emit("get-messages", {
      from: currentUser._id,
      to: conversation.id,
    });

    // Listen for message history
    socket.on("messages-history", (msgs: SocketMessage[]) => {
      console.log("📨 Received message history:", msgs.length, "messages");
      const processedMessages: Message[] = msgs.map((msg, index) => ({
        id: msg._id || `msg-${index}-${Date.now()}`,
        senderId: msg.senderId,
        receiverId: msg.receiverId,
        text: msg.messageText,
        timestamp: msg.createdAt || new Date().toISOString(),
        sender: msg.senderId === currentUser._id ? 'me' : 'other',
        avatar: msg.senderId === currentUser._id
          ? (currentUser.profileImage || '/my-avatar.png')
          : conversation.avatar,
        files: msg.files,
      }));
      setMessages(processedMessages);
      setIsLoading(false);
      setShouldAutoScroll(true);
    });

    // Listen for new incoming messages
    socket.on("msg-receive", (msg: SocketMessage) => {
      console.log("📨 Received new message:", msg);
      const newMessage: Message = {
        id: msg._id || `msg-receive-${Date.now()}`,
        senderId: msg.senderId,
        receiverId: msg.receiverId,
        text: msg.messageText,
        timestamp: msg.createdAt || new Date().toISOString(),
        sender: 'other',
        avatar: conversation.avatar,
        files: msg.files,
      };
      setMessages((prev) => [...prev, newMessage]);
      // Always auto-scroll for new incoming messages
      setShouldAutoScroll(true);
    });

    // Listen for message sent confirmation
    socket.on("msg-sent", (msg: SocketMessage) => {
      console.log("📤 Message sent confirmation:", msg);
      setMessages((prev) => {
        const updatedMessages = [...prev];
        const lastMessage = updatedMessages[updatedMessages.length - 1];
        if (lastMessage && lastMessage.sender === 'me' && !lastMessage.id.startsWith('msg-')) {
          lastMessage.id = msg._id || lastMessage.id;
        }
        return updatedMessages;
      });
    });

    return () => {
      socket.off("messages-history");
      socket.off("msg-receive");
      socket.off("msg-sent");
    };
  }, [currentUser, conversation, socket]);

  // Upload files to server
  const uploadFiles = async (files: File[]): Promise<MessageFile[]> => {
    const uploadedFiles: MessageFile[] = [];

    for (const file of files) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const token = localStorage.getItem('authToken');
        const response = await fetch('http://localhost:3000/api/upload', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          uploadedFiles.push({
            fileName: file.name,
            fileUrl: result.fileUrl || result.url,
            fileType: file.type,
            fileSize: file.size,
          });
        } else {
          console.error('Failed to upload file:', file.name);
        }
      } catch (error) {
        console.error('Error uploading file:', file.name, error);
      }
    }

    return uploadedFiles;
  };

  const onSendMessage = async (text: string, files?: File[]) => {
    if (!currentUser || !conversation.id) return;
    if (!text.trim() && (!files || files.length === 0)) return;

    let tempId: string | undefined;

    try {
      let uploadedFiles: MessageFile[] = [];

      // Upload files if present
      if (files && files.length > 0) {
        uploadedFiles = await uploadFiles(files);
      }

      // Create optimistic message for immediate UI update
      tempId = `temp-${Date.now()}`;
      const optimisticMessage: Message = {
        id: tempId,
        senderId: currentUser._id,
        receiverId: conversation.id,
        text: text.trim(),
        timestamp: new Date().toISOString(),
        sender: 'me',
        avatar: currentUser.profileImage || '/my-avatar.png',
        files: uploadedFiles.length > 0 ? uploadedFiles : undefined,
      };

      // Add message to UI immediately
      setMessages((prev) => [...prev, optimisticMessage]);
      // Always auto-scroll when user sends a message
      setShouldAutoScroll(true);

      // Send via socket
      console.log("📤 Sending message:", text);
      socket.emit("send-msg", {
        from: currentUser._id,
        to: conversation.id,
        messageText: text.trim(),
        ...(uploadedFiles.length > 0 && { files: uploadedFiles }),
      });

      onMessageSent();
    } catch (error) {
      console.error('Error sending message:', error);
      // Remove the optimistic message on error, but only if it was added
      if (tempId) {
        setMessages((prev) => prev.filter(msg => msg.id !== tempId));
      }
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={onOpenSidebar} className="md:hidden">
              <Menu className="w-5 h-5" />
            </button>
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
                  {conversation.name?.split(' ')[1]?.charAt(0)?.toUpperCase() || ""}
                </div>
              )}
              {conversation.isOnline && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {conversation.name}
              </h2>
              <p className="text-sm text-green-600">
                {conversation.isOnline ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>
         
        </div>
      </div>

      {/* Messages Area */}
      <div
        ref={messagesContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 scroll-smooth"
        style={{ scrollBehavior: 'smooth' }}
      >
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-2"></div>
              <p className="text-gray-500">Loading messages...</p>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-gray-400">💬</span>
              </div>
              <h3 className="text-lg font-medium text-gray-600 mb-2">No messages yet</h3>
              <p className="text-gray-500">Start the conversation with {conversation.name}!</p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => {
              const isCurrentUser = message.senderId === currentUser?._id;
              return (
                <div key={message.id} className={`flex flex-col ${isCurrentUser ? "items-end" : "items-start"}`}>
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${isCurrentUser
                        ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                        : "bg-white text-gray-800 shadow-sm border"
                      }`}
                  >
                    <p className="text-sm">{message.text}</p>

                    {/* File Attachments */}
                    {message.files && message.files.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {message.files.map((file, index) => (
                          <div key={index} className="border rounded-lg overflow-hidden">
                            {file.fileType.startsWith("image/") ? (
                              <img
                                src={file.fileUrl}
                                alt={file.fileName}
                                className="w-full h-auto max-h-40 object-cover cursor-pointer"
                                onClick={() => window.open(file.fileUrl, "_blank")}
                              />
                            ) : (
                              <div
                                className={`flex items-center gap-3 p-2 ${isCurrentUser ? "bg-white/20" : "bg-gray-50"
                                  }`}
                              >
                                <div className="text-sm">
                                  <p className="font-medium truncate">{file.fileName}</p>
                                  <p className="text-xs opacity-75">
                                    {(file.fileSize / 1024).toFixed(1)} KB
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  
                  <span
                    className={`text-xs mt-1 ${isCurrentUser ? "text-gray-500 pr-2" : "text-gray-500 pl-2"
                      }`}
                  >
                    {formatTime(message.timestamp)}
                  </span>
                </div>

              );
            })}
            {/* Invisible element to scroll to */}
            <div ref={messagesEndRef} />
          </>
        )}

        {/* Show "scroll to bottom" button when not auto-scrolling */}
        {!shouldAutoScroll && messages.length > 0 && (
          <div className="fixed bottom-20 right-8 z-10">
            <button
              onClick={() => {
                setShouldAutoScroll(true);
                scrollToBottom();
              }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200">
        <MessageInput onSendMessage={onSendMessage} />
      </div>
    </div>
  );
}
