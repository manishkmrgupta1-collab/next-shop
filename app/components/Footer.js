// Lucide icons ka standard check: Github, Mail, Phone common hain.
// Agar fir bhi error aaye, toh names ko 'Icon' suffix ke saath try karein.
import { Globe, Mail, Phone, Laptop } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">NEXT-SHOP</h2>
            <p className="text-gray-500 max-w-xs">Premium products, delivered to your door.</p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Contact & Social</h3>
            <div className="flex gap-4 text-gray-500">
              {/* Stable icons that rarely fail */}
              <Globe size={20} className="hover:text-blue-600 cursor-pointer" />
              <Mail size={20} className="hover:text-red-500 cursor-pointer" />
              <Phone size={20} className="hover:text-green-600 cursor-pointer" />
              <Laptop size={20} className="hover:text-black cursor-pointer" />
            </div>
          </div>
        </div>
        <div className="border-t mt-12 pt-8 text-center text-gray-400 text-sm">
          © 2026 NEXT-SHOP. Built with Next.js.
        </div>
      </div>
    </footer>
  );
}