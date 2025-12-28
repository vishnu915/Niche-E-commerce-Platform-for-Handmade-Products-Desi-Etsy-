import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import "../styles/FilterSidebar.css";

const FilterSidebar = ({ filters, setFilters }) => {
  const [categories, setCategories] = useState([]);
  const [artisans, setArtisans] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const cat = await axiosInstance.get("/categories");
      const arts = await axiosInstance.get("/public/approved-artisans");
      setCategories(cat.data);
      setArtisans(arts.data);
    };
    fetchData();
  }, []);

  return (
    <div className="filter-sidebar">
      <input
        type="text"
        placeholder="Search product..."
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
      />

      <select
        value={filters.category}
        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
      >
        <option value="">All Categories</option>
        {categories.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>

      <select
        value={filters.artisan}
        onChange={(e) => setFilters({ ...filters, artisan: e.target.value })}
      >
        <option value="">All Artisans</option>
        {artisans.map((a) => (
          <option key={a._id} value={a._id}>
            {a.name}
          </option>
        ))}
      </select>

      <div className="price-range">
        <input
          type="number"
          placeholder="Min ₹"
          value={filters.minPrice}
          onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
        />
        <input
          type="number"
          placeholder="Max ₹"
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
        />
      </div>
    </div>
  );
};

export default FilterSidebar;
