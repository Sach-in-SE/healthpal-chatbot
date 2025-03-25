
import React from 'react';
import { cn } from "@/lib/utils";
import { Brain, User, Stethoscope, Pill, Heart } from 'lucide-react';

export type MessageType = 'user' | 'assistant';

interface ChatMessageProps {
  type: MessageType;
  content: string;
  timestamp?: Date;
  isLoading?: boolean;
  category?: 'disease' | 'medicine' | 'treatment';
}

const ChatMessage = ({ type, content, timestamp, isLoading = false, category }: ChatMessageProps) => {
  const isUser = type === 'user';
  
  return (
    <div className={cn(
      "flex w-full mb-4",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "flex max-w-[80%]",
        isUser ? "flex-row-reverse" : "flex-row"
      )}>
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
          isUser ? "ml-3 bg-secondary" : category === 'disease' 
            ? "mr-3 bg-amber-100 text-amber-800" 
            : category === 'medicine' 
            ? "mr-3 bg-blue-100 text-blue-800" 
            : category === 'treatment' 
            ? "mr-3 bg-green-100 text-green-800" 
            : "mr-3 bg-primary/10 text-primary"
        )}>
          {isUser ? (
            <User className="w-4 h-4" />
          ) : category === 'disease' ? (
            <Stethoscope className="w-4 h-4" />
          ) : category === 'medicine' ? (
            <Pill className="w-4 h-4" />
          ) : category === 'treatment' ? (
            <Heart className="w-4 h-4" />
          ) : (
            <Brain className="w-4 h-4" />
          )}
        </div>
        
        <div>
          <div className={cn(
            "rounded-2xl p-4",
            isUser 
              ? "bg-primary text-primary-foreground rounded-tr-none" 
              : category === 'disease'
              ? "bg-amber-50 border border-amber-200 text-amber-800 rounded-tl-none"
              : category === 'medicine'
              ? "bg-blue-50 border border-blue-200 text-blue-800 rounded-tl-none"
              : category === 'treatment'
              ? "bg-green-50 border border-green-200 text-green-800 rounded-tl-none"
              : "bg-card shadow-sm border border-border rounded-tl-none"
          )}>
            {category && !isUser && (
              <div className="mb-1 flex items-center gap-1 text-xs font-medium">
                <span className="capitalize">{category}</span>
              </div>
            )}
            
            {isLoading ? (
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-current animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-current animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 rounded-full bg-current animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            ) : (
              <p className="whitespace-pre-line">{content}</p>
            )}
          </div>
          
          {timestamp && (
            <div className={cn(
              "text-xs text-muted-foreground mt-1",
              isUser ? "text-right" : "text-left"
            )}>
              {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
