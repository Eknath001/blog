import React from 'react'
import heroImg from "../assets/blog2.png"
import { Button } from './ui/button'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='px-4 md:px-0 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 animate-gradient-shift'>
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between h-[600px] my-10 md:my-0 py-8 md:py-0'>
        {/* text section */}
        <div className="max-w-2xl text-center md:text-left animate-fade-in-left">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight text-gray-900 dark:text-white">
            Explore the Latest <span className="text-red-600 dark:text-red-400">Tech & Web Trends</span>
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8 text-gray-700 dark:text-gray-300">
            Stay ahead with in-depth articles, tutorials, and insights on web development, digital marketing, and cutting-edge tech innovations.
          </p>
          <div className="flex justify-center md:justify-start space-x-4">
            <Link to={"/dashboard/write-blog"}>
              <Button className="text-lg px-8 py-3 bg-red-600 hover:bg-red-700 text-white shadow-lg transform transition-transform duration-300 hover:scale-105">
                Get Started
              </Button>
            </Link>
            <Link to={"/about"}>
              <Button
                variant="outline"
                className="border-gray-400 dark:border-gray-600 text-gray-800 dark:text-white px-8 py-3 text-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 transform hover:scale-105"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
        {/* image section */}
        <div className='flex items-center justify-center animate-fade-in-right md:ml-8 mt-10 md:mt-0'>
          <img
            src={heroImg}
            alt="Hero illustration of a person reading a blog on a laptop"
            className='md:h-[550px] md:w-[550px] object-contain transform transition-transform duration-500 hover:scale-105'
          />
        </div>
      </div>
    </div>
  )
}

export default Hero
