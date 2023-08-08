import { useState } from 'react'
import LoveIcon from './love-icon'
import NoLoveIcon from './nolove-icon'

//收藏函式 需求 1.現在狀態 2.卡片id 3.會員id
// { like,cardid, numberid }
export default function TestLikeCollect() {
  //預設資料
  const like = false
  const cardid = 'A0000001'
  const numberid = 'qaz2.0'

  //收藏函式-------------------------
  // 初始化定義狀態
  const [lovestate, setLoves] = useState({ like, cardid, numberid })
  console.log(lovestate)
  //切換函式
  const toggleFav = (clickid) => {
    if (cardid === clickid) {
      setLoves({ ...lovestate, like: !lovestate.like })
    }
  }
  // 收藏丟資料庫(一半)
  const likecollect = (lovestate) => {
    if (lovestate.like) {
      postdatatosever(lovestate)
    } else {
      postdatatosever(lovestate)
    }
  }

  //fetch區域
  const postdatatosever = (lovestate) => {
    fetch('/localhost:3005/tk/like', {
      method: 'POST',
      body: JSON.stringify(lovestate),
      //   {"like":false,"cardid":"A0000001","numberid":"qaz2.0"}
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
      .then((response) => response.json())
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
        }}
      >
        {lovestate.like ? <LoveIcon /> : <NoLoveIcon />}
      </button>
    </>
  )
}
