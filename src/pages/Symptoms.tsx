
import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SymptomChecker from '@/components/SymptomChecker';
import TransitionWrapper from '@/components/TransitionWrapper';

const Symptoms = () => {
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
              <h1 className="text-3xl font-bold mb-2">Symptom Checker</h1>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Select your symptoms and get an analysis of possible conditions. Remember, this is not a substitute for professional medical advice.
              </p>
            </div>
            
            <SymptomChecker />
          </div>
        </TransitionWrapper>
      </main>
      
      <Footer />
    </div>
  );
};

export default Symptoms;
