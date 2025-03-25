
import React, { useState } from 'react';
import ChatbotButton from './ChatbotButton';
import ChatbotWindow from './ChatbotWindow';

// API key for the health assistant
const OPENAI_API_KEY = "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";

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <ChatbotButton onClick={toggleChatbot} isOpen={isOpen} />
      <ChatbotWindow isOpen={isOpen} onClose={() => setIsOpen(false)} apiKey={OPENAI_API_KEY} />
    </>
  );
};

export default FloatingChatbot;
