// 引入 React 的 useState 鉤子
import React, { useState, useEffect } from 'react';

// 引入 Next.js 的 Link 組件，用於處理客戶端路由跳轉
import Link from 'next/link'
// 引入自定義的 icon 組件
import LoveIcon from './love-icon'
import NoLoveIcon from './nolove-icon'
import CartIcon from './crat-icon' // 注意: 這裡可能有拼寫錯誤，應該是'cart-icon'

// 定義 ProductCard 組件，帶有預設參數
export default function ProductCard({
  id = 1,
  img_src = 'images (2).jpg',
  name = '十分飽大拼盤',
  time = '130 $',
  introduce = '品味與濃郁交織，香氣四溢，令人沉醉於其中的絕佳咖啡享受。',
  like = false,
  cart_src = '#',
  towheresrc = '#',
  status = 4,
  imgrouter = '',
}) {
  // 定義 img 變數，用於圖片的路徑
  const img = `/images/food/${img_src}`
  // 使用 useState 來存儲產品的喜歡狀態
  const [lovestate, setLoves] = useState(like)
  // 定義切換喜歡狀態的函數
  const toggleFav = (clickid) => {
    if (id === clickid) {
      setLoves(!lovestate)
    }
  }

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3005/merchant-products/200100001')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);
  

  // 使用 useState 存儲滑鼠懸停的狀態
  const [hover, setHover] = useState(false)
  // 定義改變滑鼠懸停狀態的函數
  const hoverchange = (hoverstate) => {
    setHover(hoverstate)
  }

  return (
    <>
    <div>
    {products.map(product => (
      <ProductCard
        key={product.id}
        id={product.id}
        img_src={product.img_src}
        name={product.name}
        time={product.time}
        introduce={product.introduce}
        like={product.like}
        cart_src={product.cart_src}
        towheresrc={product.towheresrc}
        status={product.status}
        imgrouter={product.imgrouter}
      />
    ))}
  </div>
      <div
        className="commonCard2" // 定義 CSS class
        key={id}
        // 用於檢測滑鼠進入和離開的事件
        onMouseEnter={() => {
          hoverchange(true)
        }}
        onMouseLeave={() => {
          hoverchange(false)
        }}
      >
        {/* 使用 Next.js 的 Link 組件進行路由跳轉 */}
        <Link href={towheresrc} style={{ textDecoration: 'none' }}>
          <div className={hover ? 'imgboxhover imgbox' : 'imgbox'}>
            {/* 產品圖片 */}
            <img
              src={img}
              style={{ height: '100%', width: '100%' }}
              alt={name}
            />
          </div>
          <div className="textbox">
            {/* 產品名稱 */}
            <h4 className={status > 1 ? 'font h4' : 'font h4 text-center'}>
              {name}
            </h4>
            <div className="card2down">
              <div>
                {/* 產品時間和介紹，根據 status 來決定是否顯示 */}
                {status > 2 ? <p className="font p p-st1">{time}</p> : ''}
                {status > 1 ? (
                  <p className="font p p-st2">{introduce}</p>
                ) : (
                  <p className="fontnull">1</p>
                )}
              </div>
              <div className="iconblock">
                {/* 根據 status 顯示喜愛或購物車圖標 */}
                {status < 4 ? (
                  <button
                    className="buttonStyle"
                    onClick={(e) => {
                      e.preventDefault()
                      toggleFav(id)
                    }}
                  >
                    {lovestate ? <LoveIcon /> : <NoLoveIcon />}
                  </button>
                ) : (
                  ''
                )}
                {status > 3 ? (
                  <button
                    className="buttonStyle"
                    onClick={(e) => {
                      e.preventDefault()
                    }}
                  >
                    <CartIcon />
                  </button>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  )
}
