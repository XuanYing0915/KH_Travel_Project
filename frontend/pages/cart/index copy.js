
import CartIndex2 from '@/components/cart';


export default function Cart() {
  //現在購物欄位
  return (
    <div id="cart-index">
      {/* 1.購物順序 */}
      <div className='d-flex justify-content-between' id="cart-steps">
        <p className="now-step">1<span>確認購物車內商品</span></p>
        <p >2<span>填寫付款與運送資訊</span></p>
        <p>3<span>完成購買</span></p>
      </div>
      {/* 2.購物車內商品 */}
      <CartIndex2 />
    </div>

  )
}