
import React, { useEffect, useState } from 'react';
import { cn } from "@/lib/utils";

interface TransitionWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: 'fade-in' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale-in' | 'scale-up' | 'bounce';
  duration?: number;
  once?: boolean; // Only animate once (on mount)
}

const TransitionWrapper = ({ 
  children, 
  className,
  delay = 0,
  animation = 'fade-in',
  duration = 600,
  once = true
}: TransitionWrapperProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Apply initial delay
    const timer = setTimeout(() => {
      setIsVisible(true);
      if (once) {
        setHasAnimated(true);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, once]);

  // If not "once" mode, respond to prop changes for repeatable animations
  useEffect(() => {
    if (!once && hasAnimated) {
      setIsVisible(false);
      
      const resetTimer = setTimeout(() => {
        setIsVisible(true);
      }, 50); // Brief reset period
      
      return () => clearTimeout(resetTimer);
    }
  }, [children, animation, once, hasAnimated]);

  // Define animation classes based on selected animation type
  const getAnimationClass = () => {
    if (!isVisible) return 'opacity-0';
    
    return {
      'fade-in': 'animate-fade-in',
      'slide-up': 'animate-slide-up',
      'slide-down': 'animate-slide-down',
      'slide-left': 'animate-slide-left',
      'slide-right': 'animate-slide-right',
      'scale-in': 'animate-scale-in',
      'scale-up': 'animate-scale-up',
      'bounce': 'animate-bounce'
    }[animation] || 'animate-fade-in';
  };

  return (
    <div 
      className={cn(
        getAnimationClass(),
        hasAnimated && once ? '' : 'transition-all',
        className
      )}
      style={{ 
        transitionDelay: `${delay}ms`,
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}ms`
      }}
    >
      {children}
    </div>
  );
};

export default TransitionWrapper;
