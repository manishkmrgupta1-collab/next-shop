"use client";
import { useCart } from "../context/CartContext";
import { Package, Calendar, MapPin, ChevronRight, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function OrdersPage() {
  const { orders } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (orders.length === 0) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center gap-6 text-center px-4">
        <div className="bg-gray-100 p-8 rounded-full">
          <Package size={60} className="text-gray-300" />
        </div>
        <div>
          <h2 className="text-3xl font-black text-gray-800">No orders yet</h2>
          <p className="text-gray-500 mt-2">When you buy something, it will appear here.</p>
        </div>
        <Link href="/" className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 md:py-16">
      <div className="flex items-center gap-4 mb-10">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Order History</h1>
        <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-bold">
          {orders.length} Orders
        </span>
      </div>

      <div className="space-y-8">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition">
            {/* Order Header */}
            <div className="bg-gray-50 p-6 md:px-8 border-b flex flex-wrap justify-between items-center gap-4">
              <div className="flex gap-8">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Order Date</p>
                  <p className="font-bold text-gray-800 flex items-center gap-2">
                    <Calendar size={14} className="text-blue-500"/> {order.date}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Total Amount</p>
                  <p className="font-black text-blue-600 text-lg">₹{order.total.toLocaleString()}</p>
                </div>
              </div>
              <div className="bg-green-100 text-green-700 px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider">
                {order.status}
              </div>
            </div>

            {/* Order Items */}
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 gap-6">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-6">
                    <div className="h-20 w-20 bg-gray-50 rounded-2xl p-2 flex-shrink-0 border">
                      <img src={item.image} alt="" className="h-full w-full object-contain" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 line-clamp-1">{item.title}</h4>
                      <p className="text-gray-500 text-sm font-medium mt-1">
                        Quantity: <span className="text-gray-900">{item.qty}</span> × ₹{(item.price * 80).toLocaleString()}
                      </p>
                    </div>
                    <Link href={`/product/${item.id}`} className="p-2 hover:bg-gray-100 rounded-xl transition text-gray-400">
                      <ChevronRight size={20} />
                    </Link>
                  </div>
                ))}
              </div>

              {/* Delivery Info */}
              <div className="mt-8 pt-6 border-t flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
                  <MapPin size={18} className="text-blue-500" />
                  <span>Delivering to <span className="text-gray-900 font-bold">{order.customerName}</span></span>
                </div>
                <button className="text-blue-600 font-bold text-sm hover:underline">
                  Download Invoice
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}