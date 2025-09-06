// netlify/functions/api.js

export async function handler(event) {
  try {
    // Endpoint real (guardado en variables de Netlify)
    const backendUrl = process.env.API_URL;

    // Construir la URL del backend
    const url = `${backendUrl}/images/pdf`;

    // Hacer el fetch al backend con lo que envió el frontend
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: event.body,
    });

    // Si la API devuelve PDF binario:
    const arrayBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=imagenes.pdf",
      },
      body: base64,
      isBase64Encoded: true,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
