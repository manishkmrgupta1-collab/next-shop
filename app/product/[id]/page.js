"use client";
import { useState, useEffect, use } from "react";
import { useCart } from "../../context/CartContext";
import { ShoppingCart, ArrowLeft, Star, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ProductDetails({ params }) {
  // Next.js 13+ ke liye params ko unwrap karna zaroori hai
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) return <div className="text-center py-20 font-bold text-2xl">Product not found!</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 md:py-20">
      <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-10 font-bold transition">
        <ArrowLeft size={20} /> Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        {/* Product Image Wrapper */}
        <div className="bg-white p-8 md:p-16 rounded-[3rem] border border-gray-100 shadow-sm flex items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-blue-50/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <img 
            src={product.image} 
            alt={product.title} 
            className="max-h-[500px] object-contain transition-transform duration-500 group-hover:scale-105" 
          />
        </div>

        {/* Product Info */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-widest mb-4">
              <span className="px-3 py-1 bg-blue-50 rounded-full">{product.category}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
              {product.title}
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1 bg-orange-50 text-orange-600 px-3 py-1 rounded-lg font-bold">
              <Star size={18} fill="currentColor" /> {product.rating?.rate}
            </div>
            <span className="text-gray-400 font-medium">{product.rating?.count} Reviews</span>
          </div>

          <div className="text-5xl font-black text-blue-600">
            ₹{(product.price * 80).toLocaleString()}
          </div>

          <p className="text-gray-500 text-lg leading-relaxed font-medium">
            {product.description}
          </p>

          <div className="grid grid-cols-2 gap-4 py-8 border-y border-gray-100">
             <div className="flex items-center gap-3">
                <div className="p-3 bg-green-50 text-green-600 rounded-2xl"><ShieldCheck/></div>
                <span className="text-sm font-bold text-gray-700">1 Year Warranty</span>
             </div>
             <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><Truck/></div>
                <span className="text-sm font-bold text-gray-700">Free Delivery</span>
             </div>
          </div>

          <button 
            onClick={() => addToCart(product)}
            className="w-full md:w-auto px-12 py-5 bg-blue-600 text-white rounded-[2rem] font-black text-xl hover:bg-blue-700 transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-blue-100 flex items-center justify-center gap-3"
          >
            <ShoppingCart size={24} /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}