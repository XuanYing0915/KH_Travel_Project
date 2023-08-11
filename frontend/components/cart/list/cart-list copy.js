import { each } from 'jquery';
import { useState } from 'react'

export default function CartList(filter_products) {

  const [products, setProducts] = useState(Object.entries(filter_products)[0][1]);
  

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
  //刪除全部商品
  
  const deleteAll = () => {
    setProducts('')
  }
  //
  const sumPrice = products.map(v => v.subtotal).reduce((a, b) => a + b,0)

  //三位一撇
  function three(num) {
    const parts = num.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');// '$' +
}






  return (
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
        <p className="cart-total">共＄ <span>{three(sumPrice)}</span> 元</p>
      </div>

    </div>
  )
}