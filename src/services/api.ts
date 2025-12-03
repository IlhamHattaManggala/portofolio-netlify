import { API_BASE_URL, API_TIMEOUT } from '../config/api';
import type { TProject, TTechnology, TSertifikat, TArticle } from '../components/types';

// API Response Types
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Fetch with timeout
const fetchWithTimeout = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

// Fetch Projects from API
export const fetchProjects = async (): Promise<TProject[]> => {
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/projects`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }

    const result: ApiResponse<TProject[]> = await response.json();
    
    if (result.success && result.data) {
      return result.data.map((project: {
        name: string;
        descriptions: string;
        tipe: string;
        library?: string[];
        image?: string;
      }) => ({
        name: project.name,
        descriptions: project.descriptions,
        tipe: project.tipe,
        library: project.library || [],
        image: project.image || '',
      }));
    }
    
    throw new Error('Invalid API response');
  } catch (error) {
    console.warn('Failed to fetch projects from API, using fallback data:', error);
    throw error;
  }
};

// Fetch Technologies from API
export const fetchTechnologies = async (): Promise<TTechnology[]> => {
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/technologies`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch technologies');
    }

    const result: ApiResponse<TTechnology[]> = await response.json();
    
    if (result.success && result.data) {
      // Map API technologies to match frontend format
      // API returns icon URL, we'll use it directly
      return result.data.map((tech: {
        name: string;
        icon?: string | null;
      }) => ({
        name: tech.name,
        icon: tech.icon && tech.icon.trim() !== '' ? tech.icon : '', // Icon URL from API, ensure it's not empty
      }));
    }
    
    throw new Error('Invalid API response');
  } catch (error) {
    console.warn('Failed to fetch technologies from API, using fallback data:', error);
    throw error;
  }
};

// Fetch Certificates from API
export const fetchCertificates = async (): Promise<TSertifikat[]> => {
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/certificates`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch certificates');
    }

    const result: ApiResponse<TSertifikat[]> = await response.json();
    
    if (result.success && result.data) {
      return result.data.map((cert: {
        id: number;
        title: string;
        platform: string;
        category?: string | null;
        image?: string;
      }) => ({
        id: cert.id,
        title: cert.title,
        platform: cert.platform,
        category: cert.category || null,
        image: cert.image || '',
      }));
    }
    
    throw new Error('Invalid API response');
  } catch (error) {
    console.warn('Failed to fetch certificates from API, using fallback data:', error);
    throw error;
  }
};

// Fetch Experiences from API
export const fetchExperiences = async (): Promise<any[]> => {
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/experiences`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch experiences');
    }

    const result: ApiResponse<any[]> = await response.json();
    
    if (result.success && result.data) {
      return result.data;
    }
    
    throw new Error('Invalid API response');
  } catch (error) {
    console.warn('Failed to fetch experiences from API:', error);
    throw error;
  }
};

// Fetch Testimonials from API
export const fetchTestimonials = async (): Promise<any[]> => {
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/testimonials`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch testimonials');
    }

    const result: ApiResponse<any[]> = await response.json();
    
    if (result.success && result.data) {
      return result.data;
    }
    
    throw new Error('Invalid API response');
  } catch (error) {
    console.warn('Failed to fetch testimonials from API:', error);
    throw error;
  }
};

// Submit Testimonial (Public)
export const submitTestimonial = async (data: {
  name: string;
  position?: string;
  company?: string;
  content: string;
  rating?: number;
  image?: File;
}): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append('name', data.name);
    if (data.position) formData.append('position', data.position);
    if (data.company) formData.append('company', data.company);
    formData.append('content', data.content);
    if (data.rating) formData.append('rating', data.rating.toString());
    if (data.image) formData.append('image', data.image);

    // Don't set Content-Type header for FormData, browser will set it automatically with boundary
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);
    
    const response = await fetch(`${API_BASE_URL}/testimonials`, {
      method: 'POST',
      body: formData,
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to submit testimonial');
    }

    const result: ApiResponse<any> = await response.json();
    
    if (result.success) {
      return result.data;
    }
    
    throw new Error('Invalid API response');
  } catch (error) {
    console.error('Failed to submit testimonial:', error);
    throw error;
  }
};

// Fetch Settings from API
export const fetchSettings = async (): Promise<Record<string, string | null>> => {
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/settings`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch settings');
    }

    const result: ApiResponse<Record<string, string | null>> = await response.json();
    
    if (result.success && result.data) {
      return result.data;
    }
    
    throw new Error('Invalid API response');
  } catch (error) {
    console.warn('Failed to fetch settings from API:', error);
    return {};
  }
};

// Fetch Articles from API
export const fetchArticles = async (): Promise<TArticle[]> => {
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/articles`);
    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }
    const result: ApiResponse<TArticle[]> = await response.json();
    if (result.success && result.data) {
      return result.data;
    }
    throw new Error('Invalid API response');
  } catch (error) {
    console.warn('Failed to fetch articles from API:', error);
    throw error;
  }
};

// Fetch Single Article by slug or id
export const fetchArticle = async (slugOrId: string): Promise<TArticle> => {
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/articles/${slugOrId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch article');
    }
    const result: ApiResponse<TArticle> = await response.json();
    if (result.success && result.data) {
      return result.data;
    }
    throw new Error('Invalid API response');
  } catch (error) {
    console.warn('Failed to fetch article from API:', error);
    throw error;
  }
};

