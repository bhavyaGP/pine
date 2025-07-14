import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';

interface ChatMessageProps {
  message: string;
  timestamp: Date;
  isUser?: boolean;
  animate?: boolean;
}

export function ChatMessage({ message, timestamp, isUser = false, animate = true }: ChatMessageProps) {
  const [isVisible, setIsVisible] = useState(!animate);
  const [messageTime, setMessageTime] = useState(() => {
    // Use UTC format for initial render to match server
    return new Date(timestamp).toUTCString();
  });

  useEffect(() => {
    // Format time on client side only
    setMessageTime(DateTime.fromJSDate(timestamp).toLocaleString(DateTime.TIME_SIMPLE));
  }, [timestamp]);

  useEffect(() => {
    if (animate) {
      setIsVisible(true);
    }
  }, [animate]);

  return (
    <div
      className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} 
                 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div
        className={`relative max-w-[80%] rounded-lg p-4 ${
          isUser
            ? 'bg-green-500 text-white'
            : 'bg-gray-100 text-gray-900'
        } shadow-sm
        transition-all duration-300 hover:shadow-md
        ${animate ? 'animate-slideIn' : ''}`}
      >
        <p className="text-sm">{message}</p>
        <span
          className={`absolute bottom-1 right-2 text-xs 
                     ${isUser ? 'text-green-100' : 'text-gray-500'}`}
        >
          {messageTime}
        </span>
      </div>
    </div>
  );
}
