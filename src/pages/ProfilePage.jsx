import { useState, useEffect } from "react";
import { authAPI } from "../api/API";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }

    const loadProfile = async () => {
      try {
        const res = await authAPI.getProfile();
        setUser(res.data);
      } catch (err) {
        console.error("Profil yuklanmadi:", err);
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await authAPI.logout();
    } catch (e) {
      console.error("Logout xatolik:", e);
    } finally {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  if (loading) return <h1>Yuklanmoqda...</h1>;

  return (
    <div>
      <h2>Profil</h2>
      <p>Ism: {user?.name || "Noma'lum"}</p>
      <p>Role: {user?.role || "Noma'lum"}</p>

      <button onClick={handleLogout}>Chiqish</button>
    </div>
  );
};

export default ProfilePage;
