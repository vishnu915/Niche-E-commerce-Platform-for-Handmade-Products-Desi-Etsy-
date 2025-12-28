import React, { useEffect, useState, useContext } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import ProductCard from "./ProductCard";
import ProductForm from "./ProductForm";
import "../../styles/Artisan.css";

const ArtisanDashboard = () => {
  const { authUser } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const getMyProducts = async () => {
    try {
      const res = await axiosInstance.get("/products/my-approved");
      setProducts(res.data);
    } catch (err) {
      toast.error("Failed to load products");
    }
  };

  useEffect(() => {
    getMyProducts();
  }, []);

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/products/${id}`);
      toast.success("Product deleted");
      getMyProducts();
    } catch (err) {
      toast.error("Failed to delete product");
    }
  };

  return (
    <div className="artisan-dashboard">
      <h2 className="welcome-heading">Welcome {authUser?.name}</h2>
      <ProductForm
        refreshProducts={getMyProducts}
        editingProduct={editingProduct}
        setEditingProduct={setEditingProduct}
      />

      <div className="product-list">
        {products.length === 0 ? (
          <p>No products listed yet.</p>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onEdit={() => handleEdit(product)}
              onDelete={() => handleDelete(product._id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ArtisanDashboard;
