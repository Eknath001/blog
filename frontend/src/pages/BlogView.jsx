import React, { useEffect, useState } from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Bookmark, MessageSquare, Share2 } from 'lucide-react'
import CommentBox from '@/components/CommentBox'
import axios from 'axios'
import { FaHeart, FaRegHeart } from 'react-icons/fa6'
import { setBlog } from '@/redux/blogSlice'
import { toast } from 'sonner'
import { formatDistanceToNow } from 'date-fns'
//
const BlogView = () => {
    const params = useParams()
    const blogId = params.blogId
    const { blog } = useSelector(store => store.blog)
    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const selectedBlog = blog.find(blog => blog._id === blogId)

    const [blogLike, setBlogLike] = useState(0)
    const [liked, setLiked] = useState(false)
    const { comment } = useSelector(store => store.comment)

    useEffect(() => {
        if (selectedBlog) {
            setBlogLike(selectedBlog.likes.length)
            setLiked(selectedBlog.likes.includes(user?._id))
        }
    }, [selectedBlog, user])

    const likeOrDislikeHandler = async () => {
        try {
            const action = liked ? 'dislike' : 'like';
            const res = await axios.get(`http://localhost:8000/api/v1/blog/${selectedBlog._id}/${action}`, { withCredentials: true })
            if (res.data.success) {
                const updatedLikes = liked ? blogLike - 1 : blogLike + 1;
                setBlogLike(updatedLikes);
                setLiked(!liked)
                const updatedBlogData = blog.map(p =>
                    p._id === selectedBlog._id
                        ? { ...p, likes: liked ? p.likes.filter(id => id !== user._id) : [...p.likes, user._id] }
                        : p
                )
                toast.success(res.data.message);
                dispatch(setBlog(updatedBlogData))
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message || "Something went wrong.")
        }
    }

    const formatPublishedTime = (isoDate) => {
        return formatDistanceToNow(new Date(isoDate), { addSuffix: true })
    }

    const handleShare = (blogId) => {
        const blogUrl = `${window.location.origin}/blogs/${blogId}`;
        if (navigator.share) {
            navigator.share({
                title: selectedBlog.title,
                text: 'Check out this blog!',
                url: blogUrl,
            }).catch(err => console.error('Error sharing:', err));
        } else {
            // Fallback for browsers that don't support Web Share API
            const tempInput = document.createElement('input');
            tempInput.value = blogUrl;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
            toast.success('Blog link copied to clipboard!');
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    if (!selectedBlog) return <div className="text-center py-20 text-xl text-gray-700 dark:text-gray-300">Loading blog...</div>

    return (
        <div className='pt-20 pb-10 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300'>
            <div className='max-w-6xl mx-auto px-4 md:px-0'>
                <Breadcrumb className="mb-8 animate-fade-in">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <Link to={'/'}><BreadcrumbLink className="text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200">Home</BreadcrumbLink></Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <Link to={'/blogs'}><BreadcrumbLink className="text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200">Blogs</BreadcrumbLink></Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="font-semibold text-gray-900 dark:text-white">{selectedBlog.title}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                {/* Blog Header */}
                <div className="my-8 animate-fade-in-down">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-gray-900 dark:text-white leading-tight">{selectedBlog.title}</h1>
                    <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-6">{selectedBlog.subtitle}</p>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center space-x-4 animate-fade-in-left">
                            <Avatar className="h-14 w-14 border-2 border-red-500 shadow-md">
                                <AvatarImage src={selectedBlog.author.photoUrl} alt={`Avatar of ${selectedBlog.author.firstName}`} />
                                <AvatarFallback>{selectedBlog.author.firstName.charAt(0)}{selectedBlog.author.lastName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-bold text-lg text-gray-900 dark:text-white">{selectedBlog.author.firstName} {selectedBlog.author.lastName}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{selectedBlog.author.occupation}</p>
                            </div>
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 animate-fade-in-right">
                            Published {formatPublishedTime(selectedBlog.createdAt)} • {Math.ceil(selectedBlog.description.length / 1000) || 1} min read
                        </div>
                    </div>
                </div>

                {/* Featured Image */}
                <div className="mb-10 rounded-xl overflow-hidden shadow-lg animate-scale-in-up transform transition-transform duration-500 hover:scale-[1.01] border border-gray-200 dark:border-gray-700">
                    <img
                        src={selectedBlog.thumbnail}
                        alt={selectedBlog.title}
                        className="w-full h-80 md:h-[450px] object-cover"
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 italic px-4 pb-4">{selectedBlog.subtitle}</p>
                </div>

                {/* Blog Content */}
                <div className="prose dark:prose-invert max-w-none text-lg leading-relaxed mb-10 animate-fade-in">
                    <p dangerouslySetInnerHTML={{ __html: selectedBlog.description }} />
                </div>


                {/* Tags + Engagement */}
                <div className='mt-10'>
                    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white animate-fade-in">Tags:</h3>
                    <div className="flex flex-wrap gap-2 mb-8 animate-fade-in-up-stagger">
                        {selectedBlog.tags?.map((tag, index) => (
                            <Badge
                                variant="secondary"
                                key={tag}
                                className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-md"
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                {tag}
                            </Badge>
                        ))}
                    </div>

                    <div className="flex items-center justify-between border-y border-gray-300 dark:border-gray-700 py-4 mb-8 animate-fade-in-up">
                        <div className="flex items-center space-x-4">
                            <Button onClick={likeOrDislikeHandler} variant="ghost" size="sm" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 group">
                                {liked
                                    ? <FaHeart size={24} className="text-red-600 transition-transform duration-200 group-hover:scale-110" />
                                    : <FaRegHeart size={24} className="text-gray-500 dark:text-gray-400 transition-transform duration-200 group-hover:scale-110 group-hover:text-red-500" />}
                                <span className="font-medium text-lg">{blogLike}</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                                <MessageSquare className="h-5 w-5 text-blue-500" />
                                <span className="font-medium text-lg">{comment.length} Comments</span>
                            </Button>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm" className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                                <Bookmark className="h-5 w-5 text-green-500" />
                            </Button>
                            <Button onClick={() => handleShare(selectedBlog._id)} variant="ghost" size="sm" className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                                <Share2 className="h-5 w-5 text-purple-500" />
                            </Button>
                        </div>
                    </div>
                </div>

                <CommentBox selectedBlog={selectedBlog} />
            </div>
        </div>
    )
}

export default BlogView
