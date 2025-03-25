
import React from 'react';
import { Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatbotButtonProps {
  onClick: () => void;
  isOpen: boolean;
  className?: string;
}

const ChatbotButton = ({ onClick, isOpen, className }: ChatbotButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl",
        isOpen && "rotate-90 scale-90 opacity-0",
        className
      )}
      aria-label="Open Health Assistant"
    >
      <Bot className="h-6 w-6" />
    </button>
  );
};

export default ChatbotButton;
