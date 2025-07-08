import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { IoIosInformationCircle } from "react-icons/io";
import { BsFillTelephoneFill } from "react-icons/bs";
import Image from "next/image";

type User = {
  avatar: string;
  name: string;
  userId: string | number;
};

type Message = {
  senderId: string;
  text: string;
  time: string;
  
  [key: string]: any;
};

interface ChatWindowProps {
  user: User;
  messages: Message[];
}

export default function ChatWindow({ user, messages }: ChatWindowProps) {
  const handleSend = (text: string) => {
    
    console.log("Sending:", text);
  };

  return (
    <div className="flex flex-col w-2/3 h-full">
    
      <div className="flex fixed items-center  bg-white  w-[1000px] justify-between px-6 py-4 border-b">
        <div className="flex items-center gap-4">
          <Image
            src={user.avatar}
            alt={`${user.name}'s avatar`}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-bold">{user.name}</p>
            <p className="text-xs text-gray-500">#{user.userId}</p>
          </div>
        </div>
        <div className="flex gap-4 text-indigo-500 text-xl">
          <button title="Call"><BsFillTelephoneFill /></button>
          <button title="Video Call"><BsFillCameraVideoFill /></button>
          <button title="Info"><IoIosInformationCircle /></button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-2 bg-gray-50">
        {messages.map((msg, index) => (
          <MessageBubble
            key={index}
            message={msg}
            isOwn={msg.senderId === "me"} // Change this dynamically
          />
        ))}
      </div>

      {/* Input */}
      <ChatInput onSend={handleSend} />
    </div>
  );
}
