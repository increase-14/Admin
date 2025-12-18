import React, { useState, useEffect } from "react";
import { authAPI } from "../api/API";
import authStore from "../store/authStore";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login, isAuth } = authStore();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && isAuth) {
      navigate("/profile", { replace: true });
    }
  }, [isAuth, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!phone.trim()) return setError("Telefon raqamni kiriting");
    if (!password.trim()) return setError("Parolni kiriting");

    setLoading(true);
    setError("");

    try {
      const res = await authAPI.login({
        phone: phone.trim(),
        password: password.trim(),
      });

      if (res.data.access) {
        login(res.data.access, res.data.refresh);
        navigate("/profile", { replace: true });
      } else {
        throw new Error("Token olinmadi");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        err.message ||
        "Tizimga kirishda xatolik";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-6 py-12 text-gray-200">
      <div className="bg-[#0B1220] w-full max-w-md p-8 rounded-lg border border-gray-800 shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Tizimga kirish
        </h1>

        {error && (
          <div className="mb-4 bg-red-900/20 border-l-4 border-red-500 p-3 rounded text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Telefon raqam</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setError("");
              }}
              placeholder="+998900994449"
              className="w-full px-3 py-2 rounded border border-gray-700 bg-[#121826] focus:outline-none focus:border-purple-600"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Parol</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="••••••••"
                className="w-full px-3 py-2 rounded border border-gray-700 bg-[#121826] focus:outline-none focus:border-purple-600"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2 text-gray-400 hover:text-gray-200 text-sm"
              >
                {showPassword ? "Скрыть" : "Показать"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded text-white font-medium transition disabled:opacity-50"
          >
            {loading ? "Tekshirilmoqda..." : "Kirish"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400 text-sm">
          Hisobingiz yo'qmi?{" "}
          <Link to="/regis" className="text-purple-500 hover:underline">
            Ro'yxatdan o'tish
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
