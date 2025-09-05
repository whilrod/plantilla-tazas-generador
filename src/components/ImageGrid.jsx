// src/components/ImageGrid.jsx
import React from "react";
import ImageCard from "./ImageCard";
import "../App.css";

export default function ImageGrid({ images }) {
  return (
    <div className="image-grid">
      {images.map((img) => (
        <ImageCard key={img.UUID} image={img} />
      ))}
    </div>
  );
}
