import { useEffect, useState } from 'react'
import FilterButtons from '@/components/cart/cart-filter-button';
import CartList from '@/components/cart/list/cart-list';
import Link from 'next/link';
import { useTicketCart } from '@/hooks/use-ticket-cart';
import { useFoodCart } from '@/hooks/use-food-cart';

export default function CartIndex() {
    
    const initialProducts = [
        {
            
            "id": 1001,
            "product-type": 1,
            "picture": "https://via.placeholder.com/100.png",
            "name": "A美食",
            "type": "大人",
            "price": "599",
            "count": 1,
            "subtotal": 599
        },
        {
            
            "id": 1002,
            "product-type": 1,
            "picture": "https://via.placeholder.com/100.png",
            "name": "A美食",
            "type": "兒童",
            "price": 529,
            "count": 2,
            "subtotal": 1058
        },
        {
            "id": 1003,
            "product-type": 1,

            "picture": "https://via.placeholder.com/100.png",
            "name": "A美食",
            "type": "兒童",
            "price": 529,
            "count": 2,
            "subtotal": 1058,
        },
        {
            "id": 2001,
            "product-type": 2,

            "picture": "https://via.placeholder.com/100.png",
            "name": "B門票",
            "type": "大人",
            "price": "599",
            "count": 1,
            "subtotal": 599
        },
        {
            "id": 2002,
            "product-type": 2,

            "picture": "https://via.placeholder.com/100.png",
            "name": "B門票",
            "type": "兒童",
            "price": 529,
            "count": 2,
            "subtotal": 1058
        },
        {
            "id": 2003,
            "product-type": 2,

            "picture": "https://via.placeholder.com/100.png",
            "name": "B門票",
            "type": "兒童",
            "price": 529,
            "count": 2,
            "subtotal": 1058
        },
        
    ]
    const [type, setType] = useState('票券商品');
    // console.log(initialProducts)
    const filterByType = (products, type) => {
        if (type === "美食商品") return products.filter((v) => v['product-type'] == 1)
        if (type === "票券商品") return products.filter((v) => v['product-type'] == 2)
        
        return products
    }
    // useEffect(() => {
    //     console.log(type)
    // }, [type])
    

    return (

        <>
            <div className='py-4' id="cart-products">

                {/* 2-1 選擇商品類型 */}
                <FilterButtons type={type} setType={setType} />
                {/* 2-2 購物車table */}

                <CartList type={type}
                    localproducts={initialProducts}
                />
            </div>
            

        </>
    )
}
