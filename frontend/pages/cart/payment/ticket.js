import TicketOrder from "@/components/cart/ticket/order"
import PaymentForm from "@/components/cart/payment-form"

export default function TicketPayment() {
  //現在購物欄位
  return (
    <div id="cart-page">
      {/* 1.購物順序 */}
      <div className='d-flex justify-content-between border-bottom' id="cart-steps">
        <p >1<span>確認購物車內商品</span></p>
        <p className="now-step">2<span>填寫付款與運送資訊</span></p>
        <p>3<span>完成購買</span></p>
      </div>
      {/* 2 */}
      <TicketOrder />
      <a href='../'>返回修改商品</a>
      <PaymentForm />


    </div>

  )
}