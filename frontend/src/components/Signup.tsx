import { useState } from "react";
import { userState } from "../store/atoms/user";
import { useSetRecoilState } from "recoil";
import { useNavigate,Link } from "react-router-dom";
import config from "../config";

const Signup = () => {
    const navigate = useNavigate()
    const url = config.backendUrl
    const [formData,setFormData] = useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:''
    })
    const setUser = useSetRecoilState(userState)
    const handleInputChange = (e: { target: { name: string; value: string; }; })=>{
        const {name,value} =e.target; 
        setFormData({
            ...formData,
            [name]:value
        })
    }
    const handleSubmit = async(e: { preventDefault: () => void; }) =>{
        e.preventDefault();
        console.log('handlesubmit')
        try{
            const response = await fetch(`${url}/auth/signup`,{
                method:'POST',
                body:JSON.stringify({
                    email:formData.email,
                    username:formData.name,
                    password:formData.password
                }),
                headers:{
                    'Content-type':'application/json'
                }
            })
            if(response.ok){
                const data = await response.json()
                localStorage.setItem("token" ,data.token)
                setUser({isLoggedIn:true,user:{id:data.newUser._id,username:data.newUser.username,followers:data.newUser.followers,following:data.newUser.following}})
                navigate("/feed")
                console.log(data)
            }
        }catch(error){
            console.log(error)
        }

    }
    
    return <>

        <div className="flex flex-col items-start  p-6 md:flex-row md:p-20 ">
                <div className="w-full md:w-1/2 mb-10 md:mb-0  ">
                    <div className="text-pink-400 text-3xl font-medium">TweetX</div>
                    <button className="font-medium py-2 px-12 rounded border border-gray-500 mt-10 hover:border-pink-500"> <Link to={"/login"}>Login</Link></button>
                    <div className="text-gray-500 text-3xl font-semibold mt-16">Create Account</div>
                    <form className="w-full mt-10 flex flex-col" onSubmit={handleSubmit}>
                        {/* Add your form elements here */}
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            className="bg-gray-100 rounded-lg w-full md:w-2/4 py-5 px-4 mb-6 focus:outline-none focus:shadow-outline"
                            placeholder="Name"
                            required
                            onChange={handleInputChange}
                        />
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            className="bg-gray-100 rounded-lg w-full md:w-2/4 py-5 px-4 mb-6 focus:outline-none focus:shadow-outline"
                            placeholder="Email"
                            required
                            onChange={handleInputChange}
                        />
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            className="bg-gray-100 rounded-lg w-full md:w-2/4 py-5 px-4 mb-6 focus:outline-none focus:shadow-outline"
                            placeholder="Password"
                            required
                            onChange={handleInputChange}
                        />
                        <input
                            type="password"
                            id="confirm password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            className="bg-gray-100 rounded-lg w-full md:w-2/4 py-5 px-4 mb-6 focus:outline-none focus:shadow-outline"
                            placeholder="Confirm Password"
                            required
                            onChange={handleInputChange}
                        />
                        <button className="font-medium py-3 px-6 rounded bg-pink-500 mt-10 w-1/3 md:w-1/5">Sign up</button>
                    </form>
                </div>
                <div className="md:w-1/2 hidden md:block ">
                    {/* Add your image here */}
                    <img src={"https://img.freepik.com/free-vector/happy-man-online-dating-via-laptop_74855-7495.jpg?w=826&t=st=1706160344~exp=1706160944~hmac=7fd41670c7afce08dbc93d20bad6ac5f432a797a12f25c51a7ddca99585e3f4c"} alt="Your Image" className="w-2/3 h-auto rounded-lg" />
                </div>
            </div>
        
    </>
}
export default Signup;