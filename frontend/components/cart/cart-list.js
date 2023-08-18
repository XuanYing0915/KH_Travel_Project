// import { useState, useEffect } from 'react'
import { useTicketCart } from '@/hooks/use-ticket-cart';
import { useFoodCart } from '@/hooks/use-food-cart';
import Link from 'next/link';


export default function CartList({ type }) {
  const { ticketCart, ticketItems, plusOneTicket, minusOneTicket, removeTicketItem, clearTicketCart } = useTicketCart()
  console.log(ticketItems)
  const { foodCart, foodItems, plusOneFood, minusOneFood, removeFoodItem, clearFoodCart } = useFoodCart()
  const sumTicket = ticketItems.map(t => t.itemTotal).reduce((a, b) => a + b, 0)
  const sumFood = foodItems.map(t => t.itemTotal).reduce((a, b) => a + b, 0)
  //   useEffect(() => {
  //     setExpand(localStorage.getItem(EXPAND_STORAGE_KEY) === '1');
  // }, []);



  //三位一撇
  function three(num) {
    const parts = num.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');// '$' +
  }

  //美食商品 
  const displayFood = (
    <div className={type === '美食商品' ? '' : 'd-none'}>


      <table className="col-12 mb-5" id="cart-list">
        <thead >
          <tr>
            <th className='col-5'>品名</th>

            <th className='col-1'>單價</th>
            <th >數量</th>
            <th className='col-1'>小計</th>
            <th className='col-1'>刪除</th>
          </tr>
        </thead>
        <tbody>

          {foodItems.map((f) => {
            return (
              <tr key={f.id}>
                <td>
                  {/* <img src="/images/food/實打實招牌漢堡.jpg" alt={f.img_src}></img> */}
                  <img src={'images/food/' + `${f.img_src}`} alt={f.img_src}></img>

                  <a className='ps-4 fw-bolder text-decoration-underline' href=''>{f.name}</a>
                </td>

                <td>$ {three(f.price)}</td>
                <td className='btn-group' >
                  <button onClick={() => {
                    if (f.quantity === 1) {
                      removeFoodItem(f.id)
                    } else {
                      minusOneFood(f.id)

                    }
                  }
                  }
                    className='count-btn count-btn-minus'>–</button>
                  <button id="product-count"><input type="number" value={f.quantity} /></button>


                  <button onClick={() => {
                    plusOneFood(f.id)
                  }}
                    className='count-btn count-btn-add'>+</button>
                </td>
                <td>$ {three(f.itemTotal)}</td>
                <td>

                  <i className="bi bi-trash3-fill cart-delete btn"
                    onClick={() => {
                      removeFoodItem(f.id)
                    }}></i>

                </td>
              </tr>

            )
          })}

        </tbody>


      </table>

      <div id="cart-total">
        <p className="cart-total">共 <span>{foodItems.length}</span> 項商品</p>
        <p className="cart-total">共 <span>＄{three(sumFood)}</span> 元</p>
      </div>

      {/* 按鈕列 */}
      <div className='pb-4 cart-btn-group'>
        <Link href="/food">
          <button className='btn btn-back'>繼續購物</button>

        </Link>
        <button className='btn btn-delete'
          onClick={() =>
            clearFoodCart()}>刪除全部商品</button>
        <Link href="/cart/payment/food">
          <button className='btn btn-nextpage'>去買單</button>
        </Link>

      </div>


    </div>

  )
  //票券商品 
  const displayTicket = (

    <div className={type === '票券商品' ? '' : 'd-none'}>

      <table className={"col-12 mb-5 "} id="cart-list">
        <thead >
          <tr>
            <th className='col-5'>品名</th>

            <th className='col-1'>單價</th>
            <th >數量</th>
            <th className='col-1'>小計</th>
            <th className='col-1'>刪除</th>
          </tr>
        </thead>
        <tbody>

          {ticketItems.map((t) => {
            return (

              <tr key={t.id}>
                <td>
                  <img src={"images/ticket/" + `${t.img}`} alt='無法顯示'></img>

                  <a className='ps-4 fw-bolder text-decoration-underline' href={'/ticket/' + `${t.tk_id}`}>{t.name}</a>
                </td>

                <td>$ {three(t.price)}</td>
                <td className='btn-group' >
                  <button onClick={() => {
                    if (t.quantity === 1) {
                      removeTicketItem(t.id)
                    } else {
                      minusOneTicket(t.id)
                    }

                  }}
                    className='count-btn count-btn-minus'>–</button>
                  <button id="product-count"><input type="number" value={t.quantity} onChange={
                    (event) => enterCount(t.id, (event.target.valueAsNumber))
                  } /></button>


                  <button onClick={() => {
                    plusOneTicket(t.id)
                  }}
                    className='count-btn count-btn-add'>+</button>
                </td>
                <td>$ {three(t.itemTotal)}</td>
                <td>

                  <i className="bi bi-trash3-fill cart-delete btn"
                    onClick={() => {
                      removeTicketItem(t.id)
                    }}></i>

                </td>
              </tr>

            )
          })}
        </tbody>
      </table>

      <div id="cart-total">
        <p className="cart-total">共 <span>{ticketItems.length}</span> 項商品</p>
        <p className="cart-total">共 <span>＄{three(sumTicket)}</span> 元</p>
      </div>

      {/* 3.按鈕列 */}
      <div className='pb-4 cart-btn-group'>
        <Link href="/ticket">
          <button className='btn btn-back' >繼續購物</button>
        </Link>
        <button className='btn btn-delete'
          onClick={() => {
            clearTicketCart()
          }}>刪除全部商品</button>
        <Link href="/cart/payment/ticket">
          <button className='btn btn-nextpage' ><span>去買單</span></button>
        </Link>

      </div>

    </div>
  )

  return (
    <>

      {displayFood}
      {displayTicket}

    </>
  )
}