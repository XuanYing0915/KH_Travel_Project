import { useState } from 'react'
import Link from 'next/link'
const initialProducts = [
  {
    "product-type": 2,
    "id": 1,
    "picture": "https://via.placeholder.com/100.png",
    "name": "A門票",
    "type": "大人",
    "price": "599",
    "count": 1,
    "subtotal": 599
  },
  {
    "product-type": 2,
    "id": 2,
    "picture": "https://via.placeholder.com/100.png",
    "name": "A門票",
    "type": "兒童",
    "price": 529,
    "count": 2,
    "subtotal": 1058
  },
  {
    "product-type": 2,
    "id": 3,
    "picture": "https://via.placeholder.com/100.png",
    "name": "A門票",
    "type": "兒童",
    "price": 529,
    "count": 2,
    "subtotal": 1058
  },]

export default function ShoppingCart() {

  const [products, setProducts] = useState(initialProducts)

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



  return (
    <div >

      <table className="col-12 mb-5" id="cart-list">
        <thead >
          <tr>
            <th className='col-5'>品名</th>
            <th className='col-2'>規格</th>
            <th>單價</th>
            <th className='col-2'>數量</th>
            <th>小計</th>
            <th>刪除</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            return (
              <>
                <tr key={product.id}>
                  <td>
                    <img src={product.picture}></img>
                    <a className='ps-4 fw-bolder text-decoration-underline' href=''>{product.name}</a>
                  </td>
                  <td>{product.type}</td>
                  <td>$ {product.price}</td>
                  <td>
                    <button onClick={() => {
                      // const newCount = product.count - 1
                      if (product.count === 1) {
                        remove(product.id)
                      } else {
                        updateCount(product.id, -1)
                      }
                    }}
                      className='count-btn count-btn-minus'>–</button>
                    <input type="number" id="product-count" value={product.count} onChange={
                      (event) => enterCount(product.id, (event.target.valueAsNumber))
                    } />

                    <button onClick={() => {
                      updateCount(product.id, 1)
                    }}
                      className='count-btn count-btn-add'>+</button>
                  </td>
                  <td>$ {product.subtotal}</td>
                  <td>

                    <i className="bi bi-trash3-fill cart-delete btn"
                      onClick={() => {
                        remove(product.id)
                      }}></i>

                  </td>
                </tr>
              </>
            )
          })}

        </tbody>


      </table>
      <p id="cart-total">共 <span>{products.length}</span> 項商品</p>
    </div>
  )
}