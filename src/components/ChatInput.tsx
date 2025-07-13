import { useState } from 'react';
import { DateTime } from 'luxon';
import { MicrophoneIcon, PaperClipIcon } from '@heroicons/react/24/outline';

export default function ChatInput() {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Handle message submission
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-gray-200 bg-white p-4">
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="flex-shrink-0 text-gray-400 hover:text-gray-600"
          aria-label="Attach file"
        >
          <PaperClipIcon className="h-5 w-5" />
        </button>
        
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your question here..."
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
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
          className="flex-shrink-0 rounded-full bg-green-600 p-2 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          <svg className="h-5 w-5 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
    </form>
  );
}
