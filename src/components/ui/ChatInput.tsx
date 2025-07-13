"use client";

import { useState, FormEvent } from 'react';
import { MicrophoneIcon, PaperClipIcon } from '@heroicons/react/24/outline';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
}

export function ChatInput({ onSend, isLoading = false }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="relative flex w-full animate-slideUp items-end space-x-2 rounded-lg border 
                border-gray-200 bg-white p-4 shadow-lg transition-shadow duration-300 
                hover:shadow-xl"
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="flex-shrink-0 text-gray-400 hover:text-gray-600"
          aria-label="Attach file"
        >
          <PaperClipIcon className="h-5 w-5" />
        </button>
        
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          rows={1}
          className="flex-1 resize-none overflow-hidden rounded-lg border-0 bg-transparent p-2 
                    text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0"
          style={{
            minHeight: '24px',
            maxHeight: '200px',
          }}
        />
        
        <button
          type="button"
          className="flex-shrink-0 text-gray-400 hover:text-gray-600"
          aria-label="Voice input"
        >
          <MicrophoneIcon className="h-5 w-5" />
        </button>
        
        <button
          type="submit"
          disabled={!message.trim() || isLoading}
          className={`rounded-lg bg-green-500 px-4 py-2 text-white transition-all duration-300
                     ${message.trim() && !isLoading 
                       ? 'hover:bg-green-600 hover:shadow-md' 
                       : 'cursor-not-allowed opacity-50'
                     }`}
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 animate-pulse rounded-full bg-white"></div>
              <span>Sending...</span>
            </div>
          ) : (
            'Send'
          )}
        </button>
      </div>
    </form>
  );
}
