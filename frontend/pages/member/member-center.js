import React, { useState } from 'react'
// 引入標題元件
import Title from '@/components/title'
// 景點json
import attraction from '@/data/attraction/attraction.json'
// 周邊json
import more from '@/data/attraction/more_attraction.json'

// 圖片json
import img from '@/data/attraction/img.json'
import Head from 'next/head'

// 輪播圖元件
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import SilderAI from '@/components/attraction/slider'

// 卡片元件
import Card2 from '@/components/common-card2/common-card2'

// 分頁元件
import Page from '@/components/attraction/search/page'

// 渲染畫面
export default function Attraction() {
  // selectedImageIndex 紀錄當前輪播圖片位置
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  // selectedImage 顯示展示圖
  const [selectedImage, setSelectedImage] = useState(img[selectedImageIndex])

  // 點擊輪播圖觸發的函數
  // 更新 selectedImageIndex 和 selectedImage 狀態。
  const handleImageChange = (imagePath, index) => {
    setSelectedImageIndex(index)
    setSelectedImage(imagePath)
  }

  // 分頁相關狀態
  // 第一組-周邊景點
  const [currentPageA, setCurrentPageA] = useState(1)
  const attractionsPerPage = 8 // 每頁顯示的資料筆數
  // 計算總頁
  const totalPagesA = Math.ceil(more.attractions.length / attractionsPerPage)
  // 處理分頁切換
  const handlePageChangeA = (page) => {
    setCurrentPageA(page)
  }
  // 當前分頁的資料
  const startIA = (currentPageA - 1) * attractionsPerPage
  const endIA = startIA + attractionsPerPage
  // TODO 往後修改為周邊景點的資料
  const currentPageDataA = more.attractions.slice(startIA, endIA)

  // 第二組-周邊美食
  const [currentPageF, setCurrentPageF] = useState(1)
  const foodPerPage = 4 // 每頁顯示的資料筆數
  // 計算總頁
  const totalPagesF = Math.ceil(more.attractions.length / foodPerPage)
  // 處理分頁切換
  const handlePageChangeF = (page) => {
    setCurrentPageF(page)
  }
  // 當前分頁的資料
  const startIF = (currentPageF - 1) * foodPerPage
  const endIF = startIF + foodPerPage
  // TODO 往後修改為周邊景點的資料
  const currentPageDataF = more.attractions.slice(startIF, endIF)

  // 第三組-周邊住宿
  const [currentPageH, setCurrentPageH] = useState(1)
  const hotelPerPage = 4 // 每頁顯示的資料筆數
  // 計算總頁
  const totalPagesH = Math.ceil(more.attractions.length / hotelPerPage)
  // 處理分頁切換
  const handlePageChangeH = (page) => {
    setCurrentPageH(page)
  }
  // 當前分頁的資料
  const startIH = (currentPageH - 1) * foodPerPage
  const endIH = startIH + foodPerPage
  // TODO 往後修改為周邊景點的資料
  const currentPageDataH = more.attractions.slice(startIH, endIH)

  return (
    <>
   <div className="mt-5 d-flex justify-content: center;" style={{width: 240, height: 317, position: 'relative', background: 'white', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}>
  <div className="" style={{left: 34, top: 228, position: 'absolute', justifyContent: 'center', alignItems: 'center', gap: 6, display: 'inline-flex'}}>
    <div className="Logout" style={{width: 30, height: 30, position: 'relative', transform: 'rotate(90deg)', transformOrigin: '0 0'}}>
      <div className="Vector" style={{width: 26.39, height: 26, left: 2, top: 28, position: 'absolute', transform: 'rotate(-90deg)', transformOrigin: '0 0', background: '#706F6F'}}></div>
    </div>
    <div style={{color: 'black', fontSize: 20, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word'}}>登出</div>
  </div>
  <div className="" style={{left: 34, top: 74, position: 'absolute', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 17, display: 'inline-flex'}}>
    <div className="Vector" style={{width: 19, height: 23, border: '0.50px black solid'}}></div>
    <div style={{color: 'black', fontSize: 20, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word'}}>會員訂單查詢</div>
  </div>
  <div className="" style={{left: 32, top: 128, position: 'absolute', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
    <div className="Heart" style={{width: 26, height: 30, position: 'relative'}}>
      <div className="Vector348" style={{width: 24.27, height: 24, left: 0.87, top: 3, position: 'absolute', border: '0.50px black solid'}}></div>
    </div>
    <div style={{color: 'black', fontSize: 20, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word'}}>我的收藏</div>
  </div>
  <div className="" style={{left: 28, top: 13, position: 'absolute', justifyContent: 'center', alignItems: 'center', gap: 14, display: 'inline-flex'}}>
    <div className="UserCircle" style={{width: 30, height: 30, position: 'relative'}}>
      <div className="Vector" style={{width: 28, height: 28, left: 1, top: 1, position: 'absolute', border: '0.50px black solid'}}></div>
    </div>
    <div style={{color: 'black', fontSize: 20, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word'}}>您好</div>
  </div>
  <div className="" style={{width: 184, height: 45, left: 16, top: 170, position: 'absolute'}}>
    <div className="Group49" style={{width: 179, height: 52, left: 5, top: -3, position: 'absolute'}}>
      <img className="Image46" style={{width: 50, height: 52, left: 0, top: 0, position: 'absolute'}} src="https://via.placeholder.com/50x52" />
      <div style={{left: 50, top: 14, position: 'absolute', color: 'black', fontSize: 20, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word'}}>會員帳號管理</div>
      <div className="Line113" style={{width: 169, height: 0, left: 10, top: 47.75, position: 'absolute', border: '1px #F09F03 solid'}}></div>
    </div>
  </div>
</div>
    </>
  )
}
 
 
 