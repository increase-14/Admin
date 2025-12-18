import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authAPI } from "../api/API";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [malumot, setMalumot] = useState({
    ism: "",
    tel: "",
    parol: "",
    manzil: "",
    kenglik: "",
    uzunlik: "",
  });

  const [yuklanmoqda, setYuklanmoqda] = useState(false);
  const [xato, setXato] = useState("");
  const [muvaffaqiyat, setMuvaffaqiyat] = useState("");

  const ozgar = (e) => {
    const { name, value } = e.target;
    setMalumot((old) => ({ ...old, [name]: value }));
    setXato("");
  };

  const telOzgar = (e) => {
    let qiymat = e.target.value.replace(/\D/g, "");
    if (qiymat.length > 9) qiymat = qiymat.slice(0, 9);
    setMalumot((old) => ({ ...old, tel: qiymat }));
    setXato("");
  };

  const yubor = async (e) => {
    e.preventDefault();
    setXato("");
    setMuvaffaqiyat("");

    if (
      !malumot.ism.trim() ||
      !malumot.tel.trim() ||
      !malumot.parol.trim() ||
      !malumot.manzil.trim()
    ) {
      setXato("Majburiy maydonlarni to'ldiring");
      return;
    }

    if (malumot.tel.length !== 9) {
      setXato("Telefon raqami 9 ta raqam bo'lishi kerak");
      return;
    }

    setYuklanmoqda(true);

    try {
      await authAPI.registerLibrary({
        user: {
          name: malumot.ism.trim(),
          phone: `+998${malumot.tel}`,
          password: malumot.parol,
        },
        library: {
          address: malumot.manzil.trim(),
          latitude: malumot.kenglik ? parseFloat(malumot.kenglik) : null,
          longitude: malumot.uzunlik ? parseFloat(malumot.uzunlik) : null,
          can_rent_books: false,
          social_media: {},
        },
      });

      setMuvaffaqiyat("Muvaffaqiyatli ro'yxatdan o'tdingiz!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      const matn =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        "Ro'yxatdan o'tishda xatolik";
      setXato(matn);
    } finally {
      setYuklanmoqda(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8">
          Ro'yxatdan o'tish
        </h1>

        {xato && (
          <div className="mb-6 bg-red-900/30 border border-red-800 p-4 rounded-lg text-red-400 text-center">
            {xato}
          </div>
        )}

        {muvaffaqiyat && (
          <div className="mb-6 bg-green-900/30 border border-green-800 p-4 rounded-lg text-green-400 text-center">
            {muvaffaqiyat}
          </div>
        )}

        <form onSubmit={yubor} className="space-y-10">
          <div>
            <h2 className="text-xl font-semibold mb-5 border-b border-gray-800 pb-2">
              Foydalanuvchi ma'lumotlari
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm mb-1">
                  <span className="text-red-500">*</span> Ism
                </label>
                <input
                  type="text"
                  name="ism"
                  value={malumot.ism}
                  onChange={ozgar}
                  placeholder="Foydalanuvchi ismini kiriting"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-purple-600 focus:outline-none"
                  disabled={yuklanmoqda}
                />
              </div>

              <div>
                <label className="block text-sm mb-1">
                  <span className="text-red-500">*</span> Telefon
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-4 bg-gray-800 border border-r-0 border-gray-700 rounded-l-lg text-gray-400">
                    +998
                  </span>
                  <input
                    type="text"
                    value={malumot.tel}
                    onChange={telOzgar}
                    placeholder="Telefon raqamini kiriting"
                    maxLength="9"
                    className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-r-lg focus:border-purple-600 focus:outline-none"
                    disabled={yuklanmoqda}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-1">
                  <span className="text-red-500">*</span> Parol
                </label>
                <input
                  type="password"
                  name="parol"
                  value={malumot.parol}
                  onChange={ozgar}
                  placeholder="Parolni kiriting"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-purple-600 focus:outline-none"
                  disabled={yuklanmoqda}
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-5 border-b border-gray-800 pb-2">
              Kutubxona ma'lumotlari
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm mb-1">
                  <span className="text-red-500">*</span> Manzil
                </label>
                <input
                  type="text"
                  name="manzil"
                  value={malumot.manzil}
                  onChange={ozgar}
                  placeholder="Kutubxona manzilini kiriting"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-purple-600 focus:outline-none"
                  disabled={yuklanmoqda}
                />
              </div>

              <div>
                <label className="block text-sm mb-1">
                  <span className="text-red-500">*</span> Kenglik
                </label>
                <input
                  type="text"
                  name="kenglik"
                  value={malumot.kenglik}
                  onChange={ozgar}
                  placeholder="Kenglik koordinatasi"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-purple-600 focus:outline-none"
                  disabled={yuklanmoqda}
                />
              </div>

              <div>
                <label className="block text-sm mb-1">
                  <span className="text-red-500">*</span> Uzunlik
                </label>
                <input
                  type="text"
                  name="uzunlik"
                  value={malumot.uzunlik}
                  onChange={ozgar}
                  placeholder="Uzunlik koordinatasi"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-purple-600 focus:outline-none"
                  disabled={yuklanmoqda}
                />
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <button
              type="submit"
              disabled={yuklanmoqda}
              className="px-10 py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition disabled:opacity-50 flex items-center gap-3 mx-auto"
            >
              {yuklanmoqda ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Yuklanmoqda...
                </>
              ) : (
                "Ro'yxatdan o'tish"
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center text-gray-500">
          Hisobingiz bormi?{" "}
          <Link to="/login" className="text-purple-400 hover:underline">
            Tizimga kirish
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
