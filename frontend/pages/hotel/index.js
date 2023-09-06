import React, { useState, useEffect } from 'react'
import Hotelphoto from '@/components/hotel/hotelphoto'
import Pscall from '@/components/hotel/pscall'

export default function hotelSearch() {
  // 等待資料時顯示動畫
  const [isLoading, setIsLoading] = useState(true)

  // useEffect 裡的函式會在組件裝載後執行
  useEffect(() => {
    // 使用 setTimeout 來模擬加載時間
    const timer = setTimeout(() => {
      setIsLoading(false) // 關掉加載動畫
    }, 1000)

    // 清理函式，如果組件卸載時需要清理，就會用到這個
    return () => clearTimeout(timer)
  }, []) // 空的依賴數組表示這個 useEffect 只會在組件裝載後執行一次

  // 加載動畫
  if (isLoading) {
    return (
      <div className="a-loading">
        <img src="/images/logo.png" />
      </div>
    )
  }

  return (
    <>
      <div className="hotelSearchBody">
        <div>
          <Hotelphoto />
        </div>
        <div>
          {/* <div className="divsearch"> */}
          <div className="container">
            <Pscall />
          </div>
        </div>
      </div>
    </>
  )
}
