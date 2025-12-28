import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-hot-toast";
import "../styles/Admin.css";
import "../styles/Artisan.css";
import "../styles/PendingProducts.css";
import ProductImageCarousel from "../components/Artisan/ProductImageCarousel";

const PendingProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get("/admin/pending-products");
      setProducts(res.data);
    } catch {
      toast.error("Failed to load products");
    }
  };

  const handleApprove = async (id) => {
    try {
      await axiosInstance.put(`/admin/approve-product/${id}`);
      toast.success("Product approved");
      fetchProducts();
    } catch {
      toast.error("Approval failed");
    }
  };

  const handleReject = async (id) => {
    try {
      await axiosInstance.delete(`/admin/reject-product/${id}`);
      toast.success("Product rejected");
      fetchProducts();
    } catch {
      toast.error("Rejection failed");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="pending-products-page">
      <h2>Pending Product Approvals</h2>

      {products.length === 0 ? (
        <p className="no-products-msg">No pending products at the moment.</p>
      ) : (
        <div className="pending-products-grid">
          {products.map((product) => (
            <div className="pending-product-card" key={product._id}>
              <div className="pending-product-image">
                {product.images?.length > 0 ? (
                  <ProductImageCarousel images={product.images} />
                ) : (
                  <div className="no-image-box">No image available</div>
                )}
              </div>

              <div className="pending-product-info">
                <h4>{product.name}</h4>
                <p className="product-desc">{product.description}</p>
                <p className="product-meta">
                  ₹{product.price} | Stock: {product.stock}
                </p>
                <p>
                  Category: <strong>{product.category?.name}</strong>
                </p>
                <p>
                  Artisan: <strong>{product.artisan?.name}</strong>
                </p>
              </div>

              <div className="pending-product-actions">
                <button
                  onClick={() => handleApprove(product._id)}
                  className="btn-approve"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(product._id)}
                  className="btn-reject"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingProducts;
