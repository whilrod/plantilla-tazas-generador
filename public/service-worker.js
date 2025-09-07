// public/service-worker.js

const CACHE_NAME = "tazas-cache-v1";
const IMAGE_CACHE = "images-cache-v1";

// Archivos base que quieres cachear siempre
const APP_SHELL = ["/", "/index.html"];

// Instalar el Service Worker
self.addEventListener("install", (event) => {
  //console.log("📥 Service Worker instalado");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(APP_SHELL);
    })
  );
  self.skipWaiting();
});

// Activar y limpiar cachés viejas
self.addEventListener("activate", (event) => {
  //console.log("⚡ Service Worker activado");
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME && key !== IMAGE_CACHE) {
            //console.log("🗑️ Borrando cache vieja:", key);
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Interceptar requests
self.addEventListener("fetch", (event) => {
  const url = event.request.url;

  // Solo interceptar imágenes del backend con GET
  if (url.includes("/images") && event.request.method === "GET") {
    event.respondWith(
      caches.open(IMAGE_CACHE).then((cache) =>
        cache.match(event.request).then((cached) => {
          if (cached) {
            return cached;
          }

          return fetch(event.request)
            .then((res) => {
              cache.put(event.request, res.clone());
              return res;
            })
            .catch(() => {
              // opcional: mostrar placeholder
            });
        })
      )
    );
  }
});
