import React from 'react'
import Title from '@/components/title'
import Card2 from '@/components/common-card2/common-card2'

const hotelSearch = () => {
  return (
    <div className="detailWrapper">
      <h2>高雄萬豪酒店</h2>
      <hr />
      <h4>地址 ｜ 台南市中西區海安路二段366巷</h4>
      <h4>電話 ｜ 0978-999888</h4>
      <h4>定價 ｜ TWD3000~5800</h4>
      <h4>
        設施 ｜ 健身中心 、室內游泳池、免費停車場 <br />
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;家庭房、無障礙設施、SPA
        及養生會館
      </h4>
      <div>
        <img className="imgphoto" src="/images/hotel/洲際.jpg" alt="" />
      </div>
      <hr />
      <h4>飯店介紹</h4>
      <p className="text-p">
        高雄萬豪酒店為全台最大萬豪酒店，座落於於愛河地區，鄰近凹仔底森林公園。酒店距高雄國際機場僅25分鐘車程，距高鐵站15分鐘，距捷運凹仔底站步行5分鐘，交通便利性極佳。
        酒店會議及宴會空間分佈於 8 樓、10 樓及 11
        樓，總面積達2,518坪，稱霸南台灣；面積最大的萬享大宴會廳空間挑高、氣派華麗，面積約
        847 坪可容納約 2,000
        人；首創兩座戶外禮堂，滿足不同場合及宴會型態。從13到33樓共700間客房，12種不同房型，設計經典兼具現代風格〪12
        樓健身中心設有室內溫水游泳池、水療池以及維琪浴，幫助紓壓煥發身心。
        酒店提供多樣精緻美食，包括歐陸餐廳、頂級中、西、日式佳餚美饌，為賓客締造賓至如歸奢華體驗。
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
      <Title title="周邊景點" style="title_box_dark" />
      <div className="card-dog">
        <Card2 />
        <Card2 />
        <Card2 />
        <Card2 />
      </div>
      <Title title="周邊美食" style="title_box_dark" />
      <div className="card-dog">
        <Card2 />
        <Card2 />
        <Card2 />
        <Card2 />
      </div>
    </div>
  )
}

export default hotelSearch
