import { useState, useEffect } from 'react';

export const useInitialLoad = (minLoadTime: number = 1500) => {
  const [isLoading, setIsLoading] = useState(true);
  const [startTime] = useState(() => Date.now());

  useEffect(() => {
    const checkLoad = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, minLoadTime - elapsed);
      
      setTimeout(() => {
        setIsLoading(false);
      }, remaining);
    };

    // Check if page is fully loaded
    if (document.readyState === 'complete') {
      checkLoad();
    } else {
      const handleLoad = () => checkLoad();
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, [startTime, minLoadTime]);

  return isLoading;
};

