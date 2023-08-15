import { useState, useEffect } from 'react'

// need{id=id,title=標題 , note=備註 --->資料庫忘記寫的東西,price=價格 ,key}
function Pdcard({ id, title, tk_expiry_date, price, key }) {
  //add an reduce function in this
  const [card, setCount] = useState({})
  const [ogdata, setOgdata] = useState({})

  const add = () => {
    setCount({ ...card, count: card.count + 1 })
    // console.log(card)
  }
  const reduce = () => {
    if (card.count > 0) {
      setCount({ ...card, count: card.count - 1 })
      // console.log(card)
    }
  }
  // 設定初始資料
  useEffect(() => {
    setCount({ id: id, name: title, price: price, count: count })
    setOgdata({
      name: title,
      price: price,
      tk_expiry_date: tk_expiry_date,
    })
  }, [card.name, ogdata.name])

  // 判定初始值count
  let count = 0
  if (localStorage.getItem(id)) {
    const cart_data = localStorage.getItem(id)
    count = JSON.parse(cart_data).count
  }

  // 當數量>0 設定資料丟到本地端讓購物車存取
  function setNewLocalS(pd){
    //塞資料進去
    const pdttext = localStorage.getItem('ticket')
    // 如果已經存在的商品陣列是null或undefined，則建立一個新陣列，否則將現有的JSON字串解析為陣列
    const pdList = pdttext ? JSON.parse(pdttext) : []
    // 將目前點選的商品名稱加入到陣列中
    if (!pdList.includes(pd.id)) {
      pdList.push(pd.id)
    }
    // 將更新後的陣列存回localStorage
    //產品ID陣列
    localStorage.setItem('ticket', JSON.stringify(pdList))
    //單一產品細節
    localStorage.setItem(`${pd.id}`, JSON.stringify(pd))
  }

  //當數量為0 取消購物車內容(本地端)

  return (
    <>
      {/* 卡片框架 */}
      <div className="pd-card between" key={key}>
        {/* 左 */}

        <div className="left-text">
          <div className="text_24_b pd-card-title">{ogdata.name}</div>
          <div className="note text_16">{ogdata.tk_expiry_date}</div>
        </div>
        {/* 右 */}
        <div className="right-button">
          {/* 價格 */}
          <div className="text_16 price_text">TWD{ogdata.price}</div>
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
          <button
            className="buybtn"
            onClick={() => {
              if (card.count > 0) {
                setNewLocalS(card)
                alert('已加入購物車')
              } else {
                alert('沒有填寫數量')
              }
            }}
          >
            加入購物車
          </button>
        </div>
      </div>
    </>
  )
}

export default Pdcard
