import { Category } from "../globals/types";

export async function getCategory(): Promise<Category[]> {
  const apiUrl = "https://www.themealdb.com/api/json/v1/1/categories.php";
  try {
    const response = await fetch(apiUrl, {
      cache: "no-store", 
    });

    if (!response.ok) throw new Error("Failed to fetch categories");

    const data = await response.json();

    return data.categories || []; 
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
