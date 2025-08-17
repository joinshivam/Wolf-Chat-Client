export const categories = ["Electronics", "Clothing", "Home", "Sports", "Books"];
export const Brands = ["Sony", "Puma", "Bajaj", "PizzaHaat", "Baaca Bucci"];
const imageFor = (i, w = 400, h = 300) => `https://picsum.photos/seed/${i}/${w}/${h}`;


export const products = Array.from({ length: 100 }, (_, i) => {
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const randomBrands = Brands[Math.floor(Math.random() * categories.length)];

    return {
        id: i + 1,
        name: `Product Name ${i + 1}`,
        source: `${imageFor(i+1)}`,
        price: (40 + i * 5).toString(),
        brand: `${randomBrands}`,
        category: randomCategory,
        unit: "1kg",
        available: (100 - i * 2).toString(),
        slug: `product-slug-${i + 1}`,
        discount: (i + 5) % 7 === 0 ? "10" : "",
        description:"Lorem ipsum is a dummy text without any sense. It is a sequence of Latin words that, as they are positioned, do not form sentences with a complete sense, but give life to a test text useful to fill spaces that will subsequently be occupied from ad hoc texts composed by communication professionals."
    };
});

// function ProductCard({ name, source, price, brand, category, unit, available, slug }) {
//     return (
//         <div className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition">
//             <img src={source} alt={name} className="w-full h-48 object-cover" />
//             <div className="p-4">
//                 <h3 className="font-bold text-lg">{name}</h3>
//                 <p className="text-sm text-gray-500">{brand}</p>
//                 <p className="text-sm text-gray-400">{category} • {unit}</p>
//                 <p className="mt-2 font-bold text-xl">₹{price}</p>
//                 <p className="text-xs text-green-600">{available} available</p>
//                 <div className="mt-3 flex gap-2">
//                     <a
//                         href={`/product/${slug}`}
//                         className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
//                     >
//                         View
//                     </a>
//                     <button className="bg-gray-200 px-3 py-1 rounded text-sm hover:bg-gray-300">
//                         Add to Cart
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

