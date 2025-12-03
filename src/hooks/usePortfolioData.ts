import { useState, useEffect } from 'react';
import { fetchProjects, fetchTechnologies, fetchCertificates } from '../services/api';
import { projects as staticProjects, technologies as staticTechnologies, sertifikat as staticCertificates } from '../components/constant';
import type { TProject, TTechnology, TSertifikat } from '../components/types';

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

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      setIsUsingFallback(false);

      try {
        // Try to fetch from API
        const [apiProjects, apiTechnologies, apiCertificates] = await Promise.all([
          fetchProjects(),
          fetchTechnologies(),
          fetchCertificates(),
        ]);

        // If API data is available, use it
        if (apiProjects.length > 0) {
          setProjects(apiProjects);
        }
        if (apiTechnologies.length > 0) {
          setTechnologies(apiTechnologies);
        }
        if (apiCertificates.length > 0) {
          setCertificates(apiCertificates);
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

    loadData();
  }, []);

  return {
    projects,
    technologies,
    certificates,
    loading,
    error,
    isUsingFallback,
  };
};

