import { useState, useEffect } from 'react'
import LoveIcon from './love-icon'
import NoLoveIcon from './nolove-icon'
import { useAuthJWT } from '@/hooks/use-auth-jwt' // 0815引用JWT認證


//收藏函式 需求 1.現在狀態 2.卡片id 3.會員id    
// { like,cardid, numberid }like, cardid, numberid  

// 缺少 會員id外部引入
export default function LikeCollect({ like, cardid,  who = 1 }) {
  //預設資料
  const { authJWT } = useAuthJWT()
  const numberid = authJWT.userData.member_id
  //收藏函式-------------------------
  // 初始化定義狀態
  const [lovestate, setLoves] = useState({})
  // console.log('lovestate:', lovestate)
  // console.log('lovestate:', JSON.stringify(lovestate))
  //切換函式
  const toggleFav = (clickid) => {
    if (cardid === clickid) {
      setLoves({ ...lovestate, like: !lovestate.like })
    }
  }

  useEffect(()=>{
    setLoves({ like, cardid, numberid, who })
  },[like])

  //fetch區域
  const postdatatosever = (lovestate) => {
    fetch('http://localhost:3005/tk/like', {
      method: 'POST',
      body: JSON.stringify(lovestate),
      //   {"like":false,"cardid":"A0000001","numberid":"qaz2.0","who":1}
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
      .then((v) => v.json())
      .then((data) => {
        alert(data[1].message)
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
          e.stopPropagation()
          toggleFav(cardid) //切換狀態
          postdatatosever(lovestate) //寫入資料庫
        }}
      >
        {lovestate.like ? <LoveIcon /> : <NoLoveIcon />}
      </button>
    </>
  )
}
