import axios from "axios";
import { User } from "../Users/Users";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";



async function updateUser(user: User) {
    const res = await axios.put(`http://localhost:5000/users/${user.id}`, user, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return res.data;
}


export default function UpdateUser({user}: {user: User}) {

    const [formData, setFormData] = useState<User>(user)

    const mutation = useMutation<User, Error, User>({
        mutationFn: updateUser,
        onSuccess: (data) => {
            console.log('User updated successfully', data);
        },
        onError: (error) => {
            console.error('Error updating user', error);
        }
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutation.mutate(formData);
    }


    return (
        <div>
            <form action="" onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
                <button type="submit">Update User</button>
            </form>
        </div>
    );
}