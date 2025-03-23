import { SingleMeal } from "@/app/globals/types";
import { getMealsById } from "@/app/utils/all-recipe";
import Image from "next/image";
import Link from "next/link";

export default async function SingleCategory({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const meals : SingleMeal[] | null = await getMealsById(id);

  if (!meals || meals.length === 0) {
    return <p className="text-center text-red-500">No meals found in this category</p>;
  }
  const meal = meals[0];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-6">{meal.strMeal}</h1>
      
      {/* Meal Image */}
      <div className="flex justify-center">
        <Image
          src={meal.strMealThumb}
          alt={meal.strMeal}
          width={500}
          height={500}
          className="rounded-lg shadow-lg"
        />
      </div>

      {/* Meal Details */}
      <div className="mt-6 text-center">
        <p className="text-lg font-semibold">Category: {meal.strCategory}</p>
        <p className="text-lg font-semibold">Cuisine: {meal.strArea}</p>
      </div>

      {/* Ingredients */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold">Ingredients</h2>
        <ul className="list-disc list-inside mt-2">
          {Array.from({ length: 20 }).map((_, index) => {
            const ingredient = meal[`strIngredient${index + 1}` as keyof SingleMeal];
            const measure = meal[`strMeasure${index + 1}` as keyof SingleMeal];

            return ingredient && ingredient.trim() ? (
              <li key={index} className="text-lg">
                {measure} {ingredient}
              </li>
            ) : null;
          })}
        </ul>
      </div>

      {/* Cooking Instructions */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold">Instructions</h2>
        <p className="text-lg mt-2 whitespace-pre-line">{meal.strInstructions}</p>
      </div>

      {/* YouTube Video */}
      {meal.strYoutube && (
        <div className="mt-6 text-center">
          <h2 className="text-2xl font-bold">Watch Tutorial</h2>
          <a
            href={meal.strYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-medium hover:underline block mt-2"
          >
            Watch on YouTube
          </a>
        </div>
      )}

      {/* Back to Categories */}
      <div className="text-center mt-6">
        <Link href="/" className="text-blue-600 font-medium hover:underline">
          ← Back to Categories
        </Link>
      </div>
    </div>

  );
}
