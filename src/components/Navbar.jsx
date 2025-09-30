import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/userAuthStore";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
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
        <h1 className="font-semibold text-4xl text-white logo">Blogify</h1>
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
            <div className="relative" onClick={() => navigate("/profile")}>
              <img
                className="h-10 w-10 rounded-full object-cover"
                src={
                  user.profileImage
                    ? user.profileImage
                    : "https://imgs.search.brave.com/nVY-jJFjRjOlbUQyADij2hQvQkv0INDwhVuG_ZdP-OU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9mdW5ueS1jYXJ0/b29uLW1hbi13aXRo/LXJlZC1iZWFyZC1t/dXN0YWNoZS12ZWN0/b3ItaWxsdXN0cmF0/aW9uXzk5NDQxOC0x/MDE1MzcuanBnP3Nl/bXQ9YWlzX2luY29t/aW5nJnc9NzQwJnE9/ODA"
                }
                alt="userImage1"
              />
              <div className="absolute -bottom-0.5 right-0 h-3.5 w-3.5 rounded-full bg-green-500"></div>
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
            <div className="relative" onClick={() => navigate("/profile")}>
              <img
                className="h-10 w-10 rounded-full object-cover"
                src={
                  user.profileImage
                    ? user.profileImage
                    : "https://imgs.search.brave.com/nVY-jJFjRjOlbUQyADij2hQvQkv0INDwhVuG_ZdP-OU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9mdW5ueS1jYXJ0/b29uLW1hbi13aXRo/LXJlZC1iZWFyZC1t/dXN0YWNoZS12ZWN0/b3ItaWxsdXN0cmF0/aW9uXzk5NDQxOC0x/MDE1MzcuanBnP3Nl/bXQ9YWlzX2luY29t/aW5nJnc9NzQwJnE9/ODA"
                }
              />
              <div className="absolute -bottom-0.5 right-0 h-3.5 w-3.5 rounded-full bg-green-500"></div>
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
