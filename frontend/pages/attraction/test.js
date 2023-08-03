import axios from 'axios';
import { useState } from 'react';

// 模擬API回傳的資料
const sampleData = [
  { id: 1, name: 'r' },
  { id: 2, name: 'e' },
  { id: 3, name: 'v' },
];

const IndexPage = () => {
  // 初始化狀態
  const [data, setData] = useState(sampleData);

  // 處理點擊 Box 的事件
  const handleBoxClick = (item) => {
    // 假設你想要在 OffCanvas 中展開該資料，這裡你可以根據需求進行處理
    console.log(item);
  };

  return (
    <div>
      {data.map((item) => (
        // 傳入資料至 Box 元件並設定點擊事件
        <Box key={item.id} data={item} onClick={() => handleBoxClick(item)} />
      ))}
    </div>
  );
};

export default IndexPage;