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
    <footer className="bg-gray-800 dark:bg-gray-950 text-gray-200 dark:text-gray-300 py-12 transition-colors duration-300 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 md:flex md:justify-between gap-10 flex-wrap">
        {/* Info */}
        <div className="mb-8 md:mb-0 max-w-sm animate-fade-in-up">
          <Link to="/" className="flex gap-3 items-center group">
            <img src={Logo} alt="Blog App Logo" className="invert w-12 h-12 transition-transform duration-300 group-hover:scale-110" />
            <h1 className="text-3xl font-bold text-white transition-colors duration-300 group-hover:text-red-400">yourLogo</h1>
          </Link>
          <p className="mt-4 text-base leading-relaxed">
            Sharing insights, cutting-edge tutorials, and innovative ideas on web development, tech trends, and digital creativity.
          </p>
          <p className="mt-3 text-sm">yourBlog Pune,Maharashtra City, NY 10001</p>
          <p className="text-sm">Email: <a href="mailto:supportteam@blog.com" className="hover:underline text-red-400">supportteam@blog.com</a></p>
          <p className="text-sm">Phone: <a href="tel:+11234567890" className="hover:underline text-red-400">(123) 456-7890</a></p>
        </div>

        {/* Quick Links */}
        <div className="mb-8 md:mb-0 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="text-base space-y-3 text-gray-300">
            <li><Link to="/" className="hover:text-white transition-colors duration-200 flex items-center group"><span className="mr-2 text-red-400 group-hover:translate-x-1 transition-transform duration-200">›</span>Home</Link></li>
            <li><Link to="/blogs" className="hover:text-white transition-colors duration-200 flex items-center group"><span className="mr-2 text-red-400 group-hover:translate-x-1 transition-transform duration-200">›</span>Blogs</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors duration-200 flex items-center group"><span className="mr-2 text-red-400 group-hover:translate-x-1 transition-transform duration-200">›</span>About Us</Link></li>
           <li><Link to="/contact" className="hover:text-white transition-colors duration-200 flex items-center group"><span className="mr-2 text-red-400 group-hover:translate-x-1 transition-transform duration-200">›</span>Contact</Link></li>
          {/*  <li><Link to="/privacy" className="hover:text-white transition-colors duration-200 flex items-center group"><span className="mr-2 text-red-400 group-hover:translate-x-1 transition-transform duration-200">›</span>Privacy Policy</Link></li>*/}
          </ul>
        </div>

        {/* Social Media */}
        <div className="mb-8 md:mb-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-xl font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-5 mt-3 text-3xl text-gray-400">
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-500 transform hover:scale-125 transition-all duration-300" aria-label="Facebook"><FaFacebook /></a>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-500 transform hover:scale-125 transition-all duration-300" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-blue-400 transform hover:scale-125 transition-all duration-300" aria-label="Twitter"><FaTwitterSquare /></a>
            <a href="https://www.pinterest.com" target="_blank" rel="noreferrer" className="hover:text-red-500 transform hover:scale-125 transition-all duration-300" aria-label="Pinterest"><FaPinterest /></a>
          </div>
        </div>

        {/* Newsletter */}
        <div className="max-w-sm animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <h3 className="text-xl font-semibold text-white mb-4">Stay in the Loop</h3>
          <p className="mt-2 text-base text-gray-300">
            Subscribe to get exclusive content, free giveaways, and the best coding tips delivered to your inbox.
          </p>
          <form
          
            onSubmit={handleSubscribe}
            className="mt-6 flex rounded-lg overflow-hidden shadow-md ring-1 ring-gray-700 focus-within:ring-2 focus-within:ring-red-500 transition-all duration-300"
          >
            <input
              type="email"
              placeholder="Your email address"
              className="w-full p-3 bg-gray-700 text-base text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-0"
              required
            />
            <button
              type="submit"
              className="bg-red-600 text-white px-5 text-base font-semibold hover:bg-red-700 transition-colors duration-300"
            >
              Subscribe
            </button>
          </form>
          {submitted && (
            <p className="text-green-400 text-sm mt-3 animate-fade-in-out">
              ✅ Thanks for subscribing! You're all set.
            </p>
          )}
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-12 border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-red-500 font-semibold">Blog</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
