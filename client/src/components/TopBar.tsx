import React from "react";
import { Search, Filter } from "lucide-react";

interface TopBarProps {
  searchTerm: string;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSortToggle: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ searchTerm, onSearch, onSortToggle }) => (
  <div className="p-4 flex items-center justify-between bg-white rounded-full">
    {/* Search Input */}
    <div className="relative flex-1">
      <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300" />
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={onSearch}
        className="w-full pl-12 pr-4 py-2 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm text-gray-600"
      />
    </div>

    {/* Sort Button */}
    <button
      onClick={onSortToggle}
      className="ml-2 flex items-center space-x-2 bg-white px-4 py-2 rounded-full  border border-gray-200 hover:bg-gray-100 transition"
    >
      <Filter className="w-5 h-5 text-gray-500" />
      <span className="text-sm font-medium text-gray-600">Sort</span>
    </button>
  </div>
);

export default TopBar;
