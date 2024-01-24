import { useRecoilValue } from "recoil";
import { User, userState } from "../store/atoms/user";
import { Post } from "../store/atoms/post";
import { useEffect, useState } from "react";
import { calculateTimeAgo } from "../utils/timeUtils";
const Profile = () => {
    const user = useRecoilValue(userState)
    const [myPosts, setMyPosts] = useState<Post[]>([])

    const [activeComponent, setActiveComponent] = useState('posts')
    const fetchUserPosts = async () => {
        const response = await fetch('http://localhost:8001/post/myposts', {
            method: 'GET',
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                'Content-Type': 'application/json',
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
            setMyPosts(postsWithTime)
        }
    }
    useEffect(() => {
        fetchUserPosts()
    }, [])
    return <>
        <div className="flex w-2/4 m-auto mt-32 " style={{ borderBottom: "1px solid #ccc" }}>
            <div className="p-10">
                <div className="font-semibold text-3xl text-gray-600">{user.user?.username}</div>
                <div className="flex justify-start w-full gap-12 mt-3">
                    <div className="text-md font-light">Followers : {user.user?.followers.length}</div>
                    <div className="text-md font-light">Following : {user.user?.following.length}</div>
                    <div className="text-md font-light">Posts : {myPosts.length}</div>
                </div>
            </div>
        </div>
        <div className="flex w-2/4 m-auto mt-10 justify-between px-10">
            <button className="font-bold hover:border-b-2" onClick={() => setActiveComponent('posts')}>Posts</button>
            <button className="font-bold hover:border-b-2" onClick={() => setActiveComponent('following')}>Following</button>
            <button className="font-bold hover:border-b-2" onClick={() => setActiveComponent('followers')}>Followers</button>
        </div>
        <div className="mt-10">
            {activeComponent === 'posts' && <Posts posts={myPosts} />}
            {activeComponent === 'following' && <Following user={user} />}
            {activeComponent === 'followers' && <Followers user={user} />}
        </div>
    </>
}
const Posts = ({ posts }: { posts: Post[] }) => {
    return <div className="w-full m-auto  flex flex-col md:w-2/4 mb-10" >
        {posts.length === 0 ? (
            <div className="text-center text-gray-600 mt-10">
                User has not posted anything yet.
            </div>
        ) :
            (posts.map(post => (
                <div key={post._id} className="rounded-xl shadow-xl mt-10 px-10 py-4 border">
                    <div className="mb-2 font-medium text-2xl">{post.userId.username}</div>
                    <div>{post.description}</div>
                    <div className="text-sm text-right">{post.timeAgo}</div>
                </div>
            )))}
    </div>
}
const Followers = ({ user }: { user: { isLoading: boolean; user: User | null; } }) => {

    return <><div className="w-full m-auto mt-20 mb-10 flex flex-col md:w-2/4 ">
        {user.user?.followers.length === 0 ? (
            <div className="text-center text-gray-600 mt-10">
                Haven't any followers!
            </div>
        ) :
            (user.user?.followers.map(follower => (
                <div>
                    <div className="flex justify-between p-5">
                        <div className="text-xl font-medium text-gray-600">{follower.username}</div>
                        <button className="rounded-xl px-6 py-3 bg-rose-400 text-white font-medium shadow-lg">follow</button>
                    </div>
                    <hr />
                </div>
            )))}
    </div>

    </>
}
const Following = ({ user }: { user: { isLoading: boolean; user: User | null; } }) => {
    return <div className="w-full m-auto mt-20 mb-10 flex flex-col md:w-2/4 ">
        {user.user?.following.length === 0 ? (
            <div className="text-center text-gray-600 mt-10">
                You are not following anyone!
            </div>
        ) :
            (user.user?.following.map(following_user => (
                <div>
                    <div className="flex justify-between p-5">
                        <div className="text-xl font-medium text-gray-600">{following_user.username}</div>
                        <div className="flex items-center px-4 ">
                            <div className="text-rose-400 font-medium ">Following</div>
                        </div>
                    </div>
                    <hr />
                </div>
            )))}
    </div>
}
export default Profile;