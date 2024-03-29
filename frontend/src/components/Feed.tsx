import { useEffect, useState } from "react"
import { postState } from "../store/atoms/post";
import { useRecoilState, useRecoilValue } from "recoil";
import { calculateTimeAgo } from "../utils/timeUtils";
import { BsFillHeartFill } from "react-icons/bs";
import config from "../config";
import { userState } from "../store/atoms/user";

const Feed = () => {

    const url = config.backendUrl
    const [posts, setPosts] = useRecoilState(postState)
    const [postContent, setPostContent] = useState('')
    const [isOpenModal, setIsOpenModal] = useState(false)
    const user = useRecoilValue(userState)
    const handleOpenModal = () => {
        setIsOpenModal(true)
    }
    const handleLike = async (postId: string) => {
        const response = await fetch(`${url}/post/like/${postId}`, {
            method: 'PUT',
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                'Content-Type': 'application/json',
            }
        })
        if (response.ok) {
            const data = await response.json()
            setPosts(prevPosts => {
                return prevPosts.map(post => {
                    if (post._id === postId) {
                        return {
                            ...post,
                            like: data.like,
                            likes: [...post.likes,...data.likes]
                        }
                        
                    }
                    return post
                })
            })
        }
        console.log('post'+ posts)

    }
    const handlePost = async () => {
        const response = await fetch(`${url}/post/create`, {
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
            setPosts((prevPost) => [...prevPost, newPost])

            setIsOpenModal(false)

        }
    }
    const fetchPosts = async () => {
        const response = await fetch(`${url}/post/posts`, {
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

        }
    }
    useEffect(() => {
        fetchPosts()
    }, [])
    return <>
        <div className="w-full m-auto mt-24 mb-10 flex flex-col md:w-1/2 relative">
            <button className="w-1/3 ml-3 bg-rose-500 px-10 py-4 rounded-md font-bold md:w-1/12 shadow-xl text-lg hover:bg-pink-900 fixed top-25 z-10" style={{ color: '  #fdedec  ' }} onClick={handleOpenModal}>Write</button>

            {posts.slice().reverse().map(post => (
                <div key={post._id} className="rounded shadow-xl mt-20 px-10 py-4 ">
                    <div className="mb-2 font-medium text-2xl">{post.userId.username}</div>
                    <div>{post.description}</div>
                    <div className="text-sm text-right">{post.timeAgo}</div>
                    <div className="flex ">
                    <BsFillHeartFill
                        className={`mr-2 cursor-pointer ${(post.likes as string[]).includes(user.user?.id || "") ? 'text-rose-500 ' :''}`}
                        onClick={() => handleLike(post._id)}
                    />
                    {post.like}
                    </div>
                </div>
            ))}


            {isOpenModal && (
                <div className="md:w-full fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="m-4 bg-white p-4 rounded shadow-lg w-full md:w-1/3 mb-5 relative">
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
                            className="bg-rose-500 px-4 py-2 rounded-md  mt-5 text-gray-100 font-medium shadow-xl hover:bg-rose-700"
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