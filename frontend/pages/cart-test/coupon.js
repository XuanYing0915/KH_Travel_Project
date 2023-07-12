import { useCart } from '@/hooks/use-cart'
import List from '@/components/cart/list'
import Link from 'next/link'
import { useState, useEffect } from 'react'

// 範例資料
// type: 'amount'相減，'percent'折扣
const coupons = [
  { id: 1, name: '折100元', value: 100, type: 'amount' },
  { id: 2, name: '折300元', value: 300, type: 'amount' },
  { id: 2, name: '折550元', value: 300, type: 'amount' },
  { id: 3, name: '8折券', value: 0.2, type: 'percent' },
]

export default function Coupon() {
  //可從useCart中獲取的各方法與屬性，參考README檔中說明
  const {
    cart,
    items,
    addItem,
    removeItem,
    updateItem,
    clearCart,
    isInCart,
    plusOne,
    minusOne,
  } = useCart()

  const [couponOptions, setCouponOptions] = useState(coupons)
  const [selectedCouponId, setSelectedCouponId] = useState(0)
  const [netTotal, setNetTotal] = useState(0)

  useEffect(() => {
    // 一開始沒套用折價券，netTotal和cart.cartTotal一樣
    if (!selectedCouponId) {
      setNetTotal(cart.cartTotal)
      return
    }

    const coupon = couponOptions.find((v) => v.id === selectedCouponId)

    // type: 'amount'相減，'percent'折扣
    const newNetTotal =
      coupon.type === 'amount'
        ? cart.cartTotal - coupon.value
        : Math.round(cart.cartTotal * (1 - coupon.value))

    setNetTotal(newNetTotal)
  }, [cart.cartTotal, selectedCouponId])

  return (
    <>
      <h1>購物車範例</h1>
      <p>
        <Link href="/cart-test/product-list">商品列表頁範例</Link>
      </p>

      {/* 列出cart中清單 */}
      <h4>購物車列表</h4>
      <List />
      <h4>折價券</h4>
      <div className="mb-3">
        <select
          class="form-select"
          value={selectedCouponId}
          onChange={(e) => {
            setSelectedCouponId(Number(e.target.value))
          }}
        >
          <option value="0">選擇折價券</option>
          {couponOptions.map((v) => {
            return (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            )
          })}
        </select>
        <hr />
        <p>最後折價金額: {netTotal}</p>
      </div>
      {/* 以下為測試按鈕 */}
      <h4>測試按鈕</h4>
      <div className="btn-group-vertical">
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            console.log(cart)
          }}
        >
          log cart
        </button>

        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            addItem({
              id: '111',
              quantity: 5,
              name: 'iphone',
              price: 15000,
              color: 'red',
              size: '',
            })
          }}
        >
          add item (id=111, x5)
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            addItem({
              id: '222',
              quantity: 1,
              name: 'ipad',
              price: 19000,
              color: '',
              size: '',
            })
          }}
        >
          add item (id=222, x1)
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            removeItem('222')
          }}
        >
          remove item(id=222)
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            updateItem({
              id: '222',
              quantity: 7,
            })
          }}
        >
          update id=222 item quantity to 7
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            updateItem({
              id: '111',
              quantity: 99,
            })
          }}
        >
          update id=111 item quantity to 99
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            clearCart()
          }}
        >
          clear cart
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            if (isInCart('222')) alert('id=222 item is in cart')
            else alert('no id=222  ')
          }}
        >
          check if id=222 in cart
        </button>
      </div>
    </>
  )
}
