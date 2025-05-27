export interface IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
}

export type TUpdateProduct = Omit<IProduct, 'name'| 'description' | 'price' >;