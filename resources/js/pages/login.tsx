'use client'
import { useState } from "react";
import car from "../../../public/banner.jpg"
import { useNavigate } from 'react-router-dom'
import api from "./axios";

export default function login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: any) => {
        e.preventDefault()
        setErrorMessage('')

        try{
            const response = await api.post('login', { email, password })
            localStorage.setItem('token', response.data.access_token)
            navigate('/profile')
        }catch (err: any){
            if (err.response) {
                setErrorMessage(err.response.data.message || 'Login gagal');
            } else {
                setErrorMessage('Gagal terhubung ke server');
            }
        }
    }
    return (
        <>
         <div className="w-full h-screen flex items-center justify-center">
            <div className="flex flex-row px-5 py-6">
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <form onSubmit={handleLogin}>
                <input 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                />
                <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                />
                <input type="submit" value="Submit" />
            </form>
            <div className="w-1/2 h-64 overflow-hidden flex items-center">
                <img src={car} alt="" />
            </div>
         </div>
         </div>
        </>
    );
}