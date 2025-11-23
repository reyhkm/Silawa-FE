import { useNavigate } from 'react-router-dom';

const AUTH_KEY = 'silawa_auth';

export const getAuthHeader = (): string | null => {
    const authData = localStorage.getItem(AUTH_KEY);
    if (!authData) return null;
    const { username, password } = JSON.parse(authData);
    return `Basic ${btoa(`${username}:${password}`)}`;
}

export const useAuth = () => {
  const navigate = useNavigate();

  const login = (username: string, password: string) => {
    // For this MVP, we just store credentials to construct the Basic Auth header later.
    // A real app would exchange this for a token.
    const authData = JSON.stringify({ username, password });
    localStorage.setItem(AUTH_KEY, authData);
    navigate('/admin/dashboard');
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    navigate('/admin/login');
  };

  const isAuthenticated = (): boolean => {
    return localStorage.getItem(AUTH_KEY) !== null;
  };

  return { login, logout, isAuthenticated };
};
