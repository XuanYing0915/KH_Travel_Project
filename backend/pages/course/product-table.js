import data from '@/data/products.json'

// 每筆資料的物件樣子
// {
// "id": 1,
// "picture": "https://via.placeholder.com/150.png",
// "stock": 5,
// "name": "iPhone 12 Pro",
// "price": 25000,
// "tags": "蘋果,大螢幕"
// }

export default function ProductTable() {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>圖片</th>
            <th>名稱</th>
            <th>價格</th>
          </tr>
        </thead>
        <tbody>
          {data.products.map((v, i) => {
            return (
              <tr key={v.id}>
                <td>{v.id}</td>
                <td>
                  <img src={v.picture} />
                </td>
                <td>{v.name}</td>
                <td>{v.price}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}