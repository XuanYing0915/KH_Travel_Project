import React from 'react';

export default function Page({ currentPage, totalPages, handlePageChange }) {

  return (
    <>
      <div className='pagebutton'>
        <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>第一頁</button>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          前一頁
        </button>
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
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          後一頁
        </button>
        <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>最後一頁</button>
      </div>
    </>
  );
}
