import { useEffect, useState } from "react";
import { bookAPI } from "../api/API";
import authStore from "../store/authStore";
import { NavLink } from "react-router-dom";

const BookPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("all");

  const isAuth = authStore((state) => state.isAuth);

  useEffect(() => {
    if (!isAuth) {
      setError("Iltimos, akkauntga kiring");
      setLoading(false);
      return;
    }
    loadBooks();
  }, [isAuth]);

  const loadBooks = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await bookAPI.getBooks();
      const data = res.data?.results || res.data || [];
      setBooks(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Kitoblar yuklanmadi");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredBooks = books
    .filter(
      (b) =>
        (b.name || "").toLowerCase().includes(search.toLowerCase()) ||
        (b.author || "").toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortType === "az") return (a.name || "").localeCompare(b.name || "");
      if (sortType === "za") return (b.name || "").localeCompare(a.name || "");
      return 0;
    });

  if (!isAuth) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <div className="rounded-lg p-10 text-center max-w-sm">
          <h1 className="text-2xl font-semibold text-white mb-4">
            Profilga kiring
          </h1>
          <NavLink
            to="/login"
            className="inline-block w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded font-medium transition"
          >
            Login
          </NavLink>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900 text-gray-300 text-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 px-9 py-14">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2 bg-[#0B1220] p-1 rounded-lg border border-gray-800">
          <button
            onClick={() => setSortType("all")}
            className={`px-4 py-1.5 text-sm rounded-md transition ${
              sortType === "all"
                ? "bg-purple-600 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Barchasi
          </button>
          <button
            onClick={() => setSortType("az")}
            className={`px-4 py-1.5 text-sm rounded-md transition ${
              sortType === "az"
                ? "bg-purple-600 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            A–Z
          </button>
          <button
            onClick={() => setSortType("za")}
            className={`px-4 py-1.5 text-sm rounded-md transition ${
              sortType === "za"
                ? "bg-purple-600 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Z–A
          </button>
        </div>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Qidirish..."
          className="w-80 bg-[#0B1220] border border-gray-800 rounded-lg px-4 py-2 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-purple-600 transition"
        />
      </div>

      <div className="border border-gray-800 rounded-lg overflow-hidden">
        <div className="grid grid-cols-12 px-6 py-4 text-xs font-medium text-gray-500 border-b border-gray-800 bg-[#0B1220]">
          <div className="col-span-4">Kitob nomi</div>
          <div className="col-span-3">Muallif</div>
          <div className="col-span-3">Nashriyot</div>
          <div className="col-span-2 text-right">Miqdor</div>
        </div>

        <div>
          {filteredBooks.map((book) => (
            <NavLink
              key={book.id}
              to={`/book/${book.id}`}
              className="block hover:bg-[#0B1220] transition"
            >
              <div className="grid grid-cols-12 items-center px-6 py-4 text-sm border-b border-gray-800">
                <div className="col-span-4 font-medium text-white hover:text-purple-400 transition">
                  {book.name || "Nomsiz"}
                </div>

                <div className="col-span-3 text-gray-400">
                  {book.author || "-"}
                </div>

                <div className="col-span-3 text-gray-400 truncate">
                  {book.publisher || "-"}
                </div>

                <div className="col-span-2 text-right">
                  <span className="px-3 py-1 rounded-full text-xs bg-green-500/10 text-green-400">
                    {book.quantity_in_library || 0} dona
                  </span>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookPage;
