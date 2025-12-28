import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import ProductList from "../components/ProductList";
import FilterSidebar from "../components/FilterSidebar";
import "../styles/Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    artisan: "",
    minPrice: "",
    maxPrice: "",
  });
  const [featuredArtisans, setFeaturedArtisans] = useState([]);

  const artisanBioPlaceholders = [
    "Passionate artisan creating handmade goods.",
    "Crafting unique pieces with love and care.",
    "Dedicated to preserving traditional craftsmanship.",
    "Bringing creativity to life through handmade art.",
    "Transforming raw materials into beautiful creations.",
    "Inspired by nature, creating art that tells a story.",
    "Fusing modern design with traditional techniques.",
    "Creating sustainable art for a better world.",
  ];

  const fetchProducts = async () => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const res = await axiosInstance.get(`/products/approved?${queryParams}`);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  const fetchArtisans = async () => {
    try {
      const res = await axiosInstance.get("/public/approved-artisans");
      setFeaturedArtisans(res.data);
    } catch (err) {
      console.error("Error fetching artisans", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchArtisans();
  }, [filters]);

  return (
    <>
      <div className="hero-container">
        <div className="hero-section">
          <div className="hero-content">
            <h1>Discover Unique Handcrafted Treasures</h1>
            <p>
              Support local artisans and bring authentic handmade products
              directly to your doorstep.
            </p>
          </div>
        </div>

        <section className="featured-artisans">
          <h2>Featured Artisans</h2>
          <div className="artisan-cards">
            {featuredArtisans.length === 0 ? (
              <p>No artisans to display</p>
            ) : (
              featuredArtisans.map((artisan, i) => (
                <div className="artisan-card" key={artisan._id}>
                  <img
                    src={
                      artisan.profileImage
                        ? `data:${artisan.profileImage.contentType};base64,${artisan.profileImage.data}`
                        : `/artisan${(i % 3) + 1}.jpg`
                    }
                    alt={artisan.name}
                  />
                  <h4>{artisan.name}</h4>
                  <p>{artisan.bio || artisanBioPlaceholders[i]}</p>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
      <h2 className="shop-heading">Shop Now</h2>
      <div className="home-container">
        <FilterSidebar filters={filters} setFilters={setFilters} />
        <ProductList products={products} />
      </div>
    </>
  );
};

export default Home;
