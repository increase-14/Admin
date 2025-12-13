import { useState, useEffect } from "react";
import { librariesAPI } from "../api/API";

const LibrariesPage = () => {
  const [libraries, setLibraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    librariesAPI
      .getAll()
      .then((res) => {
        const data = res.data.results || res.data;
        setLibraries(data);
      })
      .catch((err) => {
        console.error("Xatolik:", err);
        alert("Bibliotekalarni yuklashda xatolik");
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredLibraries = libraries.filter((lib) => {
    const matchesSearch =
      lib.name?.toLowerCase().includes(search.toLowerCase()) ||
      lib.address?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && lib.is_active) ||
      (filterStatus === "inactive" && !lib.is_active);

    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <p className="text-2xl text-gray-300">Yuklanmoqda...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setFilterStatus("all")}
              className={`px-5 py-2 rounded-full font-medium transition ${
                filterStatus === "all"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              Barchasi
            </button>
            <button
              onClick={() => setFilterStatus("active")}
              className={`px-5 py-2 rounded-full font-medium transition ${
                filterStatus === "active"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              Faol
            </button>
            <button
              onClick={() => setFilterStatus("inactive")}
              className={`px-5 py-2 rounded-full font-medium transition ${
                filterStatus === "inactive"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              Nofaol
            </button>
          </div>

          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Qidirish..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-5 py-3 bg-gray-800 rounded-full text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <svg
              className="absolute left-4 top-3.5 h-6 w-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="hidden md:grid md:grid-cols-12 gap-4 text-sm font-medium text-gray-400 border-b border-gray-800 pb-4 mb-4">
          <div className="col-span-4">Kutubxona</div>
          <div className="col-span-2">Holat</div>
          <div className="col-span-4">Manzil</div>
          <div className="col-span-1 text-center">Jami kitoblar</div>
          <div className="col-span-1 text-right">Amallar</div>
        </div>

        <div className="space-y-4">
          {filteredLibraries.map((lib) => (
            <div
              key={lib.id}
              className="bg-gray-800/50 rounded-lg p-6 hover:bg-gray-800 transition flex flex-col md:grid md:grid-cols-12 gap-4 items-center border border-gray-800"
            >
              <div className="col-span-4 flex items-center gap-4">
                <button className="text-gray-500 hover:text-red-500 transition">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {lib.name || "Nomsiz kutubxona"}
                  </h3>
                </div>
              </div>
              <div className="col-span-2">
                <span
                  className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium ${
                    lib.is_active
                      ? "bg-green-600/20 text-green-400"
                      : "bg-red-600/20 text-red-400"
                  }`}
                >
                  {lib.is_active ? "Faol" : "Nofaol"}
                </span>
              </div>

              <div className="col-span-4 text-gray-300 text-sm">
                {lib.address || "Manzil ko'rsatilmagan"}
              </div>

              <div className="col-span-1 text-center text-lg font-semibold text-amber-400">
                {lib.total_books || 0} ta
              </div>

              <div className="col-span-1 text-right">
                <button className="text-gray-400 hover:text-white transition">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-3 mt-12">
          <button className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
            {"<"}
          </button>
          <button className="px-4 py-2 bg-purple-600 rounded-lg text-white font-medium">
            1
          </button>
          <button className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
            2
          </button>
          <button className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LibrariesPage;
