"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/Header";

interface User {
  id: number;
  email: string;
  name: string;
  createdAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Ошибка загрузки пользователей:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: number) => {
    if (!confirm('Удалить пользователя?')) return;
    
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
        method: 'DELETE',
      });
      fetchUsers();
    } catch (error) {
      console.error('Ошибка удаления:', error);
    }
  };

  return (
    <main className="w-full min-h-screen bg-[#E7EAFA]">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-semibold text-[#1D2023] mb-8 text-center md:text-left">
          Список пользователей
        </h1>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-[#626C77]">Загрузка...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center shadow-[0_4px_16px_0_rgba(0,0,0,0.08)]">
            <p className="text-[#626C77]">Пользователей пока нет</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_16px_0_rgba(0,0,0,0.08)]">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-[#BCC3D0]/20">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#1D2023]">ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#1D2023]">Email (логин)</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#1D2023]">Имя</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#1D2023]">Дата регистрации</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#1D2023]">Действия</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#BCC3D0]/20">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-[#1D2023]">{user.id}</td>
                      <td className="px-6 py-4 text-sm text-[#2662F3]">{user.email}</td>
                      <td className="px-6 py-4 text-sm text-[#1D2023]">{user.name}</td>
                      <td className="px-6 py-4 text-sm text-[#626C77]">
                        {new Date(user.createdAt).toLocaleDateString('ru-RU')}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="text-red-500 hover:text-red-700 transition-colors font-medium"
                        >
                          Удалить
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}