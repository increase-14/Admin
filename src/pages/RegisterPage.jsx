import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../api/API";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    password: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authAPI.registerLibrary({
        user: {
          name: form.name,
          phone: form.phone,
          password: form.password,
        },
        library: {
          address: form.address,
          can_rent_books: false,
          social_media: {},
        },
      });
      alert("Muvaffaqiyatli ro'yxatdan o'tdingiz!");
      navigate("/login");
    } catch (err) {
      alert("Ro'yxatdan o'tishda xatolik yuz berdi");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Ism" onChange={handleChange} required />
      <input
        name="phone"
        placeholder="Telefon"
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Parol"
        onChange={handleChange}
        required
      />
      <input
        name="address"
        placeholder="Manzil"
        onChange={handleChange}
        required
      />
      <button type="submit">Ro'yxatdan o'tish</button>
    </form>
  );
};

export default RegisterPage;
