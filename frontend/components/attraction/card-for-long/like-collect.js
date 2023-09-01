import { useState, useEffect } from 'react'
// icon
import { BsSuitHeartFill, BsSuitHeart } from 'react-icons/bs'

// toast
import FavoriteSuccess from '@/components/attraction/toast-alert/favorite-success.js'
import FavoriteError from '@/components/attraction/toast-alert/favorite-error.js'
import FavoriteRemove from '@/components/attraction/toast-alert/favorite-remove.js'
//收藏函式 需求 1.現在狀態 2.卡片id 3.會員id
// { like,cardid, numberid }like, cardid, numberid

// 缺少 會員id外部引入
export default function LikeCollect({ like, cardid, numberid, who = 1 }) {
  //預設資料
  // const like = true
  // const cardid = 3000000007
  // const numberid = 900008

  //收藏函式-------------------------
  // 初始化定義狀態
  const [lovestate, setLoves] = useState({ like, cardid, numberid, who })
  // console.log('lovestate:', lovestate)
  // console.log('lovestate:', JSON.stringify(lovestate))
  //切換函式
  const toggleFav = (clickid) => {
    if (cardid === clickid) {
      setLoves({ ...lovestate, like: !lovestate.like })
    }
  }

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
        console.log(data.like)
        if (data.like) {
          FavoriteSuccess('收藏')
        } else if (!data.like) {
          FavoriteRemove('已取消收藏，再逛一下吧!')
        } else {
          FavoriteError('收藏')
        }
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  //收藏函式-------------------------
  return (
    <>
      <button
        className="a-card-buttonStyle"
        onClick={(e) => {
          e.preventDefault() //阻止氣泡事件
          e.stopPropagation()
          toggleFav(cardid) //切換狀態
          postdatatosever(lovestate) //寫入資料庫
        }}
      >
        {lovestate.like ? (
          <BsSuitHeartFill size={40} color="#FFCE56" />
        ) : (
          <BsSuitHeart size={40} color="#FFCE56" />
        )}
      </button>
      <style jsx>
        {`
          .a-card-buttonStyle {
            position: absolute;
            top: 0;
            right: 0;
            margin: 0;
            padding: 0;
            border: none;
            background: none;
            cursor: pointer;
            outline: none;
          }
        `}
      </style>
    </>
  )
}
