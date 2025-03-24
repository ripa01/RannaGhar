import Link from "next/link";
import {  ChevronDown, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { getCategory } from "../utils/category-list";


export default async function CategoryDropdown() {
  const categories = await getCategory();

  return (

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="  max-w-md bg-white border-gray-200 hover:bg-gray-50 hover:border-blue-200">
              <MapPin className="mr-2 h-4 w-4 text-blue-500" />
              <span>Select a category</span>
              <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="  max-w-md max-h-[300px] overflow-y-auto">
            {categories.map((category) => (
              <DropdownMenuItem key={category.strCategory} className="cursor-pointer flex items-center justify-between">
             
                <Link href={`/category/${category.strCategory}`} className="flex items-center justify-between  ">
                  <span>{category.strCategory}</span>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
   
  )
  
  
}


