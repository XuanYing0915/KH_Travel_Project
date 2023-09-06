// 引入 React 所需的函數和元件
import React, { useState, useEffect } from 'react'
import CartIconEmpty from './cart-Icon-empty'
import CartIconFilled from './cart-Icon-filled'
import { useFoodCart } from 'hooks/use-food-cart'

import FavoriteSuccess from '../attraction/toast-alert/favorite-success'
import FavoriteRemove from '../attraction/toast-alert/favorite-remove'
import AOS from 'aos'
import 'aos/dist/aos.css'
import 'animate.css'

export default function ProductCard({
  // 設定產品卡片的預設屬性
  id = 1,
  merchant_id = 1,
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
  // 購物車
  const { addItem, removeFoodItem } = useFoodCart()

  // 處理添加或移除購物車的邏輯
  const addToCart = () => {
    // 獲取購物車
    const foodCart = JSON.parse(localStorage.getItem('foodCart') || '[]')

    // 檢查商品是否已在購物車中
    const productIndex = foodCart.findIndex((item) => item.id === id)

    // 定義商品數量
    const quantity = 1 // 你可以根據需求設定數量

    if (productIndex === -1) {
      // 若商品不在購物車裡，將商品加入購物車
      foodCart.push({ id, merchant_id, name, img_src, price, quantity })
      let item = { id, merchant_id, name, img_src, price, quantity }
      console.log(item)
      addItem(item)
      FavoriteSuccess('已加入購物車') // 顯示加入購物車的訊息
      setInCart(true) // 更新狀態為已加入購物車
    } else {
      // 若商品已在購物車裡，將商品從購物車移除
      // foodCart.splice(productIndex, 1)
      removeFoodItem(id)
      FavoriteRemove('已從購物車移除') // 顯示已從購物車移除的訊息
      setInCart(false) // 更新狀態為已移除
    }

    // 更新購物車的localStorage
    localStorage.setItem('foodCart', JSON.stringify(foodCart))
  }

  // 使用 useEffect 來檢查商品是否已經在購物車裡
  useEffect(() => {
    const foodCart = JSON.parse(localStorage.getItem('foodCart') || '[]')
    setInCart(foodCart.some((item) => item.id === id))
  }, [id])

  //取得資料並每次都重新渲染

  useEffect(() => {
    if (typeof window !== 'undefined') {
      AOS.init({
        once: true, // 添加這個選項
      })
    }
  }, [])

  // 產品卡片的結構和樣式
  return (
    <>
      <div
        className="commonCard2"
        data-aos="flip-up"
        data-aos-duration="2000"
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
