// Test.js
import React, { useState, useEffect } from 'react';
import Search from '@/components/hotel/search';
import Page from '@/components/hotel/page';
import Card2 from '@/components/hotel/card2';
import data from '@/data/hotel/hotelKH.json';

export default function Test() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCards, setFilteredCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchPressed, setSearchPressed] = useState(true); // New state variable


    //點擊搜尋按鈕進行搜尋
    const handleSearchClick = () => {
      setSearchPressed(true); // 設置按鍵狀態為 true，觸發搜尋
    };
    
    //按下Enter進行搜尋
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleSearchClick(); // Call the handleSearchClick function when Enter key is pressed
      }
    };

   // 搜尋邏輯，只在 searchPressed 狀態為 true 時執行
  useEffect(() => {
    if (searchPressed) {
      const filtered = data.data.filter(
        card2 =>
          searchTerm.trim() === '' ||
          card2.hotel_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCards(filtered);
      setSearchPressed(false); // Reset the searchPressed state to false after searching
    }
  }, [searchTerm, searchPressed]);

  //分頁
  const ITEMS_PER_PAGE = 12; // 每頁顯示的數量
  const totalItems = filteredCards.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
 

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // 根據當前的頁碼和每頁顯示的數量，從篩選後的資料中篩選出要顯示的資料
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = filteredCards.slice(startIndex, endIndex);

  return (
    <>
      {/* 顯示 SearchComponent，將 setSearchTerm 傳遞給它 */}
      <Search  
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearchClick={handleSearchClick}
        handleKeyPress={handleKeyPress} />


      {/* 顯示 Card2，將 currentItems 傳遞給它 */}
      <div className='pagecontent'>
        {currentItems.map((card2, index) => (
          <Card2 key={index} v={card2} />
        ))}
      </div>
      
      {/* 分頁元件，將 currentPage 和 handlePageChange 傳遞給它 */}
      <Page
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </>
  );
}
