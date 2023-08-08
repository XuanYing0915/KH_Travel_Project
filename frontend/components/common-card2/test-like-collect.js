import { useState } from 'react'
import LoveIcon from './love-icon'
import NoLoveIcon from './nolove-icon'

//收藏函式 需求 1.現在狀態 2.卡片id 3.會員id
export default function TestLikeCollect({ like,cardid, numberid }) {
  //收藏函式-------------------------
  // 初始化定義狀態
  const [lovestate, setLoves] = useState({ like, cardid, numberid })
  //切換函式
  const toggleFav = (clickid) => {
    if (id === clickid) {
      setLoves(!lovestate)
    }
  }
  // 收藏丟資料庫(一半)
  const likecollect = (lovestate, cardid, numberid) => {
    if (lovestate) {
      postdatatosever()
    } else {
      postdatatosever()
    }
  }

  //fetch區域

  //收藏函式-------------------------
  return (
    <>
      <button
        className="buttonStyle"
        onClick={(e) => {
          e.preventDefault() //阻止氣泡事件
          toggleFav(id)
        }}
      >
        {lovestate ? <LoveIcon /> : <NoLoveIcon />}
      </button>
    </>
  )
}
