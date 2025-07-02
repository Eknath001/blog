import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogCard from './BlogCard';
import BlogCardList from './BlogCardList';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useNavigate } from 'react-router-dom';
import { setBlog } from '@/redux/blogSlice';
import axios from 'axios';

const tags = [
    {
        category: "Blogging"
    },
    {
        category: "Programming"
    },
    {
        category: "Web Development"
    },
    {
        category: "Digital Marketing"
    },
    {
        category: "Cooking"
    },
    {
        category: "Photography"
    },
    {
        category: "Sports"
    },
]



const RecentBlog = () => {
    const { blog } = useSelector(store => store.blog)
    const [category, setCategory] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    console.log(blog);

    useEffect(() => {
        const getAllPublsihedBlogs = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/v1/blog/get-published-blogs`, { withCredentials: true })
                if (res.data.success) {
                    dispatch(setBlog(res.data.blogs))
                }
            } catch (error) {
                console.log(error);

            }
        }
        getAllPublsihedBlogs()
    }, [])

    return (
        <div className='bg-gray-100 dark:bg-gray-900 pb-16 pt-12 transition-colors duration-300'>
            <div className='max-w-6xl mx-auto flex flex-col space-y-4 items-center mb-10'>
                <h1 className='text-4xl md:text-5xl font-extrabold pt-10 text-gray-900 dark:text-white animate-fade-in-down'>Recent Blogs</h1>
                <hr className='w-24 text-center border-2 border-red-500 rounded-full animate-scale-in' />
            </div>
            <div className='max-w-7xl mx-auto flex flex-col md:flex-row gap-8 px-4 md:px-0'>
                {/* Blog List Section */}
                <div className='flex-1'>
                    <div className='mt-10'>
                        {
                            blog?.slice(0, 4)?.map((blog, index) => {
                                // Ensure BlogCardList accepts className and style props for animation
                                return <BlogCardList key={index} blog={blog} className="animate-fade-in-slide-up" style={{ animationDelay: `${index * 0.15}s` }} />
                            })
                        }
                    </div>
                </div>
                {/* Sidebar Section */}
                <div className='bg-white hidden md:block dark:bg-gray-800 w-[350px] p-6 rounded-xl mt-10 shadow-lg animate-fade-in-right border border-gray-200 dark:border-gray-700'>
                    <h1 className='text-2xl font-bold text-gray-900 dark:text-white mb-5'>Popular Categories</h1>
                    <div className='my-5 flex flex-wrap gap-3'>
                        {
                            tags.map((item, index) => {
                                return (
                                    <Badge
                                        onClick={() => navigate(`/search?q=${item.category}`)}
                                        key={index}
                                        className="cursor-pointer bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-md hover:bg-blue-200 dark:hover:bg-blue-800"
                                    >
                                        {item.category}
                                    </Badge>
                                )
                            })
                        }
                    </div>
                    <h1 className='text-xl font-bold text-gray-900 dark:text-white mt-8'>Subscribe to Newsletter</h1>
                    <p className='text-sm text-gray-600 dark:text-gray-400 mb-4'>Get the latest posts and updates delivered straight to your inbox.</p>
                    <div className="flex flex-col gap-3 max-w-md mx-auto mt-5">
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            className="flex h-11 w-full rounded-lg border border-gray-300 bg-gray-100 dark:bg-gray-900 px-4 py-2 text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-300 shadow-sm"
                        />
                        <Button className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition-colors duration-300 shadow-md">Subscribe</Button>
                    </div>
                    <div className='mt-10'>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Suggested Blogs</h2>
                        <ul className="space-y-3">
                            {[
                                '10 Tips to Master React for Beginners',
                                'Understanding Tailwind CSS: A Deep Dive',
                                'Improve Your SEO Strategy in 2024',
                                'The Future of AI in Web Development',
                                'Mastering JavaScript Closures'
                            ].map((title, idx) => (
                                <li
                                    key={idx}
                                    className="text-base text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 cursor-pointer transition-colors duration-200 flex items-center group"
                                >
                                    <span className="mr-2 text-red-500 dark:text-red-400 group-hover:animate-bounce-right">›</span>
                                    {title}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecentBlog
