import React from 'react'
import Card2 from '@/components/common-card2/common-card2'
import ProductCard from '../../components/food/product-card'


export default function crad2() {
  //樣板說明:

  // 後續已傳入值為主 id為必需 其他皆有預設值

  // 而status代表卡片樣式 1:以賢  2:德  3:宣  4:朝隆 5.likecard
  // 同時因應圖片庫不同改變地址
  // 由於樣式可切換使用 這裡不只定
  // 1.hotel 2.ticket  3.attraction 4.food 5.like


  // 預設值區域
  //   id,
  //   img_src = '',    圖片相對路徑
  //   name = '',       標題
  //   time = '',       第二層文字
  //   introduce = '',  第三層文字
  //   like = false,    收藏切換
  //   cart_src = '#',  購物車用 尚未定義
  //   towheresrc = '#',點擊卡片連結位置
  //   status = 1,      判定卡片樣式
  //   imgrouter = '',    (圖片路徑資料夾) images/{這邊的名稱}/img_src


  return (
    <>
      <div
        className="row d-flex justify-content-center flex-column"
        style={{ margin: '60px', gap: '10px' }}
      >
        {/* 以下可用註解自行開關查看樣式缺少資料的狀況 */}
        {/* 假設為status=1 住宿用卡片 所需資料 id img_src name like towheresrc status(預設1 所以可以不給) imgrouter*/}
        <Card2
          id={1}
          img_src="洲際.jpg"
          name="洲際飯店"
          like={true}
          imgrouter="hotel"
        />
        {/* 假設為status=2 票眷用卡片 所需資料 id img_src name introduce like towheresrc status imgrouter*/}
        <Card2
          id={2}
          img_src="打狗英國領事館5.jpg"
          name="英國領事館"
          introduce="英國領事館說明"
          like={false}
          status={2}
          imgrouter="ticket"
        />
        <ProductCard
          key={4}
          id={4}
          merchant_id={4}
          img_src={'黑松露奶油蕈菇雞肉麵.jpg'}
          name={'黑松露奶油蕈菇雞肉麵'}
          price={130}
          introduce={'品味與濃郁交織，香氣四溢，令人沉醉於其中的絕佳咖啡享受'}
        />
        {/* 假設為status=3 景點用卡片 所需資料 id img_src name time introduce like towheresrc status imgrouter*/}
        <Card2
          id={3}
          img_src="大港橋01.jpg"
          name="大港橋"
          time="09:00-18:00"
          introduce="大港橋介紹"
          like={true}
          status={3}
          imgrouter="attraction"
        />
      </div>
    </>
  )
}
