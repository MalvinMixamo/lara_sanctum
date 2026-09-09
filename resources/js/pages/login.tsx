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
         <div className="w-full h-screen flex items-center justify-center bg-slate-700">
            <div className="flex flex-row px-5 py-6 bg-orange-50 justify-between w-[35%] rounded">
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <form onSubmit={handleLogin} className="flex flex-col gap-5">
                <h1 className="font-bold text-2xl">Selamat datang di Porsi</h1>
                <div className="flex flex-col gap-2">
                    <label htmlFor="email">Email :</label>
                    <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className=" focus:bg-[#aee1e7] focus:outline-none px-2 py-1 border border-slate-200 rounded-md"
                    />    
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="password">Password :</label>
                    <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className=" focus:bg-[#aee1e7] focus:outline-none px-2 py-1 border border-slate-200 rounded-md"
                    />
                </div>
                <input type="submit" value="Submit" className="bg-slate-200 py-3 rounded-md font-bold text-slate-700 cursor-pointer hover:bg-slate-500 transition-all duration-500 gentle"/>
            </form>
            <div className="w-1/2 h-64 overflow-hidden flex items-center">
                <img src={car} alt="" />
            </div>
         </div>
         </div>
        </>
    );
}