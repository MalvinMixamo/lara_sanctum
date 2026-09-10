import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './axios'; // Sesuaikan lokasi file axios kamu

// Interface untuk struktur data user dari API
interface User {
  id: number;
  name: string;
  email: string;
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    api.get<User>('/user')
      .then((response) => {
        setUser(response.data)
        console.log(response.data)
      })
      .catch((err: any) => {
        console.error('Gagal mengambil data user:', err)
        setError('Gagal memuat data profil.')

        if (err.response && err.response.status === 401) {
          localStorage.removeItem('token')
          navigate('/login')
        }
      });
  }, [navigate]);

  const handleLogout = async (): Promise<void> => {
    try {
      await api.post('/logout')
    } catch (err: any) {
      console.error('Logout error:', err)
    } finally {
      localStorage.removeItem('token')
      navigate('/login')
    }
  };


  return (
    <div className="flex justify-center items-center h-screen bg-slate-700">
      <div className="bg-orange-50 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Profile</h2>

        {error ? (
          <p className="text-red-500 text-center mb-4">{error}</p>
        ) : (
          <div className="space-y-4 mb-6">
            <div className="border-b pb-2">
              <span className="text-gray-500 text-sm block">Name</span>
              <span className="text-lg font-semibold text-gray-800">{user?.name}</span>
            </div>

            <div className="border-b pb-2">
              <span className="text-gray-500 text-sm block">Email</span>
              <span className="text-lg font-semibold text-gray-800">{user?.email}</span>
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 cursor-pointer hover:bg-red-800 transition-colors duration-300 ease-in-out text-white font-medium py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}