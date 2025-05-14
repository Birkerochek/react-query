'use client';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import UpdateUser from "../UpdateUser/UpdateUser";

export interface User {
    id: number;
    name: string;
    email: string;
    phone: number;
}

export default function Users() {
    const [updatingUser, setUpdatingUser] = useState<User | null>(null); 

    const handleUpdateUser = (user: User) => {
        setUpdatingUser(user); 
    }

    async function fetchUsers() {
        const res = await axios.get('http://localhost:5000/users');
        return res.data;
    }

    const { isLoading, error, data } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
    });

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {data && data.map((user: User) => (
                <div key={user.id}>
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                    <p>{user.phone}</p>
                    <button onClick={() => handleUpdateUser(user)}>Редактировать</button>
                </div>
            ))}
            {updatingUser && <UpdateUser user={updatingUser} />} 
        </div>
    );
}
