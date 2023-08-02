import React, { useState, useEffect } from 'react';
import Weather from '@/components/hotel/weather'

const MyComponent = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3005/hotelkh')
      .then(response => {
        if (!response.ok) { throw Error(response.statusText); }
        return response.json();
      })
      .then(data => {
        const hotelData = data.find(hotel => hotel.hotel_id === 500010001);
        setData(hotelData);
      })
      .catch(error => setError(error.toString()));
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
     {data ? 
      <div>
          <h2>{data.hotel_name}</h2>
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
          <div>
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
          </div>
        </section>
      </div>
      : 'Loading...'}
    </div>
  );
};

export default MyComponent;
