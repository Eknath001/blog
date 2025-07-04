//import { Button } from '@/components/ui/button'
//import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
//import { Input } from '@/components/ui/input'
//import { Label } from '@/components/ui/label'
//import React, { useState } from 'react'
//import { Eye, EyeOff } from "lucide-react";
//import { Link, useNavigate } from 'react-router-dom'
//import axios from 'axios'
//import { toast } from 'sonner'
//import auth from "../assets/auth.jpg"
//
//const Signup = () => {
//
//    const navigate = useNavigate()
//    const [user, setUser] = useState({
//        firstName: "",
//        lastName: "",
//        email: "",
//        password: "",
//    });
//
//    const handleChange = (e) => {
//        const { name, value } = e.target;
//        setUser((prev) => ({
//            ...prev,
//            [name]: value,
//        }));
//    };
//
//    const handleSubmit = async (e) => {
//        e.preventDefault();
//        console.log(user)
//
//        try {
//            const response = await axios.post(`https://blog-yt-rqdo.onrender.com/api/v1/user/register`, user, {
//                headers: {
//                    "Content-Type": "application/json",
//                },
//                withCredentials: true,
//            });
//            if (response.data.success) {
//                navigate('/login')
//                toast.success(response.data.message)
//            } else {
//                toast.error(response.data.message)
//            }
//        } catch (error) {
//            console.log(error);
//            toast.error(error.response.data.message)
//
//
//        }
//
//        // try {
//        //     dispatch(setLoading(true))
//        //     const response = await axios.post("", user, {
//        //         headers: {
//        //             "Content-Type": "application/json",
//        //         },
//        //         withCredentials: true,
//        //     });
//        //     if (response.data.success) {
//        //         navigate('/login')
//        //         toast.success(response.data.message)
//        //         // setFormData({ name: "", email: "", password: "", role: "" });
//        //     } else {
//        //         toast(`Error: ${data.message || "Something went wrong"}`);
//        //     }
//        // } catch (error) {
//        //     // toast.error(error.response.data.message);
//        //     console.log(error);
//
//        // } finally {
//        //     dispatch(setLoading(false))
//        // }
//    };
//
//    const [showPassword, setShowPassword] = useState(false);
//
//    return (
//        <div className="flex  h-screen md:pt-14 md:h-[760px] ">
//            <div className='hidden md:block'>
//                <img src={auth} alt="" className='h-[700px]'  />
//            </div>
//            <div className='flex justify-center items-center flex-1 px-4 md:px-0'>
//                <Card className="w-full max-w-md p-6 shadow-lg rounded-2xl dark:bg-gray-800 dark:border-gray-600">
//                    <CardHeader>
//                        <CardTitle>
//                            <h1 className="text-center text-xl font-semibold">Create an account</h1>
//                        </CardTitle>
//                        <p className=' mt-2 text-sm font-serif text-center dark:text-gray-300'>Enter your details below to create your account</p>
//                    </CardHeader>
//                    <CardContent>
//                        <form className="space-y-4" onSubmit={handleSubmit}>
//                            <div className='flex gap-3'>
//                                <div>
//                                    <Label>First Name</Label>
//                                    <Input type="text"
//                                        placeholder="First Name"
//                                        name="firstName"
//                                        value={user.firstName}
//                                        onChange={handleChange}
//                                        className="dark:border-gray-600 dark:bg-gray-900"
//                                    />
//                                </div>
//
//                                <div>
//                                    <Label>Last Name</Label>
//                                    <Input type="text"
//                                        placeholder="Last Name"
//                                        name="lastName"
//                                        value={user.lastName}
//                                        onChange={handleChange}
//                                        className="dark:border-gray-600 dark:bg-gray-900"
//                                    />
//                                </div>
//                            </div>
//                            <div>
//                                <Label>Email</Label>
//                                <Input type="email"
//                                    placeholder="john.doe@example.com"
//                                    name="email"
//                                    value={user.email}
//                                    onChange={handleChange}
//                                    className="dark:border-gray-600 dark:bg-gray-900"
//                                />
//                            </div>
//
//                            <div className="relative">
//                                <Label>Password</Label>
//                                <Input type={showPassword ? "text" : "password"}
//                                    placeholder="Create a Password"
//                                    name="password"
//                                    value={user.password}
//                                    onChange={handleChange}
//                                    className="dark:border-gray-600 dark:bg-gray-900"
//                                />
//                                <button
//                                    type="button"
//                                    className="absolute right-3 top-9 text-gray-500"
//                                    onClick={() => setShowPassword(!showPassword)}
//                                >
//                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                                </button>
//                            </div>
//
//                            <Button type="submit" className="w-full">Sign Up</Button>
//                            <p className='text-center text-gray-600 dark:text-gray-300'>Already have an account? <Link to={'/login'}><span className='underline cursor-pointer hover:text-gray-800 dark:hover:text-gray-100'>Sign in</span></Link></p>
//                        </form>
//                    </CardContent>
//                </Card>
//
//            </div>
//        </div>
//    )
//}
//
//export default Signup
//

//import { Button } from '@/components/ui/button'
//import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
//import { Input } from '@/components/ui/input'
//import { Label } from '@/components/ui/label'
//import React, { useState } from 'react'
//import { Eye, EyeOff } from "lucide-react"
//import { Link, useNavigate } from 'react-router-dom'
//import axios from 'axios'
//import { toast } from 'sonner'
//import auth from "../assets/auth.jpg"
//import { GoogleLogin } from '@react-oauth/google'
//import { useDispatch } from 'react-redux'
//import { setUser } from '../redux/authSlice' // ✅ fix this path if alias fails
//
//const Signup = () => {
//  const navigate = useNavigate()
//  const dispatch = useDispatch()
//
//  const [user, setUserState] = useState({
//    firstName: "",
//    lastName: "",
//    email: "",
//    password: "",
//  });
//
//  const [showPassword, setShowPassword] = useState(false)
//
//  const handleChange = (e) => {
//    const { name, value } = e.target;
//    setUserState((prev) => ({ ...prev, [name]: value }));
//  };
//
//  const handleSubmit = async (e) => {
//    e.preventDefault()
//    try {
//      const response = await axios.post(`https://blog-yt-rqdo.onrender.com/api/v1/user/register`, user, {
//        headers: { "Content-Type": "application/json" },
//        withCredentials: true,
//      })
//      if (response.data.success) {
//        navigate('/login')
//        toast.success(response.data.message)
//      } else {
//        toast.error(response.data.message)
//      }
//    } catch (error) {
//      console.log(error)
//      toast.error(error?.response?.data?.message || "Signup failed")
//    }
//  };
//
//  const handleGoogleSignup = async (credentialResponse) => {
//    try {
//      const response = await axios.post(`https://blog-yt-rqdo.onrender.com/api/v1/user/google`, {
//        credential: credentialResponse.credential,
//      }, {
//        headers: { "Content-Type": "application/json" },
//        withCredentials: true,
//      });
//
//      if (response.data.success) {
//        dispatch(setUser(response.data.user)); // ✅ works now
//        toast.success("Google signup successful");
//        navigate("/");
//      } else {
//        toast.error(response.data.message);
//      }
//    } catch (error) {
//      console.log(error);
//      toast.error(error?.response?.data?.message || "Google signup failed");
//    }
//  };
//
//  return (
//    <div className="flex h-screen md:pt-14 md:h-[760px]">
//      <div className='hidden md:block'>
//        <img src={auth} alt="signup" className='h-[700px]' />
//      </div>
//      <div className='flex justify-center items-center flex-1 px-4 md:px-0'>
//        <Card className="w-full max-w-md p-6 shadow-lg rounded-2xl dark:bg-gray-800 dark:border-gray-600">
//          <CardHeader>
//            <CardTitle className="text-center text-xl font-semibold">Create an account</CardTitle>
//            <p className='mt-2 text-sm font-serif text-center dark:text-gray-300'>Enter your details below to create your account</p>
//          </CardHeader>
//          <CardContent>
//            <form className="space-y-4" onSubmit={handleSubmit}>
//              <div className='flex gap-3'>
//                <div>
//                  <Label>First Name</Label>
//                  <Input type="text" name="firstName" value={user.firstName} onChange={handleChange} />
//                </div>
//                <div>
//                  <Label>Last Name</Label>
//                  <Input type="text" name="lastName" value={user.lastName} onChange={handleChange} />
//                </div>
//              </div>
//              <div>
//                <Label>Email</Label>
//                <Input type="email" name="email" value={user.email} onChange={handleChange} />
//              </div>
//              <div className="relative">
//                <Label>Password</Label>
//                <Input type={showPassword ? "text" : "password"} name="password" value={user.password} onChange={handleChange} />
//                <button type="button" className="absolute right-3 top-9" onClick={() => setShowPassword(!showPassword)}>
//                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                </button>
//              </div>
//              <Button type="submit" className="w-full">Sign Up</Button>
//              <p className='text-center text-sm'>Already have an account? <Link to="/login" className="underline">Sign in</Link></p>
//            </form>
//
//            <div className="my-4 flex items-center gap-2">
//              <hr className="flex-grow border-gray-300" />
//              <span className="text-gray-500 text-sm">OR</span>
//              <hr className="flex-grow border-gray-300" />
//            </div>
//
//            <div className="flex justify-center">
//              <GoogleLogin
//                onSuccess={handleGoogleSignup}
//                onError={() => toast.error("Google Sign Up Failed")}
//              />
//            </div>
//          </CardContent>
//        </Card>
//      </div>
//    </div>
//  )
//}
//
//export default Signup
//



import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setUser } from "../redux/authSlice";

import signupBg from "../assets/signup.avif";
import auth from "../assets/auth.jpg";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUserState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://blog-yt-rqdo.onrender.com/api/v1/user/register`, user, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Signup failed");
    }
  };

  const handleGoogleSignup = async (credentialResponse) => {
    try {
      const response = await axios.post(
        `https://blog-yt-rqdo.onrender.com/api/v1/user/google`,
        { credential: credentialResponse.credential },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        dispatch(setUser(response.data.user));
        toast.success("Google signup successful");
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Google signup failed");
    }
  };

  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${signupBg})` }}
    >
      <div className="bg-white/90 dark:bg-gray-900/80 rounded-2xl shadow-2xl backdrop-blur-md p-6 max-w-6xl w-full flex flex-col md:flex-row overflow-hidden">
        {/* Left Image */}
        <div className="hidden md:flex flex-1 items-center justify-center">
          <img src={auth} alt="Signup" className="rounded-2xl h-[500px] object-cover shadow-lg" />
        </div>

        {/* Signup Form */}
        <div className="flex-1 flex items-center justify-center px-4">
          <Card className="w-full max-w-md border-none bg-transparent shadow-none">
            <CardHeader>
              <CardTitle className="text-center text-xl font-semibold text-gray-800 dark:text-white">
                Create an account
              </CardTitle>
              <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-2 font-serif">
                Enter your details to get started
              </p>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Label>First Name</Label>
                    <Input name="firstName" value={user.firstName} onChange={handleChange} />
                  </div>
                  <div className="flex-1">
                    <Label>Last Name</Label>
                    <Input name="lastName" value={user.lastName} onChange={handleChange} />
                  </div>
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" name="email" value={user.email} onChange={handleChange} />
                </div>
                <div className="relative">
                  <Label>Password</Label>
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-9 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {/* Optional: Remember Me + Forgot (reused layout) */}
                <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="accent-blue-500" />
                    <span>Remember me</span>
                  </label>
                  <Link to="/forgot-password" className="hover:underline">
                    Forgot password?
                  </Link>
                </div>

                <Button type="submit" className="w-full hover:scale-[1.02] transition-transform">
                  Sign Up
                </Button>

                <p className="text-center text-sm text-gray-600 dark:text-gray-300">
                  Already have an account?{" "}
                  <Link to="/login" className="underline hover:text-blue-600">
                    Sign in
                  </Link>
                </p>
              </form>

              <div className="my-4 flex items-center gap-2 text-gray-500 dark:text-gray-300">
                <hr className="flex-grow border-gray-300 dark:border-gray-600" />
                <span className="text-sm">OR</span>
                <hr className="flex-grow border-gray-300 dark:border-gray-600" />
              </div>

              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSignup}
                  onError={() => toast.error("Google Sign Up Failed")}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Signup;
