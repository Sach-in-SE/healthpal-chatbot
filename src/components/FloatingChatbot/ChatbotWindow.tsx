
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Pill, Stethoscope, Heart, BrainCircuit, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import TransitionWrapper from '@/components/TransitionWrapper';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface ChatbotWindowProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  apiKey: string;
}

type MessageType = 'user' | 'assistant' | 'system' | 'redirect';

interface Message {
  id: string;
  type: MessageType;
  content: string;
  category?: 'disease' | 'medicine' | 'treatment';
}

const ChatbotWindow = ({ isOpen, onClose, className, apiKey }: ChatbotWindowProps) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'system',
      content: 'Welcome to AI Health Assistant! How can I help you today?',
    },
    {
      id: '2',
      type: 'system',
      content: 'You can ask me about:',
    },
    {
      id: '3',
      type: 'assistant',
      content: 'Identifying potential conditions based on symptoms',
      category: 'disease',
    },
    {
      id: '4',
      type: 'assistant',
      content: 'Recommended medications for common conditions',
      category: 'medicine',
    },
    {
      id: '5',
      type: 'assistant',
      content: 'Treatment options and self-care advice',
      category: 'treatment',
    },
    {
      id: '6',
      type: 'redirect',
      content: 'Talk to AI Assistant in full screen mode',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleRedirect = () => {
    onClose();
    navigate('/chat');
  };

  const handleSend = async () => {
    if (input.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
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
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemMessage },
            { role: 'user', content: input }
          ],
          max_tokens: 500
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
        category: category
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: Date.now().toString(),
        type: 'assistant',
        content: "I'm sorry, I encountered an error processing your request. Please try again later."
      };
      
      setMessages((prev) => [...prev, errorMessage]);
      toast.error('An error occurred while processing your request');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <TransitionWrapper
      animation="scale-in"
      className={cn(
        "fixed bottom-24 right-6 z-50 flex h-[500px] w-[350px] flex-col rounded-2xl border bg-card shadow-xl sm:w-[400px]",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b bg-gradient-to-r from-primary/20 to-primary/5 px-4 py-3">
        <div className="flex items-center gap-2">
          <BrainCircuit className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">Health Assistant</h2>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8 rounded-full hover:bg-gray-200/50"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-card to-background/50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "mb-4 max-w-[85%]",
              message.type === 'user' ? "ml-auto" : "mr-auto",
              message.type === 'redirect' ? "mx-auto max-w-[100%] w-full" : ""
            )}
          >
            {message.type === 'redirect' ? (
              <button
                onClick={handleRedirect}
                className="w-full bg-gradient-to-r from-primary/20 to-primary/10 hover:from-primary/30 hover:to-primary/20 text-primary-foreground rounded-xl p-3 flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-md group"
              >
                {message.content}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            ) : (
              <div
                className={cn(
                  "rounded-xl p-3",
                  message.type === 'user' 
                    ? "bg-primary text-primary-foreground"
                    : message.type === 'system'
                    ? "bg-secondary text-secondary-foreground"
                    : message.category === 'disease'
                    ? "bg-amber-100 text-amber-800 border border-amber-200"
                    : message.category === 'medicine'
                    ? "bg-blue-100 text-blue-800 border border-blue-200"
                    : message.category === 'treatment'
                    ? "bg-green-100 text-green-800 border border-green-200"
                    : "bg-card border"
                )}
              >
                {message.category && (
                  <div className="mb-1 flex items-center gap-1 text-xs font-medium">
                    {message.category === 'disease' && <Stethoscope className="h-3 w-3" />}
                    {message.category === 'medicine' && <Pill className="h-3 w-3" />}
                    {message.category === 'treatment' && <Heart className="h-3 w-3" />}
                    <span className="capitalize">{message.category}</span>
                  </div>
                )}
                <div className="text-sm">{message.content}</div>
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="mr-auto mb-4 max-w-[85%] rounded-xl bg-card border p-3">
            <div className="flex space-x-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-primary"></div>
              <div className="h-2 w-2 animate-pulse rounded-full bg-primary" style={{ animationDelay: '0.2s' }}></div>
              <div className="h-2 w-2 animate-pulse rounded-full bg-primary" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t p-3 bg-card/50">
        <div className="flex items-center gap-2">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe your symptoms or ask a health question..."
            className="min-h-[60px] resize-none bg-background/80 border-input focus:ring-2 focus:ring-primary/30 focus:border-primary/50 text-sm"
            disabled={isLoading}
          />
          <Button 
            onClick={handleSend} 
            disabled={!input.trim() || isLoading}
            size="icon"
            className={cn(
              "h-10 w-10 shrink-0 rounded-full",
              !input.trim() ? "opacity-50" : "bg-primary hover:bg-primary/90",
            )}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="mt-2 text-center text-[10px] text-muted-foreground">
          Not a substitute for professional medical advice. If you're experiencing a medical emergency, call emergency services.
        </p>
      </div>
    </TransitionWrapper>
  );
};

export default ChatbotWindow;
