import { useState } from 'react'
import ShoppingCart from '@/components/cart/cart-list';


export default function CartIndex() {
  //現在購物欄位
  const [type, setType] = useState(2);

  let productType = 2;
  //更新商品類型
  const changeType = (type) => {
    setType(type);
    productType = type;
  }

  return (
    
    <div id="cart-index">
      {/* 1.購物順序 */}
      <div className='d-flex justify-content-between border-bottom' id="cart-steps">
        <p className="now-step">1<span>確認購物車內商品</span></p>
        <p >2<span>填寫付款與運送資訊</span></p>
        <p>3<span>完成購買</span></p>
      </div>

      {/* 2.購物車內商品 */}
      <div className='py-4' id="cart-products">
      
        {/* 2-1 選擇商品類型 */}
        <ul className='d-flex'>
          <li
            onClick={() => {
              changeType(1)
            }}
            className={(productType == 1) ? ' now-product-type' : ''}>美食商品(<span>0</span>)</li>
          <li
            onClick={() => {
              changeType(2)
            }} className={(productType == 2) ? ' now-product-type' : ''}>票券商品(<span>2</span>)</li>
          <li
            onClick={() => {
              changeType(3)
            }}
            className={(productType == 3) ? ' now-product-type' : ''}>住宿商品(<span>0</span>)</li>
        </ul>

        {/* 2-2 購物車table */}
        <ShoppingCart

        product_type={type}

        />
      </div>
      {/* 3.按鈕列 */}
      <div className='pb-4 cart-btn-group'>
        <button className='btn btn-back' >繼續購物</button>
        <button className='btn btn-delete'>刪除全部商品</button>
        <button className='btn btn-nextpage' >去買單</button>
      </div>

    </div>
  )
}