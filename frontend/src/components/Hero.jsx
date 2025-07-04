//import React from 'react'
//import heroImg from "../assets/blog2.png"
//import { Button } from './ui/button'
//import { Link } from 'react-router-dom'
//
//const Hero = () => {
//  return (
//    <div className='px-4 md:px-0 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 animate-gradient-shift'>
//      <div className='max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between h-[600px] my-10 md:my-0 py-8 md:py-0'>
//        {/* text section */}
//        <div className="max-w-2xl text-center md:text-left animate-fade-in-left">
//          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight text-gray-900 dark:text-white">
//            Explore the Latest <span className="text-red-600 dark:text-red-400">Tech & Web Trends</span>
//          </h1>
//          <p className="text-lg md:text-xl opacity-90 mb-8 text-gray-700 dark:text-gray-300">
//            Stay ahead with in-depth articles, tutorials, and insights on web development, digital marketing, and cutting-edge tech innovations.
//          </p>
//          <div className="flex justify-center md:justify-start space-x-4">
//            <Link to={"/dashboard/write-blog"}>
//              <Button className="text-lg px-8 py-3 bg-red-600 hover:bg-red-700 text-white shadow-lg transform transition-transform duration-300 hover:scale-105">
//                Get Started
//              </Button>
//            </Link>
//            <Link to={"/about"}>
//              <Button
//                variant="outline"
//                className="border-gray-400 dark:border-gray-600 text-gray-800 dark:text-white px-8 py-3 text-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 transform hover:scale-105"
//              >
//                Learn More
//              </Button>
//            </Link>
//          </div>
//        </div>
//        {/* image section */}
//        <div className='flex items-center justify-center animate-fade-in-right md:ml-8 mt-10 md:mt-0'>
//          <img
//            src={heroImg}
//            alt="Hero illustration of a person reading a blog on a laptop"
//            className='md:h-[550px] md:w-[550px] object-contain transform transition-transform duration-500 hover:scale-105'
//          />
//        </div>
//      </div>
//    </div>
//  )
//}
//
//export default Hero

import React, { useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroImg from "../assets/blog2.png";

// 🔮 MagicText shuffle effect
const MagicText = ({ children }) => {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const spanRef = useRef(null);
  let interval = useRef(null);

  const shuffle = (text) => {
    let iteration = 0;
    clearInterval(interval.current);

    interval.current = setInterval(() => {
      if (!spanRef.current) return;

      spanRef.current.innerText = text
        .split("")
        .map((letter, index) => {
          if (index < iteration) return text[index];
          if (text[index] === " ") return " ";
          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");

      if (iteration >= text.length) {
        clearInterval(interval.current);
      }

      iteration += 1 / 5;
    }, 50);
  };

  useEffect(() => () => clearInterval(interval.current), []);

  return (
    <span
      onMouseEnter={() => shuffle(children)}
      className="cursor-pointer font-semibold"
      ref={spanRef}
    >
      {children}
    </span>
  );
};

const headingWords = ["Explore", "the", "Latest", "Tech", "&", "Web", "Trends"];

const wordAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08 },
  }),
};

const Hero = () => {
  return (
    <div className="px-4 md:px-0 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between h-[600px] py-10">
        {/* Text Section */}
        <motion.div
          className="max-w-2xl text-center md:text-left"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {/* Animated Color Cycle Heading */}
          <h1 className="text-4xl md:text-6xl font-bold mb-4 flex flex-wrap gap-2 justify-center md:justify-start">
            {headingWords.map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={wordAnimation}
                className="animate-color-cycle"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* MagicText Paragraph */}
          <motion.p
            className="text-lg md:text-xl text-gray-700 dark:text-gray-300 opacity-90 mb-6 max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
          >
            Stay ahead with in-depth{" "}
            <span className="group text-blue-600 relative">
              <MagicText>articles</MagicText>
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </span>
            ,{" "}
            <span className="group text-green-600 relative">
              <MagicText>tutorials</MagicText>
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-green-600 transition-all group-hover:w-full"></span>
            </span>
            , and{" "}
            <span className="group text-pink-500 relative">
              <MagicText>insights</MagicText>
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-pink-500 transition-all group-hover:w-full"></span>
            </span>{" "}
            on{" "}
            <span className="text-blue-500 hover:scale-105 transition-transform inline-block">
              <MagicText>web development</MagicText>
            </span>
            ,{" "}
            <span className="text-green-500 hover:scale-105 transition-transform inline-block">
              <MagicText>digital marketing</MagicText>
            </span>{" "}
            &{" "}
            <span className="text-red-500 hover:scale-105 transition-transform inline-block">
              <MagicText>tech innovations</MagicText>
            </span>
            .
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/dashboard/write-blog">
                <Button className="text-lg px-8 py-3 bg-red-600 hover:bg-red-700 text-white shadow-lg transform transition-transform duration-300 hover:scale-105">
                  🚀 Get Started
                </Button>
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/about">
                <Button
                  variant="outline"
                  className="text-lg px-8 py-3 border-gray-300 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  📘 Learn More
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          className="flex items-center justify-center mt-10 md:mt-0"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: [20, 10, 20] }}
          transition={{ delay: 1.4, duration: 5, repeat: Infinity }}
        >
          <img
            src={heroImg}
            alt="Hero Illustration"
            className="md:h-[550px] md:w-[550px] object-contain rounded-2xl"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
