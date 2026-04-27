"use client";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext"; // Path Fixed
import Link from "next/link";

export default function CartIcon() {
  const { cart } = useCart();
  const count = cart.reduce((acc, item) => acc + item.qty, 0);
  if (count === 0) return null;

  return (
    <Link href="/cart" className="fixed bottom-8 right-8 z-50 bg-blue-600 text-white p-4 rounded-full shadow-2xl md:hidden">
      <div className="relative">
        <ShoppingBag size={28} />
        <span className="absolute -top-2 -right-2 bg-red-500 text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white">
          {count}
        </span>
      </div>
    </Link>
  );
}