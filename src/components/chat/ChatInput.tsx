
import { useState } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
}

export default function ChatInput({ onSend }: ChatInputProps) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="flex items-center p-4 border-t">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 border rounded-full px-4 py-2 mr-2"
        placeholder="Type a message..."
      />
      <button
        onClick={handleSend}
        className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-full px-4 py-2"
      >
        ➤
      </button>
    </div>
  );
}
