export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm animate-pulse">
      {/* Image Placeholder */}
      <div className="h-48 bg-gray-200 rounded-2xl mb-6"></div>
      
      {/* Category Placeholder */}
      <div className="h-3 w-20 bg-gray-200 rounded-full mb-3"></div>
      
      {/* Title Placeholder */}
      <div className="h-5 bg-gray-200 rounded-full w-full mb-2"></div>
      <div className="h-5 bg-gray-200 rounded-full w-2/3 mb-6"></div>
      
      {/* Price & Button Placeholder */}
      <div className="flex justify-between items-center mt-auto">
        <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
        <div className="h-10 w-10 bg-gray-200 rounded-xl"></div>
      </div>
    </div>
  );
}