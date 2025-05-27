import axios from "axios";
import { User } from "../types/user";


const API_URL = "http://localhost:5000";

export const usersApi = {
  getUsers: async ({ signal }: { signal: AbortSignal }) => {
    const res = await axios.get<User[]>(`${API_URL}/users`, {
      signal,
    });
    return res.data;
  },
  createUser: async ({id, name, phone, email }: User) => {
    const res = await axios.post<User>(`${API_URL}/users`, {
      id,
      name,
      phone,
      email,
    });
    return res.data;
    
  },
  updateUser: async ({id, name, phone, email }: User) => {
    const res = await axios.put<User>(`${API_URL}/users/${id}`, {
      
      name,
      phone,
      email,
    });
    return res.data;
  },
    getUserById: async (id: number | string): Promise<User> => {
    const res = await axios.get<User>(`${API_URL}/users/${id}`);
    if (!res.data) throw new Error('User not found');
    return res.data;
  },
};
