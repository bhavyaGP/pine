// Predefined chat responses for different task types

export interface ChatResponseTemplate {
  initialMessage: string;
  steps: Array<{
    text: string;
    delay: number;
    status: 'complete' | 'current' | 'pending';
  }>;
  supportLinks: Array<{
    name: string;
    url: string;
  }>;
  responses: Array<{
    user?: string;
    assistant: string;
  }>;
}

type ChatResponseTemplates = Record<string, ChatResponseTemplate>;

export const chatResponses: ChatResponseTemplates = {
  'Track My Order': {
    initialMessage: "I'll help you track your order right away.",
    steps: [
      { status: 'complete', text: 'Accessing order database...', delay: 0 },
      { status: 'complete', text: 'Locating your recent orders', delay: 1000 },
      { status: 'complete', text: 'Retrieving tracking information', delay: 2000 },
      { status: 'current', text: 'Generating status report', delay: 3000 },
    ],
    supportLinks: [
      { name: 'Amazon Help', url: '#' },
      { name: 'Order Support', url: '#' },
      { name: 'Delivery FAQ', url: '#' },
    ],
    responses: [
      {
        assistant: "I've found your most recent Amazon order (#A80945-XZ29). It's currently in transit and scheduled to be delivered tomorrow between 2-5 PM. The package is currently at the local distribution center in your city. Would you like me to set up delivery notifications for you?"
      },
      {
        user: "Yes, please set up notifications.",
        assistant: "Great! I've set up SMS notifications for this order. You'll receive updates when the package is out for delivery and when it's been delivered. Is there anything else you'd like to know about this order?"
      },
      {
        user: "What items are in this order?",
        assistant: "This order contains: 1x Wireless Headphones ($79.99) and 1x Phone Charging Cable ($12.99). The total was $92.98 with free shipping through your Prime membership. The payment was processed using your Visa card ending in 4382."
      }
    ]
  },
  
  'Cancel Subscription': {
    initialMessage: "I'll help you cancel your subscription.",
    steps: [
      { status: 'complete', text: 'Accessing your account...', delay: 0 },
      { status: 'complete', text: 'Reviewing subscription details', delay: 1000 },
      { status: 'complete', text: 'Preparing cancellation options', delay: 2000 },
      { status: 'current', text: 'Processing request', delay: 3000 },
    ],
    supportLinks: [
      { name: 'Netflix Help', url: '#' },
      { name: 'Subscription Center', url: '#' },
      { name: 'Billing Support', url: '#' },
    ],
    responses: [
      {
        assistant: "I've accessed your Netflix subscription details. Your current plan is the Standard plan ($15.49/month) and your next billing date is June 15th. Would you like to proceed with cancellation, or would you prefer to downgrade to a less expensive plan?"
      },
      {
        user: "I want to cancel completely.",
        assistant: "I understand. Before proceeding with the cancellation, Netflix is offering you a 50% discount for the next 3 months if you decide to stay. Would you be interested in this offer instead?"
      },
      {
        user: "No, I still want to cancel.",
        assistant: "I've processed your cancellation request. Your Netflix subscription has been cancelled successfully. You'll still have access to the service until the end of your current billing period (June 15th). You've saved $15.49 per month going forward. Is there anything else you'd like help with?"
      }
    ]
  },
  
  'Raise a Complaint': {
    initialMessage: "I'll help you file a complaint right away.",
    steps: [
      { status: 'complete', text: 'Accessing complaint system...', delay: 0 },
      { status: 'complete', text: 'Preparing complaint form', delay: 1000 },
      { status: 'complete', text: 'Checking resolution options', delay: 2000 },
      { status: 'current', text: 'Submitting your complaint', delay: 3000 },
    ],
    supportLinks: [
      { name: 'Flipkart Support', url: '#' },
      { name: 'Consumer Rights', url: '#' },
      { name: 'Return Policy', url: '#' },
    ],
    responses: [
      {
        assistant: "I'm ready to help you file a complaint about your Flipkart order. Could you please provide some details about the issue you're experiencing?"
      },
      {
        user: "I received a damaged product and the return window has expired.",
        assistant: "I'm sorry to hear that. Even though the standard return window has expired, you may still be eligible for a return or replacement under warranty. I've filed a complaint (reference #FL-23097) with Flipkart's extended support team. They'll review your case and contact you within 24-48 hours. Would you like me to follow up with them if you don't hear back?"
      },
      {
        user: "Yes, please follow up if I don't hear back.",
        assistant: "I've set a reminder to check the status of your complaint in 48 hours. If Flipkart hasn't contacted you by then, I'll automatically follow up and escalate your case if necessary. In the meantime, I've also sent you an email with the complaint details and reference number for your records."
      }
    ]
  },
  
  // Default response for any other task type
  'default': {
    initialMessage: "I'll help you with that right away.",
    steps: [
      { status: 'complete', text: 'Processing your request...', delay: 0 },
      { status: 'complete', text: 'Analyzing options', delay: 1000 },
      { status: 'complete', text: 'Finding solutions', delay: 2000 },
      { status: 'current', text: 'Preparing response', delay: 3000 },
    ],
    supportLinks: [
      { name: 'Customer Support', url: '#' },
      { name: 'Help Center', url: '#' },
      { name: 'FAQ', url: '#' },
    ],
    responses: [
      {
        assistant: "I'm here to help with your request. Could you please provide more details about what you need assistance with?"
      },
      {
        user: "I need more information.",
        assistant: "I'd be happy to provide more information. To better assist you, could you please specify what particular aspect you'd like to know more about?"
      },
      {
        user: "Thank you for your help.",
        assistant: "You're welcome! I'm glad I could assist you. If you have any other questions or need help with anything else in the future, don't hesitate to ask. Is there anything else I can help you with today?"
      }
    ]
  }
};

// Helper function to get chat response template by task title
export function getChatResponseByTask(taskTitle: string): ChatResponseTemplate {
  return chatResponses[taskTitle] || chatResponses['default'];
}