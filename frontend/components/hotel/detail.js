import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Weather from '@/components/hotel/weather'
import LoveIcon from '../common-card2/love-icon' //收藏愛心
import NoLoveIcon from '../common-card2/nolove-icon'  //收藏愛心
import { useRouter } from 'next/router'


const MyComponent = ( {  id = 1,like = false}) => {
  const [data, setData] = useState(null);
  const [lovestate, setLoves] = useState(like)   //收藏



  const [hotel, setHotel] = useState(null);


  //收藏的切換函式
  const toggleFav = (clickid) => {
    if (id === clickid) { setLoves(!lovestate) }
  }
 
  //接收後端資料

  const getHotelData = async (hotel_id) => {
    // 連接網址
    const url = `http://localhost:3005/hotelkh/${hotel_id}`
    // 連接
    try {
      const res = await axios.get(url)
      setData(res.data) // 将获取到的数据设置到 data 状态
    } catch (error) {
      console.error(error)
    }
  }

  // 設定動態路由
  const router = useRouter()
  const { id } = router.query; // 從 URL 中獲取 id
  const [hotel, setHotel] = useState(null);

  // 當路由準備好時執行
  useEffect(() => {
    if (router.isReady) {
      const { hotel_id } = router.query
      if (hotel_id) getHotelData(hotel_id)
    }
  },[router.isReady, router.query.hotel_id]) 

  useEffect(() => {
    if (hotel_id) {
      axios.get(`http://localhost:3005/hotelkh/${hotel_id}`)
        .then(response => setHotel(response.data))
        .catch(error => console.error(error));
    }
  }, [id]);


  return (
    <div>
     {data ? 
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
          <div >
            <img className="imgphoto" src="/images/hotel/洲際.jpg" alt="" />
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
            <button className='reservebtm'>預定客房</button>
          </div>
        </section>
      </div>
      : 'Loading...'}
    </div>
  );
};

export default MyComponent;
