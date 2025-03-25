
import React from 'react';
import { MessageCircle, Stethoscope, Database, Mic, Clock } from 'lucide-react';
import FeatureCard from './FeatureCard';
import TransitionWrapper from './TransitionWrapper';

const Features = () => {
  const features = [
    {
      title: 'AI Health Chat',
      description: 'Talk to our advanced AI about any health concerns, symptoms, or medical questions you might have.',
      icon: <MessageCircle className="w-5 h-5" />,
      delay: 100,
    },
    {
      title: 'Symptom Checker',
      description: 'Analyze your symptoms and get insights about possible conditions and next steps.',
      icon: <Stethoscope className="w-5 h-5" />,
      delay: 200,
    },
    {
      title: 'Health Data Storage',
      description: 'Securely store your health information and track your progress over time.',
      icon: <Database className="w-5 h-5" />,
      delay: 300,
    },
    {
      title: 'Voice Assistant',
      description: 'Interact with our health assistant using natural voice commands and queries.',
      icon: <Mic className="w-5 h-5" />,
      delay: 400,
    },
    {
      title: 'Medication Reminders',
      description: 'Never miss a dose with customizable medication reminders and schedules.',
      icon: <Clock className="w-5 h-5" />,
      delay: 500,
    },
  ];

  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-background to-secondary/30">
      <div className="max-w-7xl mx-auto">
        <TransitionWrapper animation="slide-up">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Health Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our AI health assistant combines multiple tools to provide a complete health management experience.
            </p>
          </div>
        </TransitionWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
