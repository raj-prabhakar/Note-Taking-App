import { useState } from "react";
import { ChevronDown, LogOut } from "lucide-react";
import LogoutModal from "./LogoutModal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserProfileSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const userData = localStorage.getItem("userData") || "User";
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Extract user's first letter for the avatar
  const userInitial = userData.charAt(0).toUpperCase();

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    toast.info("You have logged out successfully.");
    setShowLogoutModal(false);
    navigate("/");
  };

  return (
    <div className="relative">
      {/* Logout Modal */}
      {showLogoutModal && (
        <LogoutModal onConfirm={confirmLogout} onCancel={() => setShowLogoutModal(false)} />
      )}

      {/* Profile Section */}
      <div
        className="px-3 py-3 flex items-center space-x-4 text-gray-700 cursor-pointer hover:bg-gray-100 rounded-lg transition-all duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-full font-bold text-lg shadow-md">
          {userInitial}
        </div>
        <span className="text-sm font-medium truncate max-w-[120px]">{userData}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 bottom-14 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
          <button
            className="flex items-center space-x-3 w-full px-4 py-3 text-gray-700 hover:bg-red-50 transition-all duration-200"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 text-red-500" />
            <span className="text-sm font-medium text-red-600">Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfileSection;
