import { Meal } from "@/app/globals/types";
import { getMealsByCategory } from "@/app/utils/single-category";
import Image from "next/image";
import Link from "next/link";

export default async function SingleCategory({ params }: { params: Promise<{ strCategory: string }> }) {
  const { strCategory } = await params;
  const meals: Meal[] | null = await getMealsByCategory(strCategory);

  if (!meals || meals.length === 0) {
    return <p className="text-center text-red-500">No meals found in this category</p>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-6">{strCategory} Meals</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {meals.map((meal) => (
          <Link key={meal.idMeal} href={`/meal/${meal.idMeal}`}>
            <div className="p-4 border rounded-lg shadow-lg">
                <Image
                                  src={meal.strMealThumb}
                                  alt={meal.strMeal}
                                  width={200}
                                  height={200}
                                  className="w-full h-48 object-cover rounded-md"
                                />
              <h2 className="text-xl font-bold mt-2">{meal.strMeal}</h2>
            </div>
          </Link>
        ))}
      </div>
      <div className="text-center mt-6">
        <Link href="/" className="text-blue-600 font-medium hover:underline">
          ← Back to Categories
        </Link>
      </div>
    </div>
  );
}
