import axios from 'axios';

const api = axios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding tokens
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling 403 Forbidden (Token Expired)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Eğer hata 403 ise ve daha önce tekrar denenmemişse (sonsuz döngü engeli)
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');

      if (refreshToken) {
        try {
          // Refresh token ile yeni JWT al
          const res = await axios.post('/api/auth/refresh', {
            refreshToken: refreshToken
          });

          if (res.status === 200) {
            const { accessToken, refreshToken: newRefreshToken } = res.data;
            
            // Yeni tokenları kaydet
            localStorage.setItem('token', accessToken);
            if (newRefreshToken) localStorage.setItem('refreshToken', newRefreshToken);

            // Asıl isteği yeni token ile güncelle ve tekrar gönder
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return api(originalRequest);
          }
        } catch (refreshError) {
          // Refresh token da geçersizse çıkış yaptır
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
