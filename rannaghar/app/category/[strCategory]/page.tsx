import { Meal } from "@/app/globals/types";
import { getMealsByCategory } from "@/app/utils/single-category";
import Image from "next/image";
import Link from "next/link";

export default async function SingleCategory({ params }: { params: Promise<{ strCategory: string }> }) {
  const { strCategory } = await params;
  const meals: Meal[] | null = await getMealsByCategory(strCategory);

  if (!meals || meals.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[50vh]">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md w-full text-center">
          <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Meals Found</h2>
          <p className="text-gray-600 mb-6">We could not find any meals in the {strCategory} category.</p>
          <Link href="/" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 17l-5-5m0 0l5-5m-5 5h12"></path>
            </svg>
            Return to Categories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Hero Section */}
      <div className="mb-10 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-8 text-center shadow-sm">
        <span className="inline-block px-4 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-4">Category</span>
        <h1 className="text-4xl font-bold text-gray-800 mb-3">{strCategory} Dishes</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover delicious {strCategory.toLowerCase()} recipes from around the world. Click on any meal to see the detailed recipe and cooking instructions.
        </p>
      </div>

      {/* Filter & Count */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-lg font-medium text-gray-700">
          <span className="text-teal-500 font-bold">{meals.length}</span> recipes available
        </h2>
        
        <Link 
          href="/" 
          className="inline-flex items-center px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors shadow-md"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 17l-5-5m0 0l5-5m-5 5h12"></path>
          </svg>
          Explore More Categories
        </Link>
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
              <div className="p-5 flex-grow">
                <h2 className="text-xl font-bold text-gray-800 group-hover:text-teal-600 transition-colors line-clamp-2">
                  {meal.strMeal}
                </h2>
                <div className="flex items-center mt-3">
                  <span className="inline-flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-1 text-teal-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path>
                    </svg>
                    View Details
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}