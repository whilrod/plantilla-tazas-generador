import React, { useState } from "react";
import "../App.css";

export function HashtagSearch({ onSearch }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
     clearCache(); // limpia antes de buscar
  const tags = value.split(",").filter(Boolean);
    onSearch(tags);
  };

  const handleClear = () => {
    setValue("");
    //onSearch(""); // opcional: notificar al padre que se limpió
  };

  // 🔹 función para limpiar caché desde el front
const clearCache = () => {
  if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage("CLEAR_CACHE");
  }
};

  return (
    <>
    <form onSubmit={handleSubmit} >
      <div className="clearable-input-container">
      <input
        type="text"
        placeholder="Buscar por hashtag"
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
        Escribe hashtags separados por coma (<b style={{color:"blue"}}>,</b>) <i>ejemplo: mujer,feliz_dia</i>
        </label>
    </>
    
  );
}
