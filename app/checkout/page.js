"use client";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Truck, CheckCircle2, ChevronLeft, CreditCard } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const { cart, placeOrder } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user-name");
    if (!user) {
      toast.error("Login required to checkout");
      router.push("/login?redirect=checkout");
    } else {
      setIsReady(true);
    }
  }, [router]);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0) * 80;
  const total = subtotal + 150;

  const handleConfirm = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      placeOrder({ customerName: localStorage.getItem("user-name") });
      setLoading(false);
      setShowSuccess(true);
    }, 2000);
  };

  if (!isReady) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
          <div className="bg-white p-12 rounded-[3rem] text-center max-w-sm shadow-2xl animate-in zoom-in duration-300">
            <CheckCircle2 size={80} className="text-green-500 mx-auto mb-6" strokeWidth={3} />
            <h2 className="text-3xl font-black mb-2">Order Success!</h2>
            <p className="text-gray-500 mb-8">Your package is on its way.</p>
            <button onClick={() => router.push("/")} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold">Back to Store</button>
          </div>
        </div>
      )}

      <Link href="/cart" className="flex items-center gap-2 text-gray-400 mb-8 hover:text-blue-600 transition"><ChevronLeft size={20}/> Back to Cart</Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <form onSubmit={handleConfirm} className="lg:col-span-2 space-y-8">
          <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-3"><Truck className="text-blue-600"/> Delivery Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input required type="text" placeholder="Full Name" className="p-4 rounded-xl border bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2" />
              <input required type="text" placeholder="Address" className="p-4 rounded-xl border bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2" />
              <input required type="text" placeholder="City" className="p-4 rounded-xl border bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500" />
              <input required type="text" placeholder="PIN Code" className="p-4 rounded-xl border bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </section>

          <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-black mb-4 flex items-center gap-3"><CreditCard className="text-blue-600"/> Payment</h2>
            <div className="p-4 rounded-2xl border-2 border-blue-600 bg-blue-50 flex justify-between items-center">
              <span className="font-bold text-blue-900">Cash on Delivery</span>
              <div className="h-4 w-4 rounded-full bg-blue-600"></div>
            </div>
          </section>
        </form>

        <div className="lg:col-span-1">
          <div className="bg-gray-900 text-white p-8 rounded-[2.5rem] sticky top-24">
            <h2 className="text-xl font-bold mb-6">Summary</h2>
            <div className="space-y-4 mb-8 text-gray-400">
              <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
              <div className="flex justify-between"><span>Delivery</span><span>₹150</span></div>
              <div className="flex justify-between text-2xl font-black text-white pt-4 border-t border-gray-800">
                <span>Total</span><span>₹{total.toLocaleString()}</span>
              </div>
            </div>
            <button onClick={handleConfirm} disabled={loading} className="w-full bg-blue-600 py-4 rounded-2xl font-black text-lg hover:bg-blue-500 transition disabled:bg-gray-700">
              {loading ? "Processing..." : "Place Order Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}