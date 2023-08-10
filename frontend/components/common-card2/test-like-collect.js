import { useState, useEffect} from 'react'
import LoveIcon from './love-icon'
import NoLoveIcon from './nolove-icon'

//收藏函式 需求 1.現在狀態 2.卡片id 3.會員id 4.共同化需求 table表單 或一個判斷即可
// { like,cardid, numberid }like, cardid, numberid
export default function TestLikeCollect() {
  //預設資料
  const like = true
  const cardid = 3000000007
  const numberid = 900008

  //收藏函式-------------------------
  // 初始化定義狀態
  const [lovestate, setLoves] = useState({ like, cardid, numberid })
  console.log('lovestate:', lovestate)
  console.log('lovestate:', JSON.stringify(lovestate))
  //切換函式
  const toggleFav = (clickid) => {
    if (cardid === clickid) {
      setLoves({ ...lovestate, like: !lovestate.like })
    }
  }

  //fetch區域 0809 重新處理---->改成判定離開頁面才丟當前狀態
  const postdatatosever = (lovestate) => {
    fetch('http://localhost:3005/tk/like', {
      method: 'POST',
      body: JSON.stringify(lovestate),
      //   {"like":false,"cardid":"A0000001","numberid":"qaz2.0"}
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
    .then((v) => v.json())
    .then((data) => {
      console.log(data)
      // Handle data
    })
    .catch((err) => {
      console.log(err.message)
    })
  }



  //收藏函式-------------------------
  return (
    <>
      <button
        className="buttonStyle"
        onClick={(e) => {
          e.preventDefault() //阻止氣泡事件
          toggleFav(cardid)
          // alert('已加入收藏 or 已取消收藏') //依回傳值查看 尚未設定
          // postdatatosever(lovestate)   //先阻止寫入購物車
        }}
      >
        {lovestate.like ? <LoveIcon /> : <NoLoveIcon />}
      </button>

    </>
  )
}
