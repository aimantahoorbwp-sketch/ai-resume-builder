import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import ResumeBuilder from './pages/ResumeBuilder'
import Preview from './pages/Preview'
import Register from './pages/Register';
import Login from './pages/Login'
import { UserContext } from './Components/Navbar'
import { useDispatch } from 'react-redux';
import api from './configs/api';
import { login, setLoading } from './app/features/authSlice';
import { Toaster } from 'react-hot-toast';

const App = () => {
  const [user, setUser] = useState(null);
const dispatch = useDispatch()
const getUserData = async () => {
  const token = localStorage.getItem('token')
  try {
    if(token){
      const { data } = await api.get('/api/users/data', {headers: {
        Authorization: token
      }})
      if(data.user){
        dispatch(login({token, user: data.user}))
      }
      dispatch(setLoading(false))
    }else{
      dispatch(setLoading(false))
    }
  } catch (error) {
    dispatch(setLoading(false))
    console.log(error.message)
  }
}

useEffect(()=>{
  getUserData()
},[])
  return (
    <UserContext.Provider value={{ user, setUser }}>
    <>
    <Toaster />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/app' element={<Layout />}>
          <Route index element={<Dashboard />}/>
          <Route path='builder/:resumeId' element={<ResumeBuilder />}/>
          <Route path='view/:resumeId' element={<Preview />}/>
        </Route>
      </Routes>
    </>
    </UserContext.Provider>
  
  )
}

export default App

