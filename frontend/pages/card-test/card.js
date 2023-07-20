import React from 'react'
import Card2 from '@/components/common-card2/common-card2'

export default function crad2() {

  //樣板說明:(先暫定修改data內的card state 來改變樣式)
  // 後續已傳入值為主
  // state 1:以賢  2:德  3:宣  4:朝隆
  // 目前功能缺陷:
  

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <div className="d-flex justify-content-center" style={{'margin':'60px'}}>
        <Card2 />
        <Card2 />
        <Card2 />
        <Card2 />
      </div>
    </>
  )
}
