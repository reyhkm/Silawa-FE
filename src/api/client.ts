import axios from 'axios';
import { getAuthHeader } from '../hooks/useAuth';

// INI PERUBAHANNYA:
// Saat online (produksi), gunakan URL dari environment variable.
// Saat lokal (development), gunakan proxy '/api'.
const baseURL = import.meta.env.VITE_API_BASE_URL || '/api';

const apiClient = axios.create({
  baseURL: baseURL, // Gunakan variabel baseURL yang baru
});

apiClient.interceptors.request.use((config) => {
  if (config.url && config.url.startsWith('/admin')) {
    const authHeader = getAuthHeader();
    if (authHeader) {
      config.headers.Authorization = authHeader;
    }
  }
  return config;
});

export default apiClient;