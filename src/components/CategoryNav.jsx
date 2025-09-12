import React, { useRef } from "react";
import "../App.css";

export function CategoryNav({ onSelect }) {
  const categories = [
    "Feliz_dia",
    "Cumple",
    "Hombre",
    "Mujer",
    "Futbol",
    "imagenes",
    "Suoerheroes",
    "Amor",
    "Amistad",
  ];

  const containerRef = useRef(null);
  let isDown = false;
  let startX;
  let scrollLeft;

  const handleMouseDown = (e) => {
    isDown = true;
    startX = e.pageX - containerRef.current.offsetLeft;
    scrollLeft = containerRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown = false;
  };

  const handleMouseUp = () => {
    isDown = false;
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1; // velocidad
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      ref={containerRef}
      className="category-nav"
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {categories.map((cat) => (
        <button
          key={cat}
          className="category-btn"
          onClick={() => onSelect(cat.toLowerCase())}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
