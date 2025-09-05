// components/ImageList.jsx
import React, { useState } from "react";
import "../App.css";

export const ImageList = ({ images, selected, toggleSelect }) => {
  if (!Array.isArray(images)) {
    return <p>No hay imágenes para mostrar</p>;
  }

  return (
    <div className="image-grid">
      {images.map((img) => (
        <div
          key={img.uuid}
          className={`image-card ${selected.includes(img.uuid) ? "selected" : ""}`}
          onClick={() => toggleSelect(img.uuid)}
        >
          <img
            src={img.url_thumbnail}
            alt={`img-${img.uuid}`}
          />
          <div className="hashtags">
          {img.hashtags && img.hashtags.length > 0 && (
            <span className="hashtag" >
              #{img.hashtags.join(" #")}
            </span>
          )}
          </div>
        </div>
      ))}
    </div>
  );
};
