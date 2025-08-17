import Navbar from "../components/navbar";
// pages/cart.js
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const cartItems = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 59.99,
      unit: "pcs",
      quantity: 1,
      image: "https://res.cloudinary.com/dvtobwp22/image/upload/v1754790086/cld-sample-4.jpg",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 120.0,
      unit: "pcs",
      quantity: 2,
      image: "https://res.cloudinary.com/dvtobwp22/image/upload/v1754790086/cld-sample-4.jpg",
    },
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <Navbar />
      <div className="w-full px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center bg-white rounded-lg shadow p-4 gap-4"
              >
                {/* Product Image */}
                <div className="relative w-20 h-20">
                  <Image
                    src={item.image}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded"
                  />
                </div>

                {/* Details */}
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-500">${item.price.toFixed(2)} / {item.unit}</p>

                  {/* Quantity Controls */}
                  <div className="flex items-center mt-2 space-x-3">
                    <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">-</button>
                    <span>{item.quantity}</span>
                    <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">+</button>
                  </div>
                </div>

                {/* Remove */}
                <button className="text-red-500 hover:underline text-sm">
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between font-bold text-lg mb-6">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <Link href="/checkout">
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

