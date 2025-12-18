import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { librariesAPI } from "../api/API";

const LibrariesDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [library, setLibrary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const yukla = async () => {
    try {
      setLoading(true);
      const res = await librariesAPI.getLibrary(id);
      const data = res.data.results || res.data;
      setLibrary(data);
      setError("");
    } catch (err) {
      setError("Ma'lumot yuklanmadi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    yukla();
  }, [id]);

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
            className="px-5 py-2 bg-gray-800 hover:bg-gray-700 rounded"
          >
            Ortga
          </button>
        </div>
      </div>
    );
  }

  if (!library) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-gray-500 text-xl">
        Kutubxona topilmadi
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-5 py-10">
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

        <div className="bg-[#0f1629] rounded-xl border border-gray-800 p-6 mb-8">
          <div className="mb-8">
            <span
              className={`px-3 py-1 rounded text-sm ${
                library.is_active
                  ? "bg-green-900/40 text-green-400"
                  : "bg-red-900/40 text-red-400"
              }`}
            >
              {library.is_active ? "Faol" : "Nofaol"}
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-5">
              <div>
                <p className="text-gray-500 text-sm">Telefon</p>
                <p className="mt-1">{library.phone}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-gray-500 text-sm">Kitoblar soni</p>
                <p className="text-4xl font-bold text-purple-500 mt-2">
                  {library.total_books || library.books?.length || 0}
                </p>
              </div>
              {library.created_at && (
                <div>
                  <p className="text-gray-500 text-sm">Qo'shilgan vaqti</p>
                  <p className="mt-1">
                    {new Date(library.created_at).toLocaleDateString("uz-UZ")}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {library.books?.length > 0 && (
          <div className="bg-[#0f1629] rounded-xl border border-gray-800 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-white">
                Kitoblar ro'yxati
              </h3>
              <div className="bg-purple-900/30 text-purple-400 px-4 py-2 rounded">
                {library.books.length} ta
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {library.books.map((kitob) => (
                <div
                  key={kitob.id}
                  className="p-5 bg-gray-900/30 rounded-lg border border-gray-700 hover:border-purple-600 transition"
                >
                  <h4 className="font-medium mb-3 truncate">
                    {kitob.title || kitob.name || "Nomsiz kitob"}
                  </h4>

                  {kitob.author && (
                    <p className="text-sm text-gray-400 mb-1">
                      Muallif:{" "}
                      <span className="text-gray-300">{kitob.author}</span>
                    </p>
                  )}
                  {kitob.isbn && (
                    <p className="text-sm text-gray-400 mb-1">
                      ISBN: <span className="text-gray-300">{kitob.isbn}</span>
                    </p>
                  )}
                  {kitob.year && (
                    <p className="text-sm text-gray-400 mb-1">
                      Yil: <span className="text-gray-300">{kitob.year}</span>
                    </p>
                  )}
                  {kitob.quantity != null && (
                    <p className="text-sm text-gray-400">
                      Soni:{" "}
                      <span className="text-gray-300">
                        {kitob.quantity} dona
                      </span>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LibrariesDetail;
