import { useNavigate } from "react-router-dom"
import api from "./axios";
import dashboard from "../../../public/Screenshot 2026-09-09 182134.png"

export default function Profile(){
    const navigate = useNavigate();

    const handleLogout = async()=>{
        try{
            api.post('/logout')
        }catch(err){
            console.error('Logout error: ', err)
        }finally{
            localStorage.removeItem('token')
            navigate('/login')
        }
    }
    return (
        <div className="w-full">
            <div className="w-full">
                <img className="h-screen" src={dashboard} alt="" />
            </div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}