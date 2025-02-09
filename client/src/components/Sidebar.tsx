import React from "react";
import { Home, Star } from "lucide-react";
import UserProfileSection from "./UserProfileSection";

interface SidebarProps {
  showFavorites: boolean;
  setShowFavorites: (show: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ showFavorites, setShowFavorites }) => (
  <div className="w-64 ml-4 mt-2 bg-white border border-gray-300 rounded-xl p-4 shadow-sm flex flex-col justify-between min-h-screen">
    {/* Logo & Title */}
    <div>
      <div className="flex items-center space-x-3 px-2">
        <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center shadow-md">
          <span className="text-white font-bold text-lg">AI</span>
        </div>
        <span className="text-xl font-semibold text-gray-800">AI Notes</span>
      </div>

      {/* Navigation */}
      <div className="mt-6 space-y-2">
        <button
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg w-full transition-all duration-200 ${
            !showFavorites
              ? "bg-purple-100 text-purple-600 font-medium"
              : "text-gray-500 hover:bg-gray-100"
          }`}
          onClick={() => setShowFavorites(false)}
        >
          <Home className={`w-5 h-5 ${!showFavorites ? "text-purple-600" : "text-gray-500"}`} />
          <span className="text-base">Home</span>
        </button>

        <button
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg w-full transition-all duration-200 ${
            showFavorites
              ? "bg-yellow-100 text-yellow-600 font-medium"
              : "text-gray-400 hover:bg-gray-100"
          }`}
          onClick={() => setShowFavorites(!showFavorites)}
        >
          <Star className={`w-5 h-5 ${showFavorites ? "text-yellow-600" : "text-gray-400"}`} />
          <span className="text-base">Favorites</span>
        </button>
      </div>
    </div>

    {/* User Profile Section */}
    <div className="ml-4  mb-2">
    <UserProfileSection/>
    </div>
  </div>
);

export default Sidebar;
