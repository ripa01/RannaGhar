import React from "react";
import { ChefHat, MapPin, Search } from "lucide-react";

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-orange-50 to-indigo-100 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-24 h-24 bg-orange-400 opacity-10 rounded-full animate-blob"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-indigo-400 opacity-10 rounded-full animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/3 left-1/4 w-40 h-40 bg-green-400 opacity-10 rounded-full animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 max-w-4xl text-center space-y-6">
        <div className="flex justify-center mb-4">
          <ChefHat 
            className="text-orange-600" 
            size={64} 
            strokeWidth={1.5} 
          />
        </div>

        <h1 className="text-6xl font-extrabold text-gray-800 leading-tight">
          Welcome to <span className="text-orange-600">RannaGhar</span>
        </h1>
        
        <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
          Embark on a culinary journey through diverse regions and tantalizing categories. Your next favorite meal awaits!
        </p>

        {/* Call to Action Section */}
        <div className="flex justify-center space-x-4 mt-8">
          <button className="flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-full hover:bg-orange-700 transition-colors">
            <Search size={20} />
            Explore Recipes
          </button>
          <button className="flex items-center gap-2 border border-orange-600 text-orange-600 px-6 py-3 rounded-full hover:bg-orange-50 transition-colors">
            <MapPin size={20} />
            Regional Cuisines
          </button>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="absolute bottom-10 left-0 right-0 text-center">
        <div className="flex justify-center space-x-8 text-gray-500">
          <div className="flex items-center gap-2">
            <span className="text-orange-600 font-bold">500+</span> 
            Recipes
          </div>
          <div className="flex items-center gap-2">
            <span className="text-orange-600 font-bold">20+</span> 
            Regions
          </div>
          <div className="flex items-center gap-2">
            <span className="text-orange-600 font-bold">10+</span> 
            Categories
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;