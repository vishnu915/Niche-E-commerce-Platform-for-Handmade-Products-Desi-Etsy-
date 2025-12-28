import React from "react";
import { useCart } from "../context/CartContext";
import { toast } from "react-hot-toast";
import ProductImageCarousel from "./Artisan/ProductImageCarousel";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <ProductImageCarousel images={product.images || []} />

      <div className="product-details">
        <h4>{product.name}</h4>
        <p className="product-description">
          {product.description?.slice(0, 120) || "No description available."}
        </p>
        <p className="price">₹{product.price}</p>
        <p className="artisan">By {product.artisan.name}</p>
        <button
          className="add-to-cart-btn"
          onClick={() => {
            addToCart(product._id);
            toast.success("Added to cart");
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
