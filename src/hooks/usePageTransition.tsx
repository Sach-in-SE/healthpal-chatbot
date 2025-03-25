
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const usePageTransition = () => {
  const [displayLocation, setDisplayLocation] = useState('');
  const [transitionStage, setTransitionStage] = useState('fadeIn');
  const location = useLocation();
  const [transitionDuration, setTransitionDuration] = useState(300); // Configurable duration

  useEffect(() => {
    if (location.pathname !== displayLocation) {
      setTransitionStage('fadeOut');
    }
  }, [location, displayLocation]);

  useEffect(() => {
    if (transitionStage === 'fadeOut') {
      const timeout = setTimeout(() => {
        setTransitionStage('fadeIn');
        setDisplayLocation(location.pathname);
      }, transitionDuration);

      return () => clearTimeout(timeout);
    }
  }, [transitionStage, location.pathname, transitionDuration]);

  // Allow custom configuration of the transition
  const configureTransition = (duration = 300) => {
    setTransitionDuration(duration);
  };

  return { 
    transitionStage, 
    displayLocation,
    configureTransition
  };
};

export default usePageTransition;
