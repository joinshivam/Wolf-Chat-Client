import Image from "next/image";
import Link from "next/link";
import { slugify } from "../slugify";

export default function ProductCard({ id, name, source, price, brand, discount, category, unit, available, slug }) {
    const DecimalPlaces = 0;
    const finalPrice = discount
        ? DecimalPlaces > 0 ? (price - (price * discount) / 100).toFixed(DecimalPlaces) : (price - (price * discount) / 100)
        : DecimalPlaces > 0 ? Number(price).toFixed(DecimalPlaces) : price;

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300">
            <Link href={`/c/${slugify(brand)}/${slugify(category)}/${id}?product=${slugify(name)}`}>
                <div className="relative w-full h-60">
                    <Image
                        src={source}
                        alt={name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 300px"
                    />
                    {discount && (
                        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                            {discount}% OFF
                        </span>
                    )}
                </div>
            </Link>

            <div className="p-4">
                <h3 className="text-lg font-semibold truncate">{name}</h3>
                <p className="text-sm text-gray-500">{brand}</p>
                <div className="flex items-center gap-2 mt-2">
                    <span className="text-lg font-bold text-green-600">₹{finalPrice}</span>
                    {discount && (
                        <span className="text-sm line-through text-gray-400">₹{price}</span>
                    )}
                </div>

                <div className="flex gap-2 mt-4">
                    <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 rounded">
                        Add to Cart
                    </button>
                    <Link
                        href={`/c/${slugify(brand)}/${slugify(category)}/${id}?product=${slugify(name)}`}
                        className="flex-1 bg-gray-100 text-center text-sm py-2 rounded hover:bg-gray-200"
                    >
                        View
                    </Link>
                </div>
            </div>
        </div>
    );
}

//  <Link href={`/c/${slugify(product.brand)}/${slugify(product.category)}/${product.id}?product=${slugify(product.name)}`}>

//                                 <div className="relative w-full h-48">
//                                     <Image
//                                         src={`${product.source}`}
//                                         alt={`${product.name}`}
//                                         layout="fill"
//                                         objectFit="cover"
//                                         className=""
//                                     />
//                                     <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 text-sm font-semibold rounded-bl-lg">
//                                         ${`${product.price}`}
//                                     </div>
//                                     <div className="absolute inset-0 flex items-center justify-center">
//                                         <div className="flex items-center bg-white rounded-full shadow px-3 py-1 space-x-3">
//                                             <button className="text-lg font-bold text-gray-700 hover:text-blue-600">-</button>
//                                             <span className="text-gray-800">1</span>
//                                             <button className="text-lg font-bold text-gray-700 hover:text-blue-600">+</button>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div className="p-4 bg-white">
//                                     <h3 className="text-lg font-semibold">{`${product.name}`}</h3>
//                                     <p className="text-sm text-gray-500">{`${product.price}/${product.unit}`}</p>
//                                     <p className="text-xs text-gray-400">Brand Name</p>
//                                 </div>
//                                 <div className="p-4 pt-0">
//                                     <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
//                                         Add to Cart
//                                     </button>
//                                 </div>
//                             </Link>
