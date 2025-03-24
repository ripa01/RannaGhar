import Link from "next/link";
import { getArea } from "../utils/get-area";

export default async function AreaDropdown() {
    const areas = await getArea();


    return (
        <div className="container  px-4 py-12">
          <h1 className="text-4xl font-bold text-center mb-6">Select Area</h1>
          <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 gap-6">
            {areas.length > 0 ? (
              areas.map((area) => (
                <Link key={area.strArea} href={`/area/${area.strArea}`}>
                  <div className="p-4 border rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition">
                    <h2 className="text-xl font-bold mt-2 text-center">{area.strArea}</h2>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-center text-red-500">No areas found.</p>
            )}
          </div>
        </div>
       
      );
    
}

