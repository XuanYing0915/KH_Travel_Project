import React, { useState, useEffect } from 'react';
import Weather from '@/components/hotel/weather'
import LoveIcon from '../common-card2/love-icon' //收藏愛心
import NoLoveIcon from '../common-card2/nolove-icon'  //收藏愛心
import Link from 'next/link';


const MyComponent = ( {data,  id = 1,like = false}) => {
    // 圖片載入
  const img = `/images/hotel/${data.hotel_img}`;
  const [lovestate, setLoves] = useState(like)   //收藏
  //收藏的切換函式
  const toggleFav = (clickid) => {
    if (id === clickid) { setLoves(!lovestate) }
  }
 
  return (
    <div>
      <div>
        <div className='detailhotelname'>
          <h2>{data.hotel_name}</h2>  
          {/* 收藏 */}
          <button
          className="favoritebtm"
            onClick={(e) => {
              e.preventDefault() //阻止氣泡事件
              toggleFav(id)
            }}
          >
            {lovestate ? <LoveIcon /> : <NoLoveIcon />}
          </button>   
        </div>
        <hr />
        <div className='detailhead'>
          <div>
            <h4>地址 ｜ {data.hotel_address}</h4>
            <h4>電話 ｜ {data.hotel_tel}</h4>
            <h4>定價 ｜ TWD{data.hotel_price}</h4>
            <h4>
              設施 ｜ 健身中心 、室內游泳池、免費停車場 <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              &nbsp;家庭房、無障礙設施、SPA 及養生會館
            </h4>
          </div>
          <div className='imgframe'>
            <img className="imgphoto" src={img} alt="" />
          </div>
        </div>
        <hr />
        <section className="detailsection">
          <div className='hotelIntroduce'>
            <h4>飯店介紹</h4>
            <p className="text-p">
            {data.hotel_introduction}
            </p>
            <h4>消費資訊</h4>
            <ol>
              <li>住宿房間均以兩人為基準，每多一人加收$400元 。</li>
              <li>汽車房提前進房時，則不享有折數優惠；但商務房不在此限。</li>
              <li>住宿逾時以每小時為一單位計費，加收費用以櫃檯公告為準。</li>
              <li>本館住宿均含精緻早餐，用餐時間依櫃檯公告為主。</li>
              <li>
                平日休息三小時，假日或特殊節日休息二小時，加休及逾時以每小時為一單位計費。
              </li>
              <li>以上價格為一般平日及假日，如遇特殊節慶以現場價格為準。</li>
            </ol>
          </div>
          <div>
            <Weather />
            <Link href={`/hotel/room/${data.hotel_id}`}>
            <button className='reservebtm'>預定客房</button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MyComponent;
