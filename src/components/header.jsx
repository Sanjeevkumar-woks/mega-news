import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Menu, Badge } from "antd";
import NewsService from "../services/newsService";
import debounce from "lodash/debounce";
import categories from "../utils/categoriesBar";
import { logout } from "../redux/authSlice";
import axios from "axios";

const Header = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:9001/api/notifications/get-notifications-by-user/${user._id}`
        );
        setNotifications(data);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
        setNotifications([]);
      }
    };

    if (user?._id) {
      fetchNotifications();

      // Set up interval for repeated fetch every minute
      const intervalId = setInterval(fetchNotifications, 60000);

      // Clean up the interval on component unmount
      return () => clearInterval(intervalId);
    }
  }, [user?._id]);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (searchTerm) => {
      if (searchTerm) {
        const data = await NewsService.getAllNews({
          page: 1,
          pageSize: 10,
          search: searchTerm,
        });
        setSearchResults(data.newsArticles);
      } else {
        setSearchResults([]);
      }
    }, 500),
    []
  );

  // Search input effect
  useEffect(() => {
    debouncedSearch(search);
    return () => debouncedSearch.cancel();
  }, [search, debouncedSearch]);

  // Scroll effect for header shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Menu items for dropdowns
  const categoriesMenu = (
    <Menu>
      {categories.map((category) => (
        <Menu.Item key={category.id}>
          <Link to={`/category/${category.name}`}>{category.name}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );

  const notificationsMenu = (
    <Menu>
      {notifications.length === 0 ? (
        <Menu.Item disabled>No new notifications</Menu.Item>
      ) : (
        notifications.map((notification) => (
          <Menu.Item key={notification._id}>
            <div
              className="p-2 max-w-[300px] hover:bg-gray-100"
              onClick={() =>
                window.open(notification.link, "_blank", "noopener,noreferrer")
              }
            >
              <p className="font-medium line-clamp-1">{notification.title}</p>
              <p className="text-sm text-gray-600">{notification.message}</p>
              <p className="text-xs text-gray-400">
                {new Date(notification.createdAt).toLocaleDateString()}
              </p>
            </div>
          </Menu.Item>
        ))
      )}
    </Menu>
  );

  const userMenu = (
    <Menu>
      <Menu.Item>
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item onClick={() => dispatch(logout())}>Logout</Menu.Item>
    </Menu>
  );

  return (
    <div>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow border-b border-gray-200 ${
          isScrolled ? "shadow-md" : ""
        }`}
      >
        <div className="flex items-center justify-between px-4 md:px-8 py-4">
          {/* Logo */}
          <div className="cursor-pointer" onClick={() => navigate("/")}>
            <h1 className="text-xl font-bold text-orange-600">
              MEGA<span className="text-black">.news</span>
            </h1>
          </div>
          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center justify-center px-10 py-2 bg-white w-[800px]">
            <div className="flex space-x-6 text-gray-700">
              <Dropdown overlay={categoriesMenu} trigger={["hover"]}>
                <div>
                  <Link
                    className="flex items-center"
                    onClick={(e) => e.preventDefault()}
                  >
                    Categories &nbsp;
                    <i className="fa-solid fa-chevron-down"></i>
                  </Link>
                </div>
              </Dropdown>
              <Link to="/profile" className="hover:text-gray-900">
                Preference
              </Link>
              <Link to="/contact-us" className="hover:text-gray-900">
                Contact Us
              </Link>
              <Link to="/about-us" className="hover:text-gray-900">
                About Us
              </Link>
            </div>
          </nav>

          {/* Search Bar */}
          <div className="flex-1 mx-4 relative">
            <input
              type="text"
              placeholder="Search Anything"
              className="w-full pl-4 pr-10 py-2 rounded-full border border-gray-300 focus:outline-none"
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setSearchResults([]) && setSearch("")}
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <i className="fas fa-search"></i>
            </span>

            {/* Search results dropdown */}
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 w-full bg-white shadow-md overflow-y-auto rounded-md mt-1 z-50 max-h-80">
                {searchResults.map((result) => (
                  <a
                    key={result.id}
                    href={result.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSearch("");
                      setSearchResults([]);
                    }}
                  >
                    {result.title}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4 px-4">
            {!user && (
              <div className="flex space-x-4 items-center justify-center">
                <button
                  className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors duration-300"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors duration-300"
                  onClick={() => navigate("/register")}
                >
                  Register
                </button>
              </div>
            )}
            {/* User Icon with Dropdown */}
            <Dropdown overlay={userMenu} trigger={["hover"]}>
              <div>
                <a className="flex items-center gap-2 cursor-pointer">
                  {user && <p>{user.userName}</p>}
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    {user && (
                      <img
                        src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA0L2pvYjY4Ni0yODUtcC5wbmc.png"
                        alt="User"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </a>
              </div>
            </Dropdown>
            {/* Notification Icon */}
            {user && (
              <Dropdown
                overlay={notificationsMenu}
                trigger={["click"]}
                placement="bottomRight"
              >
                <div className="cursor-pointer">
                  <Badge count={notifications.length} className="text-gray-700">
                    <i className="fa-regular fa-bell text-2xl"></i>
                  </Badge>
                </div>
              </Dropdown>
            )}

            {/* Bookmark Icon */}
            {user && (
              <Link to="/saved-articles">
                <i className="fa-regular fa-bookmark text-2xl cursor-pointer hover:bg-orange-500 rounded-full p-2"></i>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>

          {/* Mobile Menu - visible only on small screens */}
          {isMobileMenuOpen && (
            <div className="md:hidden fixed top-16 right-0 z-50 bg-white shadow-md">
              <nav className="px-4 py-4 space-y-2 flex flex-col items-center">
                <Dropdown overlay={categoriesMenu} trigger={["hover"]}>
                  <Link className="hover:text-gray-900">Categories</Link>
                </Dropdown>
                <Link
                  to="/about-us"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-gray-900"
                >
                  About Us
                </Link>
                <Link
                  to="/contact-us"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-gray-900"
                >
                  Contact Us
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-gray-900"
                >
                  Profile
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>
      <div className="h-16"></div>
    </div>
  );
};

export default Header;
