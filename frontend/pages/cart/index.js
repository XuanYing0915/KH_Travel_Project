import React from 'react';
import { useEffect, useState } from 'react'
import FilterButtons from '@/components/cart/cart-filter-button';
import CartList from '@/components/cart/cart-list';


export default function Cart() {
  const [type, setType] = useState('美食商品');

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
      <div className='py-4' id="cart-products">

        {/* 2-1 選擇商品類型 */}
        <FilterButtons type={type} setType={setType} />
        {/* 2-2 購物車table */}
        <CartList type={type} />
      </div>
    </div>

  )
}