import React from "react";
import "../styles/publication.css";

export default function Publication({ product }) {
  return (
    <div className="publication">
      <img src="/img/noImage.png" alt="img" />
      <div className="data">
        <h2>{product.title}</h2>
        <p>stock: {product.stock}</p>
        <h3>${product.price}</h3>
      </div>
    </div>
  );
}
