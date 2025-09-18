import React, { useEffect, useState } from "react";
import { fetchImages, fetchImagesByHashtag } from "./services/api.js";
import { ImageList } from "./components/ImageList";
import { HashtagSearch } from "./components/HashTagSearch";
import { CategoryNav } from "./components/CategoryNav";

function App() {
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState({ include: [], exclude: [] });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isSearching, setIsSearching] = useState(false);

  const [selected, setSelected] = useState([]); // solo UUIDs
  const [sizeMap, setSizeMap] = useState({}); // { uuid: size_kb }
  const [loading, setLoading] = useState(false);

  // 🔹 Calcular peso total desde el mapa
  const totalSizeKB = selected.reduce(
    (sum, id) => sum + (sizeMap[id] || 0),
    0
  );
  const totalSizeMB = (totalSizeKB / 1024).toFixed(2);

  const loadData = async () => {
    try {
      let data;
      if (isSearching && (tags.include.length > 0 || tags.exclude.length > 0)) {
        data = await fetchImagesByHashtag(tags, page);
      } else {
        data = await fetchImages(page);
      }
      setImages(data.results || []);
      setTotalPages(data.total_pages || 1);
    } catch (err) {
      console.error("❌ Error al obtener imágenes:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, [page, isSearching, tags]);

  const handleSearch = (newTags) => {
    setTags(newTags);
    setPage(1);
    // revisamos que haya al menos un include o un exclude
    setIsSearching(
      newTags.include.length > 0 || newTags.exclude.length > 0
    );
  };

  // ✅ seleccionar/deseleccionar imágenes sumando/restando peso
  const toggleSelect = (img) => {
    setSelected((prev) => {
      if (prev.includes(img.uuid)) {
        // quitar
        const newSelected = prev.filter((id) => id !== img.uuid);
        return newSelected;
      } else {
        // agregar
        setSizeMap((map) => ({
          ...map,
          [img.uuid]: img.size_kb || 0,
        }));
        return [...prev, img.uuid];
      }
    });
  };

  // Paginación (máx. 5 botones)
  const getPageNumbers = () => {
    const maxButtons = 5;
    const start = Math.max(1, page - Math.floor(maxButtons / 2));
    const end = Math.min(start + maxButtons - 1, totalPages);
    const pageNumbers = [];
    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const handleCategorySelect = (cat) => {
    // 👇 Al hacer click en una categoría, dispara búsqueda con esa etiqueta
    setTags({ include: [cat], exclude: [] });
    setPage(1);
    setIsSearching(true);
  };

  return (
    <div>
      <header
        style={{
          zIndex: 1000,
          padding: "1rem",
          borderBottom: "1px solid #ddd",
        }}
      >
        <div className="header-container-up">
          <h1>📷 Galería de Imágenes</h1>
          <HashtagSearch onSearch={handleSearch} />
        </div>
      </header>  
          <div className="header-container-down"
            style={{
              position: "sticky",
              top: 0,
              background: "#dbdbdb",
              padding: "1rem",
              borderTop: "1px solid #ddd",
              zIndex: 1001,
              display: "flex",       // 👈 flexbox
              flexDirection: "column",
            }}
          >
            <h2 
            style={{ marginTop: "0.5rem" }}>
          Imágenes seleccionadas: {selected.length}
        </h2>
        {selected.length > 0 && (
          <button
            className="button-download"
            onClick={async () => {
              setLoading(true); // 👈 activar loader aquí
              try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/images/pdf`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ uuids: selected }),
                });
                if (!res.ok) throw new Error("Error generando PDF");

                const blob = await res.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "imagenes.pdf";
                a.click();
                window.URL.revokeObjectURL(url);
              } catch (err) {
                console.error("❌ Error:", err);
              } finally {
                setLoading(false); // ✅ Finaliza loader
              }
            }}
            disabled={selected.length === 0 || loading}
          >
            {loading ? (
              <>
                <span className="loader"></span> Generando PDF...
              </>
            ) : (
              `📄 Descargar Plantillas (${Math.ceil(selected.length / 3)}) — ${totalSizeMB} MB`
            )}
          </button>
        )}
        <div style={{ marginTop: "auto" }}>
          <CategoryNav onSelect={handleCategorySelect} />
        </div>
      </div>
    {/* ✅ pasamos selected y toggleSelect */}
      <ImageList
        images={images}
        selected={selected}
        toggleSelect={(uuid) => {
          const img = images.find((i) => i.uuid === uuid);
          if (img) toggleSelect(img);
        }}
      />

      {/* Paginación */}
      <div
        className="pagination"
      >
        <button onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
          ⬅
        </button>

        {getPageNumbers().map((num) => (
          <button
            key={num}
            onClick={() => setPage(num)}
            style={{
              fontWeight: num === page ? "bold" : "normal",
              backgroundColor: num === page ? "#007bff" : "white",
              color: num === page ? "white" : "black",
              border: "1px solid #ccc",
              padding: "0.5rem",
            }}
          >
            {num}
          </button>
        ))}

        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page === totalPages}
        >
          ➡
        </button>
      </div>
        {loading && (
        <div className="overlay">
          <div className="spinner"></div>
          <p>Generando PDF...</p>
        </div>
      )}
    </div>
  );
}

export default App;
