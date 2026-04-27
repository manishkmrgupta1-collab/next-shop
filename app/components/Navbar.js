"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart, User, LogOut, Package } from "lucide-react";
import { useCart } from "../context/CartContext"; // 1. Hook import karein

export default function Navbar() {
  const { cart, orders } = useCart(); // 2. Cart data nikalein
  const [user, setUser] = useState(null);
  const [mounted, setMounted] = useState(false);

  // Total quantity calculate karein (e.g. 2 shirts + 1 watch = 3)
  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  useEffect(() => {
    setMounted(true); // Hydration error se bachne ke liye
    const savedUser = localStorage.getItem("user-name");
    if (savedUser) setUser(savedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user-name");
    setUser(null);
    window.location.reload();
  };

  // Jab tak component mount na ho, tab tak empty rakhein (Next.js rule)
  if (!mounted) return <nav className="h-16 border-b bg-white" />;

  return (
    <nav className="border-b bg-white sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-black text-blue-600 tracking-tighter">
          NEXT-SHOP
        </Link>

        <div className="flex items-center gap-4 md:gap-8">
          
          {/* User Section */}
          {user ? (
            <div className="flex items-center gap-4">
              <Link href="/orders" className="text-gray-500 hover:text-blue-600 flex items-center gap-1 transition">
                <Package size={20} />
                <span className="text-sm font-bold hidden md:block">Orders</span>
              </Link>
              <div className="h-8 w-[1px] bg-gray-200 hidden md:block"></div>
              <span className="text-sm font-bold text-gray-800 hidden md:block uppercase tracking-wide">
                {user}
              </span>
              <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 transition">
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link href="/login" className="flex items-center gap-2 text-gray-600 font-bold hover:text-blue-600 transition">
              <User size={20} />
              <span className="hidden md:block">Login</span>
            </Link>
          )}
          
          {/* Cart Icon with Badge */}
          <Link href="/cart" className="relative p-2.5 bg-gray-100 rounded-2xl hover:bg-blue-50 hover:text-blue-600 transition group">
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-black h-5 w-5 flex items-center justify-center rounded-full border-2 border-white shadow-lg group-hover:scale-110 transition">
                {cartCount}
              </span>
            )}
          </Link>

        </div>
      </div>
    </nav>
  );
}