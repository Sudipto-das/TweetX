import { useEffect, useState } from "react"
import { postState } from "../store/atoms/post";
import { useRecoilState } from "recoil";
interface User {
    username: string;
}
interface Post {

    id: string;
    title: string;
    description: string;
    like: number;
    likes: [];
    created_at: string;
    userId: User
    timeAgo: string
}

const Feed = () => {
    const calculateTimeAgo = (createdAt: string): string => {
        const CreatedDate = new Date(createdAt)
        const CurrentDate = new Date()

        const TimeDiff = CurrentDate.getTime() - CreatedDate.getTime()
        const seconds = Math.floor(TimeDiff / 1000)
        if (seconds < 60) {
            return `${seconds} sec${seconds != 1 ? 's' : ''} ago`
        }
        const minutes = Math.floor(seconds / 60)
        if (minutes < 60) {
            return `${minutes} min${minutes != 1 ? 's' : ''} ago`
        }
        const hours = Math.floor(minutes / 60)
        if (hours < 24) {
            return `${hours} hour${hours != 1 ? 's' : ''} ago`
        }
        const days = Math.floor(hours / 24)
        return `${days} days${days != 1 ? 's' : ''} ago`
    }

    const [posts, setPosts] = useRecoilState(postState)
    const [postContent, setPostContent] = useState('')
    const [isOpenModal, setIsOpenModal] = useState(false)
    const handleOpenModal = () => {
        setIsOpenModal(true)
    }
    const handlePost = async () => {
        const response = await fetch('http://localhost:8001/post/create', {
            method: 'POST',
            body: JSON.stringify({
                description: postContent
            }),
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                'Content-Type': 'application/json',
            }
        })
        if (response.ok) {
            const newPost = await response.json()
            setPosts((prevPost) => [ newPost,...prevPost])
            console.log(newPost)
            setIsOpenModal(false)

        }
    }
    const fetchPosts = async () => {
        const response = await fetch('http://localhost:8001/post/posts', {
            method: 'GET',
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            }
        })
        if (response.ok) {
            const data = await response.json()
            const postsWithTime = data.map((post: { created_at: string; }) => (
                {
                    ...post,
                    timeAgo: calculateTimeAgo(post.created_at)
                }
            ))
            setPosts(postsWithTime)
            console.log(data)
        }
    }
    useEffect(() => {
        fetchPosts()
    }, [])
    return <>
        <div className="w-full m-auto mt-24 flex flex-col md:w-1/2 relative">
            <button className="bg-pink-400 px-10 py-4 rounded-md font-bold w-1/12 shadow-xl text-lg hover:bg-pink-900 fixed top-25 z-10" style={{ color: '  #fdedec  ' }} onClick={handleOpenModal}>Write</button>

            {posts.map(post => (
                <div key={post.id} className="rounded shadow-xl mt-20 px-10 py-4 ">
                    <div className="mb-2 font-medium text-2xl">{post.userId.username}</div>
                    <div>{post.description}</div>
                    <div className="text-sm text-right">{post.timeAgo}</div>
                </div>
            ))}


            {isOpenModal && (
                <div className="w-full fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded shadow-lg w-1/3 mb-5 relative">
                        <button
                            className="absolute top-0 right-2 m-2 px-3 border rounded-lg hover:border-red-500 font-extrabold"
                            onClick={() => setIsOpenModal(false)}
                        >
                            X
                        </button>
                        <textarea
                            className="border rounded-xl py-6 px-5 w-full mt-5"
                            placeholder="Write your post..."
                            value={postContent}
                            onChange={(e) => { setPostContent(e.target.value) }}
                        />
                        <button
                            className="bg-pink-400 px-4 py-2 rounded-md  mt-5 text-gray-100 font-medium"
                            onClick={handlePost}
                        >
                            POST
                        </button>

                    </div>
                </div>
            )}

        </div>

    </>
}
export default Feed