import { useState } from "react"
import { userState } from "../store/atoms/user"
import { useSetRecoilState } from "recoil"
const Login = () => {
    const setUser = useSetRecoilState(userState)
    const [formData,setFormData] = useState({
        email:'',
        password:''
    })
    const handleInputChange=(e: { target: { name: string; value: string } })=>{
        const {name,value} =e.target
        setFormData({
            ...formData,
            [name]:value
        })

    }
    const handleSubmit=async (e: { preventDefault: () => void; })=>{
        e.preventDefault()
        const response = await fetch('http://localhost:8001/auth/login',{
            method:'POST',
            body:JSON.stringify({
                username:formData.email,
                password:formData.password
            }),
            headers:{
                'Content-type':'application/json'
            }
        })
        if(response.ok){
            const data = await response.json()
            localStorage.setItem("token",data.token)
            setUser({isLoading:false,user:{username:formData.email}})
        }
    }
    return <>
        <div className="flex flex-col items-start  p-6 md:flex-row md:p-20 ">
            <div className="w-full md:w-1/2 mb-10 md:mb-0  ">
                <div className="text-pink-400 text-3xl font-medium">TweetX</div>
                <button className="font-medium py-2 px-12 rounded border border-gray-500 mt-10 hover:border-pink-500">Create account</button>
                <div className="text-gray-500 text-3xl font-semibold mt-16">Login</div>
                <form className="w-full mt-10 flex flex-col" onSubmit={handleSubmit}>
                    {/* Add your form elements here */}

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

                    <button className="font-medium py-3 px-6 rounded bg-pink-500 mt-10 w-1/3 md:w-1/5">Login</button>
                </form>
            </div>
            <div className="md:w-1/2 hidden md:block ">
                {/* Add your image here */}
                <img src="/src/assets/happy-man-online-dating-via-laptop_74855-7495.avif" alt="Your Image" className="w-2/3 h-auto rounded-lg" />
            </div>
        </div>

    </>

}
export default Login