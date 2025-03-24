import Link from "next/link";
import { getArea } from "../utils/get-area";

export default async function AreaDropdown() {
  const areas = await getArea();
  
  return (
    <div className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg px-4 py-6 mb-8">
       <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-3 text-gray-800">Explore Meal By Region</h1>
      </div>

      
      {areas.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {areas.map((area) => (
            <Link 
              key={area.strArea} 
              href={`/area/${area.strArea}`}
              className="group"
            >
              <div className="bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-blue-200 h-full flex items-center justify-center">
                <div className="flex flex-col items-center">
                  {/* <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 mb-2 group-hover:bg-blue-200 transition-colors">
                    {area.strArea.charAt(0)}
                  </span> */}
                  <h3 className="text-gray-700 font-medium text-sm group-hover:text-blue-600 transition-colors">
                    {area.strArea}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-red-100">
          <div className="flex items-center justify-center space-x-3">
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
            <p className="text-red-500 font-medium">No areas found. Please try again later.</p>
          </div>
        </div>
      )}
    </div>
  );
}