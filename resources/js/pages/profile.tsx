import { useNavigate } from "react-router-dom"
import api from "./axios";

export default function Profile(){
    const navigate = useNavigate();

    const handleLogout = async()=>{
        try{
            api.post('/logout')
        }catch(err){
            console.error('Logout error: ', err)
        }finally{
            localStorage.removeItem('token')
            navigate('login')
        }
    }
    return (
        <div>
            <h1>Hello World</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}