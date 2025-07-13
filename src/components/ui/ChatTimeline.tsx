export function ChatTimeline() {
  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-start space-x-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
          <span className="text-lg">🤖</span>
        </div>
        <div className="flex-1">
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <p className="text-gray-900">Let me handle that for you.</p>
          </div>
          
          {/* Timeline Steps */}
          <div className="mt-4 space-y-3">
            {[
              { status: 'complete', text: 'Thinking...' },
              { status: 'complete', text: 'Searching company database' },
              { status: 'current', text: 'Contacting support' },
              { status: 'pending', text: 'Generating response' },
            ].map((step, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div
                  className={`h-2 w-2 rounded-full ${
                    step.status === 'complete'
                      ? 'bg-green-500'
                      : step.status === 'current'
                      ? 'animate-pulse bg-green-500'
                      : 'bg-gray-300'
                  }`}
                />
                <span
                  className={`text-sm ${
                    step.status === 'pending' ? 'text-gray-500' : 'text-gray-900'
                  }`}
                >
                  {step.text}
                </span>
              </div>
            ))}
          </div>

          {/* Support Links */}
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              { name: 'Amazon Help', url: '#' },
              { name: 'IRS Support', url: '#' },
              { name: 'Flipkart Returns', url: '#' },
            ].map((link, index) => (
              <a
                key={index}
                href={link.url}
                className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600 hover:bg-gray-200"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
