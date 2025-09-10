const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";

export async function fetchImages(page = 1, limit = 20) {
  const res = await fetch(`${API_BASE}/images?page=${page}&limit=${limit}`);
  if (!res.ok) throw new Error("Error al obtener imágenes");
  return res.json();
}

export async function fetchImagesByHashtag({ include = [], exclude = [] }, page = 1, limit = 20) {
  const includeQuery = include.map((t) => `include=${encodeURIComponent(t.toLowerCase())}`).join("&");
  const excludeQuery = exclude.map((t) => `exclude=${encodeURIComponent(t.toLowerCase())}`).join("&");
  const queryString = [includeQuery, excludeQuery].filter(Boolean).join("&");
  const res = await fetch(`${API_BASE}/images/hashtag?${queryString}&page=${page}&limit=${limit}`);
  if (!res.ok) throw new Error("Error al buscar imágenes");
  return res.json();
}


/* export async function fetchImagesByHashtag(tags, page = 1, limit = 20) {
  console.log(tags);
  const query = tags.map((t) => `tag=${encodeURIComponent(t.toLowerCase())}`).join("&");
  const res = await fetch(`${API_BASE}/images/hashtag?${query}&page=${page}&limit=${limit}`);
  if (!res.ok) throw new Error("Error al buscar imágenes");
  return res.json();
} */
