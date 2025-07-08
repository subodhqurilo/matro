
type Message = {
  text: string;
  time: string;
};

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
}

export default function MessageBubble({ message, isOwn }: MessageBubbleProps) {
  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"} my-2`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-2xl  ${
          isOwn
            ? "bg-indigo-500 text-white rounded-br-none"
            : "bg-gray-200 text-black rounded-bl-none"
        }`}
      >
        {message.text}
        <div className="text-xs text-right mt-1 opacity-70 border">{message.time}</div>
      </div>
    </div>
  );
}
