import React from 'react';
import { useEffect, useState } from 'react'
import FilterButtons from '@/components/cart/cart-filter-button';
import CartList from '@/components/cart/cart-list';

import { useTicketCart } from '@/hooks/use-ticket-cart';
import { useFoodCart } from '@/hooks/use-food-cart';


import NoSSR from '@/components/NoSSR';

export default function Cart() {
  const { ticketItems } = useTicketCart()
  const { foodItems } = useFoodCart()


  const initialType = () => {
    if (ticketItems.length == 0 && foodItems.length == 0) {
      return '購物車內無商品';
    } else if (ticketItems.length == 0) {
      return '美食商品'
    } else {
      return '票券商品'
    }
  }
  const [type, setType] = useState(initialType);









  //現在購物欄位
  return (
    <div id="cart-page">
      {/* 1.購物順序 */}
      <div className='d-flex justify-content-between' id="cart-steps">
        <p className="now-step">1<span>確認購物車內商品</span></p>
        <p >2<span>填寫付款與運送資訊</span></p>
        <p>3<span>完成購買</span></p>
      </div>
      {/* 2.購物車內商品 */}
      <div id="cart-products">
        <NoSSR>
          {/* 2-1 選擇商品類型 */}
          <FilterButtons type={type} setType={setType} />
          {/* 2-2 購物車table */}

          <CartList type={type} />
        </NoSSR>

        {/* <CartListNoSSR type={type} /> */}



      </div>
    </div>

  )
}