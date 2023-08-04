import React from 'react'
import CardList from '@/components/cart/cart-list'

export default function CartIndex() {
  return (
    <div id="cart-index">
      {/* 1.購物順序 */}
      <div className='d-flex justify-content-between border-bottom' id="cart-steps">
        <p className="now-step">1<span>確認購物車內商品</span></p>
        <p >2<span>填寫付款與運送資訊</span></p>
        <p>3<span>完成購買</span></p>
      </div>

      {/* 2.購物車內商品 */}
      <div className='py-3' id="cart-products">
        {/* 2-1 選擇商品類型 */}
        <ul className='d-flex'>
          <li>美食商品(<span>0</span>)</li>
          <li className='now-product-type'>票券商品(<span>2</span>)</li>
          <li>住宿商品(<span>0</span>)</li>
        </ul>

        {/* 2-2 購物車table */}
        <CardList />
      </div>
      {/* 3.按鈕列 */}
      <div>
        <button className='btn ' style={{ backgroundColor: '#7FB8B6', color: '#fff' }}>繼續購物</button>
        <button className='btn ' style={{ backgroundColor: '#D05B62', color: '#fff' }}>刪除全部商品</button>
        <button className='btn ' style={{ backgroundColor: '#FFc700', color: '#fff' }}>去買單</button>
      </div>

    </div>
  )
}
