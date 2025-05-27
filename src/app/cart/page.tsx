'use client'
import { useQuery } from "@tanstack/react-query";
import { productsApi } from "../products/api";
import { ICartItem } from "../types/cart";

export default function CartPage() {
    const { data: cartItems, isLoading, error} = useQuery<ICartItem, Error, ICartItem[]>({
        queryKey: ['cart'],
        queryFn: productsApi.getCart
    })
    if (isLoading) {
        return <div>Загрузка...</div>;
    }
    if (error) {
        return <div>Ошибка: {error.message}</div>;
    }

    return (
        <div>
            {
                cartItems && (
                    cartItems.map((item) => (
                        <div key={item.id}>
                            <h2>{item.name}</h2>
                            <p>Цена: {item.price}</p>
                            <p>Количество: {item.quantity}</p>
                            <p>Сумма: {item.price * item.quantity}</p>
                             <button onClick={() => removeItemFromCart(item.id)}>Удалить</button>
          <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>Увеличить</button>
                        </div>
                    ))
                )
                
            }       
        </div>
    );
}