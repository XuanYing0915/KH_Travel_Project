import { useState, useEffect, useContext } from 'react'
import { useAuthJWT } from '@/hooks/use-auth-jwt' // 0815引用JWT認證
import Luckbutton from '@/components/common-card2/test-singlecard/luck-button'
import Timeset from '@/components/common-card2/test-singlecard/time-set'


//全域鉤子
import { CartContext } from '@/components/hotel/CartContext'



// 缺少:目前可以在資料庫沒資料時按  若時間有再跑時按下去會出問題(擋住即可) 6.動畫

export default function Counter123() {
  //會員狀態
  const { authJWT } = useAuthJWT()
  const numberid = authJWT.userData.member_id

  return (
    <>
      {/* {!discount ? <Luckbutton /> : <div />} */}
      <Luckbutton />
      <Timeset />
    </>
  )
}
