// 引入React庫
import React from 'react'
// 引入ReactStars元件，這是一個第三方元件，可以用來顯示星星評分
import ReactStars from 'react-rating-stars-component'

// 定義一個StarRating元件，它接收一個名為rating的屬性
const StarRating = ({ rating }) => {
  // 返回ReactStars元件
  return (
    // ReactStars元件
    <ReactStars
      count={5} // 總共有5顆星星
      value={rating} // 現在的星星數量由rating變數控制
      size={24} // 星星的大小為24
      half={true} // 允許半顆星
      edit={false} // 禁止使用者點擊修改星星數量
      emptyIcon={<i className="far fa-star"></i>} // 空星星的樣式
      halfIcon={<i className="fa fa-star-half-alt"></i>} // 半顆星星的樣式
      filledIcon={<i className="fa fa-star"></i>} // 全部填充的星星的樣式
      activeColor="#ffd700" // 被填充的星星的顏色
      color="#ddd" // 空星星的顏色
    />
  )
}

// 將StarRating元件作為預設導出，讓其他文件可以引入使用
export default StarRating
