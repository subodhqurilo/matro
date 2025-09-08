"use client";
import { useState, useEffect } from 'react';
import { io, Socket } from "socket.io-client";
import MessageSidebar from '@/app/(dashboard)/messages/_components/MessageSidebar';
import ChatArea from '@/app/(dashboard)/messages/_components/ChatArea';
import { Conversation, Message } from '@/types/chat';
import { MessageCircle, User, LogOut } from "lucide-react";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  profileImage?: string;
}

const socket: Socket = io("http://localhost:3000", {
  transports: ["websocket"],
});

export default function Home() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  console.log("Current state:", { token, currentUser, users: conversations.length });

  // Fetch token from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    
    if (storedToken) {
      console.log("🔑 Token found in localStorage:", storedToken.substring(0, 20) + "...");
      setToken(storedToken);
      initializeApp(storedToken);
    } else {
      console.warn("⚠️ No token found in localStorage");
      setError("No authentication token found. Please login first.");
      setIsLoading(false);
    }
  }, []);

  // Initialize app data
  const initializeApp = async (authToken: string) => {
    try {
      setError(null);
      console.log("🚀 Initializing app with token:", authToken.substring(0, 20) + "...");
      
      // Extract current user from JWT token
      try {
        const tokenData = JSON.parse(atob(authToken.split('.')[1]));
        console.log("📱 Token data:", tokenData);
        if (tokenData.userId) {
          const currentUserFromToken = {
            _id: tokenData.userId,
            firstName: "Current",
            lastName: "User"
          };
          setCurrentUser(currentUserFromToken);
          socket.emit("add-user", tokenData.userId);
          console.log("✅ Current user set from token:", currentUserFromToken);
        }
      } catch (tokenError) {
        console.error("❌ Could not decode token:", tokenError);
        setError("Invalid token format");
        return;
      }
      
      // Fetch all users
      await fetchAllUser(authToken);
      
    } catch (err) {
      console.error("❌ Error initializing app:", err);
      setError("Failed to initialize application");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllUser = async (authToken: string) => {
    console.log("👥 Fetching all users...");
    try {
      const res = await fetch(
        "http://localhost:3000/api/message/AllUser",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("👥 All users response status:", res.status);

      if (res.ok) {
        const data = await res.json();
        console.log("👥 All users data:", data);
        
        if (data.success && data.data && Array.isArray(data.data)) {
          const mappedConversations: Conversation[] = data.data
            .filter((user: User) => user._id !== currentUser?._id)
            .map((user: User) => ({
              id: user._id,
              name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Unknown User',
              avatar: user.profileImage || '/default-avatar.png',
              lastMessage: '',
              isOnline: true,
              unreadCount: 0,
            }));

          setConversations(mappedConversations);
          console.log(`✅ ${mappedConversations.length} users loaded successfully`);
          
          // If current user info is minimal, try to find full details in the users list
          if (currentUser && currentUser.firstName === "Current") {
            const fullUserData = data.data.find((user: User) => user._id === currentUser._id);
            if (fullUserData) {
              setCurrentUser(fullUserData);
              console.log("✅ Current user updated with full details:", fullUserData);
            }
          }
        } else {
          console.warn("⚠️ Invalid users response structure:", data);
          setError("Invalid users data received");
        }
      } else {
        const errorData = await res.text();
        console.error("❌ All users fetch failed:", res.status, errorData);
        if (res.status === 401) {
          setError("Authentication failed. Please login again.");
          localStorage.removeItem('authToken');
        } else {
          setError(`Failed to fetch users: ${res.status}`);
        }
      }
    } catch (err) {
      console.error("❌ Error fetching users:", err);
      setError("Network error while fetching users");
    }
  };

  const handleMessageSent = () => {
    // Refresh conversations if needed
    if (token) {
      fetchAllUser(token);
    }
  };

  const handleRetry = () => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
      setIsLoading(true);
      setError(null);
      initializeApp(storedToken);
    } else {
      setError("No authentication token found. Please login first.");
    }
  };

  const handleLogin = () => {
    const testToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODhjNWVmYTRlYzBjMGFiNmZjZWZkYmIiLCJpYXQiOjE3NTU1OTg1OTksImV4cCI6MTc1NjIwMzM5OX0.ZrYRu0COS1iD_1xNHx0k_lUsruT5iA9YJEANOsTR0YQ";
    localStorage.setItem('authToken', testToken);
    setToken(testToken);
    setIsLoading(true);
    setError(null);
    initializeApp(testToken);
  };

  const handleLogout = () => {
    socket.disconnect();
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setCurrentUser(null);
    setToken(null);
    setConversations([]);
    setSelectedConversation(null);
    window.location.reload();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading chat application...</p>
          <p className="text-sm text-gray-500 mt-2">Fetching user data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-8 text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Error</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="space-y-2">
            {error.includes("No authentication token") ? (
              <button
                onClick={handleLogin}
                className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors mb-2"
              >
                Login with Test Token
              </button>
            ) : null}
            <button
              onClick={handleRetry}
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Retry
            </button>
            <p className="text-xs text-gray-500">Check browser console for details</p>
          </div>
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-8 text-center item-center border border-red-800">
          <MessageCircle className="h-16 w-16 text-indigo-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome to Chat App
          </h1>
          <p className="text-gray-600 mb-4">No authentication token available</p>
          <button
            onClick={handleLogin}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Login with Test Token
          </button>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-8 text-center">
          <User className="h-16 w-16 text-indigo-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Loading User Profile
          </h1>
          <p className="text-gray-600 mb-4">Unable to load user profile</p>
          <button
            onClick={handleRetry}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-80px)]">
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static z-20 w-80 h-full bg-white border-r transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <MessageSidebar
          conversations={conversations}
          selectedConversation={selectedConversation}
          currentUser={currentUser}
          onSelectConversation={(conversation) => {
            setSelectedConversation(conversation);
            setIsSidebarOpen(false);
          }}
          onCloseSidebar={() => setIsSidebarOpen(false)}
          onLogout={handleLogout}
          onRetry={handleRetry}
        />
      </div>

      {/* Main chat area */}
      <div className="flex-1 bg-gray-50">
        {selectedConversation ? (
          <ChatArea
            conversation={selectedConversation}
            currentUser={currentUser}
            socket={socket}
            onOpenSidebar={() => setIsSidebarOpen(true)}
            onMessageSent={handleMessageSent}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center mt-60">
              <MessageCircle className="h-24 w-24 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-600 mb-2">
                Welcome to Chat App
              </h2>
              <p className="text-gray-500">
                Select a contact to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}