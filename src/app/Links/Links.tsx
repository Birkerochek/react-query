import Link from "next/link";

export default function Links() {
    return (
        <div>
            <Link href={'/users'}>На юзеров</Link>
            <Link href={'/products'}>На продукты</Link>
            <Link href={'/cart'}>На корзину</Link>
        </div>
    );
}