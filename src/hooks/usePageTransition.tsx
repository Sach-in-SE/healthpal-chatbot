
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const usePageTransition = () => {
  const [displayLocation, setDisplayLocation] = useState('');
  const [transitionStage, setTransitionStage] = useState('fadeIn');
  const location = useLocation();

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
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [transitionStage, location.pathname]);

  return { transitionStage, displayLocation };
};

export default usePageTransition;
