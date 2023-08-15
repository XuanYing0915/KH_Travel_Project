import { useState, useEffect } from 'react'

// need{id=id,title=標題 , note=備註 --->資料庫忘記寫的東西,price=價格 ,key}
function Pdcard({ tk_id, id, title, tk_expiry_date, price, tk_image_src }) {
  //add an reduce function in this
  const [card, setCount] = useState({})
  const [ogdata, setOgdata] = useState({})

  const add = () => {
    setCount({ ...card, count: card.count + 1 })
    console.log(card)
  }
  const reduce = () => {
    if (card.count > 0) {
      setCount({ ...card, count: card.count - 1 })
      // console.log(card)
    }
  }
  // 設定初始資料
  useEffect(() => {
    setCount({ tk_id: tk_id, id: id, name: title, price: price, count: count, img: tk_image_src })
    setOgdata({
      name: title,
      price: price,
      tk_expiry_date: tk_expiry_date,
    })
  }, [card.name, ogdata.name])


  // 如果已經存在的商品陣列是null或undefined，則建立一個新陣列，否則將現有的JSON字串解析為陣列
  // function 
  const getlocal = () => {
    const pdttext = localStorage.getItem('ticketCart')
    const pdList = pdttext ? JSON.parse(pdttext) : []
    return pdList;
  }

  // 判定初始值count
  let count = 0
  if (localStorage.getItem('ticketCart')) {
    const pdList = getlocal()
    for (let i = 0; i < pdList.length; i++) {
      if (pdList[i].id === id) {
        count = pdList[i].count
      }
    }
  }

  // 當數量>0 設定資料丟到本地端讓購物車存取
  function setNewLocalS(pd) {
    //取得陣列
    const pdList = getlocal()
    // 將目前點選的商品名稱加入到陣列中
    let found = false;
    for (let i = 0; i < pdList.length; i++) {
      if (pdList[i].id === pd.id) {
        pdList[i].count = pd.count;
        found = true;
        break
      }
    }
    if (!found) {
      pdList.push(pd);
    }
    // 將更新後的陣列存回localStorage
    localStorage.setItem('ticketCart', JSON.stringify(pdList))
    alert('已加入購物車')
  }

  //當數量為0 取消購物車內容(本地端)
  function deleteLocalS(pd) {
    //取得陣列
    const pdList = getlocal()
    // 检查有無相同的ID
    const sameid = pdList.filter(v => v.id === pd.id);
    if (sameid.length > 0) {
      // 將過濾掉重複資料
      const resetPdList = pdList.filter(v => v.id !== pd.id);
      // 將更新後的陣列存回localStorage
      localStorage.setItem('ticketCart', JSON.stringify(resetPdList))
      alert('已刪除購物車')
    } else {
      alert('請填寫數量')
    }
  }

  return (
    <>
      {/* 卡片框架 */}
      <div className="pd-card between" key={id}>
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
              } else {
                deleteLocalS(card)
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
