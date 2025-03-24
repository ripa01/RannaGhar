import { Meal } from "@/app/globals/types";
import { getMealsByArea } from "@/app/utils/area-meal";
import Image from "next/image";
import Link from "next/link";

export default async function SingleArea({ params }: { params: Promise<{ strArea: string }> }) {
  const { strArea } = await params;
  const meals: Meal[] | null = await getMealsByArea(strArea);

  if (!meals || meals.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[50vh]">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md w-full text-center">
          <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Meals Found</h2>
          <p className="text-gray-600 mb-6">We could not find any meals from {strArea} cuisine.</p>
          <Link href="/" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 17l-5-5m0 0l5-5m-5 5h12"></path>
            </svg>
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Hero Section with Region Highlight */}
      <div className="mb-10 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-8 text-center">
        <span className="inline-block px-4 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium mb-4">Regional Cuisine</span>
        <h1 className="text-4xl font-bold text-gray-800 mb-3">{strArea} Cuisine</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore traditional and popular dishes from {strArea} cuisine. Click on any meal to see the detailed recipe.
        </p>
      </div>

      {/* Filter & Count */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-700">
          <span className="text-orange-500 font-bold">{meals.length}</span> meals found
        </h2>
        {/* <Link 
          href="/" 
          className="inline-flex items-center px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors shadow-md"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 17l-5-5m0 0l5-5m-5 5h12"></path>
          </svg>
          Explore More Cuisines
        </Link> */}
        
       
      </div>

      {/* Meals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {meals.map((meal) => (
          <Link key={meal.idMeal} href={`/meal/${meal.idMeal}`} className="group">
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 h-full flex flex-col">
              <div className="relative">
                <div className="aspect-video overflow-hidden">
                  <Image
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <span className="text-white px-4 py-2 font-medium">View Recipe</span>
                </div>
              </div>
              <div className="p-5">
                <h2 className="text-xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors line-clamp-2">
                  {meal.strMeal}
                </h2>
                <div className="flex items-center mt-3">
                  <span className="inline-flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-1 text-orange-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"></path>
                    </svg>
                    {strArea} Recipe
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Back Button - Bottom */}
      {/* <div className="mt-12 text-center">
        <Link 
          href="/" 
          className="inline-flex items-center px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors shadow-md"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 17l-5-5m0 0l5-5m-5 5h12"></path>
          </svg>
          Explore More Cuisines
        </Link>
      </div> */}
    </div>
  );
}