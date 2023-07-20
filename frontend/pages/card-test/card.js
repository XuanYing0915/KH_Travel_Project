import React from 'react'
import useRWD from '@/components/useRWD'
import Card2 from '@/components/common-card2/common-card2'


export default function crad2() {
  const screen =useRWD()
  //樣板說明:(先暫定修改data內的card state 來改變樣式)
  // 後續已傳入值為主
  // state 1:以賢  2:德  3:宣  4:朝隆
  // hover 已處理
  // 目前功能缺陷: RWD 手機板樣式未完成 尚未連接資料庫 傳遞值修改 
  



  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <div
        className={
          screen === 'pc' || screen ==='1500'
            ? 'd-flex justify-content-center'
            : 'row d-flex justify-content-center'
        }
        style={{ margin: '60px' }}
      >
        <Card2 />
        <Card2 />
        <Card2 />
        <Card2 />
      </div>
    </>
  )
}
