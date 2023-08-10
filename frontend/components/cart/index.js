import { useEffect, useState } from 'react'
import FilterButtons from '@/components/cart/cart-filter-button';
import CartList from '@/components/cart/list/cart-list';
import Link from 'next/link';

export default function CartIndex() {
    const initialProducts = [
        {
            "product-type": 1,
            "id": 1,
            "picture": "https://via.placeholder.com/100.png",
            "name": "A美食",
            "type": "大人",
            "price": "599",
            "count": 1,
            "subtotal": 599
        },
        {
            "product-type": 1,
            "id": 2,
            "picture": "https://via.placeholder.com/100.png",
            "name": "A美食",
            "type": "兒童",
            "price": 529,
            "count": 2,
            "subtotal": 1058
        },
        {
            "product-type": 1,
            "id": 3,
            "picture": "https://via.placeholder.com/100.png",
            "name": "A美食",
            "type": "兒童",
            "price": 529,
            "count": 2,
            "subtotal": 1058,
        },
        {
            "product-type": 2,
            "id": 1,
            "picture": "https://via.placeholder.com/100.png",
            "name": "B門票",
            "type": "大人",
            "price": "599",
            "count": 1,
            "subtotal": 599
        },
        {
            "product-type": 2,
            "id": 2,
            "picture": "https://via.placeholder.com/100.png",
            "name": "B門票",
            "type": "兒童",
            "price": 529,
            "count": 2,
            "subtotal": 1058
        },
        {
            "product-type": 2,
            "id": 3,
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
    useEffect(() => {
        console.log(type)
    }, [type])

    return (

        <>
            <div className='py-4' id="cart-products">

                {/* 2-1 選擇商品類型 */}
                <FilterButtons type={type} setType={setType} />
                {/* 2-2 購物車table */}

                <CartList
                    filter_products={filterByType(initialProducts, type)}
                />
            </div>
            {/* 3.按鈕列 */}
            <div className='pb-4 cart-btn-group'>
                <button className='btn btn-back' >繼續購物</button>
                <button className='btn btn-delete'>刪除全部商品</button>
                
                <Link
                    className=" btn btn-nextpage"
                    href="/cart/payment"
                    role="button">
                    <button ><span>去買單</span></button>
                    </Link>

            </div>

        </>
    )
}
