"use client";

import { useState, useEffect, useRef } from "react";
import ProductCard from "../components/page/productCard";
import { categories } from "../components/products";
import { InlineSpinner } from "../components/InlineSpiner";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();

  const lastProductRef = (node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prev) => prev + 1);
      }
    });
    if (node) observer.current.observe(node);
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/products?category=${category}&q=${search}&page=${page}`
      );
      const data = await res.json();
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prev) => [...prev, ...data]);
      }
    } catch (err) {
      console.error("Error loading products:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
  }, [search, category]);

  useEffect(() => {
    fetchProducts();
  }, [page, category, search]);

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded-lg w-full md:w-1/3"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-4 py-2 rounded-lg w-full md:w-1/4"
        >
          <option value="">All Categories</option>
          {categories.map((category, i) => (
            <option key={i} value={category} className="filterCategory">{category}</option>
          ))}
        </select>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => {
          if (products.length === index + 1) {
            return (
              <div ref={lastProductRef} key={index}>
                <ProductCard {...product} />
              </div>
            );
          } else {
            return <ProductCard key={index} {...product} />;
          }
        })}
      </div>

      {/* Loader */}
      {loading && <InlineSpinner />}
      {!hasMore && (
        <p className="text-center py-4 text-gray-500">
          No more products to load
        </p>
      )}
    </div>
  );
}
