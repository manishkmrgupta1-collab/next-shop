"use client";
import { useState, useEffect, useRef } from "react";
import ProductCard from "./components/ProductCard";
import SkeletonCard from "./components/SkeletonCard";
import { Search, Sparkles, ArrowRight, ShoppingBag } from "lucide-react";

// Product ke liye interface define karna best practice hai
interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

export default function Home() {
  // 1. REFS & STATE (TypeScript Types Added)
  // Humne bataya ki ye Ref ek HTMLDivElement ko point karega
  const productsSectionRef = useRef<HTMLDivElement>(null);
  
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  const categories = ["all", "electronics", "jewelery", "men's clothing", "women's clothing"];

  // 2. SMOOTH SCROLL HANDLER
  const handleExplore = () => {
    if (productsSectionRef.current) {
      productsSectionRef.current.scrollIntoView({ 
        behavior: "smooth",
        block: "start" 
      });
    }
  };

  // 3. DATA FETCHING
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error("Failed to fetch");
        const data: Product[] = await res.json();
        setProducts(data);
        setFiltered(data);
      } catch (err) { 
        console.error("Fetch error:", err); 
      } finally { 
        setLoading(false); 
      }
    };
    getData();
  }, []);

  // 4. FILTERING LOGIC
  useEffect(() => {
    const result = products.filter((p) => {
      const matchCat = activeCategory === "all" || p.category === activeCategory;
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
    setFiltered(result);
  }, [search, activeCategory, products]);

  return (
    <main className="min-h-screen bg-white">
      {/* --- HERO SECTION --- */}
      <section className="relative bg-[#0b1120] py-16 md:py-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[100px]"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold mb-5 tracking-[0.2em] uppercase">
              <Sparkles size={12} /> New Season 2026
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-6">
              THE FUTURE OF <br />
              <span className="text-blue-500 italic">ONLINE SHOPPING.</span>
            </h1>
            
            <p className="text-gray-400 text-base md:text-lg mb-8 max-w-lg leading-relaxed font-medium">
              Experience the next generation of e-commerce with our premium curated collections.
            </p>
            
            <button 
              onClick={handleExplore}
              className="group px-8 py-3.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500 transition-all flex items-center gap-2 shadow-lg shadow-blue-900/20 active:scale-95"
            >
              Explore Collection 
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* --- STICKY FILTERS BAR --- */}
      <div 
        ref={productsSectionRef}
        className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex gap-2 overflow-x-auto no-scrollbar w-full lg:w-auto pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-lg text-[11px] font-black transition-all whitespace-nowrap uppercase tracking-widest ${
                    activeCategory === cat
                      ? "bg-gray-900 text-white shadow-md shadow-gray-200"
                      : "bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-gray-50 border-none outline-none focus:ring-1 focus:ring-blue-500/20 font-bold text-xs transition-all shadow-inner"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* --- PRODUCT GRID --- */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="py-32 text-center border-2 border-dashed border-gray-100 rounded-[2rem]">
            <ShoppingBag size={64} className="mx-auto text-gray-200 mb-4" />
            <h3 className="text-xl font-bold text-gray-800">No results found</h3>
            <p className="text-gray-400 mt-1 font-medium">Try adjusting your filters or search.</p>
          </div>
        )}
      </div>
    </main>
  );
}