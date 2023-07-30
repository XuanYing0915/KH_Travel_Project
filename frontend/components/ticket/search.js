import React, { useState, useEffect } from 'react'
import { SlMagnifier } from 'react-icons/sl' //導入放大鏡icon
import Page from '@/components/ticket/page'
import data from '@/data/Ticket/ticket-all-data.json'
import Card2 from '@/components/common-card2/common-card2'



export default function Search() {
  // 目前問題  1.起手導入第一次失敗  2.額外判斷未做(框架在手機內)  3.其餘部分 路由部分尚未




  //狀態設置區
  const [allData, setFiltered] = useState([]); //用於存儲過濾後的資料
  const [currentPage, setCurrentPage] = useState(1); //分頁-------------------------X
  const [searchTerm, setSearchTerm] = useState(''); //輸入關鍵字搜尋-------------------------X
  const [searchPressed, setSearchPressed] = useState(true);  //點擊案件搜尋-------------------------X

  const [cla, setClass] = useState(''); //新增類別標籤搜尋-- OK


  //接收檔案處理 先暫訂這樣 VV

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

  //起手資料渲染1次
  // setFiltered(allDataList)
  // console.log(allDataList);




  //此區抓資料庫
  // 左側熱門區塊
  const category = ['熱門1', '熱門2', '熱門3', '熱門4', '熱門5', '熱門6']

  //中間區塊
  const mrtTag = ['動物園', '親子遊玩', '樂園優惠', '展覽優惠', '電影優惠', '古蹟']

  //右側價格區塊(用好數值後變成判斷用)
  // const areaTag = ['鹽埕區', '新興區', '前鎮區', '苓雅區', '鼓山區', '楠梓區']










  // 點擊搜尋按鈕進行搜尋
  const handleSearchClick = () => {
    setSearchPressed(true); // 設置按鍵狀態為 true，觸發搜尋
  };

  // 按下Enter進行搜尋
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick(); // Call the handleSearchClick function when Enter key is pressed
    }
  };


  // 一般搜尋邏輯------------------與類別相同
  //只在 searchPressed 狀態為 true 時執行
  // toLowerCase = 字母轉小寫
  // useEffect(() => {
  //   if (searchPressed) {
  //     const filtered = data.data.filter(
  //       v =>
  //         searchTerm.trim() === '' ||
  //         v.tk_name.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //     setFiltered(filtered);
  //     setSearchPressed(false); // Reset the searchPressed state to false after searching
  //     setCurrentPage(1);
  //   }
  // }, [searchTerm, searchPressed]);


  //點擊類別搜尋----> 當類別狀態變更時 --->重新刷新資料
  useEffect(() => {
    const filtered = allDataList.filter(v => v.tk_class_name.includes(cla));
    setFiltered(filtered);
  }, [cla]);




  //分頁
  const ITEMS_PER_PAGE = 12; // 每頁顯示的數量
  const totalItems = allData.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // 根據當前的頁碼和每頁顯示的數量，從篩選後的資料中篩選出要顯示的資料
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = allData.slice(startIndex, endIndex);























  return (
    <>
      <div className="hotelSearch">
        <input
          type="text"
          placeholder="搜尋"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        // onKeyDown={handleKeyPress}
        />
        {/* <button onClick={handleSearchClick}>
          <SlMagnifier />
        </button> */}
        {/* 下方層 */}
        <div className="texthead">
          {/* 熱門 */}
          <div className="textsection2">
            <ul>
              {category.map((v, i) => {
                return (
                  <li type="button" key={i} onClick={() => handleCategoryClick(v)}>
                    {v}
                  </li>
                )
              })}
            </ul>
          </div>
          {/* 類別 */}
          <div className="textsection2">
            <ul>
              {mrtTag.map((v, i) => {
                return (
                  <li type="button" key={i} onClick={() => setClass(v)}>
                    {v}
                  </li>
                )
              })}
            </ul>
          </div>
          {/* 金額塞選 */}
          {/* 此CSS放在ticket */}
          <div className="textsection2">

          </div>
        </div>
      </div>

      <div className='pagecontent'>
        {allData.map((v) => (
          <Card2
            key={v.id}
            id={v.id}
            //圖片未導入
            img_src={v.tk_image_src[0]}
            name={v.tk_name}
            introduce={`最低${v.tk_price[0]}元`}
            like={false}
            towheresrc={v.id}
            status={2}
            imgrouter='ticket'
          />
        ))}
      </div>

      {/* introduce={`最低${Math.min(...v.tk_price[0])}元`} 先放者 */}


      {/* 分頁元件，將 currentPage 和 handlePageChange 傳遞給它 */}
      <Page
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </>
  )
}
