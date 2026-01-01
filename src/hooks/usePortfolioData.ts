import { useState } from 'react';
import projectsData from '../data/projects';
import technologiesData from '../data/skills';
import certificatesData from '../data/certificates';
import testimonialsData from '../data/testimonials';
import type { TProject, TTechnology, TSertifikat, TTestimonial } from '../components/types';

interface UsePortfolioDataReturn {
  projects: TProject[];
  technologies: TTechnology[];
  certificates: TSertifikat[];
  testimonials: TTestimonial[];
  loading: boolean;
  error: string | null;
  isUsingFallback: boolean;
}

export const usePortfolioData = (): UsePortfolioDataReturn => {
  // Directly use static data as initial state
  const [projects] = useState<TProject[]>(projectsData);
  const [technologies] = useState<TTechnology[]>(technologiesData);
  const [certificates] = useState<TSertifikat[]>(certificatesData);
  const [testimonials] = useState<TTestimonial[]>(testimonialsData);
  
  // Since data is local, loading is always false and no error
  const loading = false;
  const error = null;
  const isUsingFallback = false; // We are "always" using static files, but concept of fallback is gone

  return {
    projects,
    technologies,
    certificates,
    testimonials,
    loading,
    error,
    isUsingFallback,
  };
};

