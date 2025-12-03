// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://ilhamhattamanggala.sistem-order.cloud/api/v1';
export const API_TIMEOUT = 30000; // 30 seconds timeout (increased for development)

// Helper to check if API is available
export const isApiAvailable = async (): Promise<boolean> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);
    
    const response = await fetch(`${API_BASE_URL}/projects`, {
      method: 'GET',
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    return response.ok;
  } catch {
    return false;
  }
};

