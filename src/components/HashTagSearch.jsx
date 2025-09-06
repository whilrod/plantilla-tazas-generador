import React, { useState } from "react";
import "../App.css";

export function HashtagSearch({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const tags = input.split(",").filter(Boolean);
    onSearch(tags);
  };

  return (
    <>
    <form onSubmit={handleSubmit} >
      <input
        type="text"
        placeholder="Buscar por hashtag"
        id="search"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
      >
        🔍
      </button>
      <button 
        className="button-reset reset"
        onClick={() => window.location.reload()} 
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
