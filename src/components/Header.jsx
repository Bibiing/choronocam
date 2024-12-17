import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import menu from "../assets/menu.png";
import logo from "../assets/logo-fix.png";
import pipe from "../assets/pipe.png";
import account from "../assets/account.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("user");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const savedUserId = localStorage.getItem("userId");
    if (savedUserId) {
      setUserId(savedUserId);
      fetchUsername(savedUserId);
    }

    // Close dropdown and menu when clicking outside
    const handleClickOutside = (event) => {
      const dropdownElement = document.getElementById("user-dropdown");
      const menuElement = document.getElementById("mobile-menu");

      if (dropdownElement && !dropdownElement.contains(event.target)) {
        setDropdownOpen(false);
      }

      if (menuElement && !menuElement.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchUsername = async (userId) => {
    try {
      const response = await fetch(
        `https://chrono-sand.vercel.app/api/users/${userId}`
      );
      const data = await response.json();
      if (data.username) {
        localStorage.setItem("username", data.username);
        setUsername(data.username);
      } else {
        setUsername("user");
      }
    } catch (error) {
      console.error("Error fetching username:", error);
      setUsername("user");
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setDropdownOpen(false); // Close dropdown when menu is toggled
  };

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  const handleLogout = async () => {
    try {
      const response = await fetch(
        "https://chrono-sand.vercel.app/auth/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (response.ok) {
        localStorage.removeItem("userId");
        localStorage.removeItem("username");
        setUserId(null);
        setUsername("user");
        setDropdownOpen(false);
        setIsMenuOpen(false);
        navigate("/");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const getLinkClass = (path) => {
    return location.pathname === path
      ? "text-[#365486] font-black"
      : "text-[#365486] font-medium hover:underline";
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 px-4 sm:px-5 py-3 sm:py-4 lg:px-[65px] flex justify-between items-center transition-all duration-300 font-poppins ${
        isScrolled
          ? "bg-[#e0f5ff96] rounded-lg mt-2 sm:mt-5 mx-2 sm:mx-5 lg:mx-10 shadow-md"
          : "bg-[#e0f5ff]"
      }`}
      style={{ zIndex: 50 }}
    >
      <div className="flex items-center">
        <img
          src={logo}
          alt="logo"
          className="h-8 sm:h-10 lg:h-12 w-auto max-w-[180px] sm:max-w-[240px]"
        />
      </div>

      {/* Desktop Menu */}
      <nav className="hidden lg:flex items-center space-x-4 xl:space-x-8">
        <Link to="/" className={`${getLinkClass("/")} text-sm xl:text-base`}>
          Home
        </Link>
        <Link
          to="/playbacks"
          className={`${getLinkClass("/playbacks")} text-sm xl:text-base`}
        >
          Playback
        </Link>

        <img src={pipe} alt="separator" className="h-4 xl:h-6" />

        {userId ? (
          <div className="relative" id="user-dropdown">
            <button
              type="button"
              onClick={toggleDropdown}
              className="flex items-center focus:outline-none"
            >
              <span className="text-[#365486] font-medium flex items-center text-sm xl:text-base">
                <img
                  src={account}
                  width="16px"
                  className="mr-1"
                  alt="Account Icon"
                />
                {username}
              </span>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-[#e0f5ff] border border-gray-200 rounded shadow-lg">
                <Link
                  to="/Profile"
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
                  onClick={() => setDropdownOpen(false)}
                >
                  Profile
                </Link>
                <button
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button className="px-3 py-1 xl:px-[18px] xl:py-2 bg-[#365486] rounded-[10px] flex items-center hover:bg-[#2a4675]">
            <Link
              to="/SignUp"
              className="text-white font-medium text-sm xl:text-base"
            >
              Sign up
            </Link>
          </button>
        )}
      </nav>

      {/* Mobile Menu */}
      <div className="lg:hidden flex justify-end">
        <button
          onClick={toggleMenu}
          className="text-[#365486] flex items-center justify-center"
        >
          <img
            src={menu}
            alt="Menu"
            className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
          />
        </button>

        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="absolute top-14 sm:top-16 right-2 sm:right-5 bg-[#d7f1ff] rounded-lg p-4 sm:p-7 flex flex-col space-y-3 sm:space-y-4 lg:hidden shadow-lg min-w-[200px]"
          >
            <Link
              to="/"
              className={`${getLinkClass("/")} text-sm sm:text-base`}
            >
              Home
            </Link>
            <Link
              to="/playbacks"
              className={`${getLinkClass("/playbacks")} text-sm sm:text-base`}
            >
              Playback
            </Link>
            {userId ? (
              <>
                <Link
                  to="/Profile"
                  className={`${getLinkClass(
                    "/Profile"
                  )} block text-sm sm:text-base`}
                  onClick={toggleMenu}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-left text-[#365486] font-medium text-sm sm:text-base"
                >
                  Logout
                </button>
              </>
            ) : (
              <button className="px-3 py-2 sm:px-4 sm:py-2 bg-[#365486] rounded-md mt-2">
                <Link
                  to="/SignUp"
                  className="text-white font-medium text-sm sm:text-base"
                >
                  Sign up
                </Link>
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
