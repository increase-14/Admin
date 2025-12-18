import { useState, useEffect } from "react";
import { librariesAPI } from "../api/API";
import { NavLink } from "react-router-dom";

const LibrariesPage = () => {
  const [libraries, setLibraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadLibraries();
  }, []);

  const loadLibraries = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await librariesAPI.getAll();
      const data = res.data?.results || res.data;
      setLibraries(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Kutubxonalarni yuklashda xatolik");
    } finally {
      setLoading(false);
    }
  };

  const handleActivate = async (id) => {
    if (!id) return;
    setActionLoading(id);
    try {
      await librariesAPI.activateLibrary(id);
      await loadLibraries();
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeactivate = async (id) => {
    if (!id) return;
    setActionLoading(id);
    try {
      await librariesAPI.deactivateLibrary(id);
      await loadLibraries();
    } finally {
      setActionLoading(null);
    }
  };

  const filteredLibraries = libraries.filter((lib) => {
    const q = search.toLowerCase();
    const matchesSearch =
      (lib.name || "").toLowerCase().includes(q) ||
      (lib.address || "").toLowerCase().includes(q) ||
      (lib.user?.name || "").toLowerCase().includes(q) ||
      (lib.user?.phone || "").toLowerCase().includes(q);

    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && lib.is_active) ||
      (filterStatus === "inactive" && !lib.is_active);

    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900">
        <div className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900 text-gray-300">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 px-9 py-14">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2 bg-[#0B1220] p-1 rounded-lg border border-gray-800">
          {["all", "active", "inactive"].map((type) => (
            <button
              key={type}
              onClick={() => setFilterStatus(type)}
              className={`px-4 py-1.5 text-sm rounded-md ${
                filterStatus === type
                  ? "bg-purple-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {type === "all"
                ? "Barchasi"
                : type === "active"
                ? "Faol"
                : "Nofaol"}
            </button>
          ))}
        </div>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Qidirish..."
          className="w-72 bg-[#0B1220] border border-gray-800 rounded-lg px-4 py-2 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-purple-600"
        />
      </div>

      <div className="border border-gray-800 rounded-lg overflow-hidden">
        <div className="grid grid-cols-12 px-4 py-3 text-xs text-gray-500 border-b border-gray-800">
          <div className="col-span-3">Kutubxona</div>
          <div className="col-span-2">Holat</div>
          <div className="col-span-4">Manzil</div>
          <div className="col-span-1 text-center">Kitoblar</div>
          <div className="col-span-2 text-right">Amallar</div>
        </div>

        {filteredLibraries.map((lib) => (
          <div
            key={lib.id}
            className="border-b border-gray-800 hover:bg-[#0B1220]"
          >
            <NavLink
              to={`/libraries/${lib.id}`}
              className="grid grid-cols-12 items-center px-4 py-3 text-sm"
            >
              <div className="col-span-3 font-medium">
                {lib.name || lib.user?.name}
              </div>

              <div className="col-span-2">
                {lib.is_active ? (
                  <span className="px-3 py-1 rounded-full text-xs bg-green-500/10 text-green-400">
                    Faol
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-xs bg-red-500/10 text-red-400">
                    Nofaol
                  </span>
                )}
              </div>

              <div className="col-span-4 text-gray-400 truncate">
                {lib.address}
              </div>

              <div className="col-span-1 text-center">
                {lib.total_books || 0}
              </div>

              <div
                className="col-span-2 flex justify-end gap-2"
                onClick={(e) => e.preventDefault()}
              >
                {actionLoading === lib.id ? (
                  <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                ) : lib.is_active ? (
                  <button
                    onClick={() => handleDeactivate(lib.id)}
                    className="px-3 py-1.5 text-xs border border-gray-700 rounded-md text-gray-300 hover:text-red-400 hover:bg-red-600/20"
                  >
                    O‘chirish
                  </button>
                ) : (
                  <button
                    onClick={() => handleActivate(lib.id)}
                    className="px-3 py-1.5 text-xs border border-gray-700 rounded-md text-gray-300 hover:text-green-400 hover:bg-green-600/20"
                  >
                    Yoqish
                  </button>
                )}
              </div>
            </NavLink>
          </div>
        ))}

        {filteredLibraries.length === 0 && (
          <div className="px-4 py-10 text-center text-gray-500">
            Kutubxonalar topilmadi
          </div>
        )}
      </div>
    </div>
  );
};

export default LibrariesPage;
