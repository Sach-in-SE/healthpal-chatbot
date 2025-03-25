
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff } from 'lucide-react';
import ChatMessage, { MessageType } from './ChatMessage';
import Button from './Button';

interface Message {
  id: string;
  type: MessageType;
  content: string;
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hello! I'm HealthPal, your AI health assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on what you've described, it could be related to several conditions. Can you tell me more about when these symptoms started?",
        "I understand your concern. These symptoms might be related to stress or anxiety, but they could also indicate other conditions. Have you noticed any other symptoms?",
        "Thank you for sharing that information. It's important to note that while I can provide information, you should consult with a healthcare professional for a proper diagnosis.",
        "From what you've described, these are common symptoms that could have various causes. Let's go through some questions to better understand what might be happening.",
      ];
      
      const assistantMessage: Message = {
        id: Date.now().toString(),
        type: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // Voice recognition would be implemented here
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-background to-secondary/10 rounded-lg">
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-3xl mx-auto">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              type={message.type}
              content={message.content}
              timestamp={message.timestamp}
            />
          ))}
          
          {isLoading && (
            <ChatMessage
              type="assistant"
              content=""
              isLoading={true}
            />
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="p-4 border-t border-border bg-card">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleListening}
              className={`p-2 rounded-full ${
                isListening 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary text-secondary-foreground'
              }`}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
            
            <div className="flex-1">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your health question..."
                className="w-full bg-secondary/50 border border-input rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                rows={1}
                disabled={isLoading}
              />
            </div>
            
            <Button
              onClick={handleSend}
              disabled={input.trim() === '' || isLoading}
              variant={input.trim() === '' ? "ghost" : "primary"}
              size="sm"
              icon={<Send className="w-4 h-4" />}
            >
              Send
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Note: This AI assistant provides information only and is not a substitute for professional medical advice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
