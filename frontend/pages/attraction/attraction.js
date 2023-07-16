import React from 'react'
// 引入標題元件
import Title from '@/components/title'
// 景點json
import attraction from '@/data/attraction/attraction.json'
// 圖片json
import img from '@/data/attraction/img.json'

// 渲染畫面
export default function Attraction() {
  return (
    <>
      <div className="container">
        {/* 上層 包含 景點名稱+基本資訊| 封面圖*/}
        <div className="row">
          <div className="col-5">
            <div className="row">
              {/* 景點名稱 */}
              <div className="attractionName">
                <div className="name d-flex align-items-center">
                  綠湖xxxxxxxx
                </div>
              </div>
            </div>
            {/* 基本資訊 */}
            {attraction.attractions.map((v, i) => {
              return (
                <div className="m-5 text_24_b" key={v.attraction_id}>
                  <div>開放時間：{v.off_day}</div>
                  <div>地址：{v.address}</div>
                  <div>
                    開放時間：{v.open_time} － {v.closed_time}
                  </div>
                  <div>電話： {v.phone}</div>
                </div>
              )
            })}
          </div>
          {/* 基本資訊結束 */}
          <div className="col-7">
            {/* 封面圖 */}
            <img
              className="title_cover"
              src="/images/attraction/綠湖.jpg" //TODO 帶入圖片資料
              alt="" //TODO 帶入資料
            />
          </div>
          {/* 封面圖結束 */}
        </div>
      </div>
      {/* 景點名稱+基本資訊| 封面圖結束 */}
      <div className="row"></div>
      <div className="col demo"> </div>
      {/* TODO 補輪播圖 */}
      {/* 預覽圖  */}
      <div className="vw-bg">
        <div className="preview-box">
          <button>
            <i className="fa-solid fa-angle-left"></i>
          </button>
          {/* 放入圖片 */}
          {img.map((v, i) => (
            <img
              key={i}
              src={`/images/attraction/${v}`}
              className="img-photo preview"
              alt={v}
            />
          ))}

          <button>
            <i className="fa-solid fa-angle-right"></i>
          </button>
        </div>
      </div>
      {/* 預覽圖結束  */}
      {/* 景點介紹 */}
      <div className="container">
        {attraction.attractions.map((v, i) => {
          const description = v.description
          {
            /* 段落切割 */
          }
          const paragraphs = description.split('\n\n')
          return (
            <div className="row d-flex" key={i}>
              {img.map((v, i) => (
                <div className="row d-flex" key={i}>
                  {/* 判斷圖文排列 */}
                  {i % 2 === 0 ? (
                    <>
                      {/* 左文右圖 */}
                      <div className="col-6 ">
                        <div className="a-text-box a-text-box-light ">
                          {paragraphs[i]}
                        </div>
                      </div>
                      <div className="col-6">
                        <img
                          src={`/images/attraction/${v}`}
                          className="a-img-box tY-20"
                          alt={v}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      {/* 右圖左文 */}
                      <div className="col-6">
                        <img
                          src={`/images/attraction/${v}`}
                          className="a-img-box  tY--20"
                          alt={v}
                        />
                      </div>
                      <div className="col-6 a-text-box a-text-box-dark ty-100">
                        {paragraphs[i]}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )
        })}
      </div>
      {/* 景點介紹結束 */}

      <div className="container">
        <div className="row">
          <div className="col-12">
            {/* 交通  */}
            <Title title="交通" />
            <div className="a-traffic-box a-text-box-dark">
              <div className="row">
                {attraction.attractions.map((v, i) => {
                  {
                    /*  段落切割 */
                  }
                  const paragraphsTraffic = v.traffic.split('\r\n')
                  {
                    /* TODO改資料庫   取消div  */
                  }
                  return (
                    <div className="col-6 d-flex flex-column" key="i">
                      {/* 呈現交通資訊段落 */}
                      <div className="mx-4">
                        {paragraphsTraffic.map((paragraph, i) => (
                          <div key={i}>{paragraph}</div>
                        ))}
                      </div>
                    </div>
                  )
                })}
                {/* //TODO地圖*/}
                <div className="col-6">
                  <div className="map-container">地圖放置處</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 周邊OO */}
        <div className="row">
          <div className="col">
            <Title title="周邊景點" />
            {/* TODO 帶入景點小卡 */}
            <div className="d-flex">
              {/* 只導入4張圖 */}
              {img.slice(0, 4).map((v, i) => {
                {
                  /* 移除圖片附檔名 */
                }
                const imgName = v.slice(0, -4)
                return (
                  <>
                    <div className="card a-card" key={i}>
                      <img
                        src={`/images/attraction/${v}`}
                        className="card-img-top"
                        alt={imgName}
                        title={imgName}
                      />

                      <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                      </div>
                    </div>
                  </>
                )
              })}
            </div>
          </div>
        </div>
        <div className="col">
          <Title title="周邊美食" />
          {/* TODO 帶入美食小卡 */}
          <div className="d-flex">
            {/* 只導入4張圖 */}
            {img.slice(0, 4).map((v, i) => {
              {
                /* 移除圖片附檔名 */
              }
              const imgName = v.slice(0, -4)
              return (
                <>
                  <div className="card a-card" key={i}>
                    <img
                      src={`/images/attraction/${v}`}
                      className="card-img-top"
                      alt={imgName}
                      title={imgName}
                    />

                    <div className="card-body">
                      <h5 className="card-title">Card title</h5>
                    </div>
                  </div>
                </>
              )
            })}
          </div>
        </div>
        <div className="col">
          <Title title="周邊住宿" />
          {/* TODO 帶入住宿小卡 */}
          <div className="d-flex">
            {/* 只導入4張圖 */}
            {img.slice(0, 4).map((v, i) => {
              {
                /* 移除圖片附檔名 */
              }
              const imgName = v.slice(0, -4)
              return (
                <>
                  <div className="card a-card" key={i}>
                    <img
                      src={`/images/attraction/${v}`}
                      className="card-img-top"
                      alt={imgName}
                      title={imgName}
                    />

                    <div className="card-body">
                      <h5 className="card-title">Card title</h5>
                    </div>
                  </div>
                </>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
