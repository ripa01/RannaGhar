import {  AreaList } from "../globals/types";

export async function getArea(): Promise<AreaList[]> {
    const apiUrl = "https://www.themealdb.com/api/json/v1/1/list.php?a=list";

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