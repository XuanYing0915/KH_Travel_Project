import { useFoodCart } from '@/hooks/use-food-cart';
import Link from 'next/link';
import FoodOrder from '@/components/cart/food/order';


export default function FoodPayment() {
  


  return (
    <div id="cart-page">
      {/* 1.購物順序 */}
      <div className='d-flex justify-content-between border-bottom' id="cart-steps">
        <p >1<span>確認購物車內商品</span></p>
        <p className="now-step">2<span>填寫付款與運送資訊</span></p>
        <p>3<span>完成購買</span></p>
      </div>
      {/* 2 */}
      <FoodOrder />
      
    </div>

  )
}