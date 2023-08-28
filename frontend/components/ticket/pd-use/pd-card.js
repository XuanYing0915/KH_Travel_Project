import { useState, useEffect } from 'react'
import CartIcon from '../../common-card2/crat-icon'
import { useTicketCart } from '@/hooks/use-ticket-cart'

// need{id=id,title=標題 , note=備註 --->資料庫忘記寫的東西,price=價格 ,key}
function Pdcard({ tk_id, id, title, tk_expiry_date, price, tk_image_src }) {
  //add an reduce function in this
  const [card, setCount] = useState({})
  const [ogdata, setOgdata] = useState({})

  const add = () => {
    const update = {
      ...card,
      quantity: card.quantity + 1,
      itemTotal: (card.quantity + 1) * card.price,
    }
    console.log(update)
    setCount(update)
    // console.log(card)
  }
  const reduce = () => {
    if (card.quantity > 0) {
      const update = {
        ...card,
        quantity: card.quantity - 1,
        itemTotal: (card.quantity - 1) * card.price,
      }
      console.log(update)
      setCount(update)
      // console.log(card)
    }
  }
  // 購物車
  const { addItem, removeTicketItem } = useTicketCart()

  // 設定初始資料
  useEffect(() => {
    setCount({
      tk_id: tk_id,
      id: id,
      name: title,
      price: price,
      quantity: quantity,
      img: tk_image_src,
      itemTotal: (price * quantity) || 0,
    })
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
    return pdList
  }

  // 判定初始值count
  let quantity = 0
  if (localStorage.getItem('ticketCart')) {
    const pdList = getlocal()
    for (let i = 0; i < pdList.length; i++) {
      if (pdList[i].id === id) {
        quantity = pdList[i].quantity
      }
    }
  }

  // 當數量>0 設定資料丟到本地端讓購物車存取
  function setNewLocalS(pd) {
    //取得陣列
    const pdList = getlocal()
    // 將目前點選的商品名稱加入到陣列中
    let found = false
    for (let i = 0; i < pdList.length; i++) {
      if (pdList[i].id === pd.id) {
        pdList[i].quantity = pd.quantity
        pdList[i].itemTotal = pd.itemTotal
        found = true
        break
      }
    }
    console.log(pd)
    let item = { ...pd, quantity: pd.quantity - quantity }
    addItem(item)

    alert('已加入購物車')
  }


  //當數量為0 取消購物車內容(本地端)
  function deleteLocalS(pd) {
    //取得陣列
    const pdList = getlocal()
    // 检查有無相同的ID
    const sameid = pdList.filter((v) => v.id === pd.id)
    if (sameid.length > 0) {
      // 將過濾掉重複資料
      removeTicketItem(pd.id)
      // const resetPdList = pdList.filter((v) => v.id !== pd.id)
      // 將更新後的陣列存回localStorage
      // localStorage.setItem('ticketCart', JSON.stringify(resetPdList))
      alert('已刪除購物車')
    } else {
      alert('請填寫數量')
    }
  }

  return (
    <>
      {/* 卡片框架 */}
      <div className="pd-card" key={id}>
        {/* 左 */}

        {/* <div className="left-text"> */}
        <div className="col-6 left-text">
          <div className="text_24_b pd-card-title">{ogdata.name}</div>
          <div className=" text_16 note">
            {ogdata.tk_expiry_date}
          </div>
        </div>
        {/* 右 */}
        {/* <div className="right-button"> */}
        <div className="col-6 right-button">
          {/* 價格 */}
          <div className='pricebox '>
            <div className="text_16 price_text">單價 : ${ogdata.price}</div>
            <div className="text_16 price_text">總價 : ${card.itemTotal}</div>
          </div>
          <div className="pdcard-button">
            {/* 按鈕 */}
            <div className="countBtn">
              <button className="btnStyle text_24_b" onClick={reduce}>
                -
              </button>
              <div className="countbox">
                <div className="text_24_b countNumber">{card.quantity}</div>
              </div>
              <button className="btnStyle text_24_b" onClick={add}>
                +
              </button>
            </div>
            {/* 放入購物車 */}
            <button
              className="buybtn"
              onClick={() => {
                if (card.quantity > 0) {
                  setNewLocalS(card)
                } else {
                  deleteLocalS(card)
                }
              }}
            >
              加入購物車
              <div className="mobile-use">
                <CartIcon />
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Pdcard
