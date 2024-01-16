
import './App.css'
import './index.css';
import Signup from './components/Signup';
import Login from './components/Login';
import Feed from './components/Feed';
import {BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Appber from './components/Appber';
function App() {


  return (
    <>
      <Router>
        <Appber/>
        <Routes>
          <Route path='/' element={<Signup/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/feed' element={<Feed/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
