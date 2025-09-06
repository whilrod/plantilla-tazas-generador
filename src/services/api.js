const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";
console.log("🌍 API_BASE desde Vite:", API_BASE);

export async function fetchImages(page = 1, limit = 20) {
  const res = await fetch(`${API_BASE}/images?page=${page}&limit=${limit}`);
  if (!res.ok) throw new Error("Error al obtener imágenes");
  return res.json();
}

export async function fetchImagesByHashtag(tags, page = 1, limit = 20) {
  const query = tags.map((t) => `tag=${encodeURIComponent(t)}`).join("&");
  const res = await fetch(`${API_BASE}/images/hashtag?${query}&page=${page}&limit=${limit}`);
  if (!res.ok) throw new Error("Error al buscar imágenes");
  return res.json();
}
