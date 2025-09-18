"use client";

import { useState, useEffect, useRef } from "react";
import { Socket } from "socket.io-client";
import Image from "next/image";
import MessageInput from "./MessageInput";
import { Eye, Download, FileText, MoreVertical } from "lucide-react";
import { Conversation, Message, MessageFile, SocketMessage } from "@/types/chat";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  profileImage?: string;
}

interface ChatAreaProps {
  conversation: Conversation;  // use the imported type directly
  currentUser: User | null;
  socket: Socket;
  onOpenSidebar: () => void;
  onMessageSent: (conversationId: string, text: string) => void;
}



function mapSocketToMessage(
  msg: SocketMessage,
  currentUser: User,
  conversation: Conversation
): Message {
  return {
    id: msg._id || msg.tempId || `msg-${msg.senderId}-${msg.receiverId}-${Date.now()}`,
    senderId: msg.senderId,
    receiverId: msg.receiverId,
    text: msg.messageText,
    timestamp: msg.createdAt || new Date().toISOString(),
    sender: msg.senderId === currentUser._id ? "me" : "other",
    avatar:
      msg.senderId === currentUser._id
        ? currentUser.profileImage || "/my-avatar.png"
        : conversation.avatar,
    files: msg.files,
    replyTo: msg.replyTo
      ? mapSocketToMessage(msg.replyTo, currentUser, conversation)
      : undefined,
  };
}


export default function ChatArea({
  conversation,
  currentUser,
  socket,
  onOpenSidebar,
  onMessageSent,
}: ChatAreaProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [replyingMessage, setReplyingMessage] = useState<Message | null>(null);
  const [activeMessageId, setActiveMessageId] = useState<string | null>(null);
  const [blockStatus, setBlockStatus] = useState({ iBlocked: false, blockedMe: false });
  const [conversationOnline, setConversationOnline] = useState(false);
  const [headerMenuOpen, setHeaderMenuOpen] = useState(false);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  const isAtBottom = () => {
    if (!messagesContainerRef.current) return true;
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    return scrollTop + clientHeight >= scrollHeight - 100;
  };

  const handleScroll = () => setShouldAutoScroll(isAtBottom());

  useEffect(() => {
    if (shouldAutoScroll) scrollToBottom();
  }, [messages, shouldAutoScroll]);

  useEffect(() => {
    if (conversation) {
      setShouldAutoScroll(true);
      setTimeout(() => scrollToBottom("instant"), 100);
    }
  }, [conversation.id]);

useEffect(() => {
  if (!currentUser || !conversation) return;

  const handleSentMessage = (msg: SocketMessage) => {
    setMessages(prev => {
      const tempIndex = prev.findIndex(m => m.id === msg.tempId);
      if (tempIndex !== -1) {
        const updated = [...prev];
        updated[tempIndex] = mapSocketToMessage(msg, currentUser, conversation);
        return updated;
      }
      // अगर tempId नहीं मिला, तो normal add करें
      if (prev.some(m => m.id === msg._id)) return prev;
      return [...prev, mapSocketToMessage(msg, currentUser, conversation)];
    });
  };

  socket.on("msg-sent", handleSentMessage);

  return () => {
    socket.off("msg-sent", handleSentMessage);
  };
}, [socket, currentUser, conversation]);




useEffect(() => {
  if (!currentUser || !conversation) return;

  const handleIncomingOrSentMessage = (msg: SocketMessage) => {
    const isRelevant =
      (msg.senderId === currentUser._id && msg.receiverId === conversation.id) ||
      (msg.senderId === conversation.id && msg.receiverId === currentUser._id);

    if (!isRelevant) return;

    setMessages(prev => {
      // Replace temp message if exists
      const tempIndex = prev.findIndex(m => m.id === msg.tempId);
      if (tempIndex !== -1) {
        const updated = [...prev];
        updated[tempIndex] = mapSocketToMessage(msg, currentUser, conversation);
        return updated;
      }

      // Skip duplicate messages
      if (prev.some(m => m.id === msg._id)) return prev;

      // Add new message
      return [...prev, mapSocketToMessage(msg, currentUser, conversation)];
    });

    setShouldAutoScroll(true);
  };

  socket.on("msg-receive", handleIncomingOrSentMessage);
  socket.on("msg-sent", handleIncomingOrSentMessage);

  return () => {
    socket.off("msg-receive", handleIncomingOrSentMessage);
    socket.off("msg-sent", handleIncomingOrSentMessage);
  };
}, [socket, currentUser, conversation]);






  // Fetch messages
  useEffect(() => {
    if (!currentUser || !conversation) return;

    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await fetch(
          `https://matrimonial-backend-7ahc.onrender.com/api/message?currentUserId=${conversation.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) throw new Error("Failed to fetch messages");

        const data = await res.json();
        const loadedMessages: Message[] = data.data.map((msg: SocketMessage) =>
          mapSocketToMessage(msg, currentUser, conversation)
        );

        setMessages(loadedMessages);
        setIsLoading(false);
        setShouldAutoScroll(true);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, [conversation.id, currentUser]);

  // Fetch block status
  useEffect(() => {
    if (!conversation) return;
    const fetchBlockStatus = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await fetch(
          `https://matrimonial-backend-7ahc.onrender.com/api/message/isBlocked/${conversation.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await res.json();
        if (data.success) {
          setBlockStatus({
            iBlocked: data.data.iBlocked,
            blockedMe: data.data.blockedMe,
          });
        }
      } catch (err) {
        console.error("Failed to fetch block status:", err);
      }
    };
    fetchBlockStatus();
  }, [conversation]);

  // Fetch online status
  useEffect(() => {
    const fetchOnlineStatus = async () => {
      if (!conversation.id) return;
      try {
        const token = localStorage.getItem("authToken");
        const res = await fetch(
          `https://matrimonial-backend-7ahc.onrender.com/api/message/online`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await res.json();
        console.log(data.data);

        const onlineUsers: string[] = data.data || [];
        setConversationOnline(onlineUsers.includes(conversation.id));
      } catch (err) {
        console.error(err);
        setConversationOnline(false);
      }
    };
    fetchOnlineStatus();
  }, [conversation.id]);

  // Socket listeners
  useEffect(() => {
    if (!currentUser) return;

    socket.on("user-online", (userId: string) => {
      if (userId === conversation.id) setConversationOnline(true);
    });

    socket.on("user-offline", (userId: string) => {
      if (userId === conversation.id) setConversationOnline(false);
    });

    return () => {
      socket.off("user-online");
      socket.off("user-offline");
    };
  }, [conversation.id, socket, currentUser]);

  const uploadFiles = async (files: File[]): Promise<MessageFile[]> => {
    const uploaded: MessageFile[] = [];
    for (const file of files) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const token = localStorage.getItem("authToken");
        const res = await fetch("https://matrimonial-backend-7ahc.onrender.com/api/upload", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
        if (res.ok) {
          const result = await res.json();
          uploaded.push({
            fileName: file.name,
            fileUrl: result.fileUrl || result.url,
            fileType: file.type,
            fileSize: file.size,
          });
        }
      } catch (err) {
        console.error("File upload error:", err);
      }
    }
    return uploaded;
  };

  const onSendMessage = async (text: string, files?: File[]) => {
  if (blockStatus.blockedMe || blockStatus.iBlocked) {
    alert("You cannot send messages to this user.");
    return;
  }
  if (!currentUser || !conversation.id) return;
  if (!text.trim() && (!files || files.length === 0)) return;

  // 🔹 यहाँ generate करो tempId
  const tempId = `temp-${Date.now()}-${Math.floor(Math.random()*1000)}`;

  let uploadedFiles: MessageFile[] = [];
  if (files && files.length > 0) uploadedFiles = await uploadFiles(files);

  const optimistic: Message = {
    id: tempId,
    senderId: currentUser._id,
    receiverId: conversation.id,
    text: text.trim(),
    timestamp: new Date().toISOString(),
    sender: "me",
    avatar: currentUser.profileImage || "/my-avatar.png",
    files: uploadedFiles.length ? uploadedFiles : undefined,
    replyTo: replyingMessage || undefined,
  };

  setMessages((prev) => [...prev, optimistic]);
  setShouldAutoScroll(true);
  setReplyingMessage(null);

  socket.emit("send-msg", {
    tempId,
    from: currentUser._id,
    to: conversation.id,
    messageText: text.trim(),
    ...(uploadedFiles.length > 0 && { files: uploadedFiles }),
    ...(replyingMessage && { replyToId: replyingMessage.id }),
  });

  onMessageSent(conversation.id, text.trim());
};


  const handleBlockUser = async () => {
    if (!conversation.id) return;
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(
        `https://matrimonial-backend-7ahc.onrender.com/api/message/block`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ targetUserId: conversation.id }),
        }
      );
      if (!res.ok) throw new Error("Failed to block user");
      setBlockStatus({ ...blockStatus, iBlocked: true });
      alert("User blocked");
      setHeaderMenuOpen(false);
    } catch (err: any) {
      console.error(err);
      alert(`Error: ${err.message}`);
    }
  };

  const handleUnblockUser = async () => {
    if (!conversation.id) return;
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(
        `https://matrimonial-backend-7ahc.onrender.com/api/message/unblock`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ targetUserId: conversation.id }),
        }
      );
      if (!res.ok) throw new Error("Failed to unblock user");
      setBlockStatus({ ...blockStatus, iBlocked: false });
      alert("User unblocked");
    } catch (err: any) {
      console.error(err);
      alert(`Error: ${err.message}`);
    }
  };

  const handleDeleteAllChat = async () => {
    if (!conversation.id) return;
    if (!confirm("Delete all chat messages?")) return;
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(
        `https://matrimonial-backend-7ahc.onrender.com/api/message/deleteAll/${conversation.id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error("Failed to delete all messages");
      setMessages([]);
      alert("All messages deleted successfully");
      setHeaderMenuOpen(false);
      socket.emit("delete-chat", { from: currentUser?._id, to: conversation.id });
    } catch (err: any) {
      console.error(err);
      alert(`Error: ${err.message}`);
    }
  };

  const handleDelete = async (msgId: string) => {
    if (msgId.startsWith("temp-")) return setMessages((prev) => prev.filter((m) => m.id !== msgId));
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(`https://matrimonial-backend-7ahc.onrender.com/api/message/${msgId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete message");
      setMessages((prev) => prev.filter((m) => m.id !== msgId));
      setActiveMessageId(null);
    } catch (err: any) {
      console.error(err);
      alert(`Error: ${err.message}`);
    }
  };

  const handleReply = (msg: Message) => {
    setReplyingMessage(msg);
    setActiveMessageId(null);
  };

  const formatTime = (timestamp: string) =>
    new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const isImage = (fileType: string) => fileType.startsWith("image/");

  const handleDownload = async (url: string, name: string) => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = name;
      a.click();
      URL.revokeObjectURL(a.href);
    } catch (err) {
      console.error("Download error:", err);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 shadow-sm flex items-center justify-between relative">
        <button onClick={onOpenSidebar} className="md:hidden">☰</button>
        <div className="flex items-center space-x-3">
          <div className="relative">
            {conversation.avatar ? (
              <Image src={conversation.avatar} alt={conversation.name} width={48} height={48} className="w-12 h-12 rounded-full object-cover" />
            ) : (
              <div className="w-12 h-12 bg-indigo-500 text-white rounded-full flex items-center justify-center">
                {conversation.name?.charAt(0).toUpperCase()}
              </div>
            )}
            {conversationOnline && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
            )}
          </div>
          <div>
            <h2 className="font-semibold">{conversation.name}</h2>
            <p className={`text-sm ${conversationOnline ? "text-green-600" : "text-gray-500"}`}>
              {conversationOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setHeaderMenuOpen((prev) => !prev)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <MoreVertical size={20} />
          </button>

          {headerMenuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md border z-50">
              <button onClick={handleBlockUser} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                Block User
              </button>
              <button onClick={handleDeleteAllChat} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-500">
                Delete Chat
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Reply Preview */}
      {replyingMessage && (
        <div className="bg-gray-100 p-2 border-l-4 border-indigo-500 flex justify-between items-center">
          <div className="flex-1 truncate">
            Replying to: <span className="font-semibold">{replyingMessage.text || "File/Media"}</span>
          </div>
          <button onClick={() => setReplyingMessage(null)} className="text-red-500 font-bold">×</button>
        </div>
      )}

      {/* Messages */}
      <div ref={messagesContainerRef} onScroll={handleScroll} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 scroll-smooth">
        {isLoading ? (
          <p className="text-center text-gray-500">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-center text-gray-500">No messages yet</p>
        ) : (
          messages.map((msg) => {
            const isMe = msg.sender === "me";
            return (
              <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`} onClick={() => setActiveMessageId(msg.id === activeMessageId ? null : msg.id)}>
                <div className={`max-w-xs lg:max-w-md p-3 rounded-2xl ${isMe ? "bg-indigo-500 text-white" : "bg-white shadow-sm border"} relative`}>
                  {msg.replyTo && (
                    <div className="bg-gray-200 p-2 rounded mb-1 border-l-2 border-indigo-500 text-xs text-gray-700 truncate">
                      {msg.replyTo.text || "File/Media"}
                    </div>
                  )}
                  {msg.text && <p className="text-sm mb-1">{msg.text}</p>}
                  {msg.files && msg.files.length > 0 && (
                    <div className="space-y-2 mt-2">
                      {msg.files.map((file, i) => (
                        <div key={i} className="border rounded-lg overflow-hidden relative">
                          {isImage(file.fileType) ? (
                            <img src={file.fileUrl} alt={file.fileName} className="w-full h-auto max-h-40 object-cover cursor-pointer" onClick={() => window.open(file.fileUrl, "_blank")} />
                          ) : (
                            <div className="flex items-center gap-3 p-2 bg-gray-50">
                              <FileText size={20} className="text-gray-600" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{file.fileName}</p>
                                <p className="text-xs text-gray-500">{(file.fileSize / 1024).toFixed(1)} KB</p>
                              </div>
                              <div className="flex gap-1">
                                <button onClick={() => window.open(file.fileUrl, "_blank")}><Eye size={14} /></button>
                                <button onClick={() => handleDownload(file.fileUrl, file.fileName)}><Download size={14} /></button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="text-xs mt-1 text-gray-300">{formatTime(msg.timestamp)}</p>

                  {activeMessageId === msg.id && (
                    <div className="absolute top-0 right-0 bg-white border shadow-lg rounded-md text-sm z-50 flex flex-col">
                      <button className="px-3 py-1 hover:bg-gray-100" onClick={(e) => { e.stopPropagation(); handleReply(msg); }}>Reply</button>
                      {isMe && <button className="px-3 py-1 hover:bg-gray-100 text-red-500" onClick={(e) => { e.stopPropagation(); handleDelete(msg.id); }}>Delete</button>}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Block / Unblock Notice */}
      {blockStatus.blockedMe && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md mb-2 text-center">
          You are blocked by this user
        </div>
      )}
      {blockStatus.iBlocked && !blockStatus.blockedMe && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-2 rounded-md mb-2 text-center flex justify-center items-center gap-2">
          <span>You have blocked this user.</span>
          <button onClick={handleUnblockUser} className="text-yellow-700 underline font-semibold">Unblock</button>
        </div>
      )}

      {/* Input Box */}
      <MessageInput
        onSendMessage={onSendMessage}
        disabled={blockStatus.blockedMe || blockStatus.iBlocked}
      />
    </div>
  );
}
