import { getCategory } from "./utils/category";
import Image from "next/image";

export default async function CategoryPage() {
  const categories = await getCategory(); 

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Meal Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.length > 0 ? (
          categories.map((category) => (
            <div key={category.idCategory} className="p-4 border rounded-lg shadow-lg">
              <Image
                src={category.strCategoryThumb}
                alt={category.strCategory}
                width={200}
                height={200}
                className="w-full h-48 object-cover rounded-md"
              />
              <h2 className="text-xl font-bold mt-2">{category.strCategory}</h2>
              <p className="text-sm mt-1">{category.strCategoryDescription}</p>
            </div>
          ))
        ) : (
          <p className="text-center col-span-3">No categories found.</p>
        )}
      </div>
    </div>
  );

};


