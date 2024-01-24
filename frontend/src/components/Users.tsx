import { useEffect, useState } from "react"
import { usersState, Users } from "../store/atoms/users";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState, User } from "../store/atoms/user";

const MyUsers = () => {
    const [users, setUsers] = useRecoilState<Users[]>(usersState)
    const [user, setUser] = useRecoilState<{ isLoading: boolean, user: null | User }>(userState)
    
    const userId = useRecoilValue(userState)
    const handleFollow = async (followId: string) => {

        try {
            const response = await fetch(`http://localhost:8001/post/follow/${followId}`, {
                method: 'PUT',
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                    'Content-Type': 'application/json',
                }
            })
            if (response.ok) {
                const data = await response.json()

                setUser((prevUser)=>({
                    ...prevUser,
                    user:{
                        ...prevUser.user!,
                        following:[...prevUser.user!.following,{id:data._id,username:data.username}]
                    }
                }))
                console.log(user)
                const updatedUser = users.map(user => {
                    if (user._id === followId) {
                        return { ...user, followers: [...user.followers, userId.user?.id || ''] }
                    }
                    return user;
                })
                setUsers(updatedUser)
                
                
                
            }

        } catch (error) {
            console.log(error)
        }
    }
    const fetchUser = async () => {
        try {
            const response = await fetch('http://localhost:8001/post/users', {
                method: 'GET',
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                    'Content-Type': 'application/json',
                }
            })
            if (response.ok) {
                const data = await response.json()
                setUsers(data)
                
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchUser()
    }, [])
    return <div className=" w-full m-auto mt-28 mb-10 flex flex-col md:w-2/5 relative">

        {users.map(user => (
            <>
                <div className="rounded px-12 py-8 flex justify-between ">
                    <div>
                        <div className="text-2xl mb-3 font-medium">{user.username}</div>
                        <div className="text-sm font-extralight">following : {user.following.length}</div>
                    </div>
                    {user.followers.includes(userId.user?.id || "") ? (
                        <div className="flex items-center px-4 ">
                            <div className="text-rose-400 font-medium ">Following</div>
                        </div>
                    ) : (
                        <div>
                            <button
                                className="rounded-xl px-6 py-3 bg-rose-400 text-white font-medium shadow-lg"
                                onClick={() => handleFollow(user._id)}
                            >
                                Follow
                            </button>
                        </div>
                    )}
                </div>
                <hr />
            </>
        ))}

    </div>
}
export default MyUsers