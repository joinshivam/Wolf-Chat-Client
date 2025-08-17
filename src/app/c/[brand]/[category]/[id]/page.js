'use client'
import Image from "next/image";
import Link from "next/link";
import { slugify } from "@/app/components/slugify";
import { products } from "@/app/components/products";
import ProductCard from "@/app/components/page/productCard";
import { useState, useEffect, useRef } from "react";
import Navbar from "@/app/components/navbar";
import { InlineSpinner } from "@/app/components/InlineSpiner";
import { useSearchParams, useParams } from "next/navigation";

export default function ProductDetail() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { brand, category, id } = params;
  const { productName } = searchParams;
  const product = products.find(p => p.id === Number(id));

  const [prods, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [cat, setCategory] = useState("");
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
        `http://localhost:3000/api/products?cat=${cat}&q=${search}&page=${page}`
      );
      const data = await res.json();
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prev) => [...prev, ...data]);
      }
    } catch (err) {
      console.error("Error loading prods:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
  }, [search, cat]);

  useEffect(() => {
    fetchProducts();
  }, [page, cat, search]);
  return (
    <>
      <Navbar />
      <div className="ProductDetail w-full pt-16">

        {/* Main product details - 200vh */}
        <section className="px-4 py-8 min-h-max bg-gray-50">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Product Image */}
            <div className="relative w-full h-[500px] bg-white rounded-lg shadow overflow-hidden">
              <Image
                src={product.source}
                alt={product.name}
                layout="fill"
                objectFit="cover"
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-between">
              <div>
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <p className="text-gray-500 mt-2 text-sm">
                  Brand: {brand} | Category: {category}
                </p>
                <p className="text-2xl text-blue-600 font-semibold mt-4">
                  ₹{product.price} <span className="text-sm text-gray-500">/{product.unit}</span>
                </p>
                <p className="mt-6 text-gray-700 leading-relaxed">{product.description}</p>
              </div>

              <div className="mt-8">
                <div className="flex items-center space-x-4 mb-4">
                  <button className="px-4 py-2 bg-gray-200 rounded-lg">-</button>
                  <span>1</span>
                  <button className="px-4 py-2 bg-gray-200 rounded-lg">+</button>
                </div>
                <button className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition w-full">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>


          <div className="px-8">
            <div className="my-8 mt-16 text-2xl">More you like</div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

              {prods.map((p, index) => {
                if (prods.length === index + 1) {
                  return (
                    <div ref={lastProductRef} key={p.id}>
                      <ProductCard {...p} />
                    </div>
                  );
                } else {
                  return <ProductCard key={p.id} {...p} />;
                }
              })}
            </div>
            {/* <ProductSection title="Suggested Products" prods={prods} /> */}
            {loading && <InlineSpinner />}
            {!hasMore && (
              <p className="text-center py-4 text-gray-500">
                No more products to load
              </p>
            )}

          </div>
        </section>
      </div>
    </>
  );
}

