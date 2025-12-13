import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://org-ave-jimmy-learners.trycloudflare.com/",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export const librariesAPI = {
  getAll: () => api.get("/api/v1/libraries/libraries/"),
};

export const authAPI = {
  login: (data) => api.post("/api/v1/auth/login/", data),
  logout: () => api.post("/api/v1/auth/logout/"),
  getProfile: () => api.get("/api/v1/auth/profile/"),
  registerLibrary: (data) => api.post("/api/v1/auth/register-library/", data),
};

export default api;
