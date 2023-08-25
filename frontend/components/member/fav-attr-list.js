import React, { useState, useEffect } from 'react'
import ProductCard from '@/components/member/card-fav'
import { useRouter } from 'next/router'
import Page from '@/components/attraction/search/page'
import styles from '@/components/member/fav-food-list.module.scss'
import { useAuthJWT } from '@/hooks/use-auth-jwt'
import axios from 'axios'

export default function AttrList() {
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
        `http://localhost:3005/api/fav/fav-attraction/${memberId}`
      );
      setProducts(response.data); // 保存結果到狀態
      console.log(response.data); 
    } catch (error) {
      console.error('Error fetching order data:', error)
    }
  }
  
  // useEffect(() => {
  //   if (router.isReady) {
  //     const { merchant_id } = router.query

  //     if (200100001) {
  //       fetch(`http://localhost:3005/merchant-products/${200100001}`)
  //         .then((response) => response.json())
  //         .then((data) => setProducts(data))
  //         .catch((error) => console.error('Error fetching products:', error))
  //     }
  //   }
  // }, [router.isReady, router.query])

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
          <div className={styles.boldAndLarge}>查無景點收藏資料</div>
        ) : (
          currentProducts.map((product) => (
            <ProductCard
            tosrc={'attraction'}
            key={product.attraction_id}
            id={product.attraction_id}
            // merchant_id={product.merchant_id}
            img_src={product.img_name}
            name={product.attraction_name}
            introduce={product.title}
            log={'attraction'}
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
