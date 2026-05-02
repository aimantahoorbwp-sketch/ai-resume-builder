import { Lock, Mail, User2Icon } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../configs/api'
import toast from 'react-hot-toast'

const Register = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.name || !formData.email || !formData.password) {
            return toast.error("All fields required")
        }

        try {
            const { data } = await api.post('/api/users/register', formData)

            localStorage.setItem("token", data.token)

            toast.success(data.message)

            navigate('/app')

        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        }
    }

    return (
        <div className='flex items-center justify-center min-h-screen'>
            <form onSubmit={handleSubmit} className="w-[350px] border p-6 rounded-xl">

                <h1 className="text-2xl mb-4">Register</h1>

                <input name="name" placeholder="Name" onChange={handleChange} className="w-full mb-2 p-2 border" />
                <input name="email" placeholder="Email" onChange={handleChange} className="w-full mb-2 p-2 border" />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full mb-2 p-2 border" />

                <button className="w-full bg-green-500 text-white p-2 mt-3">Register</button>

            </form>
        </div>
    )
}

export default Register