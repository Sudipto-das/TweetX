import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../store/atoms/user";
import { useNavigate } from "react-router-dom";
const Appber = () => {
    const navigate =useNavigate()
    const [user,setUser] = useRecoilState(userState)
    console.log(user)
    return <>

        {user.user?.username && <div className="w-full flex py-5 shadow-lg fixed top-0 z-10 bg-white">
            <div className="w-3/4 m-auto flex justify-between items-center">
                <div className="font-semibold text-3xl text-pink-600">TweetX</div>
                <ul className="flex space-x-20">
                    <li className="font-semibold text-xl text-gray-400">Feed</li>
                    <li className="font-semibold text-xl text-gray-400">User</li>
                    <li className="font-semibold text-xl text-gray-400">Profile</li>
                </ul>
                <button className="font-bold bg-gray-300 rounded-lg px-5 py-2 shadow-md" onClick={()=>{
                    localStorage.removeItem('token');
                    setUser({isLoading:true,user:{username:null}})
                    navigate('/login')
                    console.log(user)
                }}>Logout</button>
            </div>
        </div>}
    </>
}
export default Appber;