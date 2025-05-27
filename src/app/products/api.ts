import axios from "axios"
import { IProduct, TUpdateProduct } from "../types/product";

export const productsApi = {
    getProducts: async () =>{
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);
        return res.data;
    },
    getCart: async () =>{
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/cart`);
        return res.data;
    },
    addToCart: async (product: IProduct) =>{
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/cart`, product);
        return res.data;
    },
    updateCartItem: async ({id, quantity}: TUpdateProduct) => {
        const res = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/cart/${id}`, { quantity });
        return res.data;
    },
    removeFromCart: async (id: number) => {
        const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/cart/${id}`);
        return res.data;
    }
}