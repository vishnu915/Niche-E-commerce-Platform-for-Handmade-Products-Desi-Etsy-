import React, { useState } from "react";
import ProductImageCarousel from "./ProductImageCarousel";

const ProductCard = ({ product, onEdit, onDelete }) => {
  const images = product.images || [];
  return (
    <div className="artisan-product-card">
      <div className="carousel-container">
        {images.length > 0 ? (
          <>
            <ProductImageCarousel images={product.images} />;
          </>
        ) : (
          <div className="carousel-placeholder">No image available</div>
        )}
      </div>

      <h4>{product.name}</h4>
      <p>{product.description}</p>
      <p>
        <strong>₹{product.price}</strong> | Stock: {product.stock}
      </p>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete} className="delete-btn">
        Delete
      </button>
    </div>
  );
};

export default ProductCard;
