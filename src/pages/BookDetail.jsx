import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { bookAPI } from "../api/API";

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tahrir, setTahrir] = useState(false);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);

  const yukla = async () => {
    try {
      setLoading(true);
      const res = await bookAPI.getBook(id);
      const data = res.data.results || res.data;
      setBook(data);
      setForm(data);
      setError("");
    } catch (err) {
      setError("Kitobni yuklashda xatolik bo'ldi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    yukla();
  }, [id]);

  const tahrirRejim = () => setTahrir(true);

  const bekorQil = () => {
    setTahrir(false);
    setForm(book);
  };

  const ozgartir = (e) => {
    const { name, value } = e.target;
    setForm((old) => ({ ...old, [name]: value }));
  };

  const saqla = async () => {
    try {
      setSaving(true);
      await bookAPI.updateBook(id, form);
      await yukla();
      setTahrir(false);
      console.log("Kitob yangilandi");
    } catch (err) {
      console.error("Yangilashda xatolik:", err);
    } finally {
      setSaving(false);
    }
  };

  const ochir = async () => {
    if (!window.confirm("Kitobni o'chirmoqchimisiz? Bu amal qaytarilmaydi!"))
      return;

    try {
      setSaving(true);
      await bookAPI.deleteBook(id);
      console.log("Kitob o'chirildi");
      navigate(-1);
    } catch (err) {
      console.error("O'chirishda xatolik:", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-center">
        <div>
          <p className="text-red-500 mb-6">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded"
          >
            Ortga
          </button>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-gray-500 text-xl">
        Kitob topilmadi
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-gray-500 hover:text-white"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Ortga
        </button>

        <div className="flex justify-between items-start mb-8">
          <h1 className="text-3xl font-bold text-white">Kitob haqida</h1>

          <div className="flex gap-3">
            {!tahrir ? (
              <>
                <button
                  onClick={tahrirRejim}
                  disabled={saving}
                  className="px-5 py-2.5 bg-blue-700 hover:bg-blue-600 rounded-lg disabled:opacity-50 flex items-center gap-2"
                >
                  Tahrirlash
                </button>

                <button
                  onClick={ochir}
                  disabled={saving}
                  className="px-5 py-2.5 bg-red-700 hover:bg-red-600 rounded-lg disabled:opacity-50 flex items-center gap-2"
                >
                  O'chirish
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={bekorQil}
                  disabled={saving}
                  className="px-5 py-2.5 bg-gray-700 hover:bg-gray-600 rounded-lg disabled:opacity-50"
                >
                  Bekor qilish
                </button>

                <button
                  onClick={saqla}
                  disabled={saving}
                  className="px-5 py-2.5 bg-green-700 hover:bg-green-600 rounded-lg disabled:opacity-50 flex items-center gap-2"
                >
                  {saving && (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  )}
                  Saqlash
                </button>
              </>
            )}
          </div>
        </div>

        <div className="bg-[#0f1629] rounded-xl border border-gray-800 p-7">
          {!tahrir ? (
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-5">
                <div>
                  <p className="text-gray-500 text-sm">Nomi</p>
                  <p className="text-2xl font-semibold mt-1">
                    {book.title || book.name || "Nomsiz kitob"}
                  </p>
                </div>

                {book.author && (
                  <div>
                    <p className="text-gray-500 text-sm">Muallif</p>
                    <p className="mt-1">{book.author}</p>
                  </div>
                )}

                {book.publisher && (
                  <div>
                    <p className="text-gray-500 text-sm">Nashriyot</p>
                    <p className="mt-1">{book.publisher}</p>
                  </div>
                )}
              </div>

              <div className="space-y-5">
                {book.year && (
                  <div>
                    <p className="text-gray-500 text-sm">Nashr yili</p>
                    <p className="mt-1">{book.year}</p>
                  </div>
                )}

                {book.quantity != null && (
                  <div>
                    <p className="text-gray-500 text-sm">Mavjud nusxalar</p>
                    <p className="text-3xl font-bold text-purple-500 mt-1">
                      {book.quantity} dona
                    </p>
                  </div>
                )}
              </div>

              {book.description && (
                <div className="md:col-span-2 mt-4">
                  <p className="text-gray-500 text-sm">Tavsif</p>
                  <p className="mt-2 leading-relaxed">{book.description}</p>
                </div>
              )}

              {book.created_at && (
                <div className="md:col-span-2 pt-6 border-t border-gray-800 text-sm text-gray-500">
                  Qo'shilgan:{" "}
                  {new Date(book.created_at).toLocaleDateString("uz-UZ")}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-5 max-w-3xl">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Nomi</label>
                <input
                  type="text"
                  name="title"
                  value={form.title || form.name}
                  onChange={ozgartir}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:border-purple-600 outline-none"
                  placeholder="Kitob nomi"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Muallif
                </label>
                <input
                  type="text"
                  name="author"
                  value={form.author}
                  onChange={ozgartir}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:border-purple-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Nashriyot
                </label>
                <input
                  type="text"
                  name="publisher"
                  value={form.publisher}
                  onChange={ozgartir}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:border-purple-600 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Mavjud nusxalar
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={form.quantity}
                    onChange={ozgartir}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:border-purple-600 outline-none"
                    placeholder="10"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
