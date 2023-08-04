import React from 'react';

export default function Page({currentPage,totalPages,handlePageChange}) {

  const MAX_VISIBLE_PAGES = 5;  // 最多顯示的頁數
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, currentPage + 2);

  // 如果在開頭的頁數不足5頁，就把結尾擴展到5頁
  if (currentPage - startPage < 2) {
    endPage = Math.min(totalPages, startPage + MAX_VISIBLE_PAGES - 1);
  }
  // 如果在結尾的頁數不足5頁，就把開頭向前擴展到5頁
  if (endPage - currentPage < 2) {
    startPage = Math.max(1, endPage - MAX_VISIBLE_PAGES + 1);
  }

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);


  return (
    <>
    <div className='pagebutton'>
       {/* 前往最前頁 */}
      <button onClick={() => handlePageChange(1)}  disabled={currentPage === 1}> <i className="fa-solid fa-angles-left"></i></button>
       {/* 往前一頁 */}
      <button onClick={() => handlePageChange(currentPage - 1)}  disabled={currentPage === 1}>
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
      <button onClick={() => handlePageChange(currentPage + 1)}  disabled={currentPage === totalPages}>
      <i className="fa-solid fa-angle-right"></i>
      </button>
      {/* 前往最後一頁 */}
      <button onClick={() => handlePageChange(totalPages)}  disabled={currentPage === totalPages}>  <i className="fa-solid fa-angles-right"></i></button>
    </div>
  </>
  );
}
