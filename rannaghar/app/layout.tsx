import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import AreaDropdown from "./components/AreaDropDown";
import CategoryDropdown from "./components/CategoryDropDown";
import SearchField from "./components/SearchField";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Explore & Discover",
  description: "Your comprehensive search and filter platform",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-gray-50">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <Navbar />

        
        
        {/* Search & Dropdown Section */}
        <div className="container mx-auto px-4 py-8 max-w-6xl flex-grow">
          <div className="bg-white border border-gray-100 shadow-xl rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-orange-400 to-red-500 p-6">
              <h2 className="text-2xl text-center font-bold text-white drop-shadow-md">
                Explore & Filter
              </h2>
            </div>
            
            <div className="p-6 space-y-6">
             
              
              <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
                <AreaDropdown />
                <CategoryDropdown />
              </div>
              
              <div className="mt-6 shadow-lg">
                <SearchField />
              </div>
            </div>
          </div>
        </div>

        <main className="flex-grow container mx-auto px-4 max-w-6xl">
          {children}
        </main>

        <footer className="bg-white text-black border py-6 mt-8">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm">&copy; 2025 RannaGhar. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}