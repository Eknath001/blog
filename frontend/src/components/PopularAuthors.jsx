import axios from 'axios'
import React, { useEffect, useState } from 'react'
import userLogo from "../assets/user.jpg"

const PopularAuthors = () => {
    const [popularUser, setPopularUser] = useState([])
    const getAllUsers = async () => {
        try {
            const res = await axios.get(`https://blog-yt-rqdo.onrender.com/api/v1/user/all-users`)
            if (res.data.success) {
                setPopularUser(res.data.users)
            }
        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        getAllUsers()
    }, [])
    return (
        <div className='bg-white dark:bg-gray-900 py-12 transition-colors duration-300'>
            <div className='max-w-7xl mx-auto'>
                <div className='flex flex-col space-y-4 items-center mb-10'>
                    <h1 className='text-3xl md:text-4xl font-extrabold pt-10 text-gray-900 dark:text-white animate-fade-in-down'>Popular Authors</h1>
                    <hr className='w-24 border-2 border-red-500 rounded-full animate-scale-in' />
                </div>
                <div className='flex flex-wrap items-center justify-center md:justify-around gap-8 my-10 px-4 md:px-0'>
                    {
                        popularUser?.slice(0, 3)?.map((user, index) => {
                            return (
                                <div
                                    key={index}
                                    className='flex flex-col gap-3 items-center text-center p-4 transform transition-all duration-300 hover:scale-105 hover:shadow-lg rounded-lg animate-fade-in'
                                    style={{ animationDelay: `${index * 0.15}s` }}
                                >
                                    <img
                                        src={user.photoUrl || userLogo}
                                        alt={`${user.firstName} ${user.lastName}`}
                                        className='rounded-full h-24 w-24 md:w-36 md:h-36 object-cover border-4 border-red-500 shadow-md transform transition-transform duration-300 hover:rotate-3 hover:border-red-600'
                                    />
                                    <p className='font-semibold text-lg text-gray-800 dark:text-gray-200'>
                                        {user.firstName} {user.lastName}
                                    </p>
                                    {/* You could add more details here, e.g., number of blogs */}
                                    {/* <p className='text-sm text-gray-600 dark:text-gray-400'>{user.blogCount || 0} Blogs</p> */}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default PopularAuthors
