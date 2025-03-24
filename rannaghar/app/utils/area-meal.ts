import {  Meal } from "../globals/types";

export async function getMealsByArea(area: string): Promise<Meal[]> {
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;

  try {
    const response = await fetch(apiUrl, {
      cache: "no-store",
    });

    if (!response.ok) throw new Error("Failed to fetch meals");

    const data = await response.json();
    return data.meals || []; // API returns "meals", not "categories"
  } catch (error) {
    console.error("Error fetching meals by category:", error);
    return [];
  }
}
