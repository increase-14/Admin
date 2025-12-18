import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authStore from "../store/authStore";
import { authAPI } from "../api/API";

const ProfilePage = () => {
  const navigate = useNavigate();
  const logout = authStore((s) => s.logout);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await authAPI.getAdminProfile();
      setUser(res.data);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin h-10 w-10 border-b-2 border-purple-500 rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white px-10 py-8">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full border-2 border-gray-500 flex items-center justify-center overflow-hidden">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-3xl text-gray-400">{user?.name?.[0]}</span>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg font-medium transition"
          >
            Chiqish
          </button>
        </div>
      </div>

      <hr className="border-gray-700 mb-10" />

      <div className="space-y-8 max-w-xl">
        <div className="flex items-center gap-5">
          <div>
            <p className="text-gray-400 text-sm">Ism</p>
            <p className="text-lg font-semibold">{user?.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div>
            <p className="text-gray-400 text-sm">Telefon</p>
            <p className="text-lg font-semibold">{user?.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
