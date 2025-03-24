import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-gray-800">
            <span className="text-orange-500">Ranna</span>
            <span className="text-gray-700">ghar</span>
          </span>
        </Link>
        
      
      </div>
    </nav>
  );
}