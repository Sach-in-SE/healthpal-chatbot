
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Pill, Stethoscope, Heart, BrainCircuit } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import TransitionWrapper from '@/components/TransitionWrapper';

interface ChatbotWindowProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

type MessageType = 'user' | 'assistant' | 'system';

interface Message {
  id: string;
  type: MessageType;
  content: string;
  category?: 'disease' | 'medicine' | 'treatment';
}

const ChatbotWindow = ({ isOpen, onClose, className }: ChatbotWindowProps) => {
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
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isOpen]);

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
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Simulate AI response with different categories
    setTimeout(() => {
      let responseCategory: 'disease' | 'medicine' | 'treatment' | undefined;
      let responseContent = '';
      
      const inputLower = input.toLowerCase();
      
      if (inputLower.includes('headache') || inputLower.includes('fever') || inputLower.includes('pain') || 
          inputLower.includes('symptoms') || inputLower.includes('feeling')) {
        responseCategory = 'disease';
        responseContent = getSymptomResponse(inputLower);
      } else if (inputLower.includes('medicine') || inputLower.includes('drug') || inputLower.includes('pill') ||
                inputLower.includes('medication')) {
        responseCategory = 'medicine';
        responseContent = getMedicineResponse(inputLower);
      } else if (inputLower.includes('treatment') || inputLower.includes('therapy') || inputLower.includes('cure') ||
                inputLower.includes('care') || inputLower.includes('heal')) {
        responseCategory = 'treatment';
        responseContent = getTreatmentResponse(inputLower);
      } else {
        responseContent = "I'm not sure I understand. Could you provide more details about your health concern? You can ask me about symptoms, medicines, or treatments.";
      }
      
      const assistantMessage: Message = {
        id: Date.now().toString(),
        type: 'assistant',
        content: responseContent,
        category: responseCategory,
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const getSymptomResponse = (input: string): string => {
    const responses = [
      "Based on the symptoms you've described, this could be related to several conditions. Common possibilities include a viral infection, tension headache, or mild dehydration. Would you like me to tell you more about any of these?",
      "Your symptoms might suggest a common cold or seasonal allergies. Do you have any other symptoms like congestion, sneezing, or itchy eyes?",
      "These symptoms could be associated with stress or anxiety. Have you been experiencing increased stress lately?",
      "The symptoms you've mentioned could indicate a minor infection. If they persist for more than a few days or worsen, I recommend consulting with a healthcare provider.",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const getMedicineResponse = (input: string): string => {
    const responses = [
      "For mild pain relief, over-the-counter options like acetaminophen (Tylenol) or ibuprofen (Advil, Motrin) are commonly recommended. Always follow the dosage instructions on the packaging.",
      "There are several medications that might help with those symptoms. Antihistamines like loratadine (Claritin) or cetirizine (Zyrtec) are often used for allergy symptoms.",
      "For that condition, medications may include both over-the-counter and prescription options. It's best to consult with a healthcare provider for personalized recommendations.",
      "Remember that medications should be taken as directed, and it's important to be aware of potential side effects or interactions with other medications you may be taking.",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const getTreatmentResponse = (input: string): string => {
    const responses = [
      "Treatment options may include rest, staying hydrated, and over-the-counter medications for symptom relief. If symptoms persist or worsen, consult a healthcare provider.",
      "Self-care measures like applying a cold compress, getting adequate rest, and maintaining proper hydration can help manage these symptoms.",
      "Besides medication, lifestyle modifications such as regular exercise, stress management techniques, and proper nutrition may help address the underlying causes.",
      "For this condition, a combination of medical treatment and lifestyle changes is often recommended. A healthcare provider can develop a personalized treatment plan.",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
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
      <div className="flex items-center justify-between border-b bg-primary/5 px-4 py-3">
        <div className="flex items-center gap-2">
          <BrainCircuit className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">Health Assistant</h2>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8 rounded-full"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "mb-4 max-w-[85%]",
              message.type === 'user' ? "ml-auto" : "mr-auto"
            )}
          >
            <div
              className={cn(
                "rounded-xl p-3",
                message.type === 'user' 
                  ? "bg-primary text-primary-foreground"
                  : message.type === 'system'
                  ? "bg-secondary text-secondary-foreground"
                  : message.category === 'disease'
                  ? "bg-amber-100 text-amber-800"
                  : message.category === 'medicine'
                  ? "bg-blue-100 text-blue-800"
                  : message.category === 'treatment'
                  ? "bg-green-100 text-green-800"
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
              <div>{message.content}</div>
            </div>
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
      <div className="border-t p-3">
        <div className="flex items-center gap-2">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe your symptoms or ask a health question..."
            className="min-h-[60px] resize-none"
            disabled={isLoading}
          />
          <Button 
            onClick={handleSend} 
            disabled={!input.trim() || isLoading}
            size="icon"
            className="h-10 w-10 shrink-0"
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
