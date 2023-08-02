import React from 'react';

export default function Page({currentPage,totalPages,handlePageChange}) {

  return (
    <>
    <div className='pagebutton'>
       {/* 前往最前頁 */}
      <button onClick={() => handlePageChange(1)}  disabled={currentPage === 1}> <i class="fa-solid fa-angles-left"></i></button>
       {/* 往前一頁 */}
      <button onClick={() => handlePageChange(currentPage - 1)}  disabled={currentPage === 1}>
      <i class="fa-solid fa-angle-left"></i>
      </button>
      {/* 顯示頁數 */}
      <div className="page">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
      <i class="fa-solid fa-angle-right"></i>
      </button>
      {/* 前往最後一頁 */}
      <button onClick={() => handlePageChange(totalPages)}  disabled={currentPage === totalPages}>  <i class="fa-solid fa-angles-right"></i></button>
    </div>
  </>
  );
}
