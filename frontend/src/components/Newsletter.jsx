import React from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'

const Newsletter = () => {
  return (
    <div className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300"> {/* Added padding and background for overall section */}
      <section className="bg-gray-800 dark:bg-gray-950 p-8 md:p-12 rounded-2xl shadow-xl max-w-3xl mx-auto transform transition-transform duration-500 animate-fade-in-up border border-gray-700 dark:border-gray-700">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-white leading-tight animate-fade-in-down">
            Subscribe to Our <span className="text-red-400">Newsletter</span>
          </h2>
          <p className="text-lg text-gray-300 mb-8 animate-fade-in">
            Get the latest posts, exclusive insights, and exciting updates delivered straight to your inbox. Join our community today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto animate-fade-in-up-stagger">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex h-12 w-full rounded-lg border border-gray-600 bg-gray-900 px-4 py-2 text-base text-gray-100 placeholder:text-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-300 shadow-inner"
            />
            <Button className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg text-base transition-colors duration-300 shadow-lg transform hover:scale-105">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Newsletter
