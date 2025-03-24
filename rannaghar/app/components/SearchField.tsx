"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchField() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim() !== "") {
      router.push(`/search/${query.trim()}`);
    }
  };

  return (
    <div className="flex items-center gap-3 p-4 bg-gray-50 shadow-lg rounded-lg mt-6">
      <Search className="w-5 h-5 text-gray-500" />
      <input
        type="text"
        placeholder="Search for food or category..."
        className="w-full p-2 outline-none text-gray-700"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleSearch} 
      />
    </div>
  );
}
