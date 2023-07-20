import React from 'react'
import data from '@/data/Ticket/common-card2.json'
import Card2 from '@/components/common-card2/common-card2'


export default function crad2() {

  //樣板說明:

  // 後續已傳入值為主 id為必需
  // 而status代表卡片樣式 1:以賢  2:德  3:宣  4:朝隆
  // hover 已處理
  // 目前功能缺陷: RWD 手機板樣式未完成 尚未連接資料庫





  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <div
        className='d-flex justify-content-center'
        style={{ margin: '60px', gap: '30px' }}
      >
        {data.data.map((v, i) => {
          return (
            <Card2 key={v.id} id={v.id} img_src={v.img_src} name={v.name} time={v.time} introduce={v.introduce} like={v.like} cart_src={v.cart_src} towheresrc={v.towheresrc} status={v.status} />
          )
        }
        )}
      </div>
    </>
  )
}
