//import { useState } from "react";
//import { Input } from "@/components/ui/input";
//import { Button } from "@/components/ui/button";
//import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
//import { Label } from "@/components/ui/label";
//import { Eye, EyeOff } from "lucide-react";
//import { Link, useNavigate } from "react-router-dom";
//import axios from "axios";
//import { toast } from "sonner";
//import { useDispatch } from "react-redux";
//import { setUser } from "@/redux/authSlice";
//import auth from "../assets/auth.jpg"
//
//const Login = () => {
//  const navigate = useNavigate()
//  const dispatch = useDispatch()
//  const [input, setInput] = useState({
//    email: "",
//    password: "",
//  });
//
//  const handleChange = (e) => {
//    const { name, value } = e.target;
//    setInput((prev) => ({
//      ...prev,
//      [name]: value,
//    }));
//  };
//
//  const handleSubmit = async (e) => {
//    e.preventDefault();
//    console.log(input);
//
//    try {
//      const response = await axios.post(`https://blog-yt-rqdo.onrender.com/api/v1/user/login`, input, {
//        headers: {
//          "Content-Type": "application/json"
//        },
//        withCredentials: true
//      });
//      if (response.data.success) {
//        navigate('/')
//        dispatch(setUser(response.data.user))
//        toast.success(response.data.message)
//      }
//    } catch (error) {
//      console.log(error.response.data.message);
//      toast.error(error.response.data.message); // Display error message to user
//    }
//
//  };
//  const [showPassword, setShowPassword] = useState(false);
//  return (
//    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen py-10 md:py-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
//      {/* Image Section */}
//      <div className="hidden md:flex flex-1 justify-center items-center p-8 animate-slide-in-left">
//        <img src={auth} alt="Authentication Illustration" className='h-[500px] w-auto object-contain rounded-xl shadow-2xl transform transition-transform duration-500 hover:scale-[1.02]' />
//      </div>
//
//      {/* Login Form Section */}
//      <div className='flex justify-center items-center flex-1 px-4 md:px-0 animate-slide-in-right'>
//        <Card className="w-full max-w-md p-6 md:p-8 shadow-2xl rounded-3xl dark:bg-gray-800 dark:border-gray-700 border border-gray-200 transform transition-transform duration-300 hover:scale-[1.01]">
//          <CardHeader className="mb-6">
//            <CardTitle className="text-center text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-2 animate-fade-in-down">
//              Welcome Back!
//            </CardTitle>
//            <p className='text-gray-600 dark:text-gray-300 text-base font-serif text-center animate-fade-in'>
//              Enter your details below to log in to your account.
//            </p>
//          </CardHeader>
//          <CardContent>
//            <form className="space-y-6" onSubmit={handleSubmit}>
//              <div>
//                <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Email</Label>
//                <Input
//                  id="email"
//                  type="email"
//                  placeholder="your.email@example.com"
//                  name="email"
//                  value={input.email}
//                  onChange={handleChange}
//                  className="dark:border-gray-600 dark:bg-gray-900 bg-gray-100 text-gray-900 dark:text-gray-100 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
//                />
//              </div>
//
//              <div className="relative">
//                <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Password</Label>
//                <Input
//                  id="password"
//                  type={showPassword ? "text" : "password"}
//                  placeholder="Enter Your Password"
//                  name="password"
//                  value={input.password}
//                  onChange={handleChange}
//                  className="dark:border-gray-600 dark:bg-gray-900 bg-gray-100 text-gray-900 dark:text-gray-100 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
//                />
//                <button
//                  type="button"
//                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-200 p-1 rounded-full"
//                  onClick={() => setShowPassword(!showPassword)}
//                  aria-label={showPassword ? "Hide password" : "Show password"}
//                >
//                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                </button>
//              </div>
//
//              <Button
//                type="submit"
//                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition-colors duration-300 transform hover:scale-[1.01]"
//              >
//                Login
//              </Button>
//              <p className='text-center text-gray-600 dark:text-gray-300 text-sm'>
//                Don't have an account?{" "}
//                <Link to={'/signup'}>
//                  <span className='underline cursor-pointer text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors duration-200'>
//                    Sign up
//                  </span>
//                </Link>
//              </p>
//            </form>
//          </CardContent>
//        </Card>
//      </div>
//    </div>
//  )
//}
//
//export default Login


import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "sonner"
import { useDispatch } from "react-redux"
import { setUser } from "@/redux/authSlice"
import auth from "../assets/auth.jpg"
import { GoogleLogin } from "@react-oauth/google"

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [input, setInput] = useState({ email: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setInput((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`https://blog-yt-rqdo.onrender.com/api/v1/user/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      })
      if (response.data.success) {
        dispatch(setUser(response.data.user))
        toast.success(response.data.message)
        navigate('/')
      }
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || "Login failed")
    }
  }

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const response = await axios.post(`https://blog-yt-rqdo.onrender.com/api/v1/user/google`, {
        credential: credentialResponse.credential,
      }, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })

      if (response.data.success) {
        dispatch(setUser(response.data.user))
        toast.success("Google login successful")
        navigate("/")
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || "Google login failed")
    }
  }

  return (
    <div className="flex items-center h-screen md:pt-14 md:h-[760px]">
      <div className="hidden md:block">
        <img src={auth} alt="" className='h-[700px]' />
      </div>
      <div className='flex justify-center items-center flex-1 px-4 md:px-0'>
        <Card className="w-full max-w-md p-6 shadow-lg rounded-2xl dark:bg-gray-800 dark:border-gray-600">
          <CardHeader>
            <CardTitle className="text-center text-xl font-semibold">Login into your account</CardTitle>
            <p className='text-gray-600 dark:text-gray-300 mt-2 text-sm font-serif text-center'>Enter your details below to login your account</p>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Label>Email</Label>
                <Input type="email" placeholder="Email Address" name="email" value={input.email} onChange={handleChange} className="dark:border-gray-600 dark:bg-gray-900" />
              </div>
              <div className="relative">
                <Label>Password</Label>
                <Input type={showPassword ? "text" : "password"} placeholder="Enter Your Password" name="password" value={input.password} onChange={handleChange} className="dark:border-gray-600 dark:bg-gray-900" />
                <button type="button" className="absolute right-3 top-9 text-gray-500" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <Button type="submit" className="w-full">Login</Button>
              <p className='text-center text-gray-600 dark:text-gray-300'>Don't have an account? <Link to={'/signup'}><span className='underline cursor-pointer hover:text-gray-800'>Sign up</span></Link></p>
            </form>

            <div className="my-4 flex items-center gap-2">
              <hr className="flex-grow border-gray-300 dark:border-gray-600" />
              <span className="text-gray-500 dark:text-gray-300 text-sm">OR</span>
              <hr className="flex-grow border-gray-300 dark:border-gray-600" />
            </div>

            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => toast.error("Google login failed")}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Login
