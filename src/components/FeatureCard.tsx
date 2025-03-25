
import React from 'react';
import { cn } from "@/lib/utils";
import TransitionWrapper from './TransitionWrapper';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay?: number;
  className?: string;
}

const FeatureCard = ({ title, description, icon, delay = 0, className }: FeatureCardProps) => {
  return (
    <TransitionWrapper delay={delay} animation="slide-up">
      <div className={cn(
        "glass p-6 rounded-2xl h-full transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]",
        className
      )}>
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary/10 text-primary mr-3">
            {icon}
          </div>
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </TransitionWrapper>
  );
};

export default FeatureCard;
