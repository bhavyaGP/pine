"use client";

import { useState, FormEvent, useRef } from 'react';
import { MicrophoneIcon, PaperClipIcon } from '@heroicons/react/24/outline';

interface ChatInputProps {
  onSend: (message: string, attachment?: File) => void;
  isLoading?: boolean;
  funky?: boolean;
}

export function ChatInput({ onSend, isLoading = false, funky = false }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSend(message);
      setMessage('');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onSend(`Attached file: ${file.name}`, file);
    }
  };

  const handleMicClick = async () => {
    try {
      if (!isRecording) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        // Handle stream setup here
        setIsRecording(true);
      } else {
        // Handle stop recording here
        setIsRecording(false);
      }
    } catch (err) {
      console.error('Microphone access denied:', err);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={funky
        ? "border-none bg-gradient-to-r from-green-200 via-green-100 to-green-300 p-2 shadow-xl rounded-xl animate-funky"
        : "border-t border-gray-200 bg-white p-4 shadow-lg transition-shadow duration-300 hover:shadow-xl"}
    >
      <div className={funky
        ? "flex items-center gap-4"
        : "flex items-center gap-3"}>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
          accept="image/*,.pdf,.doc,.docx"
        />
        
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          aria-label="Attach file"
        >
          <PaperClipIcon className="h-5 w-5" />
        </button>
        
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={funky ? "Ask your AI agent anything..." : "Type your question here..."}
          className={funky
            ? "flex-1 rounded-xl border-none px-4 py-3 text-base bg-white/80 text-green-700 font-bold placeholder-green-400 focus:bg-white focus:ring-2 focus:ring-green-400 transition-all duration-200 shadow-md"
            : "flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 placeholder-gray-500 transition-all duration-200"}
        />
        
        <button
          type="button"
          onClick={handleMicClick}
          className={`flex-shrink-0 transition-colors duration-200
                     ${isRecording ? 'text-green-500' : 'text-gray-400 hover:text-gray-600'}`}
          aria-label="Voice input"
        >
          <MicrophoneIcon className={`h-5 w-5 ${isRecording ? 'animate-pulse' : ''}`} />
        </button>
        
        <button
          type="submit"
          disabled={!message.trim() || isLoading}
          className={`flex h-10 w-10 items-center justify-center rounded-full bg-green-600 
                     text-white transition-all duration-300
                     ${message.trim() && !isLoading 
                       ? 'hover:bg-green-700 hover:shadow-md' 
                       : 'cursor-not-allowed opacity-50'
                     }`}
          aria-label="Send message"
        >
          <svg
            className="h-5 w-5 rotate-90 transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}
