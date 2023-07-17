import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

//載入資料測試
import data from '@/data/Ticket/common-card2.json'

// console.log(data.data)

export default function commonCard2() {
  return (
    <>
      {data.data.map((v, i) => {
        // 圖片載入測試
        const img = require(`@/assets/${v.img_src}`)

        return (
          /* card本體 */
          <div className="commonCard2" key={v.name}>
            <Link href="#" className="linkStyle">
              {/* 圖片框架 */}
              <div className="imgBox">
                <Image
                  src={img}
                  style={{ height: '315px', width: '300px' }}
                  alt={v.name}
                />
              </div>

              {/* 下層文字框架及icon  上+下*/}
              <div>
                {/* title */}
                <h4 className="fontst h4">{v.name}</h4>
                {/* 下層+icon  左+右*/}
                <div className="footer">
                  {/* 左側文字 上+下*/}
                  <div>
                    <p className="fontst p p-st1">{v.time}</p>
                    <p className="fontst p p-st2">{v.introduce}</p>
                  </div>
                  {/* 右側icon 左+右*/}
                  <div className="iconblock">
                    {/* icon1  缺點擊收藏功能(先切換圖案)*/}
                    <button>
                      <svg
                        width="40"
                        height="41"
                        viewBox="0 0 40 41"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 0.0253906C15.525 0.0253906 20 5.14571 20 11.4622C20 5.14571 24.475 0.0253906 30 0.0253906C35.525 0.0253906 40 5.14571 40 11.4622C40 20.9822 31.915 24.3403 20.98 39.4942C20.8596 39.6606 20.7095 39.7943 20.5403 39.8861C20.371 39.9779 20.1866 40.0254 20 40.0254C19.8134 40.0254 19.629 39.9779 19.4597 39.8861C19.2905 39.7943 19.1404 39.6606 19.02 39.4942C8.085 24.3403 0 20.9822 0 11.4622C0 5.14571 4.475 0.0253906 10 0.0253906Z"
                          fill="#FFCE56"
                        />
                      </svg>
                    </button>
                    {/* icon2 點擊將資料丟出給購物車頁面*/}
                    <button>
                      <svg
                        width="40"
                        height="41"
                        viewBox="0 0 40 41"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.793 17.9713H36.4042M19.2276 10.2803V26.4314M27.6877 10.2803V26.4314"
                          stroke="#137976"
                          stroke-width="3"
                          stroke-linecap="round"
                        />
                        <g clip-path="url(#clip0_894_18902)">
                          <path
                            d="M14.8052 36.6922C15.7137 36.6922 16.4502 35.946 16.4502 35.0256C16.4502 34.1051 15.7137 33.3589 14.8052 33.3589C13.8967 33.3589 13.1602 34.1051 13.1602 35.0256C13.1602 35.946 13.8967 36.6922 14.8052 36.6922Z"
                            stroke="#137976"
                            stroke-width="3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M32.9009 36.6922C33.8094 36.6922 34.5459 35.946 34.5459 35.0256C34.5459 34.1051 33.8094 33.3589 32.9009 33.3589C31.9924 33.3589 31.2559 34.1051 31.2559 35.0256C31.2559 35.946 31.9924 36.6922 32.9009 36.6922Z"
                            stroke="#137976"
                            stroke-width="3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M1.64551 1.69189H8.22559L12.6343 24.0086C12.7847 24.7759 13.1967 25.4652 13.7982 25.9557C14.3997 26.4463 15.1523 26.7069 15.9243 26.6919H31.9139C32.6859 26.7069 33.4385 26.4463 34.04 25.9557C34.6415 25.4652 35.0535 24.7759 35.2039 24.0086L37.836 10.0252H9.87062"
                            stroke="#137976"
                            stroke-width="3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_894_18902">
                            <rect
                              width="39.4805"
                              height="40"
                              fill="white"
                              transform="translate(0 0.0253906)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )
      })}
      <style jsx>
        {`
          .commonCard2 {
            width: 360px;
            height: 480px;
            box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25),
              -4px 0px 4px 0px rgba(0, 0, 0, 0.25);
            border-radius: 5px;
            border: 1px solid #bababa;
            background: #fff;
          }
          .linkStyle {
            border: 0;
            text-decoration: none;
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
        `}
      </style>
    </>
  )
}
