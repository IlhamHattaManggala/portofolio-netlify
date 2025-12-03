import { useState, useEffect } from 'react';
import { fetchProjects, fetchTechnologies, fetchCertificates } from '../services/api';
import { projects as staticProjects, technologies as staticTechnologies, sertifikat as staticCertificates } from '../components/constant';
import type { TProject, TTechnology, TSertifikat } from '../components/types';
import { usePolling } from './usePolling';
import { POLLING_INTERVAL, POLLING_ENABLED } from '../config/api';

interface UsePortfolioDataReturn {
  projects: TProject[];
  technologies: TTechnology[];
  certificates: TSertifikat[];
  loading: boolean;
  error: string | null;
  isUsingFallback: boolean;
}

export const usePortfolioData = (): UsePortfolioDataReturn => {
  const [projects, setProjects] = useState<TProject[]>(staticProjects);
  const [technologies, setTechnologies] = useState<TTechnology[]>(staticTechnologies);
  const [certificates, setCertificates] = useState<TSertifikat[]>(staticCertificates);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUsingFallback, setIsUsingFallback] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const loadData = async () => {
    // Hanya set loading pada initial load
    if (isInitialLoad) {
      setLoading(true);
      setIsInitialLoad(false);
    }
    
    setError(null);
    setIsUsingFallback(false);

    try {
      // Try to fetch from API
      const [apiProjects, apiTechnologies, apiCertificates] = await Promise.all([
        fetchProjects(),
        fetchTechnologies(),
        fetchCertificates(),
      ]);

      // Always update state with API data (even if empty)
      // This ensures changes in backend are reflected in frontend
      setProjects(apiProjects);
      setTechnologies(apiTechnologies);
      setCertificates(apiCertificates);
      
      // Log untuk debugging (bisa dihapus di production)
      if (import.meta.env.DEV) {
        console.log('Data updated:', {
          projects: apiProjects.length,
          technologies: apiTechnologies.length,
          certificates: apiCertificates.length,
        });
      }
    } catch (err) {
      // If API fails, use static data (already set as default)
      console.warn('Using fallback static data:', err);
      setIsUsingFallback(true);
      setError('API tidak tersedia, menggunakan data statik');
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadData();
  }, []);

  // Setup polling untuk auto-refresh
  // Polling akan selalu berjalan jika enabled, tidak peduli isUsingFallback
  // karena mungkin API akan kembali tersedia
  usePolling({
    enabled: POLLING_ENABLED,
    interval: POLLING_INTERVAL,
    onPoll: loadData,
  });

  return {
    projects,
    technologies,
    certificates,
    loading,
    error,
    isUsingFallback,
  };
};

