import { IProduct } from "@/app/types/product";
import { create } from "zustand";

interface ICartStore {
    cart: IProduct[];
    addToCart: (product: IProduct) => void;
    removeFromCart: (id: number) => void;
    updateCartItem: (id: number, quantity: number) => void;
    getTotal: () => number;
}

export const useCartStore = create