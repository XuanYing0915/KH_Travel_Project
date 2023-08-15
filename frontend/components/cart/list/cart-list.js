import { each } from 'jquery';
import { useState, useEffect } from 'react'
import { useTicketCart } from '@/hooks/use-ticket-cart';
import { useFoodCart } from '@/hooks/use-food-cart';
import Link from 'next/link';


export default function CartList({ localproducts, type }) {
  const { ticketCart, ticketItems, plusOneTicket, minusOneTicket, removeTicketItem } = useTicketCart()
  const { foodCart, foodItems, plusOneFood, minusOneFood, removeFoodItem } = useFoodCart()
  const initialProducts = [
    {

      "id": 1001,
      "product-type": 1,
      "picture": "https://via.placeholder.com/100.png",
      "name": "A美食",
      "type": "大人",
      "price": "599",
      "count": 1,
      "subtotal": 599
    },
    {

      "id": 1002,
      "product-type": 1,
      "picture": "https://via.placeholder.com/100.png",
      "name": "A美食",
      "type": "兒童",
      "price": 529,
      "count": 2,
      "subtotal": 1058
    },
    {
      "id": 1003,
      "product-type": 1,

      "picture": "https://via.placeholder.com/100.png",
      "name": "A美食",
      "type": "兒童",
      "price": 529,
      "count": 2,
      "subtotal": 1058,
    },
    {
      "id": 2001,
      "product-type": 2,

      "picture": "https://via.placeholder.com/100.png",
      "name": "B門票",
      "type": "大人",
      "price": "599",
      "count": 1,
      "subtotal": 599
    },
    {
      "id": 2002,
      "product-type": 2,

      "picture": "https://via.placeholder.com/100.png",
      "name": "B門票",
      "type": "兒童",
      "price": 529,
      "count": 2,
      "subtotal": 1058
    },
    {
      "id": 2003,
      "product-type": 2,

      "picture": "https://via.placeholder.com/100.png",
      "name": "B門票",
      "type": "兒童",
      "price": 529,
      "count": 2,
      "subtotal": 1058
    },

  ]
  console.log(foodItems)
  console.log(ticketItems)


  const filterByType = (products, type) => {
    if (type === "美食商品") return products.filter((v) => v['product-type'] == 1)
    if (type === "票券商品") return products.filter((v) => v['product-type'] == 2)
    return products
  }


  const [products, setProducts] = useState(
    filterByType((localproducts), type)
  );
  // console.log(localproducts)

  // console.log(products)
  const updateType = (products, type) => {
    if (type === "美食商品") return products.filter((v) => v['product-type'] == 1)
    if (type === "票券商品") return products.filter((v) => v['product-type'] == 2)
    return products
  }




  // 按鈕切換商品類型
  useEffect(() => {
    setProducts(updateType(localproducts, type))
  }, [type])

  // 按鈕更新商品數量
  const updateCount = (id, value) => {
    const newProducts = products.map((v, i) => {
      if (v.id === id) return { ...v, count: v.count + value, subtotal: v.subtotal + value * v.price }
      else return { ...v }
    })
    setProducts(newProducts)
  }
  // 移除商品
  const remove = (id) => {
    const newProducts = products.filter((v) => {
      return v.id !== id
    })
    setProducts(newProducts)
  }
  // 鍵盤更新商品數量
  const enterCount = (id, value) => {
    if (value == 0) {
      remove(id)
    }
    else {
      const newProducts = products.map((v, i) => {

        if (v.id === id && value > 0) return { ...v, count: value, subtotal: value * v.price }
        else return { ...v }
      })
      setProducts(newProducts)
    }

  }

  //
  const sumPrice = products.map(v => v.subtotal).reduce((a, b) => a + b, 0)

  //三位一撇
  function three(num) {
    const parts = num.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');// '$' +
  }
  const display1 = (
    <div>

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

          {products.map((product) => {
            return (

              <tr key={product.id}>
                <td>
                  <img src={product.picture}></img>
                  <a className='ps-4 fw-bolder text-decoration-underline' href=''>{product.name}</a>
                </td>

                <td>$ {three(product.price)}</td>
                <td className='btn-group' >
                  <button onClick={() => {

                    if (product.count === 1) {
                      remove(product.id)
                    } else {
                      updateCount(product.id, -1)
                    }
                  }}
                    className='count-btn count-btn-minus'>–</button>
                  <button id="product-count"><input type="number" value={product.count} onChange={
                    (event) => enterCount(product.id, (event.target.valueAsNumber))
                  } /></button>


                  <button onClick={() => {
                    updateCount(product.id, 1)
                  }}
                    className='count-btn count-btn-add'>+</button>
                </td>
                <td>$ {three(product.subtotal)}</td>
                <td>

                  <i className="bi bi-trash3-fill cart-delete btn"
                    onClick={() => {
                      remove(product.id)
                    }}></i>

                </td>
              </tr>

            )
          })}

        </tbody>


      </table>
      <div id="cart-total">
        <p className="cart-total">共 <span>{products.length}</span> 項商品</p>
        <p className="cart-total">共 <span>＄{three(sumPrice)}</span> 元</p>
      </div>

    </div>
  )

  const displayFood = (
    <div>

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
                  <img src={f.product_image}></img>

                  <a className='ps-4 fw-bolder text-decoration-underline' href=''>{f.pd_name}</a>
                </td>

                <td>$ {three(f.price)}</td>
                <td className='btn-group' >
                  <button onClick={() => {

                    if (f.count === 1) {
                      remove(f.id)
                    } else {
                      updateCount(f.id, -1)
                    }
                  }}
                    className='count-btn count-btn-minus'>–</button>
                  <button id="product-count"><input type="number" value={f.quantity} onChange={
                    (event) => enterCount(f.id, (event.target.valueAsNumber))
                  } /></button>


                  <button onClick={() => {
                    updateCount(f.id, 1)
                  }}
                    className='count-btn count-btn-add'>+</button>
                </td>
                <td>$ {(f.itemTotal)}</td>
                <td>

                  <i className="bi bi-trash3-fill cart-delete btn"
                    onClick={() => {
                      remove(f.id)
                    }}></i>

                </td>
              </tr>

            )
          })}

        </tbody>


      </table>
      <div id="cart-total">
        {/* <p className="cart-total">共 <span>{f.length}</span> 項商品</p> */}
        {/* <p className="cart-total">共 <span>＄{three(sumPrice)}</span> 元</p> */}
      </div>

      {/* 3.按鈕列 */}
      <div className='pb-4 cart-btn-group'>
        <button className='btn btn-back' >繼續購物</button>
        <button className='btn btn-delete'>刪除全部商品</button>

        <Link
          className=" btn btn-nextpage"
          href="/cart/payment"
          role="button">
          <button ><span>去買單</span></button>
        </Link>

      </div>

    </div>
  )
  const displayTicket = (
    <div>

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

          {ticketItems.map((t) => {
            return (


              <tr key={t.id}>
                <td>
                  <img src={t.tk_product_image}></img>

                  <a className='ps-4 fw-bolder text-decoration-underline' href={t.tk_fd_id}>{t.tk_pd_name}</a>
                </td>

                <td>$ {three(t.price)}</td>
                <td className='btn-group' >
                  <button onClick={() => {

                    if (t.count === 1) {
                      remove(t.id)
                    } else {
                      updateCount(t.id, -1)
                    }
                  }}
                    className='count-btn count-btn-minus'>–</button>
                  <button id="product-count"><input type="number" value={t.quantity} onChange={
                    (event) => enterCount(t.id, (event.target.valueAsNumber))
                  } /></button>


                  <button onClick={() => {
                    updateCount(f.id, 1)
                  }}
                    className='count-btn count-btn-add'>+</button>
                </td>
                <td>$ {three(t.itemTotal)}</td>
                <td>

                  <i className="bi bi-trash3-fill cart-delete btn"
                    onClick={() => {
                      remove(t.id)
                    }}></i>

                </td>
              </tr>

            )
          })}

        </tbody>


      </table>
      <div id="cart-total">
        {/* <p className="cart-total">共 <span>{f.length}</span> 項商品</p> */}
        {/* <p className="cart-total">共 <span>＄{three(sumPrice)}</span> 元</p> */}
      </div>

      {/* 3.按鈕列 */}
      <div className='pb-4 cart-btn-group'>
        <button className='btn btn-back' >繼續購物</button>
        <button className='btn btn-delete'>刪除全部商品</button>

        <Link
          className=" btn btn-nextpage"
          href="/cart/payment"
          role="button">
          <button ><span>去買單</span></button>
        </Link>

      </div>

    </div>
  )

  return (
    <>
      {displayFood}
      {displayTicket}
      {display1}

    </>
  )
}