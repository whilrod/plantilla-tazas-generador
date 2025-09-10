import { useState } from "react";
import "../App.css";

export default function ClearableInput({ placeholder, onChange }) {
  const [value, setValue] = useState("");

  const handleInputChange = (e) => {
    setValue(e.target.value);
    if (onChange) onChange(e.target.value);
  };

  const handleClear = () => {
    setValue("");
    if (onChange) onChange("");
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
      <input
        type="text"
        placeholder={placeholder || "Escribe aquí..."}
        value={value}
        onChange={handleInputChange}
        style={{
          padding: "6px 10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          flex: 1,
        }}
      />
      {value && (
        <button
          onClick={handleClear}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "18px",
            color: "#888",
          }}
        >
          ❌
        </button>
      )}
    </div>
  );
}
