import React, { useState, useEffect } from 'react'
import ProductCard from '@/components/member/card-fav'
import { useRouter } from 'next/router'
import Page from '@/components/attraction/search/page'
import styles from '@/components/member/fav-food-list.module.scss'
import { useAuthJWT } from '@/hooks/use-auth-jwt'
import axios from 'axios'

export default function ProductList() {
  const { authJWT } = useAuthJWT()
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 4 // 假設每頁有10個產品

  const router = useRouter()
 
  useEffect(() => {
    // 在组件加载时获取订单数据
    fetchOrderData()
  }, [])
  const fetchOrderData = async () => {
    try {
      const memberId = authJWT.userData.member_id; // 從 authJWT 中獲取用戶 ID
      const response = await axios.get(
        `http://localhost:3005/api/fav/fav-food/${memberId}`
      );
      // 假设你有一个获取订单数据的API
      console.log(response.data); 
      setProducts(response.data)
    } catch (error) {
      console.error('Error fetching order data:', error)
    }
  }
  
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
    
    <div className={styles['box']}>
      <div className={styles['product-list']}>
      {currentProducts.length < 1 ? (
          <div className={styles.boldAndLarge}>查無美食收藏資料</div>
        ) : (
          currentProducts.map((product) => (
            <ProductCard
              tosrc={'food'}
              key={product.merchant_id}
              id={product.merchant_id}
              img_src={product.img}
              name={product.name_chinese}
              introduce={product.introduction_card}
              log={'food'}
            />
          ))
        )}
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
