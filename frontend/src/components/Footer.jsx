import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTwitterSquare,
} from "react-icons/fa";

const Footer = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000); // Hide after 4 seconds
    e.target.reset(); // Optional: clear input field
  };

  return (
    <footer className="bg-gray-800 text-gray-200 py-10">
      <div className="max-w-7xl mx-auto px-4 md:flex md:justify-between gap-8 flex-wrap">
        {/* Info */}
        <div className="mb-6 md:mb-0 max-w-sm">
          <Link to="/" className="flex gap-3 items-center">
            <img src={Logo} alt="Logo" className="invert w-12 h-12" />
            <h1 className="text-3xl font-bold">Logo</h1>
          </Link>
          <p className="mt-2">
            Sharing insights, tutorials, and ideas on web development and tech.
          </p>
          <p className="mt-2 text-sm">123 Blog St, Style City, NY 10001</p>
          <p className="text-sm">Email: supportteam@blog.com</p>
          <p className="text-sm">Phone: (123) 456-7890</p>
        </div>

        {/* Quick Links */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-xl font-semibold text-white">Quick Links</h3>
          <ul className="mt-2 text-sm space-y-2 text-gray-300">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/blogs" className="hover:text-white">Blogs</Link></li>
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            <li><Link to="/faq" className="hover:text-white">FAQs</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-xl font-semibold text-white">Follow Us</h3>
          <div className="flex space-x-4 mt-3 text-2xl text-gray-400">
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-500"><FaFacebook /></a>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-500"><FaInstagram /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-blue-400"><FaTwitterSquare /></a>
            <a href="https://www.pinterest.com" target="_blank" rel="noreferrer" className="hover:text-red-500"><FaPinterest /></a>
          </div>
        </div>

        {/* Newsletter */}
        <div className="max-w-sm">
          <h3 className="text-xl font-semibold text-white">Stay in the Loop</h3>
          <p className="mt-2 text-sm text-gray-300">
            Subscribe to get special offers, free giveaways, and the best coding tips.
          </p>
          <form
          
            onSubmit={handleSubscribe}
            className="mt-4 flex rounded-md overflow-hidden shadow-sm ring-1 ring-gray-700 focus-within:ring-2 focus-within:ring-red-500"
          >
            <input
              type="email"
              placeholder="Your email address"
              className="w-full p-2 bg-gray-800 text-sm text-gray-200 placeholder-gray-400 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="bg-red-600 text-white px-4 text-sm hover:bg-red-700 transition-colors"
            >
              Subscribe
            </button>
          </form>
          {submitted && (
            <p className="text-green-400 text-sm mt-2">
              ✅ Thanks for subscribing!
            </p>
          )}
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-red-500">Blog</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
