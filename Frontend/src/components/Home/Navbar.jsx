import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { logout } from "../../redux/authSlice";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const { user } = useSelector((store) => store.auth);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
     // This will log the updated state after the change
  }, [isOpen]); // This will run whenever isOpen changes
  

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(logout());
        toast.success(res.data.message);
        navigate("/login"); // Redirect to login page after logout
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
      console.log(error);
    }
  };

  const shouldShowNavbar = () => {
    return ["/", "/login", "/signup"].includes(location.pathname);
  };

  const handleLinkClick = () => {
    setIsOpen(false); // Close the mobile menu after clicking a link
  };

  return (
    shouldShowNavbar() && (
      <nav className="bg-[#080101] fixed top-0 left-0 w-full font-poppins text-white shadow-md shadow-gray-800/10 z-50">
        <div className="container max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Left - Logo */}
          <div className="w-32 sm:w-52">
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
          </div>

          {/* Middle - Tabs */}
          <div
            className={`hidden md:flex space-x-6 lg:space-x-8 justify-center flex-grow`}
            ref={menuRef}
          >
            <Link to="/" className="hover:text-blue-500" onClick={handleLinkClick}>
              Home
            </Link>
            <Link to="/explore" className="hover:text-blue-500" onClick={handleLinkClick}>
              Explore
            </Link>
            <Link to="/mentors" className="hover:text-blue-500" onClick={handleLinkClick}>
              Mentorship
            </Link>
            <Link
              to="https://chatbot-last-bf47.onrender.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500"
              onClick={handleLinkClick}
            >
              Ask
            </Link>
            <Link to="/about" className="hover:text-blue-500" onClick={handleLinkClick}>
              Why CareerCompass
            </Link>
          </div>

          {/* Right - Conditional Login/Profile */}
          <div className="space-x-2 sm:space-x-4 flex items-center ml-auto">
            {user ? (
              <>
                <Link to="/profile" className="hover:text-blue-500">
                  <img
                    src={user?.profilePicture} // Replace with user's profile image URL
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                </Link>
                <button
                  onClick={logoutHandler}
                  className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-500">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
                >
                  Sign Up
                </Link>
              </>
            )}

            {/* Hamburger Icon */}
            <div className="md:hidden flex ml-auto">
              <button onClick={toggleMenu} aria-label="Toggle menu">
                <FontAwesomeIcon icon={isOpen ? faTimes : faBars} size="lg" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden ${isOpen ? "block" : "hidden"} bg-[#080101] transition-all duration-300 ease-in-out overflow-hidden`}
        >
          <div className="flex flex-col items-start py-4 px-4">
            <Link to="/" className="hover:text-blue-500 py-2" onClick={handleLinkClick}>
              Home
            </Link>
            <Link to="/explore" className="hover:text-blue-500 py-2" onClick={handleLinkClick}>
              Explore
            </Link>
            <Link to="/mentors" className="hover:text-blue-500 py-2" onClick={handleLinkClick}>
              Mentorship
            </Link>
            <Link
              to="https://chatbot-last-bf47.onrender.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 py-2"
              onClick={handleLinkClick}
            >
              Ask
            </Link>
            <Link to="/about" className="hover:text-blue-500 py-2" onClick={handleLinkClick}>
              Why CareerCompass
            </Link>
          </div>
        </div>
      </nav>
    )
  );
};

export default Navbar;
