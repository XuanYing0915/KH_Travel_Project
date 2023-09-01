import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Avatar from '@/components/member/avatar'
// import FavoriteProductOne from '@/components/favorite-list/favorite-product-one'
import Image from 'next/image'
import SideBar from '@/components/member/sidebar'
import Title from '@/components/title'
import axios from 'axios'
import { useAuthJWT } from '@/hooks/use-auth-jwt'


export default function MemberOrder() {
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [orderData, setOrderData] = useState([]) // 用于存储订单数据
  const { authJWT } = useAuthJWT()
  const openLightbox = (order) => {
    setSelectedOrder(order)
  }

  const closeLightbox = () => {
    setSelectedOrder(null)
  }

  useEffect(() => {
    // 在组件加载时获取订单数据
    fetchOrderData()
  }, [])
  const fetchOrderData = async () => {
    try {
      const memberId = authJWT.userData.member_id; // 從 authJWT 中獲取用戶 ID
      const response = await axios.get(
        `http://localhost:3005/api/orders/orders/${memberId}`
      );
      // 假设你有一个获取订单数据的API
      console.log(response.data);
      setOrderData(response.data)
    } catch (error) {
      console.error('Error fetching order data:', error)
    }
  }




  return (
    <>
      <div className="bg">
        <div className="m-100"></div>
        <div className="container  mx-auto">
          {/* Add the Breadcrumb here */}
          <div className="row mb-3">
            <nav aria-label="breadcrumb" className="m-breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/">首頁</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  會員中心
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  訂單查詢
                </li>
              </ol>
            </nav>
          </div>
          {/* End of Breadcrumb */}
          <div className="row member-container">
            <div className="col-3 d-flex justify-content-start ">
              <div className="">
                <Avatar />
                <SideBar />
              </div>
            </div>
            {/* // 這裡是內容 */}
            <div
              className="mt-5 col-7 d-flex justify-content-start nav-bar-size"
              id="nav-bar-size"
            >
              <div className="member-box">
                <Title
                  title="訂單查詢"
                  style="title_box_dark"
                  fontSize="30px"
                />
                <nav>
                  <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button
                      className="nav-link active edit"
                      id="nav-profile-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-profile"
                      type="button"
                      role="tab"
                      aria-controls="nav-profile"
                      aria-selected="true"
                    >
                      <i
                        className="fa-solid fa-utensils"
                        style={{ marginRight: '15px' }}
                      />
                      美食
                    </button>
                    <button
                      className="nav-link edit"
                      id="nav-password-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-password"
                      type="button"
                      role="tab"
                      aria-controls="nav-password"
                      aria-selected="false"
                    >
                      <i
                        className="fa-solid fa-ticket"
                        style={{ marginRight: '15px' }}
                      />
                      票卷
                    </button>
                    {/* <button
                      className="nav-link edit"
                      id="nav-password-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-password"
                      type="button"
                      role="tab"
                      aria-controls="nav-password"
                      aria-selected="false"
                    >
                      <i
                        className="fa-solid fa-bed"
                        style={{ marginRight: '15px' }}
                      />
                      住宿
                    </button>
                    <button
                      className="nav-link edit"
                      id="nav-password-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-password"
                      type="button"
                      role="tab"
                      aria-controls="nav-password"
                      aria-selected="false"
                    >
                      <i
                        className="fa-solid fa-location-dot"
                        style={{ marginRight: '15px' }}
                      />
                      景點
                    </button> */}
                  </div>
                </nav>

                <div className="tab-content" id="nav-tabContent">
                  <div
                    className="tab-pane fade show active "
                    id="nav-profile"
                    role="tabpanel"
                    aria-labelledby="nav-profile-tab"
                  >
                    {/* 美食訂單資料的內容 */}
                    <div className="form-container d-flex justify-content-center ">
                      <div class="container-table100">
                        <div class="wrap-table100">
                          <div class="table100">
                            <table>
                              <thead>
                                <tr class="table100-head">
                                  <th class="column1">訂單日期</th>
                                  <th class="column2">訂單ID</th>

                                  <th class="column3">總金額</th>
                                </tr>
                              </thead>
                              <tbody>
                                {orderData.length < 1 ? (
                                  <tr className="no-order">
                                    <td colspan="3" className="column1" style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}>
                                      查無訂單資料
                                    </td>
                                  </tr>
                                ) : (
                                  orderData.map((order, index) => (
                                    <tr key={index} className="table100-body" onClick={() => openLightbox(order)}>
                                      <td className="column1">{order.order_date}</td>
                                      <td className="column2"> {order.fd_order_id}</td>
                                      <td className="column3">${order.grand_total}</td>
                                    </tr>
                                  ))
                                )}
                                <span>點擊以查看訂單明細</span>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="nav-password"
                    role="tabpanel"
                    aria-labelledby="nav-password-tab"
                  >
                    {/* 訂單資料的內容 */}
                    <div className="form-container d-flex justify-content-center ">
                      <div class="container-table100">
                        <div class="wrap-table100">
                          <div class="table100">
                            <table>
                              <thead>
                                <tr class="table100-head">
                                  <th class="column1">訂單日期</th>
                                  <th class="column2">訂單ID</th>

                                  <th class="column3">總金額</th>
                                </tr>
                              </thead>
                              <tbody>

                                <tr className="no-order">
                                  <td colspan="3" className="column1" style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}>
                                    查無訂單資料
                                  </td>
                                </tr>

                                <span>點擊以查看訂單明細</span>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* 票卷 */}
                    {/* 住宿 */}
                  </div>
                  <div
                    className="tab-pane fade"
                    id="nav-password"
                    role="tabpanel"
                    aria-labelledby="nav-password-tab"
                  >
                    {/* 訂單資料的內容 */}
                    <div className="form-container d-flex justify-content-center ">
                      <div class="container-table100">
                        <div class="wrap-table100">
                          <div class="table100">
                            <table>
                              <thead>
                                <tr class="table100-head">
                                  <th class="column1">訂單日期</th>
                                  <th class="column2">訂單ID</th>

                                  <th class="column3">總金額</th>
                                </tr>
                              </thead>
                              <tbody>

                                <tr className="no-order">
                                  <td colspan="3" className="column1" style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}>
                                    查無訂單資料
                                  </td>
                                </tr>

                                <span>點擊以查看訂單明細</span>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* 票卷 */}
                    {/* 住宿 */}
                  </div>
                  <div
                    className="tab-pane fade"
                    id="nav-password"
                    role="tabpanel"
                    aria-labelledby="nav-password-tab"
                  >
                    {/* 訂單資料的內容 */}
                    <div className="form-container d-flex justify-content-center ">
                      <div class="container-table100">
                        <div class="wrap-table100">
                          <div class="table100">
                            <table>
                              <thead>
                                <tr class="table100-head">
                                  <th class="column1">訂單日期</th>
                                  <th class="column2">訂單ID</th>

                                  <th class="column3">總金額</th>
                                </tr>
                              </thead>
                              <tbody>

                                <tr className="no-order">
                                  <td colspan="3" className="column1" style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}>
                                    查無訂單資料
                                  </td>
                                </tr>

                                <span>點擊以查看訂單明細</span>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* 票卷 */}
                    {/* 住宿 */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="m-space"></div>
      </div>

      {/* Lightbox */}
      {selectedOrder && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
        <div className="lightbox-content">
          <div className="order-header">
            <h2>訂單詳情</h2>
            <div className="order-basic-info">
              <span className="order-date">訂單日期: {selectedOrder.order_date}</span>
              <span className="order-id">訂單ID: {selectedOrder.fd_order_id}</span>
            </div>
          </div>
          <div className="order-products-list">
            <table>
             <thead>
  {/* <tr className="order-info">
    <td colspan="2">
      訂單日期: {selectedOrder.order_date}
    </td>
    <td colspan="2">
      訂單ID: {selectedOrder.fd_order_id}
    </td>
  </tr> */}
  <tr>
    <th>商品</th>
    <th>名稱</th>
    <th>單價</th>
    <th>數量</th>
  </tr>
</thead>

              <tbody >
                {selectedOrder.products.map((product, index) => (
                  <tr key={index}>
                    <td>
                      <img className="img-style"src={`/images/food/${product.product_name}.jpg`} alt={product.product_name} />
                    </td>
                    <td className='no-border'>{product.product_name}</td>
                    <td className='no-border'>${product.product_price}</td>
                    <td className='no-border'>x {product.product_quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="order-summary">
            
            <div className="summary-item">
              <span className="summary-label">小計:</span>
              <span className="summary-value">${selectedOrder.order_total}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">運費:</span>
              <span className="summary-value">${selectedOrder.shipping_fee}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">總計:</span>
              <span className="summary-value">${selectedOrder.grand_total}</span>
            </div>
          
          </div>
        </div>
      </div>
      
      )}
      <style jsx>
        {`
          @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
          .img-style {
            height: 50px;
            width: 50px;
          }
          .order-products-list th {
  background-color: #7fb8b6;  /* 使用主色調 */
  color: #ffffff;  /* 將文字顏色設為白色以提高可見性 */
}
          .lightbox-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}
.lightbox-content {
  background-color: #fff;
  border-radius: 10px;
  width: 80%;
  max-width: 600px;
  padding: 20px;
}
.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.order-basic-info {
  display: flex;
  gap: 20px;
}
.order-date,
.order-id {
  font-weight: bold;
}
.order-products-list table {
  width: 100%;
  border-collapse: collapse;
}
.order-products-list th {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}
.order-products-list td {
  {/* border: 1px solid #ccc; */}
  padding: 10px;
  text-align: center;
}
.order-summary {
  background: #ffe596;
  box-shadow: 0 1px 1px 0 rgba(0,0,0,.05);
  border-top: 1px solid #f1f0ed;
  padding-top:;
  display: grid;
  grid-template-columns: 1fr max-content max-content;
  grid-template-rows: auto;
  grid-column-gap: 10px;
}
.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
.summary-label {
  font-weight: bold;
  width: 60px;
  text-align: right;
}
.summary-value {
  font-weight: normal;
}
.no-border {
  border: none;
}


          th {
            text-align: center; /* 將"Quantity"列和對應的td元素置中 */
            width:300px;
          }
          span{
            font-size:8px;
            
          }
          .table100 {
            width:500px;
          }
          .table100-head th {
            font-weight: bold;
            color: #fff;
            line-height: 1.2;
            font-size: 18px;
            font-weight: 700;
            text-align: center;
            background-color: #333;
            display: flex;

            padding: 10px;
          }
         

          tbody tr {
            border-bottom: 1px solid #f2f2f2;
          }

          tbody tr:last-child {
            border-bottom: none;
          }

          tbody tr:hover {
            background-color: #f5f5f5;
          }

          tbody td {
            font-size: 15px;
            color: #555;
            line-height: 1.2;
            padding: 10px;
            text-align: center;
            white-space: nowrap;
          }

          tbody tr:hover td {
            color: #555;
          }

          .column1 {
            width: 10%;
          }
          .column2,
          .column3,
          .column4,
          .column5,
          .column6 {
            width: 30%;
          }

          .table100-head th,
          tbody td {
            padding-left: 20px;
            padding-right: 20px;
          }
          .table100-body {
            cursor: pointer;
            transition: background-color 0.3s ease-in-out;
          }

          .table100-body:hover {
            background-color: #f5f5f5;
          }
          .table100-body.no-order:hover {
  background-color: transparent; /* 不改变背景颜色 */
}


         
.bg {
  background: url('/images/food/紙感背景.jpg');
  background-repeat: repeat;
}
margin: 0;
padding: 0;

p {
 ;
  font-size: 20px;
  color: #777777;
}
.container {
  margin-top: 100px;
}
.member-container {
}

.member-box {
  margin-top: -100px;
  padding: 1rem 2rem;
  display: inline-block;
  border: 3px solid #333333;
  font-size: 1rem;
  border-radius: 2% 3% 5% 4% / 1% 1% 2% 4%;
  text-transform: ;
  letter-spacing: 0.3ch;

  {/* 被景色 */}
  background: #7fb8b6;
  position: relative;

  
}

.m-breadcrumb {
  margin-top: 50px;
}
.nav-bar-size {
  margin-botton: 50px {
    /* height:150px; */
  }
}


.nav-tabs {
  border: none;
  outline: none;
  background-color: #137976;
}

.nav-tabs .nav-link {
  width:430px;

  color: #ffffff;
  background-color: #137976;
  border-radius: 0px 0px 0 0;
  border: none;
   {
    /* border: 1px solid #ccc; */
  }
}

.nav-tabs .nav-link.active {
  color: #ffffff; /* 選中的按鈕文字顏色 */
  background-color: #ffffff; /* 選中的按鈕背景顏色 */
  color: #137976;
  border-bottom: 4px solid #ffd367; /* 選中的按鈕底部邊框變黃色 */
  font-weight: bold;
}


/*td{ box-shadow:5px 5px 5px #000; text-align:center; height:40px; }*/

/* Remove min-height and set a fixed height for both tab panes */
.tab-pane {
  background-color: #ffffff;
  border-radius: 0px 0px 0px 0px;
  padding: 30px;
  width: 800px;
  height: 550px;
  margin: 30px;
  box-shadow: 10px 10px 10px #e0e0e0;
  border-spacing: 15px; /* 添加阴影效果 */
  position: relative;
}

/* Add styles for the confirm button */
.btn-confirm {
  position: absolute;
  bottom: 20px;
  right: 335px;

  background-color: #ffce56;
  color: #ffffff;
  border-radius: 5px;
}

/* label 的文字顏色 */
.tab-pane label {
  color: #ffffff;
  margin: 8px;
}

/* input 的樣式 */
.tab-pane input,
.tab-pane select {
  width: 100%;
  height: 50px;
  background-color: #f4f4f4;
  {/* border-radius: 5px; */}
  margin-bottom: 5px;
  padding: 10px;
  border: none;
}
.m-space {
  height: 100px;
}
        `}
      </style>
    </>
  )
}
