import { useEffect, useState } from 'react'
import FilterButtons from '@/components/cart/cart-filter-button';
import CartList from '@/components/cart/list/cart-list';

export default function CartIndex() {
    const [type, setType] = useState('美食商品');
    return (

        <>
            <div className='py-4' id="cart-products">

                {/* 2-1 選擇商品類型 */}
                <FilterButtons type={type} setType={setType} />
                {/* 2-2 購物車table */}
                <CartList type={type}/>
            </div>
            

        </>
    )
}
