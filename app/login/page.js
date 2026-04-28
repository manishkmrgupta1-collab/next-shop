"use client";
import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { LogIn, Mail, Lock, ArrowRight } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      // IMPORTANT: Checkout page "user-name" dhoond raha hai
      const displayName = email.split('@')[0]; 
      localStorage.setItem("user-name", displayName);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);

      // window.location use karne se Navbar turant update hoga
      window.location.href = "/";
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="w-full max-w-md bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-gray-100">
      <div className="text-center mb-10">
        <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-200">
          <LogIn className="text-white" size={32} />
        </div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Welcome Back</h1>
        <p className="text-gray-500 mt-2 font-medium">Please enter your details to sign in</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="email" required
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500/20 outline-none transition font-medium text-gray-900"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="password" required
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500/20 outline-none transition font-medium text-gray-900"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" disabled={loading} className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 disabled:opacity-50">
          {loading ? "Authenticating..." : <>{'Sign In'} <ArrowRight size={20} /></>}
        </button>
      </form>
      <p className="text-center mt-8 text-gray-500 font-medium text-sm">
        Don't have an account? <Link href="/register" className="text-blue-600 font-black hover:underline ml-1">Create one</Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <Suspense fallback={<div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>}>
        <LoginForm />
      </Suspense>
    </main>
  );
}