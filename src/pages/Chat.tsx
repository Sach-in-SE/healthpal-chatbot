
import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ChatInterface from '@/components/ChatInterface';
import TransitionWrapper from '@/components/TransitionWrapper';

const Chat = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-24 px-4 md:px-8 pb-12">
        <TransitionWrapper animation="fade-in">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">AI Health Assistant</h1>
              <p className="text-muted-foreground">
                Ask me any health-related questions or describe your symptoms.
              </p>
            </div>
            
            <div className="h-[600px] shadow-sm overflow-hidden rounded-xl">
              <ChatInterface />
            </div>
          </div>
        </TransitionWrapper>
      </main>
      
      <Footer />
    </div>
  );
};

export default Chat;
