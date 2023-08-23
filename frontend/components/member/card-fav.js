// 引入 React 所需的函數和元件
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
// import CartIconEmpty from './cart-Icon-empty'
// import CartIconFilled from './cart-Icon-filled'


export default function ProductCard({
  // 設定產品卡片的預設屬性
  id = 1,
  merchant_id = 1,
  img_src = 'images (2).jpg',
  name = '十分飽大拼盤',
  
  introduce = '品味與濃郁交織，香氣四溢，令人沉醉於其中的絕佳咖啡享受。',
  log = '',
  tosrc = ''

}) {
  const img = `/images/${log}/${img_src}` // 設定圖片路徑
  const [hover, setHover] = useState(false) // 設定滑鼠是否懸停的狀態
  
  

  // 產品卡片的結構和樣式
  return (
    <>
      <div
        className="commonCard2"
        key={id}
        onMouseEnter={() => setHover(true)} // 滑鼠進入時，設定懸停狀態
        onMouseLeave={() => setHover(false)} // 滑鼠離開時，取消懸停狀態
      >
     <Link href={`/${tosrc}/${id}`}>
        <div className={hover ? 'imgboxhover imgbox' : 'imgbox'}>
          <img src={img} style={{ height: '100%', width: '100%' }} alt={name} />
        </div>
        <div className="textbox">
          <h4 className="font h4">{name}</h4>
          <div className="card2down">
            <div>
              <p className="font p p-st2">{introduce}</p>
             
            </div>
        
          </div>
        </div>
        </Link>
      </div>
    </>
  )
}
