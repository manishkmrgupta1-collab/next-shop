"use client";
import { useCart } from "../context/CartContext";
import { Trash2, Minus, Plus, ArrowLeft, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, updateQty } = useCart();
  
  // Calculate subtotal in INR
  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0) * 80;

  if (cart.length === 0) return (
    <div className="h-[70vh] flex flex-col items-center justify-center gap-6 text-center px-4">
      <div className="bg-gray-100 p-6 rounded-full">
        <ShoppingBag size={60} className="text-gray-400" />
      </div>
      <div>
        <h2 className="text-3xl font-black text-gray-800">Your cart is empty</h2>
        <p className="text-gray-500 mt-2">Looks like you haven't added anything yet.</p>
      </div>
      <Link href="/" className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-700 transition shadow-lg shadow-blue-100">
        <ArrowLeft size={18}/> Start Shopping
      </Link>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-16">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">My Cart</h1>
        <span className="text-gray-500 font-medium">{cart.length} Items</span>
      </div>

      <div className="space-y-6">
        {cart.map((item) => (
          <div key={item.id} className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center gap-6 hover:shadow-md transition">
            <div className="h-28 w-28 bg-gray-50 rounded-2xl p-2 flex items-center justify-center">
               <img src={item.image} alt={item.title} className="h-full w-full object-contain" />
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-bold text-gray-800 line-clamp-1 text-lg">{item.title}</h3>
              <p className="text-blue-600 font-black text-xl mt-1">₹{(item.price * 80).toLocaleString()}</p>
              <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-bold">{item.category}</p>
            </div>

            <div className="flex items-center gap-4 bg-gray-50 p-2 px-4 rounded-2xl border border-gray-100">
              <button 
                onClick={() => updateQty(item.id, -1)} 
                className="p-1.5 hover:bg-white hover:shadow-sm rounded-lg text-gray-500 hover:text-blue-600 transition"
              >
                <Minus size={18}/>
              </button>
              <span className="font-black text-lg w-6 text-center text-gray-800">{item.qty}</span>
              <button 
                onClick={() => updateQty(item.id, 1)} 
                className="p-1.5 hover:bg-white hover:shadow-sm rounded-lg text-gray-500 hover:text-blue-600 transition"
              >
                <Plus size={18}/>
              </button>
            </div>

            <button 
              onClick={() => removeFromCart(item.id)} 
              className="text-red-400 p-3 hover:bg-red-50 hover:text-red-600 rounded-2xl transition"
              title="Remove Item"
            >
              <Trash2 size={22}/>
            </button>
          </div>
        ))}
      </div>

      {/* Order Summary Card */}
      <div className="mt-12 p-8 bg-gray-900 rounded-[2.5rem] shadow-2xl text-white">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-center sm:text-left">
            <p className="text-gray-400 font-medium">Grand Total</p>
            <h2 className="text-4xl font-black tracking-tight">₹{total.toLocaleString()}</h2>
          </div>
          
          {/* UPDATED: Injected Link for Checkout */}
          <Link 
            href="/checkout" 
            className="w-full sm:w-auto bg-blue-600 text-white px-12 py-4 rounded-2xl font-black text-lg hover:bg-blue-500 transition shadow-xl shadow-blue-900/20 active:scale-95 text-center"
          >
            Checkout Now
          </Link>
        </div>
      </div>
      
      <p className="text-center text-gray-400 mt-8 text-sm font-medium">
        Secure Checkout powered by Next-Shop
      </p>
    </div>
  );
}