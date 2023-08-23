import React, { useState, useEffect } from 'react'
import ProductCard from './product-card'
import { useRouter } from 'next/router'
import Page from '@/components/attraction/search/page'

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 8 // 假設每頁有10個產品

  const router = useRouter()

  useEffect(() => {
    if (router.isReady) {
      const { merchant_id } = router.query

      if (merchant_id) {
        fetch(`http://localhost:3005/merchant-products/${merchant_id}`)
          .then((response) => response.json())
          .then((data) => setProducts(data))
          .catch((error) => console.error('Error fetching products:', error))
      }
    }
  }, [router.isReady, router.query])

  // 從所有產品中選取當前頁面上要顯示的產品
  const currentProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  )

  // 處理頁面變化的函數
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <div>
      <div className="food-product-list">
        {currentProducts.map((product) => (
          <ProductCard
            key={product.product_id}
            id={product.product_id}
            merchant_id={product.merchant_id}
            img_src={product.product_image}
            name={product.name}
            price={product.price}
            introduce={product.description}
          />
        ))}
      </div>
      <div>
        <Page
          currentPage={currentPage}
          totalPages={Math.ceil(products.length / productsPerPage)}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  )
}
