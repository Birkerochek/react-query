'use client';
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
}

export default function CreateUser() {
    async function createUser(user: any) {
        const res = await axios.post('http://localhost:5000/users', user, {

            headers:{
                'Content-Type': 'application/json'
            }
        })
        return res.data;
    }

    const mutation = useMutation<User, Error, User>({
        mutationFn: createUser,
        
        onSuccess: (data) => {
            console.log('User created successfully', data);
        },
        onError: (error) => {
            console.error('Error creating user', error);
        }
    })
      const [userData, setUserData] = useState<User>({
        id: 0,
        name: '',
        email: '',
        phone: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData((prevUser) => ({
            ...prevUser,
            [name]: value,
            id: prevUser.id + 1
        }));
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        mutation.mutate(userData);
    }


    return (
        <div>
            <form action="" onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" value={userData.name} onChange={handleChange} />
                <input type="email" name="email" placeholder="Email" value={userData.email} onChange={handleChange} />
                <input type="text" name="phone" placeholder="Phone" value={userData.phone} onChange={handleChange} />
                
                <button type="submit" disabled={mutation.isPending}>
                    {mutation.isPending ? 'Creating...' : 'Create User'}
                </button>
            </form>
        </div>
    );
}