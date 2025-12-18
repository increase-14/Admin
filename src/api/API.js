import axios from "axios";

const API = axios.create({
  baseURL: "https://org-ave-jimmy-learners.trycloudflare.com/api/v1",
  timeout: 15000,
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
    });

    if (error.response) {
      const { status, data } = error.response;

      if (status === 401) {
        localStorage.removeItem("token");
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
        return Promise.reject(new Error("Sessiya tugadi. Qaytadan kiring."));
      }

      if (status === 400) {
        let message = "Ma'lumotlar noto'g'ri";

        if (typeof data === "string") {
          message = data;
        } else if (data?.detail) {
          message = data.detail;
        } else if (data?.message) {
          message = data.message;
        } else if (typeof data === "object") {
          const errors = Object.entries(data)
            .map(([key, value]) => {
              const val = Array.isArray(value) ? value.join(", ") : value;
              return `${key}: ${val}`;
            })
            .join("; ");
          if (errors) message = errors;
        }

        return Promise.reject(new Error(message));
      }

      if (status === 403) {
        return Promise.reject(
          new Error("Bu amalni bajarish uchun ruxsatingiz yo'q")
        );
      }

      if (status === 404) {
        return Promise.reject(new Error("Ma'lumot topilmadi"));
      }

      if (status >= 500) {
        return Promise.reject(
          new Error("Server xatosi. Keyinroq urinib ko'ring.")
        );
      }

      const message = data?.detail || data?.message || `Xatolik: ${status}`;
      return Promise.reject(new Error(message));
    }

    if (error.request) {
      return Promise.reject(new Error("Internet bilan aloqa yo'q"));
    }

    return Promise.reject(error);
  }
);

export { API };

export const authAPI = {
  login: (data) => API.post("/auth/login/", data),
  logout: () => API.post("/auth/logout/"),
  getAdminProfile: () => API.get("/auth/admin/profile/"),
  updateAdminProfile: (data) => API.patch("/auth/admin/profile/", data),
  registerLibrary: (data) => API.post("/auth/register-library/", data),
};

export const bookAPI = {
  getBooks: () => API.get("/books/books/"),
  getBook: (id) => API.get(`/books/book/${id}/`),
  searchBooks: (params) => API.get("/books/search/book/", { params }),
  getLibraryBooks: () => API.get("/libraries/library/books/"),
  createBook: (data) => API.post("/books/books/", data),
  updateBook: (id, data) => API.put(`/books/book/${id}/`, data),
  deleteBook: (id) => API.delete(`/books/book/${id}/`),
  uploadExcel: (formData) =>
    API.post("/books/upload-excel/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  addBooks: (data) => API.post("/books/add-books/", data),
};

export const librariesAPI = {
  getAll: () => API.get("/libraries/libraries/"),
  getLibrary: (id) => API.get(`/libraries/library/${id}/`),
  activateLibrary: (id) =>
    API.patch(`/libraries/library/activate/${id}/`, { is_active: true }),
  deactivateLibrary: (id) =>
    API.patch(`/libraries/library/deactivate/${id}/`, { is_active: false }),
};

export default API;
