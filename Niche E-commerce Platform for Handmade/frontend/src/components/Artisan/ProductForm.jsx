import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";

const ProductForm = ({
  refreshProducts,
  editingProduct,
  setEditingProduct,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    images: [],
  });
  const fileInputRef = useRef(null);

  const handleMultipleImages = (e) => {
    const files = Array.from(e.target.files);
    const promises = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve({
            data: reader.result.split(",")[1],
            contentType: file.type,
          });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises).then((imagesArray) => {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...imagesArray],
      }));
    });
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        description: editingProduct.description,
        price: editingProduct.price,
        stock: editingProduct.stock,
        category: editingProduct.category || "",
        images: editingProduct.images || [],
      });
    }
  }, [editingProduct]);

  const getCategories = async () => {
    try {
      const res = await axiosInstance.get("/categories/");
      setCategories(res.data);
    } catch (err) {
      toast.error("Failed to fetch categories");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("stock", formData.stock);
    data.append("category", formData.category);
    if (formData.imageFile) data.append("image", formData.imageFile);

    try {
      if (editingProduct) {
        await axiosInstance.put(`/products/${editingProduct._id}`, formData);
        toast.success("Product updated");
      } else {
        await axiosInstance.post("/products", formData);
        toast.success("Product added");
      }

      refreshProducts();
      setEditingProduct(null);
      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        images: [],
      });
      fileInputRef.current.value = null;
    } catch (err) {
      toast.error("Upload failed");
    }
  };

  return (
    <form className="artisan-product-form" onSubmit={handleSubmit}>
      <h3>{editingProduct ? "Edit Product" : "Add New Product"}</h3>
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Product Description"
        value={formData.description}
        onChange={handleChange}
        required
      ></textarea>
      <input
        type="number"
        name="price"
        placeholder="Price (INR)"
        value={formData.price}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="stock"
        placeholder="Stock Quantity"
        value={formData.stock}
        onChange={handleChange}
        required
      />
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
      >
        <option value="">Select Category</option>
        {categories.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleMultipleImages}
      />
      <div className="image-preview-container">
        {formData.images.map((img, idx) => (
          <div key={idx} className="preview-wrapper">
            <img
              src={`data:${img.contentType};base64,${img.data}`}
              className="preview-img"
            />
            <button
              type="button"
              onClick={() => {
                setFormData((prev) => ({
                  ...prev,
                  images: prev.images.filter((_, i) => i !== idx),
                }));
              }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <button type="submit">{editingProduct ? "Update" : "Add Product"}</button>
    </form>
  );
};

export default ProductForm;
