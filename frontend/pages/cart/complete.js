

export default function Complete() {
  //現在購物欄位
  return (
    <div id="cart-index">
      {/* 1.購物順序 */}
      <div className='d-flex justify-content-between border-bottom' id="cart-steps">
        <p>1<span>確認購物車內商品</span></p>
        <p>2<span>填寫付款與運送資訊</span></p>
        <p className="now-step">3<span>完成購買</span></p>
      </div>
      
    </div>

  )
}