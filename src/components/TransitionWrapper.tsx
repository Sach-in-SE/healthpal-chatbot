
import React, { useEffect, useState } from 'react';
import { cn } from "@/lib/utils";

interface TransitionWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: 'fade-in' | 'slide-up' | 'scale-in';
}

const TransitionWrapper = ({ 
  children, 
  className,
  delay = 0,
  animation = 'fade-in'
}: TransitionWrapperProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={cn(
        isVisible ? animation : 'opacity-0',
        className
      )}
      style={{ 
        transitionDelay: `${delay}ms`,
        animationDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

export default TransitionWrapper;
