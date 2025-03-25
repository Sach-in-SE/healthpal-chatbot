
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Brain, Loader2 } from 'lucide-react';
import ChatMessage, { MessageType } from './ChatMessage';
import Button from './Button';
import { toast } from 'sonner';

interface Message {
  id: string;
  type: MessageType;
  content: string;
  timestamp: Date;
  category?: 'disease' | 'medicine' | 'treatment';
}

// API key for the health assistant
const OPENAI_API_KEY = "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";

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

  const handleSend = async () => {
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
    
    try {
      // Determine the category based on input content
      const inputLower = input.toLowerCase();
      let category: 'disease' | 'medicine' | 'treatment' | undefined;
      
      if (inputLower.includes('headache') || inputLower.includes('fever') || inputLower.includes('pain') || 
          inputLower.includes('symptoms') || inputLower.includes('feeling')) {
        category = 'disease';
      } else if (inputLower.includes('medicine') || inputLower.includes('drug') || inputLower.includes('pill') ||
                inputLower.includes('medication')) {
        category = 'medicine';
      } else if (inputLower.includes('treatment') || inputLower.includes('therapy') || inputLower.includes('cure') ||
                inputLower.includes('care') || inputLower.includes('heal')) {
        category = 'treatment';
      }
      
      // Generate appropriate system message based on the category
      let systemMessage = "You are a helpful AI health assistant. Provide accurate medical information. Always include a disclaimer that you are not a replacement for professional medical advice.";
      if (category === 'disease') {
        systemMessage += " Focus on potential conditions related to the described symptoms.";
      } else if (category === 'medicine') {
        systemMessage += " Focus on general information about medications for common conditions.";
      } else if (category === 'treatment') {
        systemMessage += " Focus on general treatment options and self-care advice for common conditions.";
      }
      
      // Make API request to OpenAI
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemMessage },
            { role: 'user', content: input }
          ],
          max_tokens: 1000
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        toast.error('Error communicating with AI service');
        throw new Error(`API Error: ${errorData.error?.message || 'Unknown error'}`);
      }
      
      const data = await response.json();
      const aiResponse = data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
      
      // Add AI response
      const assistantMessage: Message = {
        id: Date.now().toString(),
        type: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
        category: category
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: Date.now().toString(),
        type: 'assistant',
        content: "I'm sorry, I encountered an error processing your request. Please try again later.",
        timestamp: new Date()
      };
      
      setMessages((prev) => [...prev, errorMessage]);
      toast.error('An error occurred while processing your request');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // Voice recognition would be implemented here
    if (!isListening) {
      toast.info('Voice recognition activated');
    } else {
      toast.info('Voice recognition deactivated');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-background to-secondary/10 rounded-lg border border-border/50 shadow-lg">
      <div className="py-3 px-4 border-b flex items-center gap-2 bg-gradient-to-r from-primary/10 to-transparent">
        <div className="bg-primary/20 p-2 rounded-full">
          <Brain className="h-5 w-5 text-primary" />
        </div>
        <h2 className="font-medium">HealthPal AI Assistant</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-3xl mx-auto">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              type={message.type}
              content={message.content}
              timestamp={message.timestamp}
              category={message.category}
            />
          ))}
          
          {isLoading && (
            <div className="flex w-full mb-4 justify-start">
              <div className="flex max-w-[80%] flex-row">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mr-3 bg-primary/10 text-primary">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
                <div>
                  <div className="rounded-2xl p-4 bg-card shadow-sm border border-border rounded-tl-none">
                    <div className="flex space-x-2">
                      <div className="h-2 w-2 rounded-full bg-current animate-pulse"></div>
                      <div className="h-2 w-2 rounded-full bg-current animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="h-2 w-2 rounded-full bg-current animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="p-4 border-t border-border bg-card/50">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleListening}
              className={`p-2 rounded-full transition-all duration-200 ${
                isListening 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
              aria-label={isListening ? "Stop listening" : "Start listening"}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
            
            <div className="flex-1">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your health question..."
                className="w-full bg-background/80 border border-input rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 resize-none text-sm shadow-sm"
                rows={2}
                disabled={isLoading}
              />
            </div>
            
            <Button
              onClick={handleSend}
              disabled={input.trim() === '' || isLoading}
              variant={input.trim() === '' ? "ghost" : "primary"}
              size="sm"
              icon={<Send className="w-4 h-4" />}
              className="rounded-full px-4"
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
