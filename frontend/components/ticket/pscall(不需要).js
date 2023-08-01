// pscall.js
import React, { useState, useEffect } from 'react'
import Search from '@/components/ticket/search'
import Page from '@/components/ticket/page'
import Card2 from '@/components/common-card2/common-card2'



// 測試用 拿主資料看刷新
import data from '@/data/Ticket/ticket-all-data.json'

export default function Pscall() {
  const [filteredCards, setFiltered] = useState([]); //用於存儲過濾後的資料
  const [currentPage, setCurrentPage] = useState(1); //分頁
  const [searchTerm, setSearchTerm] = useState(''); //輸入關鍵字搜尋 ???
  const [searchPressed, setSearchPressed] = useState(true);  //點擊案件搜尋


  // const [class, setClass] = useState(''); //新增類別標籤搜尋--1




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


  // 一般搜尋邏輯------------------與類別相同
  //只在 searchPressed 狀態為 true 時執行
  // toLowerCase = 字母轉小寫
  useEffect(() => {
    if (searchPressed) {
      const filtered = data.data.filter(
        v =>
          searchTerm.trim() === '' ||
          v.tk_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFiltered(filtered);
      setSearchPressed(false); // Reset the searchPressed state to false after searching
      setCurrentPage(1);
    }
  }, [searchTerm, searchPressed]);


  //點擊類別搜尋
  // useEffect(() => {
  //   if (class) {
  //     const filtered = allDataList.filter(
  //       v =>
  //         categoryTerm.trim() === '' ||
  //         v.tk_class_name.toLowerCase().includes(categoryTerm.toLowerCase())
  //     );
  //     setFiltered(filtered);
  //     setSearchPressed(false);
  //     setCurrentPage(1);
  //   }
  // }, [categoryTerm, categorySearchPressed]);




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








  //檔案處理 先暫訂這樣 VV
  const mergedData = {};
  data.data.forEach(v => {
    const { tk_id, tk_name, tk_explain, tk_directions, tk_purchase_notes, tk_description, tk_remark } = v;
    const key = `${tk_id}_${tk_name}_${tk_explain}_${tk_directions}_${tk_purchase_notes}_${tk_description}_${tk_remark}`;

    if (!mergedData[key]) {
      mergedData[key] = { ...v, tk_pd_name: [v.tk_pd_name], tk_expiry_date: [v.tk_expiry_date], tk_price: [v.tk_price], fk_member_id: [v.fk_member_id], tk_image_src: [v.tk_image_src], tk_status: [v.tk_status], tk_class_name: [v.tk_class_name] };
    } else {
      ['tk_pd_name', 'tk_expiry_date', 'tk_price', 'fk_member_id', 'tk_image_src', 'tk_status', 'tk_class_name'].forEach(field => {
        if (!mergedData[key][field].includes(v[field])) {
          mergedData[key][field].push(v[field]);
        }
      });
    }
  });
  const allDataList = Object.values(mergedData);
  // console.log(mergedDataList);




  return (
    <>
      {/* 顯示 SearchComponent，將 setSearchTerm 傳遞給它 */}
      <Search

      />


      {/* 顯示 Card2，將 currentItems 傳遞給它 */}
      {/* 這裡要修正key的問題 */}----------------------
      <div className='pagecontent'>
        {allDataList.map((v) => (
          <Card2
            key={v.id}
            id={v.id}
            //圖片未導入
            img_src={v.tk_image_src[0]}
            name={v.tk_name}
            introduce={`最低${Math.min(...v.tk_price)}元`}
            like={false}
            towheresrc={v.id}
            status={2}
            imgrouter='ticket'
          />
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
