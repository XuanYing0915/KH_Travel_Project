import { useState } from 'react'

const initialProducts = [
  {
    id: 0,
    name: '小熊餅乾',
    count: 1,
  },
  {
    id: 1,
    name: '巧克力豆餅乾',
    count: 5,
  },
  {
    id: 2,
    name: '小老板海苔',
    count: 2,
  },
]

export default function ShoppingCart() {
  const [products, setProducts] = useState(initialProducts)

  const increaseCount = (id) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, count: product.count + 1 } : product
      )
    )
  }
  //把每個取出來之後每個去使用三元運算子，ID相符的會進行設定，不相符回傳原樣

  const decreaseCount = (id) => {
    setProducts(
      products
        .map((product) =>
          product.id === id ? { ...product, count: product.count - 1 } : product
        )
        .filter((product) => product.count > 0)
    )
  }

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          {product.name} (<b>{product.count}</b>)
          <button onClick={() => increaseCount(product.id)}>+</button>
          <button onClick={() => decreaseCount(product.id)}>–</button>
        </li>
      ))}
    </ul>
  )
}
