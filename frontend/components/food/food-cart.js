// 引入React庫和React的useState函數
import React, { useState } from 'react'
// 引入Card.css檔案，用於定義卡片的樣式
import './food-card.module.scss'

// 定義Card元件，帶有一些props，如image, title, content, isFavorite和onFavoriteClick
function Card({ image, title, content, isFavorite, onFavoriteClick }) {
  // 定義一個名為hover的狀態，並設置初始值為false
  const [hover, setHover] = useState(false)

  // 返回卡片元件
  return (
    // 根據hover狀態添加或移除'hover'類別
    // 當鼠標進入卡片時，設置hover狀態為true
    // 當鼠標離開卡片時，設置hover狀態為false
    <>
      <div
        className={`card ${hover ? 'hover' : ''}`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
         {/* 顯示圖片 */}
        <img className="card-image" src={image} alt={title} />
        {/* 顯示收藏按鈕，並根據isFavorite的狀態顯示不同的圖標 */}
        {/* 當點擊收藏按鈕時，調用onFavoriteClick函數 */}
        <div className="favorite-icon" onClick={onFavoriteClick}>
          {isFavorite ? '❤️' : '🤍'}
        </div>
        {/* 卡片主體部分 */}
        <div className="card-body">
          {/* 顯示標題 */}
          <h2 className="card-title">{title}測試</h2>
          {/* 如果hover狀態為true，則顯示內容 */}
          {hover && <p className="card-content">{content}</p>}
        </div>
      </div>
    </>
  )
}

// 導出Card元件，以便在其他地方使用
export default Card
