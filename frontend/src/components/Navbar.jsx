import React, { useState } from "react";
import { Button } from "./ui/button";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import Logo from "../assets/logo.png";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import userLogo from "../assets/user.jpg";
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import {
  ChartColumnBig,
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Search,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaEdit, FaMoon, FaRegEdit, FaSun } from "react-icons/fa";
import { toggleTheme } from "@/redux/themeSlice";
import { LiaCommentSolid } from "react-icons/lia";
import ResponsiveMenu from "./ResponsiveMenu";

import useOnlineUsers from "./useOnlineUsers.js";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const { theme } = useSelector((store) => store.theme);
  const [searchTerm, setSearchTerm] = useState("");
  const [openNav, setOpenNav] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const user = false;

  const logoutHandler = async (e) => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/user/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/");
        dispatch(setUser(null));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
    }
  };

  const toggleNav = () => {
    setOpenNav(!openNav);
  };
  const onlineUsers = useOnlineUsers(user?._id);
  return (
    <div className="py-2 fixed w-full dark:bg-gray-800 dark:border-b-gray-600 border-b-gray-300 border-b-2 bg-white z-50 shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-0">
        <span className="text-sm text-gray-600 dark:text-gray-300">
          🟢 {onlineUsers}{onlineUsers !== 1 ? "" : ""} online
        </span>
        {/*<span className="text-sm text-gray-600 dark:text-gray-300">
          🟢 {onlineUsers} user{onlineUsers !== 1 ? "s" : ""} online
        </span>*/}
        {/* logo section */}
        <div className="flex gap-7 items-center">
          <Link to={"/"} className="flex items-center gap-2 group">
            <img
              src={Logo}
              alt="Blog App Logo"
              className="w-7 h-7 md:w-10 md:h-10 dark:invert transition-transform duration-300 group-hover:scale-110"
            />
            <h1 className="font-bold text-3xl md:text-4xl text-gray-900 dark:text-white transition-colors duration-300 group-hover:text-red-500 dark:group-hover:text-red-400">
              The Syntax
            </h1>
          </Link>
          <div className="relative hidden md:block">
            <Input
              type="text"
              placeholder="Search blogs..."
              className="border border-gray-300 dark:border-gray-700 dark:bg-gray-900 bg-gray-100 w-[300px] pr-10 focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-300 text-gray-900 dark:text-gray-100"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              className="absolute right-0 top-0 h-full rounded-l-none bg-red-500 hover:bg-red-600 transition-colors duration-300"
              onClick={handleSearch}
            >
              <Search className="w-5 h-5" />
            </Button>
          </div>
        </div>
        {/* nav section */}
        <nav className="flex md:gap-7 gap-4 items-center">
          <ul className="hidden md:flex gap-7 items-center text-lg font-semibold text-gray-700 dark:text-gray-300">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                `cursor-pointer hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200 ${
                  isActive ? "text-red-500 dark:text-red-400 font-bold" : ""
                }`
              }
            >
              <li>Home</li>
            </NavLink>
            <NavLink
              to={"/blogs"}
              className={({ isActive }) =>
                `cursor-pointer hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200 ${
                  isActive ? "text-red-500 dark:text-red-400 font-bold" : ""
                }`
              }
            >
              <li>Blogs</li>
            </NavLink>
            <NavLink
              to={"/about"}
              className={({ isActive }) =>
                `cursor-pointer hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200 ${
                  isActive ? "text-red-500 dark:text-red-400 font-bold" : ""
                }`
              }
            >
              <li>About</li>
            </NavLink>
            <NavLink
              to={"/contact"}
              className={({ isActive }) =>
                `cursor-pointer hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200 ${
                  isActive ? "text-red-500 dark:text-red-400 font-bold" : ""
                }`
              }
            >
              <li>Contact</li>
            </NavLink>
          </ul>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => dispatch(toggleTheme())}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 text-gray-800 dark:text-gray-100"
            >
              {theme === "light" ? (
                <FaMoon className="w-5 h-5" />
              ) : (
                <FaSun className="w-5 h-5" />
              )}
            </Button>
            {user ? (
              <div className="flex gap-3 items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer border-2 border-transparent hover:border-red-500 transition-colors duration-200">
                      <AvatarImage
                        src={user.photoUrl || userLogo}
                        alt="User Avatar"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
                    <DropdownMenuLabel className="text-gray-900 dark:text-white">
                      My Account
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        onClick={() => navigate("/dashboard/profile")}
                        className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-150"
                      >
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => navigate("/dashboard/your-blog")}
                        className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-150"
                      >
                        <ChartColumnBig className="mr-2 h-4 w-4" />
                        <span>Your Blog</span>
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => navigate("/dashboard/comments")}
                        className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-150"
                      >
                        <LiaCommentSolid className="mr-2 h-4 w-4" />
                        <span>Comments</span>
                        <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => navigate("/dashboard/write-blog")}
                        className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-150"
                      >
                        <FaRegEdit className="mr-2 h-4 w-4" />
                        <span>Write Blog</span>
                        <DropdownMenuShortcut>⌘W</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
                    <DropdownMenuItem
                      onClick={logoutHandler}
                      className="hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-400 cursor-pointer transition-colors duration-150"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  className="hidden md:block bg-red-500 hover:bg-red-600 text-white transition-colors duration-300 shadow-md"
                  onClick={logoutHandler}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="md:flex gap-2 items-center">
                <Link to={"/login"}>
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-300 shadow-md">
                    Login
                  </Button>
                </Link>
                <Link className="hidden md:block" to={"/signup"}>
                  <Button
                    variant="outline"
                    className="border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-300 shadow-md"
                  >
                    Signup
                  </Button>
                </Link>
              </div>
            )}
          </div>
          {openNav ? (
            <HiMenuAlt3
              onClick={toggleNav}
              className="w-8 h-8 md:hidden text-gray-800 dark:text-gray-100 cursor-pointer transition-transform duration-200 hover:scale-110"
            />
          ) : (
            <HiMenuAlt1
              onClick={toggleNav}
              className="w-8 h-8 md:hidden text-gray-800 dark:text-gray-100 cursor-pointer transition-transform duration-200 hover:scale-110"
            />
          )}
        </nav>
        <ResponsiveMenu
          openNav={openNav}
          setOpenNav={setOpenNav}
          logoutHandler={logoutHandler}
        />
      </div>
    </div>
  );
};

export default Navbar;
