import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X, LogOut } from "lucide-react"; 
import logo from '../assets/Logo.png'

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Forum", path: "/forum" },
    { name: "Chat", path: "/chat" },
  ];

  const isActive = (path) => location.pathname === path;
  const isLoggedIn = !!JSON.parse(localStorage.getItem("user"))?.token;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="VillageConnect Logo" className="h-10 w-12 rounded object-cover" />

              <span className="text-white text-xl font-bold ml-2">VillageConnect</span>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6 items-center">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-white font-medium transition duration-300 hover:text-yellow-300 border-b-2 ${isActive(link.path) ? "border-yellow-300" : "border-transparent"
                  }`}
              >
                {link.name}
              </Link>
            ))}

            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="ml-4 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-sm flex items-center cursor-pointer"
              >
                <LogOut size={16} className="mr-1" />
                Logout
              </button>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white focus:outline-none"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-blue-700 px-4 py-2 space-y-2">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`block text-white font-medium transition duration-300 hover:text-yellow-300 border-b ${isActive(link.path) ? "border-yellow-300" : "border-transparent"
                } pb-1`}
            >
              {link.name}
            </Link>
          ))}

          {isLoggedIn && (
            <button
              onClick={() => {
                setMenuOpen(false);
                handleLogout();
              }}
              className="block w-full text-left text-white font-medium hover:text-red-300 transition duration-300 "
            >
              <span className="flex items-center ">
                <LogOut size={16} className="mr-1 " />
                Logout
              </span>
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
