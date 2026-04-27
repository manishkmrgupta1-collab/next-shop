"use client";
import { useCart } from "../context/CartContext"; // Fixed Path
import { Plus } from "lucide-react";
import Link from "next/link";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-2xl border p-4 hover:shadow-xl transition-all group flex flex-col h-full">
      <Link href={`/product/${product.id}`} className="aspect-square overflow-hidden mb-4 rounded-xl block">
        <img 
          src={product.image} 
          alt={product.title} 
          className="h-full w-full object-contain group-hover:scale-110 transition duration-300" 
        />
      </Link>
      <h3 className="font-bold text-gray-800 line-clamp-1 mt-1">{product.title}</h3>
      <div className="flex items-center justify-between mt-auto pt-4 border-t">
        <span className="text-lg font-black">₹{(product.price * 80).toLocaleString()}</span>
        <button 
          onClick={() => addToCart(product)} 
          className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition active:scale-90"
        >
          <Plus size={20} />
        </button>
      </div>
    </div>
  );
}