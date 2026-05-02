import { Link } from "lucide-react";
import React, { useState, createContext, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { logout } from "../app/features/authSlice";

// Create a context for user data
export const UserContext = createContext(null);

const Navbar = () => {
    const {user} = useSelector(state => state.auth)
    const dispatch = useDispatch
    const navigate = useNavigate()

    const logoutUser = () => {
        if (setUser) setUser(null);
        navigate('/')
        dispatch(logout())
    }

    // Default to a guest user if no user is logged in
    const displayUser = user || { name: 'Guest' };

    return (
<div className='shadow bg-white'>
     <nav className='flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800 transition-all'>
        <Link to='/'>
        <img src="/logo.svg" alt="logo" className="h=11 w-auto"/>
        </Link>
<div className='flex items-center gap-4 text-sm'>
    <p className='max-sm:hidden'>
        Hi, {displayUser?.name}
        <button onClick={logoutUser} className='bg-white hover:bg-slate-50 border border-gray-300 px-7 py-1.5 rounded-full active:scale-95 transition-all'>Logout
        </button>
    </p>
</div>
     </nav>
</div>
    )
}
export default Navbar
