import axios from 'axios';
import { getAuthHeader } from '../hooks/useAuth';

// --- INI KODE YANG DIPERBAIKI ---
const apiDomain = import.meta.env.VITE_API_BASE_URL;

// Jika VITE_API_BASE_URL ada (produksi), baseURL adalah https://.../api
// Jika tidak ada (lokal), baseURL adalah /api (untuk proxy Vite)
const baseURL = apiDomain ? `${apiDomain}/api` : '/api';

const apiClient = axios.create({
  baseURL: baseURL,
});
// --- AKHIR DARI PERBAIKAN ---

apiClient.interceptors.request.use((config) => {
  // Logika di bawah ini sudah benar dan tidak perlu diubah
  // Kita hanya perlu memastikan path /admin tidak diawali dengan /api/admin
  // karena baseURL sudah menangani /api
  const url = config.url || '';
  if (url.startsWith('/admin')) {
    const authHeader = getAuthHeader();
    if (authHeader) {
      config.headers.Authorization = authHeader;
    }
  }
  return config;
});

export default apiClient;
