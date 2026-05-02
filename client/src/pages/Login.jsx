import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../configs/api'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { login } from '../app/features/authSlice'

const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.email || !formData.password) {
            return toast.error("Fill all fields")
        }

        try {
            const { data } = await api.post('/api/users/login', formData)

            dispatch(login({ user: data.user, token: data.token }))

            localStorage.setItem('token', data.token)

            toast.success(data.message)

            navigate('/app')

        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        }
    }

    return (
        <div className='flex items-center justify-center min-h-screen'>
            <form onSubmit={handleSubmit} className="w-[350px] border p-6 rounded-xl">

                <h1 className="text-2xl mb-4">Login</h1>

                <input name="email" placeholder="Email" onChange={(e)=>setFormData({...formData,email:e.target.value})} className="w-full mb-2 p-2 border" />
                <input name="password" type="password" placeholder="Password" onChange={(e)=>setFormData({...formData,password:e.target.value})} className="w-full mb-2 p-2 border" />

                <button className="w-full bg-green-500 text-white p-2 mt-3">Login</button>

            </form>
        </div>
    )
}

export default Login