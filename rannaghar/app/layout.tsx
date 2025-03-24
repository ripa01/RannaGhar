import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import AreaDropdown from "./components/AreaDropDown";
import CategoryDropdown from "./components/CategoryDropDown";
import { Search } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />

        {/* Search & Dropdown Section */}
        <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="bg-white shadow-lg p-6 rounded-lg items-center">
            <h2 className="text-lg text-center font-semibold text-gray-800 mb-3">Filter by Area & Category</h2>
            <div className="flex flex-wrap justify-center items-center md:justify-center gap-4 ">
              <AreaDropdown />
              <CategoryDropdown />

        
            </div>
              <div className="flex items-center gap-3 p-4 bg-white shadow-md rounded-lg mt-6">
            <Search className="w-5 h-5 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search for food or category..." 
              className="w-full p-2 outline-none text-gray-700"
            />
          </div>
          </div>
         
        </div>

        {children}
      </body>
    </html>
  );
}
