import { useEffect, useRef, useState } from 'react';

interface UsePollingOptions {
  enabled?: boolean;
  interval?: number; // in milliseconds
  onPoll?: () => void | Promise<void>;
}

/**
 * Custom hook untuk polling data secara periodik
 * @param options - Konfigurasi polling
 * @param options.enabled - Aktifkan/matikan polling (default: true)
 * @param options.interval - Interval polling dalam milliseconds (default: 10000 = 10 detik)
 * @param options.onPoll - Callback yang dipanggil setiap polling
 */
export const usePolling = ({ 
  enabled = true, 
  interval = 30000, 
  onPoll 
}: UsePollingOptions) => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onPollRef = useRef(onPoll);
  const [isVisible, setIsVisible] = useState(true);

  // Update ref saat onPoll berubah
  useEffect(() => {
    onPollRef.current = onPoll;
  }, [onPoll]);

  // Handle page visibility (pause polling saat tab tidak aktif)
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (!enabled || !onPollRef.current || !isVisible) {
      // Clear interval jika disabled atau tab tidak aktif
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Polling pertama kali langsung
    const poll = async () => {
      try {
        if (onPollRef.current) {
          await onPollRef.current();
        }
      } catch (error) {
        console.warn('Polling error:', error);
      }
    };

    // Setup interval untuk polling (tidak langsung poll pertama kali karena sudah di initial load)
    intervalRef.current = setInterval(poll, interval);

    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [enabled, interval, isVisible]);

  // Cleanup saat unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
};

