import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';

const VisitorTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const trackVisitor = async () => {
      try {
        // Wait a bit to ensure page is loaded
        await new Promise(resolve => setTimeout(resolve, 1000));

        const response = await fetch(`${API_BASE_URL}/visitors/track`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            path: location.pathname + location.search,
          }),
        });

        if (!response.ok) {
          console.warn('Failed to track visitor');
        }
      } catch (error) {
        // Silently fail - don't interrupt user experience
        console.warn('Visitor tracking error:', error);
      }
    };

    trackVisitor();
  }, [location.pathname, location.search]);

  return null; // This component doesn't render anything
};

export default VisitorTracker;

