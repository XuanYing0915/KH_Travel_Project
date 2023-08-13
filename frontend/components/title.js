// 原始版
// import React from 'react'

// export default function Title({ title }) {
//   return (
//     <div className="title_box">
//       <div className="hr_sect ">
//         <div className="title_text">{title}</div>
//       </div>
//     </div>
//   )
// }

// 2種STYLE
import React from 'react'

// export default function Title({ title, style }) {
//   return (
//     <div className={style}>
//       <div className="hr_sect ">
//         <div className="title_text">{title}</div>
//       </div>
//     </div>
//   )

export default function Title({ title, style, fontSize }) {
  return (
    <div className={style}>
      <div className="hr_sect">
        <div
          className="title_text animate__animated animate__bounce"
          style={{ fontSize: fontSize || '40px' }}
        >
          {title}
        </div>
      </div>
    </div>
  )
}


// 文字顏色  深綠
// 引用方法
{
  /* <Title title="標題名稱" className="title-component-light" /> */
}

// title_box_dark {
//   font-weight: 600;
//   font-size: 40px;
//   line-height: 48px;
//   letter-spacing: 0.2em;
//   color: #0d5654;
//   margin: 10px;
// }

// 文字顏色   白  字16
// .title_box_light  {
//   font-weight: 600;
//   font-size: 24px;
//   line-height: px;
//   letter-spacing: 0.2em;
//   color: $font-light;
//   margin: 10px;
// }