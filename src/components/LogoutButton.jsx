import React from "react";
import { useAuthStore } from "../store/userAuthStore";

const LogoutButton = () => {
  const logout = useAuthStore((state) => state.logout);
  const handleLogout = async () => {
    await logout();
    console.log("Logged Out");
  };
  return (
    <button
      onClick={handleLogout}
      className="flex items-center justify-center gap-1 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm"
    >
      {/* Logout Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
        />
      </svg>
      Logout
    </button>
  );
};

export default LogoutButton;
