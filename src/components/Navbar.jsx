import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/userAuthStore";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Blogs", path: "/blogs" },
    { name: "Create", path: "/create" },
    { name: "About", path: "/about" },
  ];

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 left-0 bg-indigo-500 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 py-4 md:py-6 z-50 shadow-md">
      {/* Logo */}
      <a href="/" className="flex items-center gap-2">
        <img
          src="https://prebuiltui.com/logo.svg?p=white&s=white&t=white"
          alt="logo"
          className="h-9"
        />
      </a>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-4 lg:gap-8 text-white">
        {navLinks.map((link, i) => (
          <NavLink
            key={i}
            to={link.path}
            className="group flex flex-col gap-0.5"
          >
            {link.name}
            <div className="bg-white h-0.5 w-0 group-hover:w-full transition-all duration-300" />
          </NavLink>
        ))}
      </div>

      {/* Desktop Right */}
      <div className="hidden md:flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <div className="relative">
              <img
                className="h-10 w-10 rounded-full object-cover"
                src="https://images.unsplash.com/photo-1639628735078-ed2f038a193e?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="userImage1"
              />
              <div className="absolute bottom-2 right-0 h-3.5 w-3.5 rounded-full bg-green-500"></div>
            </div>
            <LogoutButton />
          </>
        ) : (
          <button
            className="bg-white text-black px-8 py-2.5 rounded-full ml-4 transition-all duration-500 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="flex items-center gap-3 md:hidden">
        <svg
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="h-6 w-6 cursor-pointer text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute top-4 right-4"
          onClick={() => setIsMenuOpen(false)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {navLinks.map((link, i) => (
          <NavLink key={i} to={link.path} onClick={() => setIsMenuOpen(false)}>
            {link.name}
          </NavLink>
        ))}

        {isAuthenticated ? (
          <>
            <div className="relative">
              <img
                className="h-10 w-10 rounded-full object-cover"
                src="https://images.unsplash.com/photo-1639628735078-ed2f038a193e?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="userImage1"
              />
              <div className="absolute bottom-2 right-0 h-3.5 w-3.5 rounded-full bg-green-500"></div>
            </div>
            <LogoutButton />
          </>
        ) : (
          <button
            className="bg-black text-white px-8 py-2.5 rounded-full ml-4 transition-all duration-500 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
