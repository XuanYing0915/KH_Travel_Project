import React from 'react';

export default function Test( {
    currentPage,
    totalPages,
    handlePageChange,
  }) {

  return (
    <>
    <div className='pagebutton'>
      <button onClick={() => handlePageChange(1)}>第一頁</button>
      <button onClick={() => handlePageChange(currentPage - 1)}>
        上一頁
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          disabled={currentPage === page}
        >
          {page}
        </button>
      ))}
      <button onClick={() => handlePageChange(currentPage + 1)}>
        下一頁
      </button>
      <button onClick={() => handlePageChange(totalPages)}>最後一頁</button>
    </div>
  </>
  );
}
