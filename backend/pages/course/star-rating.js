import { useState } from 'react'

export default function StarRating() {
  // 記錄分數0~5
  const [rating, setRating] = useState(0)

  return (
    <>
      <h1>星星評分範例</h1>
      {Array(5)
        .fill(1)
        .map((v, i) => {
          // 每個星星的分數
          const score = i + 1

          return (
            <button
              key={i}
              className={score <= rating ? 'on' : 'off'}
              onClick={() => {
                setRating(score)
              }}
            >
              &#9733;
            </button>
          )
        })}
      <span>你選了{rating}分</span>
      {/* 以下使用styled-jsx語法套用本元件專用樣式 */}
      <style jsx>
        {`
          button {
            background-color: transparent;
            border: none;
            outline: none;
            cursor: pointer;
          }
          .on {
            color: gold;
          }
          .off {
            color: gray;
          }
        `}
      </style>
    </>
  )
}