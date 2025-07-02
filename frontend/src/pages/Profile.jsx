import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import userLogo from "../assets/user.jpg"
import { FaFacebook, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa"
import { Label } from '@/components/ui/label'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input'
import { Link } from 'react-router-dom'
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { setUser } from '@/redux/authSlice'
import TotalProperty from '@/components/TotalProperty'

const Profile = () => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const { user: rawUser } = useSelector(store => store.auth)

    // 🛡️ Safe fallback values
    const user = {
        firstName: rawUser?.firstName || "User",
        lastName: rawUser?.lastName || "",
        email: rawUser?.email || "no-email@example.com",
        occupation: (rawUser?.occupation && rawUser.occupation !== "undefined") ? rawUser.occupation : "MERN Stack Developer",
        bio: rawUser?.bio || "I'm a passionate web developer focused on creating beautiful and functional applications. In my free time, I enjoy contributing to open-source projects and exploring new technologies.",
        photoUrl: rawUser?.photoUrl || userLogo,
        facebook: rawUser?.facebook || "",
        linkedin: rawUser?.linkedin || "",
        github: rawUser?.github || "",
        instagram: rawUser?.instagram || "",
    }

    const [input, setInput] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        occupation: user.occupation,
        bio: user.bio,
        facebook: user.facebook,
        linkedin: user.linkedin,
        github: user.github,
        instagram: user.instagram,
        file: user.photoUrl
    })

    const changeEventHandler = (e) => {
        const { name, value } = e.target
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("firstName", input.firstName)
        formData.append("lastName", input.lastName)
        formData.append("bio", input.bio)
        formData.append("occupation", input.occupation)
        formData.append("facebook", input.facebook)
        formData.append("linkedin", input.linkedin)
        formData.append("instagram", input.instagram)
        formData.append("github", input.github)
        if (input?.file && input.file !== user.photoUrl) {
            formData.append("file", input.file)
        }

        try {
            setLoading(true)
            const res = await axios.put(`http://localhost:8000/api/v1/user/profile/update`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true,
            })
            if (res.data.success) {
                setOpen(false)
                toast.success(res.data.message)
                dispatch(setUser(res.data.user))
            }
        } catch (error) {
            console.log(error)
            toast.error("Failed to update profile.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='bg-muted/40 pt-20 md:ml-[320px] min-h-screen'>
            <div className='max-w-6xl mx-auto mt-8 p-4'>
                <Card className="flex md:flex-row flex-col gap-4 md:gap-10 p-6 md:p-8 bg-background dark:bg-gray-800/50 shadow-md rounded-2xl border dark:border-gray-700/50">

                    {/* Left Section: Avatar and Socials */}
                    <div className='flex flex-col items-center text-center md:w-[300px] md:border-r md:pr-8 dark:border-gray-700'>
                        <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-background ring-2 ring-primary">
                            <AvatarImage src={user.photoUrl} alt={`${user.firstName}'s avatar`} />
                        </Avatar>
                        <h2 className='text-xl font-bold text-foreground mt-4'>{`${user.firstName} ${user.lastName}`}</h2>
                        <p className='text-md text-muted-foreground my-2'>{user.occupation}</p>
                        <div className='flex gap-5 items-center mt-4'>
                            <Link to={user.facebook} target="_blank" className="text-muted-foreground hover:text-primary transition-colors"><FaFacebook size={22} /></Link>
                            <Link to={user.linkedin} target="_blank" className="text-muted-foreground hover:text-primary transition-colors"><FaLinkedin size={22} /></Link>
                            <Link to={user.github} target="_blank" className="text-muted-foreground hover:text-primary transition-colors"><FaGithub size={22} /></Link>
                            <Link to={user.instagram} target="_blank" className="text-muted-foreground hover:text-primary transition-colors"><FaInstagram size={22} /></Link>
                        </div>
                    </div>

                    {/* Right Section: User Info */}
                    <div className="flex-1 flex flex-col justify-center space-y-6">
                        <div className="text-center md:text-left">
                           <h1 className='font-bold text-3xl md:text-4xl text-foreground mb-2'>Welcome, {user.firstName}!</h1>
                           <p className='text-md text-muted-foreground'><span className='font-semibold'>Email: </span>{user.email}</p>
                        </div>

                        <div className='space-y-2'>
                            <Label className="text-sm font-semibold text-muted-foreground">About Me</Label>
                            <p className='bg-muted/50 dark:bg-muted/20 border-l-4 border-primary p-4 rounded-lg text-foreground/80 italic'>
                                {user.bio}
                            </p>
                        </div>
                        
                        <div className="text-center md:text-left pt-4">
                            <Dialog open={open} onOpenChange={setOpen}>
                                <Button onClick={() => setOpen(true)}>Edit Profile</Button>
                                <DialogContent className="sm:max-w-[425px] md:max-w-lg bg-background">
                                    <DialogHeader>
                                        <DialogTitle className="text-center text-2xl">Edit Profile</DialogTitle>
                                        <DialogDescription className="text-center">
                                            Make changes to your profile here. Click save when you're done.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className='grid gap-6 py-4'>
                                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                            <div className="space-y-2">
                                                <Label htmlFor="firstName">First Name</Label>
                                                <Input id="firstName" name="firstName" value={input.firstName} onChange={changeEventHandler} placeholder="First Name" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="lastName">Last Name</Label>
                                                <Input id="lastName" name="lastName" value={input.lastName} onChange={changeEventHandler} placeholder="Last Name" />
                                            </div>
                                        </div>
                                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                            <div className="space-y-2">
                                                <Label htmlFor="facebook">Facebook URL</Label>
                                                <Input id="facebook" name="facebook" value={input.facebook} onChange={changeEventHandler} placeholder="https://facebook.com/..." />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="instagram">Instagram URL</Label>
                                                <Input id="instagram" name="instagram" value={input.instagram} onChange={changeEventHandler} placeholder="https://instagram.com/..." />
                                            </div>
                                        </div>
                                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                             <div className="space-y-2">
                                                <Label htmlFor="linkedin">LinkedIn URL</Label>
                                                <Input id="linkedin" name="linkedin" value={input.linkedin} onChange={changeEventHandler} placeholder="https://linkedin.com/in/..." />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="github">GitHub URL</Label>
                                                <Input id="github" name="github" value={input.github} onChange={changeEventHandler} placeholder="https://github.com/..." />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="bio">Description</Label>
                                            <Textarea id="bio" name="bio" value={input.bio} onChange={changeEventHandler} placeholder="Tell us a little about yourself" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="file">Profile Picture</Label>
                                            <Input id="file" type="file" accept="image/*" onChange={changeFileHandler} />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        {loading ? (
                                            <Button disabled><Loader2 className='mr-2 w-4 h-4 animate-spin' /> Please wait</Button>
                                        ) : (
                                            <Button onClick={submitHandler}>Save Changes</Button>
                                        )}
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </Card>

                <div className="mt-8">
                    <TotalProperty />
                </div>
            </div>
            
        </div>
    )
}

export default Profile;