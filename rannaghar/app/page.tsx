import React from "react";

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100 px-6">
      
      {/* Hero Section */}
      <div className="max-w-3xl text-center">
        <h1 className="text-5xl font-bold text-gray-800 leading-tight">
          Welcome to <span className="text-blue-600">RannaGhar</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Discover delicious meals from different regions and categories.
        </p>

      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-16 h-16 bg-blue-400 opacity-10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-20 h-20 bg-indigo-400 opacity-10 rounded-full animate-pulse"></div>

    </div>
  );
};

export default Page;

