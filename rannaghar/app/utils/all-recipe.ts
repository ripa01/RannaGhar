import { SingleMeal } from "../globals/types";

export async function getMealsById(id: string): Promise<SingleMeal[]> {
  const mealId = Number(id); // Convert string to number
  if (isNaN(mealId)) {
    console.error("Invalid meal ID:", id);
    return [];
  }

  const apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

  try {
    const response = await fetch(apiUrl, {
      cache: "no-store",
    });

    if (!response.ok) throw new Error("Failed to fetch meals");

    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error("Error fetching meal by ID:", error);
    return [];
  }
}
