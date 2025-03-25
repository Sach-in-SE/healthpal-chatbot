
import React from 'react';
import { cn } from "@/lib/utils";
import { Brain, User } from 'lucide-react';

export type MessageType = 'user' | 'assistant';

interface ChatMessageProps {
  type: MessageType;
  content: string;
  timestamp?: Date;
  isLoading?: boolean;
}

const ChatMessage = ({ type, content, timestamp, isLoading = false }: ChatMessageProps) => {
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
          isUser ? "ml-3 bg-secondary" : "mr-3 bg-primary/10 text-primary"
        )}>
          {isUser ? <User className="w-4 h-4" /> : <Brain className="w-4 h-4" />}
        </div>
        
        <div>
          <div className={cn(
            "rounded-2xl p-4",
            isUser 
              ? "bg-primary text-primary-foreground rounded-tr-none" 
              : "bg-card shadow-sm border border-border rounded-tl-none"
          )}>
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
