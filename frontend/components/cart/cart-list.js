import { useState } from 'react'
import Link from 'next/link'
const initialProducts = [
  {
    "product-type": 1,
    "id": 1,
    "picture": "https://via.placeholder.com/100.png",
    "name": "A美食",
    "type": "大人",
    "price": "599",
    "count": 1,
    "subtotal": 599
  },
  {
    "product-type": 1,
    "id": 2,
    "picture": "https://via.placeholder.com/100.png",
    "name": "A美食",
    "type": "兒童",
    "price": 529,
    "count": 2,
    "subtotal": 1058
  },
  {
    "product-type": 1,
    "id": 3,
    "picture": "https://via.placeholder.com/100.png",
    "name": "A美食",
    "type": "兒童",
    "price": 529,
    "count": 2,
    "subtotal": 1058,
  },
  {
    "product-type": 2,
    "id": 1,
    "picture": "https://via.placeholder.com/100.png",
    "name": "B門票",
    "type": "大人",
    "price": "599",
    "count": 1,
    "subtotal": 599
  },
  {
    "product-type": 2,
    "id": 2,
    "picture": "https://via.placeholder.com/100.png",
    "name": "B門票",
    "type": "兒童",
    "price": 529,
    "count": 2,
    "subtotal": 1058
  },
  {
    "product-type": 2,
    "id": 3,
    "picture": "https://via.placeholder.com/100.png",
    "name": "B門票",
    "type": "兒童",
    "price": 529,
    "count": 2,
    "subtotal": 1058
  },
  {
    "product-type": 3,
    "id": 1,
    "picture": "https://via.placeholder.com/100.png",
    "name": "C門票",
    "type": "大人",
    "price": "599",
    "count": 1,
    "subtotal": 599
  },
  {
    "product-type": 3,
    "id": 2,
    "picture": "https://via.placeholder.com/100.png",
    "name": "C門票",
    "type": "兒童",
    "price": 529,
    "count": 2,
    "subtotal": 1058
  },
  {
    "product-type": 3,
    "id": 3,
    "picture": "https://via.placeholder.com/100.png",
    "name": "C門票",
    "type": "兒童",
    "price": 529,
    "count": 2,
    "subtotal": 1058
  },
]

export default function ShoppingCart({
  product_type = 1,
}) {

  const [products, setProducts] = useState(initialProducts.filter((v) => {
    return v['product-type'] == product_type
  }))

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



export default function CardList() {
  return (
    <>
        {/* <table>
            <tr></tr>
        </table> */}
    </>
  )
}