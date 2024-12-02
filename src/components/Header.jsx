import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import menu from "../assets/menu.svg";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("user"); // Default value "user"
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Added to track current location

  useEffect(() => {
    // Handle scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Get userId from localStorage
    const savedUserId = localStorage.getItem("userId");
    if (savedUserId) {
      setUserId(savedUserId);
      fetchUsername(savedUserId);
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const fetchUsername = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/${userId}`);
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
  };

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8080/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        // Remove userId from localStorage and update state
        localStorage.removeItem("userId");
        localStorage.removeItem("username");
        setUserId(null);
        setUsername("user");

        // Close dropdown and redirect to Home
        setDropdownOpen(false);
        navigate("/");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Function to determine active link style
  const getLinkClass = (path) => {
    return location.pathname === path
      ? "text-[#365486] font-black "
      : "text-[#365486] font-medium hover:underline";
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 px-5 py-5 lg:px-[65px] flex justify-between items-center transition-all duration-300 font-poppins ${
        isScrolled
          ? "bg-[#e0f5ff96] rounded-lg mt-5 mx-5 lg:mx-10 shadow-md"
          : "bg-[#e0f5ff]"
      }`}
      style={{ zIndex: 10 }}
    >
      <div className="flex items-center space-x-8">
        <img
          src="./src/assets/logo-fix.svg"
          alt="logo"
          className="h-10 lg:h-12 w-auto max-w-[240px]"
        />
      </div>

      {/* Desktop Menu */}
      <nav className="hidden lg:flex items-center space-x-8">
        <Link to="/" className={getLinkClass("/")}>
          Home
        </Link>
        <Link to="/playbacks" className={getLinkClass("/playbacks")}>
          Playback
        </Link>

        <img src="./src/assets/pipe.svg" alt="separator" className="h-6" />

        {userId ? (
          <div className="flex">
            <button type="button" onClick={toggleDropdown}>
              <span className="text-[#365486] font-medium flex items-center">
                <img
                  src="src/assets/account.svg"
                  width="16px"
                  className="mr-1"
                  alt="Account Icon"
                />
                {username}
              </span>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-7 w-32 bg-[#e0f5ff] border border-gray-200 rounded shadow-lg">
                <Link
                  to="/Profile"
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Profile
                </Link>
                <button
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button className="px-[18px] py-2 bg-[#365486] rounded-[10px] flex items-center hover:bg-[#2a4675]">
            <Link to="/SignUp" className="text-white font-medium">
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
          <img src={menu} alt="Menu" className="w-8 h-8 object-contain" />
        </button>

        {isMenuOpen && (
          <div className="absolute top-16 right-5 bg-[#d7f1ff] rounded-lg p-7 flex flex-col space-y-4 lg:hidden shadow-lg">
            <Link to="/" className={getLinkClass("/")}>
              Home
            </Link>
            <Link to="/playbacks" className={getLinkClass("/playbacks")}>
              Playback
            </Link>
            {userId ? (
              <>
                <Link
                  to="/Profile"
                  className={`${getLinkClass("/Profile")} block`}
                  onClick={toggleMenu} // Close menu when navigating
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-left text-[#365486] font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <button className="px-4 py-2 bg-[#365486] rounded-md mt-2">
                <Link to="/SignUp" className="text-white font-medium">
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
