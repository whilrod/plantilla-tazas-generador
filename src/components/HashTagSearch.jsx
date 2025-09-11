import React, { useState } from "react";
import "../App.css";

export function HashtagSearch({ onSearch }) {
  const [value, setValue] = useState("");
  // 🔹 función para limpiar caché desde el front
const clearCache = () => {
  if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage("CLEAR_CACHE");
  }
};

  const handleSubmit = (e) => {
    e.preventDefault();
    clearCache(); // limpia antes de buscar
    const tags = value
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
    
    // separar positivos de negativos
    const includeTags = tags.filter((t) => !t.startsWith("-"));
    const excludeTags = tags
      .filter((t) => t.startsWith("-"))
      .map((t) => t.slice(1));
    onSearch({include: includeTags, exclude: excludeTags});
    };

  const handleClear = () => {
    setValue("");
    onSearch({ include: [], exclude: [] });
    //onSearch(""); // opcional: notificar al padre que se limpió
  };

  return (
    <>
    <form onSubmit={handleSubmit} >
      <div className="clearable-input-container">
      <input
        type="text"
        placeholder="Buscar por hashtag (usa - para excluir)"
        id="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="clearable-input"
      />

      {value && (
        <button
          type="button"
          className="clear-btn"
          onClick={handleClear}
       >
          ❌
        </button>
      )}
      </div>
      <button
        type="submit"
      >
        🔍
      </button>
      <button 
        type="button"
        className="button-reset reset"
        onClick={() => {
        clearCache();
        window.location.reload();
      }}
      >
        <span>🔄 </span>
      </button>
    </form>
    <label htmlFor="search">
        Escribe hashtags separados por coma (<b style={{color:"blue"}}>,</b>) y usa 
        guión (<b style={{ color: "red" }}>-</b>) delante para excluir hashtags. <b><i>Ejemplo: mujer,-triste</i></b>
        </label>
    </>
    
  );
}
