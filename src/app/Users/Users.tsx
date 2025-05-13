'use client'
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Users() {
        
    async function fetchUsers(){
        const res = await axios.get('http://localhost:5000/users');
        return res.data;
    }
    const { isLoading, error, data } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers
    });

    
    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {data && data.map((user: any) => (
                <div key={user.id}>
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                    <p>{user.phone}</p>
                </div>
            ))}
        </div>
    );
}