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
        Buscar
      </button>
      
    </form>
    <label for="search" style={{ color:"gray"}}>
        Escribe hashtags separados por coma (<b style={{color:"yellow"}}>,</b>) <i>ejemplo: mujer,feliz_dia</i>
        </label>
    </>
    
  );
}
