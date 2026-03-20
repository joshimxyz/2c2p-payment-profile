"use client";

import { useState } from "react";
import { Copy, User, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Header = ({ setOpenLoginModal }: { setOpenLoginModal: () => void }) => {
  const { isLoggedIn, user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  // Helper to get initials (e.g., Joshim Uddin -> JU)
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
  };

  return (
    <div className="flex items-center justify-between p-3 border-b border-gray-100 bg-white relative">
      <div className="flex items-center gap-3">
        <button className="text-gray-500 hover:text-[#0088FF]">
          <i className="fas fa-arrow-left"></i>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 flex items-center justify-center">
            <img
              alt="Thai Airways"
              src="/images/thai-air.png"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h1 className="font-semibold text-[14px]">Thai Airways</h1>
            <div className="flex items-center gap-1 text-[9px]">
              <span className="text-[#64748B] font-medium">
                Trx ID: TG-260316F39...
              </span>
              <Copy className="w-3 h-3 cursor-pointer text-[#64748B] hover:text-[#64748B]/50" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 font-medium">
        {isLoggedIn && user ? (
          <div className="relative">
            {/* Avatar Circle */}
            <div
              className="w-[32px] h-[32px] text-sm rounded-full bg-[#d5e7f7] text-[#0074D4] flex items-center justify-center font-bold select-none cursor-pointer hover:ring-2 hover:ring-blue-100 transition-all"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {getInitials(user.name)}
            </div>

            {/* Logout Dropdown Popup */}
            {showDropdown && (
              <>
                {/* Backdrop to close when clicking outside */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowDropdown(false)}
                />

                <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                  <div className="p-4 flex items-center gap-3 border-b border-gray-50">
                    <div className="w-12 h-12 rounded-full bg-[#d5e7f7] text-[#0074D4] flex items-center justify-center font-bold text-lg">
                      {getInitials(user.name)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-900">
                        {user.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {user.phone}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 py-4 text-[#D32F2F] hover:bg-red-50 transition-colors font-semibold text-sm"
                  >
                    <LogOut className="w-4 h-4" />
                    Log Out
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <button
            className="flex items-center gap-1 cursor-pointer hover:text-[#0088FF] transition-colors"
            onClick={setOpenLoginModal}
          >
            <User className="w-4 h-4" />
            <span className="text-[14px]">Login</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
