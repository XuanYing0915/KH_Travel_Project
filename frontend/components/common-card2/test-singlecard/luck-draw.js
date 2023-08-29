import { useState, useEffect, useContext } from 'react'
import Luckbutton from '@/components/common-card2/test-singlecard/luck-button'
import Timeset from '@/components/common-card2/test-singlecard/time-set'


//全域鉤子
import { CartContext } from '@/components/hotel/CartContext'



// 缺少:目前可以在資料庫沒資料時按  若時間有再跑時按下去會出問題(擋住即可) 6.動畫

export default function Counter123() {


  return (
    <>
      <Luckbutton />
      <Timeset />
    </>
  )
}
