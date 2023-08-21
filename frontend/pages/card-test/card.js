import React from 'react'
import Card2 from '@/components/common-card2/common-card2'

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
      <br />
      <br />
      <div
        className="row d-flex justify-content-center"
        style={{ margin: '60px', gap: '30px' }}
      >
        {/* map方式 */}
        {/* {data.data.map((v, i) => {
          return (
            <Card2
              key={v.id}
              id={v.id}
              img_src={v.img_src}
              name={v.name}
              time={v.time} 中間層文字
              introduce={v.introduce}  最下層文字
              like={v.like}  
              cart_src={v.cart_src}
              towheresrc={v.towheresrc}
              status={v.status}
              imgrouter='hotel'   --->請自行指定
            />
          )
        })} */}

        {/* 最少給值 預設為status=1*/}
        <Card2 id="1" />
        <Card2 id="1" name="潮州飯店" />
      </div>
      <hr />
      <div
        className="row d-flex justify-content-center"
        style={{ margin: '60px', gap: '30px' }}
      >
        {/* 以下可用註解自行開關查看樣式缺少資料的狀況 */}
        {/* 假設為status=1 住宿用卡片 所需資料 id img_src name like towheresrc status(預設1 所以可以不給) imgrouter*/}
        <Card2
          id={1}
          img_src="洲際.jpg"
          name="洲際飯店"
          like={true}
          towheresrc="#"
          imgrouter="hotel"
        />
        {/* 假設為status=2 票眷用卡片 所需資料 id img_src name introduce like towheresrc status imgrouter*/}
        <Card2
          id={2}
          img_src="Wl0quzCsyB.jpg"
          name="狗狗"
          introduce="目前我是一只狗狗 沒有壓力"
          like={false}
          towheresrc="#"
          status={2}
          imgrouter="ticket"
        />
        {/* 假設為status=3 景點用卡片 所需資料 id img_src name time introduce like towheresrc status imgrouter*/}
        <Card2
          id={3}
          img_src="草神.jpg"
          name="草神"
          time="09:00-18:00"
          introduce="草"
          like={true}
          towheresrc="#"
          status={3}
          imgrouter="attraction"
        />
        {/* 假設為status=4 美食用卡片 所需資料 id img_src name time introduce cart_src status imgrouter */}
        <Card2
          id={4}
          img_src="food.jpg"
          name="美食圖片"
          time="說明?"
          introduce="這一支冰棒是我最棒的味道"
          cart_src=""
          status={4}
          imgrouter="food"
        />
        {/* 假設為status=5 收藏用卡片 所需資料 id=商家OR景點OR票眷OR飯店id img_src=照片 name=標題 status=5 imgrouter=看套哪一個 */}
        <Card2
          id={5}
          img_src="Wl0quzCsyB.jpg"
          name="美食圖片美食圖片美食圖片美食圖片"
          status={5}
          imgrouter="ticket"
        />
      </div>
    </>
  )
}
