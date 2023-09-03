import React, { useState, useEffect } from 'react'
export default function Page({ currentPage, totalPages, handlePageChange }) {
  const [maxVisiblePages, setMaxVisiblePages] = useState(5) // 初始最多顯示的頁數

  // 監聽視窗寬度的變化，並根據不同寬度值更新 maxVisiblePages
  useEffect(() => {
    // 視窗大小變化時，重新計算最多顯示的頁數
    const handleResize = () => {
      // 偵測視窗寬度
      const windowWidth = window.innerWidth
      // 如果視窗寬度小於 600，設定最多顯示 3 頁
      if (windowWidth < 600) {
        // 設定最多顯示 3 頁
        setMaxVisiblePages(3)
      } else {
        // 大於 600
        // 設定最多顯示 5 頁
        setMaxVisiblePages(5)
      }
    }

    // 初始設置
    handleResize()

    // 監聽視窗大小變化
    window.addEventListener('resize', handleResize)

    // 在清理 effect 時取消事件監聽
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // 計算要顯示的頁數
  //起始頁面:確保起始頁面至少為1  或 (目前頁面 - 可視頁面數一半) 中 最大值
  // floor:無條件捨去
  // max:最大值
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
  // 結束頁面: 確保結束頁面為總頁面數    或至少為起始頁面 + 可視頁面數 - 1 的最小值
  // min:最小值
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

  // 以下是為了讓頁數可以置中
  // 如果目前頁面距離起始頁面小於可視頁面數一半  重新計算結束頁面
  if (currentPage - startPage < Math.floor(maxVisiblePages / 2)) {
    //結束頁面 = 目前頁面 < 可視頁面數一半  設起始頁面設為結束頁面 - 可視頁面數 + 1
    endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)
  }

  // 如果結束頁面距離起始頁面小於可視頁面數一半，重新計算起始頁面
  if (endPage - currentPage < Math.floor(maxVisiblePages / 2)) {
    //起始頁面 = 結束頁面 - 可視頁面數 + 1
    startPage = Math.max(1, endPage - maxVisiblePages + 1)
  }

  // 產生頁數陣列
  const pages = Array.from(
    // 長度為結束頁面 - 起始頁面 + 1
    { length: endPage - startPage + 1 },
    // 起始頁面 + 索引值
    (_, i) => startPage + i
  )

  return (
    <>
      <div className="pagebutton">
        {/* 前往最前頁 */}
        <button
          // 點擊=當前頁面=1
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          {' '}
          <i className="fa-solid fa-angles-left"></i>
        </button>
        {/* 往前一頁 */}
        <button
          // 點擊=當前頁面-1
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <i className="fa-solid fa-angle-left"></i>
        </button>
        {/* 顯示頁數 */}
        <div className="page">
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              disabled={currentPage === page}
              className={currentPage === page ? 'current-page' : ''}
            >
              {page}
            </button>
          ))}
        </div>
        {/* 往後一頁 */}
        <button
          // 點擊=當前頁面+1
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <i className="fa-solid fa-angle-right"></i>
        </button>
        {/* 前往最後一頁 */}
        <button
          // 點擊=總頁數 =跳去最後一頁
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          <i className="fa-solid fa-angles-right"></i>
        </button>
      </div>
    </>
  )
}
