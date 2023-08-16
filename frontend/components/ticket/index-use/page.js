import React, { useState, useEffect } from 'react'

export default function Page({ currentPage, totalPages, handlePageChange }) {
  const [maxVisiblePages, setMaxVisiblePages] = useState(5) // 初始最多顯示的頁數

  // 監聽視窗寬度的變化，並根據不同寬度值更新 maxVisiblePages
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth
      if (windowWidth < 800) {
        setMaxVisiblePages(3)
      } else {
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

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

  if (currentPage - startPage < Math.floor(maxVisiblePages / 2)) {
    endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)
  }

  if (endPage - currentPage < Math.floor(maxVisiblePages / 2)) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1)
  }

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  )

  return (
    <>
      <div className="pagebutton">
        {/* 前往最前頁 */}
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          {' '}
          <i className="fa-solid fa-angles-left"></i>
        </button>
        {/* 往前一頁 */}
        <button
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
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <i className="fa-solid fa-angle-right"></i>
        </button>
        {/* 前往最後一頁 */}
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          {' '}
          <i className="fa-solid fa-angles-right"></i>
        </button>
      </div>
    </>
  )
}
