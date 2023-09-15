# 高雄旅遊網
![screencapture-localhost-3000-2023-09-10-19_30_04](https://github.com/XuanYing0915/KH_Travel_Project/assets/133011607/1e3c2ae5-773b-41b8-9e3a-041a3a0711f4)





## 資展國際前端班 134 期末專題製作

組別：第三組

主題：高雄旅遊網



組員 / 負責項目 / 擔任職務：
------------------------------------------------
楊朝隆 / 美食系統 / 組長 

林宣瑩 / 景點及行程系統 / 技術長  

蘇稚微 / 首頁及購物車 / 視覺設計

孫嘉佑/ 會員系統 

陳以賢 / 住宿及訂房系統 

郝德中 / 購票系統

## 專案發想
### 目的與動機
作為台灣重要港口城市，高雄的歷史文化和獨特美景，遊客始終絡繹不絕。
想進一步認識這美麗城市，卻發現旅遊資訊零散，因此，決定攜手打造一個方便且功能齊全的資訊平台，提供使用者完善的規劃，享受一次美好的旅行。

### 針對客群
- 一般游客
  
  提供全面景點、美食、住宿訊息，結合景點購票系統，不僅節省現場等待時間，也有項目優惠則扣。
- 自由行旅客
  
  詳盡的交通指引及行車路線規劃，以便暢遊高雄。
- 美食愛好者
  
  聚焦特色美食，提供店家推薦與評價，從精選餐廳到地方小吃，應有盡有。
- 商務旅客
  
  優質住宿選擇，設施條列完整，呈現旅客真實評論，喜歡立即下訂。


## 使用工具及技術

繪圖設計
- Figma
- Photoshop

版本管理
- Git
- GitHub
- GitHub Desktop

前端
- HTML5、CSS3、JavaScript ES6+、Bootstrap5、SCSS/SASS、AJAX
- 框架：React.js 18 + NEXT.js框架

後端
- node.js + EXPRESS、RESTFUL API

資料庫
- MySQL


## 專案特色
- 設計清新簡約
- 操作頁面簡單
- 行程安排規劃、記算距離車程
- 附近鄰近景點/美食/住宿 一條龍搜尋
- 可使用GOOGLE、LINE登入
- 信用卡線上支付


## 開發過程中學習
- Figma 繪製版面及UI/UX的設計規劃
- 資料庫第一級~第三級正規化
- ajax 與 HTTP 基本協定請求，利用AXIOS發送 GET 與 POST 向後端請求資料，實現與API的數據互動
- npm 套件的使用
- 提升查找BUG及解決能力
- 了解專案的製作流程，能安排小組整體進度規劃
- 了解團隊合作的重要性，定期開會檢討進度


系統介紹
--------------------------------
### 景點系統             
負責人:林宣瑩
### 功能介紹
![行程安排](https://github.com/XuanYing0915/KH_Travel_Project/assets/133011607/5f751b37-b85a-4ed7-a450-e96355d9e84e)

- 行程安排頁
  - 串接openstreepmap圖資
  - 串接leaflet api，繪出景點座標、行程座標及路線
  - 計算兩地經緯度求出距離及車程時間
  - 串接景點查詢api
  - 延遲載入資源及圖片，減少初始資源消耗
 
![旅遊專案搜索頁](https://github.com/XuanYing0915/KH_Travel_Project/assets/133011607/b72007f7-9216-4826-b31d-e4b80d55f2c5)

- 景點搜尋頁
  - 搜尋功能(可結合多種查詢)
     - 景點名稱
     - 景點地區
     - 地址
     - 標籤  
     - 關鍵字
  - 收藏功能(登入會員可用)
  - SVG地圖製作 搜索地區隨機推薦景點
  - 串接景點查詢api
 
![景點介紹頁](https://github.com/XuanYing0915/KH_Travel_Project/assets/133011607/f712b58a-599c-4076-8cf8-8782a7148078)

- 景點介紹頁
  - 動態路由
  - 串接景點api
  - 鄰近景點/住宿api
     - 結合SQL查詢兩地經緯度計算距離排序
       
  -共同元件 懸浮按鈕
     - 收藏功能(各系統都可收藏的api)
     - 回首頁
     - 回最上層
   
- 額外技術
    - 三個頁面均有設計RWD供電腦端、平板端、手機端使用
    - 使用PYTHON網路爬蟲抓取景點資訊，匯入資料庫
   
### 會員系統             
負責人:孫嘉佑
### 功能介紹


