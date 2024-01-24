
import './App.css'
import './index.css';
import Signup from './components/Signup';
import Login from './components/Login';
import Feed from './components/Feed';
import {BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Appber from './components/Appber';
import MyUsers from './components/Users';
import { useSetRecoilState } from 'recoil';
import { userState } from './store/atoms/user';
import { useEffect } from 'react';
import Profile from './components/Profile';
function App() {


  return (
    <>
      <Router>
        <Appber/>
        <InitUser/>
        <Routes>
          <Route path='/' element={<Signup/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/feed' element={<Feed/>}></Route>
          <Route path='/users' element={<MyUsers/>}></Route>
          <Route path='/profile' element={<Profile/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export function InitUser(){
  const setUser = useSetRecoilState(userState)
  const init = async () =>{
    try{
      const response = await fetch('http://localhost:8001/auth/me',{
        method:'GET',
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-type": "application/json",
        }
      })
      if(response.ok){
        const data = await response.json()
        if (data) {
          setUser({isLoading:false,user:{id:data._id,username:data.username,followers:data.followers,following:data.following}});
          console.log(data);
        } else {
          setUser({ isLoading: true, user:  null  })
          
        }
      }
    }catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    init()
  },[])
  return <></>
}

export default App
