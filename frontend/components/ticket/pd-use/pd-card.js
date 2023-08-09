import { useState,useEffect } from 'react'
//可能需要ID ? 商品名稱?=title
// need{title , note=備註 --->資料庫忘記寫的東西,price ,number=商品點選數目,key}
function Pdcard({ title, note, price, number, key }) {
  //add an reduce function in this
  const [card, setCount] = useState({})
  const add = () => {
    setCount({ ...card, count: card.count + 1 })
    console.log(card)
  }

  const reduce = () => {
    if (card.count > 0) {
      setCount({ ...card, count: card.count - 1 })
      console.log(card)
    }
  }
  // use localstage in this example
  let count = JSON.parse(localStorage.getItem(title)) || 0
  // 設定資料

  useEffect(() => {
    localStorage.setItem(`${card.name}`, JSON.stringify(card))
    setCount({ name: title, price: price, count: count })
  }, [card.name])

  // 取得資料
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem(card.name))
    if (data.count > 0) setCount(data)
    console.log(localStorage)
  }, [])

  // // 函式設定
  // const clearLocalS = () => {
  //   localStorage.removeItem('myData')
  // }
  // const setNewLocalS = () => {
  //   //塞資料進去
  //   localStorage.setItem('id', JSON.stringify(newData))
  // }

  return (
    <>
      {/* 卡片框架 */}
      <div className="pd-card between" key={key}>
        {/* 左 */}
        <div className="left-text">
          <div className="title text_24_b">{card.title}</div>
          <div className="note text_16">僅限12歲以下購買</div>
        </div>
        {/* 右 */}
        <div className="right-button">
          {/* 價格 */}
          <div className="text_16 price_text">TWD{card.price}</div>
          {/* 按鈕 */}
          <div className="countBtn">
            <button className="btnStyle text_24_b" onClick={reduce}>
              -
            </button>
            <div className="countbox">
              <div className="countNumber text_24_b">{card.count}</div>
            </div>
            <button className="btnStyle text_24_b" onClick={add}>
              +
            </button>
          </div>
          {/* 放入購物車 */}
          <button className="buybtn">加入購物車</button>
        </div>
      </div>
    </>
  )
}

export default Pdcard
