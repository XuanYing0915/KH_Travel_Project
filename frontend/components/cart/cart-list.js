import React from 'react'

export default function CardList() {
  const data = [
    {
      "product-type": 2,
      "id": 1,
      "picture": "https://via.placeholder.com/120.png",
      "name": "A門票",
      "type": "大人",
      "price": "599",
      "number": "1",
      "total": "599"
    },
    {
      "product-type": 2,
      "id": 2,
      "picture": "https://via.placeholder.com/120.png",
      "name": "A門票",
      "type": "兒童",
      "price": 529,
      "number": 2,
      "total": 1058
    },
    {
      "product-type": 2,
      "id": 3,
      "picture": "https://via.placeholder.com/120.png",
      "name": "A門票",
      "type": "兒童",
      "price": 529,
      "number": 2,
      "total": 1058
    },]
  return (
    <div >

      <table className="col-12 mb-5" id="cart-list">
        <thead >
          <tr>
            <th className='col-5'>品名</th>
            <th className='col-3'>規格</th>
            <th>單價</th>
            <th>數量</th>
            <th>小計</th>
            <th>刪除</th>
          </tr>
        </thead>
        <tbody>
          {data.map((v, i) => {
            return (
              <>
                <tr key={v.id}>
                  <td>
                    <img src={v.picture}></img>
                    <a className='ps-4 fw-bolder text-decoration-underline' href=''>{v.name}</a>
                  </td>
                  <td>{v.type}</td>
                  <td>{v.price}</td>
                  <td>{v.number}</td>
                  <td>{v.price}*{v.number}</td>
                  <td></td>
                </tr>
              </>
            )
          })}

        </tbody>


      </table>
      <p>共3項商品</p>
    </div>
  )
}
