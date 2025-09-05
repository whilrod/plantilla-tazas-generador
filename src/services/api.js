const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";

/* export const fetchImages = async () => {
  const res = await fetch(`${API_BASE}/images`);
  if (!res.ok) throw new Error("Error fetching images");
  return res.json();
}; */

export async function fetchImages(page = 1, limit = 20) {
  const res = await fetch(`${API_BASE}/images?page=${page}&limit=${limit}`);
  if (!res.ok) throw new Error("Error al obtener imágenes");
  return res.json();
}

/* export const fetchImagesByHashtag = async (tags) => {
  const query = tags.map(tag => `tag=${encodeURIComponent(tag)}`).join("&");
  const res = await fetch(`${API_BASE}/images/hashtag?${query}`);
  if (!res.ok) throw new Error("Error fetching images by hashtag");
  return res.json();
}; */

export async function fetchImagesByHashtag(tags, page = 1, limit = 20) {
  const query = tags.map((t) => `tag=${encodeURIComponent(t)}`).join("&");
  const res = await fetch(`${API_BASE}/images/hashtag?${query}&page=${page}&limit=${limit}`);
  if (!res.ok) throw new Error("Error al buscar imágenes");
  return res.json();
}
