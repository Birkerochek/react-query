'use client'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { productsApi } from "./api";
import { IProduct } from "../types/product";

export default function ProductPage() {
    const queryClient = useQueryClient();
    const addToCartMutation = useMutation<IProduct, Error, IProduct>({
        mutationFn: productsApi.addToCart,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products", "cart"] });
        },
    })
  const {
    data: products,
    isLoading,
    error,
  } = useQuery<IProduct, Error, IProduct[]>({
    queryKey: ["products"],
    queryFn: productsApi.getProducts,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      {products &&
        products.map((product) => (
          <div key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Цена: {product.price}</p>
            <p>Количество: {product.quantity}</p>
            <button onClick={() => addToCartMutation.mutate({...product, quantity: 1})}>Добавить в корзину</button>
          </div>
        ))}
    </div>
  );
}
