import { SingleMeal } from "@/app/globals/types";
import { getMealsById } from "@/app/utils/all-recipe";
import Image from "next/image";
import Link from "next/link";

export default async function SingleMealPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const meals: SingleMeal[] | null = await getMealsById(id);

  if (!meals || meals.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[50vh]">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md w-full text-center">
          <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Recipe Not Found</h2>
          <p className="text-gray-600 mb-6">We could not find the recipe you are looking for.</p>
          <Link href="/" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 17l-5-5m0 0l5-5m-5 5h12"></path>
            </svg>
            Browse Recipes
          </Link>
        </div>
      </div>
    );
  }

  const meal = meals[0];

  // Function to pair ingredients with measurements
  const getIngredientPairs = () => {
    const pairs = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}` as keyof SingleMeal];
      const measure = meal[`strMeasure${i}` as keyof SingleMeal];
      
      if (ingredient && ingredient.trim()) {
        pairs.push({ ingredient, measure: measure || '' });
      }
    }
    return pairs;
  };

  // Format YouTube URL to embed URL if present
  const getYoutubeEmbedUrl = () => {
    if (!meal.strYoutube) return null;
    const videoId = meal.strYoutube.split('v=')[1]?.split('&')[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  const youtubeEmbedUrl = getYoutubeEmbedUrl();
  const ingredientPairs = getIngredientPairs();

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {/* Recipe Navigation */}
      <div className="mb-8 flex items-center">
        <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Home</Link>
        <span className="mx-2 text-gray-400">›</span>
        <Link href={`/category/${meal.strCategory}`} className="text-gray-600 hover:text-gray-900 transition-colors text-sm">{meal.strCategory}</Link>
        <span className="mx-2 text-gray-400">›</span>
        <span className="text-gray-900 text-sm font-medium">{meal.strMeal}</span>
      </div>

      {/* Recipe Header */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-10">
        <div className="md:flex">
          {/* Recipe Image */}
          <div className="md:w-1/2 relative">
            <div className="aspect-square relative">
              <Image
                src={meal.strMealThumb}
                alt={meal.strMeal}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">{meal.strCategory}</span>
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">{meal.strArea} Cuisine</span>
            </div>
          </div>
          
          {/* Recipe Intro */}
          <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{meal.strMeal}</h1>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                  </svg>
                  <span className="text-gray-600">Serves 4-6</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                  </svg>
                  <span className="text-gray-600">45 minutes</span>
                </div>
              </div>
              
              <p className="text-gray-600 mb-6">
                {meal.strInstructions?.split('. ')[0]}. {meal.strInstructions?.split('. ')[1]}.
              </p>
            </div>
            
            <div className="mt-auto">
              {meal.strTags && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {meal.strTags.split(',').map(tag => (
                    <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                      #{tag.trim()}
                    </span>
                  ))}
                </div>
              )}
              
              <a
                href={meal.strSource || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center text-sm ${meal.strSource ? 'text-blue-600 hover:underline' : 'text-gray-400 cursor-not-allowed'}`}
              >
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                </svg>
                {meal.strSource ? 'Original Source' : 'No source available'}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Ingredients Column */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <svg className="w-6 h-6 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
              Ingredients
            </h2>
            <ul className="space-y-4">
              {ingredientPairs.map((pair, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-orange-700 text-xs font-bold mr-3 mt-0.5">
                    {index + 1}
                  </span>
                  <div>
                    <span className="font-medium text-gray-900">{pair.measure} </span>
                    <span className="text-gray-700">{pair.ingredient}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Instructions Column */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <svg className="w-6 h-6 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
              </svg>
              Cooking Instructions
            </h2>
            
            <div className="space-y-6">
              {meal.strInstructions.split(/\r?\n/).filter(step => step.trim()).map((step, index) => (
                <div key={index} className="flex">
                  <div className="mr-4 flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <p className="text-gray-700">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Video Section */}
      {youtubeEmbedUrl && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <svg className="w-6 h-6 text-red-500 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            Watch Video Tutorial
          </h2>
          <div className="aspect-video overflow-hidden rounded-lg">
            <iframe
              src={youtubeEmbedUrl}
              title={`${meal.strMeal} tutorial`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <Link
          href={`/category/${meal.strCategory}`}
          className="px-6 py-3 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors inline-flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path>
          </svg>
          More {meal.strCategory} Recipes
        </Link>
        
        <Link
          href={`/area/${meal.strArea}`}
          className="px-6 py-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors inline-flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          Explore {meal.strArea} Cuisine
        </Link>
      </div>
    </div>
  );
}