import axios from 'axios';
import { store } from '../store/store';
import { logout } from '../store/auth/authSlice';

const api = axios.create({
  baseURL: 'http://agrifontier.grfubbdzfzedb6gh.centralindia.azurecontainer.io:1034',
});

api.interceptors.request.use((config) => {
  const token = store.getState().auth.user?.access_token;
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      store.dispatch(logout());
    // console.log('Token expired or invalid, logging out...');
      // Optionally, you can show a toast or alert here
    }
    return Promise.reject(error);
  }
);

export default api;
