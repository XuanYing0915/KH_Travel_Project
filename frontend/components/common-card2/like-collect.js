import { useState, useEffect } from 'react'
import LoveIcon from './love-icon'
import NoLoveIcon from './nolove-icon'
import { useAuthJWT } from '@/hooks/use-auth-jwt' // 0815引用JWT認證

import FavoriteSuccess from '../attraction/toast-alert/favorite-success'
import FavoriteRemove from '../attraction/toast-alert/favorite-remove'
import FavoriteError from '../hotel/toast-alert/favorite-error'


//收藏函式 需求 1.現在狀態 2.卡片id 3.會員id
// { like,cardid, numberid }like, cardid, numberid

export default function LikeCollect({ like, cardid, who = 1 }) {
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

  useEffect(() => {
    setLoves({ like, cardid, numberid, who })
  }, [like, numberid])

  //fetch區域
  const postdatatosever = (lovestate) => {
    fetch('http://localhost:3005/tk/like', {
      method: 'POST',
      body: JSON.stringify(lovestate),
      //   {"like":false,"cardid":"A0000001","numberid":"qaz2.0","who":1}
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
      .then((v) => {
        if (!v.ok) {
          throw new Error('Network response was not ok')
        }
        return v.json()
      })
      .then((data) => {
        console.log('收藏成功:' + data.like)
        toggleFav(cardid) //切換狀態
        if (data.like) {
          FavoriteSuccess('收藏')
        } else {
          FavoriteRemove('收藏 刪除')
        }
      })
      .catch((error) => {
        console.error('無法收藏:', error)
        //  收藏失敗加入彈窗
        if (numberid) {
          FavoriteError('收藏')
        } else {
          FavoriteError('收藏')
        }
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
          postdatatosever(lovestate) //寫入資料庫
        }}
      >
        {lovestate.like ? <LoveIcon /> : <NoLoveIcon />}
      </button>
    </>
  )
}
