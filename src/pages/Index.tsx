
import React from 'react';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/Button';
import { Link } from 'react-router-dom';
import TransitionWrapper from '@/components/TransitionWrapper';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        <Hero />
        <Features />
        
        <section className="py-24 px-6 md:px-12 lg:px-24 bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="max-w-7xl mx-auto text-center">
            <TransitionWrapper animation="slide-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Take Control of Your Health?</h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Start using our AI health assistant today and get personalized insights, symptom analysis, and health recommendations.
              </p>
              <Link to="/chat">
                <Button size="lg" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
                  Get Started Now
                </Button>
              </Link>
            </TransitionWrapper>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
