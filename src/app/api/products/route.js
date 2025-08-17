import { NextResponse } from "next/server";
import { products } from "@/app/components/products"; // mock data

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || "";
    const q = searchParams.get("q") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const perPage = 12;

    let filtered = products;

    // Filter by category
    if (category) {
        filtered = filtered.filter(
            (p) => p.category.toLowerCase() === category.toLowerCase()
        );
    }

    // Filter by search query
    if (q) {
        filtered = filtered.filter(
            (p) =>
                p.name.toLowerCase().includes(q.toLowerCase()) ||
                p.brand.toLowerCase().includes(q.toLowerCase())
        );
    }

    // Pagination
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const paginated = filtered.slice(start, end);

    return NextResponse.json(paginated);
}


// import { NextResponse } from "next/server";
// import { products } from "@/app/components/products";

// function getRecommendedProducts(currentProductId) {
//     return products
//         .filter(p => p.id !== currentProductId)
//         .sort(() => Math.random() - 0.5) // random shuffle
//         .slice(0, 10);
// }

// export async function GET(req) {
//     const { searchParams } = new URL(req.url);

//     const section = searchParams.get("section") || "all"; // all | recommended | trending | you-like
//     const category = searchParams.get("category") || "";
//     const brand = searchParams.get("brand") || "";
//     const q = searchParams.get("q") || "";
//     const currentId = parseInt(searchParams.get("currentId") || "0", 10);
//     const page = parseInt(searchParams.get("page") || "1", 10);
//     const perPage = parseInt(searchParams.get("limit") || "12", 10);

//     let filtered = [...products];

//     // If category filter
//     if (category) {
//         filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
//     }

//     // If brand filter
//     if (brand) {
//         filtered = filtered.filter(p => p.brand.toLowerCase() === brand.toLowerCase());
//     }

//     // If search query
//     if (q) {
//         filtered = filtered.filter(
//             p =>
//                 p.name.toLowerCase().includes(q.toLowerCase()) ||
//                 p.brand.toLowerCase().includes(q.toLowerCase())
//         );
//     }

//     // Section-specific logic
//     if (section === "recommended") {
//         filtered = getRecommendedProducts(currentId);
//     } else if (section === "trending") {
//         filtered = filtered.sort(() => Math.random() - 0.5).slice(0, 20); // random trending mock
//     }

//     // Pagination
//     const start = (page - 1) * perPage;
//     const end = start + perPage;
//     const paginated = filtered.slice(start, end);

//     return NextResponse.json({
//         data: paginated,
//         hasMore: end < filtered.length
//     });
// }
