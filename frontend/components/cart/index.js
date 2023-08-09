import { useState } from 'react'
import FilterButtons from '@/components/cart/cart-filter-button';
import CartList from '@/components/cart/list/cart-list';

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
        {
            "product-type": 3,
            "id": 1,
            "picture": "https://via.placeholder.com/100.png",
            "name": "C門票",
            "type": "大人",
            "price": "599",
            "count": 1,
            "subtotal": 599
        },
        {
            "product-type": 3,
            "id": 2,
            "picture": "https://via.placeholder.com/100.png",
            "name": "C門票",
            "type": "兒童",
            "price": 529,
            "count": 2,
            "subtotal": 1058
        },
        {
            "product-type": 3,
            "id": 3,
            "picture": "https://via.placeholder.com/100.png",
            "name": "C門票",
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
        if (type === "住宿倉品") return products.filter((v) => v['product-type'] == 3)
        return products
    }

    return (

        <>
            <div className='py-4' id="cart-products">

                {/* 2-1 選擇商品類型 */}
                <FilterButtons type={type} setType={{ setType }} />
                {/* 2-2 購物車table */}
                <CartList
                    filter_products={filterByType(initialProducts, type)}
                />
            </div>
            {/* 3.按鈕列 */}
            <div className='pb-4 cart-btn-group'>
                <button className='btn btn-back' >繼續購物</button>
                <button className='btn btn-delete'>刪除全部商品</button>
                <button className='btn btn-nextpage' >去買單</button>
            </div>

        </>
    )
}
