import React, { useState, useEffect } from 'react'
import Weather from '@/components/hotel/weather'
import LoveIcon from '../common-card2/love-icon' //收藏愛心
import NoLoveIcon from '../common-card2/nolove-icon' //收藏愛心
import Link from 'next/link'
import { useAuthJWT } from '@/hooks/use-auth-jwt' // 0815引用JWT認證
import Swal from 'sweetalert2'

export default function MyComponent({ data, cardid, like, who = 1 }) {
  //0815引用會員判斷
  const { authJWT } = useAuthJWT()
  const numberid = authJWT.userData.member_id

  const onClickHandler = (e) => {
    e.preventDefault() //阻止氣泡事件
    e.stopPropagation()
    if (!authJWT.isAuth) {
      Swal.fire('請加入會員')
      return
    }
    // 如果使用者已認證，執行喜愛功能的餘下部分
    const isLiked = !lovestate.like
    const newLoveState = { ...lovestate, like: !lovestate.like, cardid: cardid }
    setLoves(newLoveState)
    postdatatosever(newLoveState, isLiked) //寫入資料庫
    console.log('我來測試看看:', lovestate)
  }

  // 圖片載入
  const img = `/images/hotel/${data.hotel_img}`
  const [lovestate, setLoves] = useState({ like, cardid, numberid, who }) //收藏
  const postdatatosever = (lovestate, isLiked) => {
    fetch('http://localhost:3005/hotelfavorites/like', {
      method: 'POST',
      body: JSON.stringify(lovestate),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
      .then((v) => v.json())
      .then(() => {
        if (isLiked) {
          alert('收藏成功')
        } else {
          alert('取消收藏')
        }
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  return (
    <div className="detailHead">
      <div className="detailhotelname">
        <div style={{ display: 'flex' }}>
          <h2>{data.hotel_name}</h2>
          {/* 收藏 */}
          <button className="favoritebtm" onClick={onClickHandler}>
            {lovestate.like ? <LoveIcon /> : <NoLoveIcon />}
          </button>
        </div>
        <hr />
        <div className="detailinfomation">
          <div>
            <h4>地址 ｜ {data.hotel_address}</h4>
            <h4>電話 ｜ {data.hotel_tel}</h4>
            <h4>定價 ｜ TWD{data.hotel_price}</h4>
            <h4>
              設施 ｜ 健身中心 、室內游泳池、免費停車場 <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              &nbsp;家庭房、無障礙設施、SPA 及養生會館
            </h4>
            <Link href={`/hotel/room/${data.hotel_id}`}>
              <button className="reservebtm">預定客房</button>
            </Link>
          </div>
          <div className="imgframe">
            <img className="imgphoto" src={img} alt="" />
          </div>
        </div>
        <hr />
        <section className="detailsection">
          <div className="hotelIntroduce">
            <h4>飯店介紹</h4>
            <p className="text-p">{data.hotel_introduction}</p>
          </div>
        </section>
      </div>
      <div>
        <h2>飯店位置</h2>
        <hr />
        <iframe
          src={`https://maps.google.com?output=embed&q=${data.hotel_address}`}
          frameborder="1"
          width="500"
          height="400"
          style={{
            // border: '10px solid #fff',
            outline: 'solid 1px #ffce56',
            borderRadius: '10px',
            padding: '10px',
            marginLeft: '100px',
            margin: '50px',
          }}
        ></iframe>
        <Weather />
      </div>
    </div>
  )
}
