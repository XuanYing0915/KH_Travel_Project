// 引入 React 所需的函數和元件
import React, { useState, useEffect } from 'react'
import CartIconEmpty from './cart-Icon-empty'
import CartIconFilled from './cart-Icon-filled'

export default function ProductCard({
  // 設定產品卡片的預設屬性
  id = 1,
  img_src = 'images (2).jpg',
  name = '十分飽大拼盤',
  price = '130 ',
  introduce = '品味與濃郁交織，香氣四溢，令人沉醉於其中的絕佳咖啡享受。',
}) {
  const img = `/images/food/${img_src}` // 設定圖片路徑
  const [hover, setHover] = useState(false) // 設定滑鼠是否懸停的狀態
  const [inCart, setInCart] = useState(false) // 設定產品是否在購物車裡的狀態

  // 取得購物車中的商品
  const getCartItems = () => {
    const foodCart = localStorage.getItem('foodCart') || '[]'
    const cartIds = JSON.parse(foodCart)
    return cartIds.map((itemId) => JSON.parse(localStorage.getItem(itemId)))
  }

  // 使用 useEffect 來檢查商品是否已經在購物車裡
  useEffect(() => {
    const foodCart = JSON.parse(localStorage.getItem('foodCart') || '[]')
    setInCart(foodCart.includes(id))
  }, [id])

  // 處理添加或移除購物車的邏輯
  const addToCart = () => {
    if (!inCart) {
      // 若商品不在購物車裡
      // 將商品加入購物車
      const foodCart = localStorage.getItem('foodCart') || '[]'
      const cartList = JSON.parse(foodCart)
      cartList.push(id)
      localStorage.setItem('foodCart', JSON.stringify(cartList))
      localStorage.setItem(
        id,
        JSON.stringify({ id, name, img_src, price, countl: 1 })
      )
      alert('已加入購物車') // 顯示加入購物車的訊息
      setInCart(true) // 更新狀態為已加入購物車
    } else {
      // 若商品已在購物車裡
      // 將商品從購物車移除
      const foodCart = localStorage.getItem('foodCart') || '[]'
      const cartList = JSON.parse(foodCart).filter((itemId) => itemId !== id)
      localStorage.setItem('foodCart', JSON.stringify(cartList))
      localStorage.removeItem(id)
      alert('已從購物車移除') // 顯示已從購物車移除的訊息
      setInCart(false) // 更新狀態為已移除
    }
  }

  // 產品卡片的結構和樣式
  return (
    <>
      <div
        className="commonCard2"
        key={id}
        onMouseEnter={() => setHover(true)} // 滑鼠進入時，設定懸停狀態
        onMouseLeave={() => setHover(false)} // 滑鼠離開時，取消懸停狀態
      >
        <div className={hover ? 'imgboxhover imgbox' : 'imgbox'}>
          <img src={img} style={{ height: '100%', width: '100%' }} alt={name} />
        </div>
        <div className="textbox">
          <h4 className="font h4">{name}</h4>
          <div className="card2down">
            <div>
              <p className="font p p-st2">{introduce}</p>
              <p className="font p p-st1">${price}</p>
            </div>
            <div className="iconblock">
              <button className="buttonStyle" onClick={addToCart}>
                {/* 根據產品是否在購物車中，顯示不同的圖示 */}
                {inCart ? <CartIconFilled /> : <CartIconEmpty />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
