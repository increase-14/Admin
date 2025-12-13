import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../api/API";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ phone: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authAPI.login(form);
      localStorage.setItem("token", res.data.access);
      navigate("/profile");
    } catch (err) {
      alert("Telefon yoki parol noto'g'ri");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="phone"
        placeholder="Telefon"
        value={form.phone}
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Parol"
        value={form.password}
        onChange={handleChange}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Kutilmoqda..." : "Kirish"}
      </button>
    </form>
  );
};

export default LoginPage;
