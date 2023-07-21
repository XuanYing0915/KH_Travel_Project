import { useState } from 'react'
import Image from 'next/image'
//載入資料測試
import data from '@/data/hotel/hotelKH.json'

export default function hotelCard2({v}) {
  //收藏函式-------------------------
  const initState = data.data.map((v, i) => {
    return { ...v }
  })

  // 初始化定義狀態
  const [lovestate, setLoves] = useState(initState)

  const toggleFav = (hotel_id) => {
    const newlove = lovestate.map((v) => {
      if (v.hotel_id === hotel_id) return { ...v, like: !v.like }
      else return { ...v }
    })
    setLoves(newlove)
  }


  return (
    <>
      {lovestate.map((v, i) => {
        // 圖片載入測試
        // const img = require(`@/assets/Wl0quzCsyB.jpg`)
        const img = require(`@/public/images/hotel/花季.jpg`)
        return (
          /* card本體 */
          <div className="commonCard2 my-3" key={v.hotel_id}>          
              {/* 圖片框架 */}
              <div className="imgBox">
                <Image
                  src={img}
                  style={{ height: '315px', width: '100%' }}
                  alt={v.hotel_name}
                />
              </div>     
              <div>           
                <h4 className="fontst h4">{v.hotel_name}</h4>          
                <div className="footer">
                </div>
              </div>     
          </div>
        )
      })}

      <style jsx>
        {`
          .commonCard2 {
            aspect-ratio: 3 / 4;
            width:360px;
            box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25),
              -4px 0px 4px 0px rgba(0, 0, 0, 0.25);
            border-radius: 5px;
            border: 1px solid #bababa;
            background: #fff;
            padding:0px
          }

          .imgBox {
            margin: 30px 30px 15px 30px;
          }
          .footer {
            display: flex;
            justify-content: space-between;
            margin: 0 30px 15px 30px;
          }
          .iconblock {
            display: flex;
            align-items: flex-end;
            gap: 10px;
          }
          .fontst {
            font-family: Hanuman;
            font-weight: 700;
          }
          .h4 {
            margin: 0 30px 0 30px;
            color: #0d5654;
            font-size: 24px;
            letter-spacing: 4.8px;
          }
          .p {
            margin: 15px 0 0 0;
            font-size: 16px;
            letter-spacing: 3.2px;
          }
          .p-st1 {
            color: #f09f03;
          }
          .p-st2 {
            color: #7fb8b6;
          }
          .buttonStyle {
            border: 0;
            background: transparent;
          }
        `}
      </style>
    </>
  )
}
