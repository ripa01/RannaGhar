import Image from "next/image";
import Link from "next/link";
import { getCategory } from "./utils/category-list";
import AreaDropdown from "./components/AreaDropDown";
import Navbar from "./components/Navbar";

export default async function CategoryPage() {
  const categories = await getCategory(); // Fetching data on the server
  
  return (
    <>
    <Navbar />
    <div className="container mx-auto px-4 py-8 max-w-6xl">
     
      {/* Hero Section */}
      <AreaDropdown />
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-3 text-gray-800">Explore Meal Categories</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">Discover delicious recipes from around the world organized by category.</p>
      </div>
      
      {/* Filter Section */}
      {/* <div className="mb-8 p-4 bg-gray-50 rounded-lg shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-lg font-medium text-gray-700">Filter Options</h2>
          
        </div>
      </div> */}
      
      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.length > 0 ? (
          categories.map((category) => (
            <Link 
              key={category.idCategory} 
              href={`/category/${category.strCategory}`}
              className="group"
            >
              <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 h-full flex flex-col">
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={category.strCategoryThumb}
                    alt={category.strCategory}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="p-5 flex-grow">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">{category.strCategory}</h2>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {category.strCategoryDescription?.slice(0, 100)}...
                  </p>
                </div>
                <div className="px-5 pb-5">
                  <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
                    Explore
                  </span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center p-12 bg-gray-50 rounded-lg">
            <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p className="text-gray-600 text-lg font-medium">No categories found.</p>
            <p className="text-gray-500 mt-2">Please try again later or adjust your filters.</p>
          </div>
        )}
      </div>
    </div>
    </>
  );
}