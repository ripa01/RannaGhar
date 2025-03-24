import { SingleMeal } from "../globals/types";

export async function search(input: string): Promise<SingleMeal[]> {
  if (!input.trim()) return []; // Avoid unnecessary API calls for empty input

  const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(input)}`;

  try {
    const response = await fetch(apiUrl, { cache: "no-store" });

    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);

    const data = await response.json();
    return data.meals || []; // Return an empty array if no meals found
  } catch (error) {
    console.error("Error fetching meals:", error);
    return [];
  }
}

