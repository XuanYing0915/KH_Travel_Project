import React, { useState, useEffect } from 'react'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

// import axios from 'axios';
import { SlMagnifier } from 'react-icons/sl' //導入放大鏡icon
// 地區JSON
import areaData from '@/data/attraction/area.json'
// 標籤JSON
import tagData from '@/data/attraction/tag.json'
// 景點JSON
// import more from '@/data/attraction/more_attraction.json'
// 熱門景點
import popular from '@/data/attraction/popular.json'
// 引入Link
import Link from 'next/link'
// 引入卡片元件
import Card from '@/components/attraction/card-for-long/Introduction-card'

// 引入分頁元件
import Page from './page'

const AttractionsSearch = ({ data }) => {
  // 設定狀態
  const [searchKeyword, setSearchKeyword] = useState('') // 關鍵字搜尋
  const [selectedTags, setSelectedTags] = useState([]) // 標籤多選
  const [selectedArea, setSelectedArea] = useState('') // 地區下拉選單
  const [attractions, setAttractions] = useState(data)
  // 景點資料
  //  導入的景點資訊
  //  {
  //     "attraction_id": 60011,
  //     "attraction_name": "興達港(情人碼頭)",
  //     "title": "緊臨情人碼頭，傳統漁村結合地方文化與觀光休閒後，轉化成新興的現代漁港，推薦冬至前後烏魚季，來臺灣最大烏魚子產地－興達港。",
  //     "fk_area_id": 25,
  //     "area_name": "茄萣區",
  //     "address": "高雄市茄萣區東方路一段239號",
  //     "off_day": "全年開放",
  //     "open_time": "00:00:00",
  //     "closed_time": "23:59:00",
  //     "phone": "07-6900001",
  //     "description": "最負盛名的是有海上黑金之稱的烏魚，每年冬至前後的烏魚季，烏魚子、魚乾、魚膘及烏魚胗為茄萣帶來巨大的經濟利益，興達港不僅是臺灣最大的烏魚子產地，也因近海漁業及養殖漁業發達，成為生鮮海產的集中地。\r\n\r\n近年經高雄市政府重新規劃擴建，原本傳統的漁村結合在地特色與觀光休閒文化後，轉化成新興的現代漁港，是全臺規模最大最現代化的漁港。\r\n\r\n興達港為近海漁港，小型船隻於深夜凌晨出海，接近中午時分返港下貨拍賣，現撈的肉魚、白帶、馬加、午仔魚等等鮮美可口，民眾在此可以參觀卸貨批發過程，也可將鮮美海味買回家大快朵頤。每到漁船返港交易完畢的黃昏時刻，大批的生鮮的攤販進駐，市場販賣著各式「現撈仔」漁獲，包含：各式鮮魚、活蝦、貝類及活蟹等，是臺灣人最喜愛的餐桌海鮮。\r\n\r\n各式香味撲鼻的海味小吃、熟食讓人開懷嚐鮮，茄萣的特產烏魚子、香魚片、扁魚乾及魚皮更是遊客最愛的伴手禮，逛完黃金海岸、情人碼頭，不妨來觀光漁市享受平價美食與採購的樂趣。情人碼頭一改傳統漁港印象，充滿摩登現代的海洋風情。碼頭旁最聚焦的是海上劇場造型獨特的二座白色尖塔，在艷陽下耀眼如揚帆出海的大船，晚上則在變化多端的燈光照射下繽紛華麗，猶如海上明珠。\r\n\r\n情人碼頭提供各式新穎好玩的水上活動諸如風帆、獨木舟…讓水上活動愛好者享受乘風破浪的樂趣，而濱海遊樂區的沙灘遼闊、沙質柔細，更是踏浪戲水的好去處。當海面上閃著金光燦然的晚霞，情人碼頭上的七彩燈光也跟著亮起，將海上劇場的優美尖峰造型倒映在海面上，情人碼頭上儷影雙雙，心心相印廣場柔美的心型裝置將海邊的夜色暈染得無比浪漫，是有情人必到的約會聖地，也是大型節慶活動的最佳地點。",
  //     "lat": "22.8756335000",
  //     "lng": "120.2089372000",
  //     "zoom": 17,
  //     "traffic": "【大眾運輸】\r\n台鐵大湖站下車，直行東方路即可抵達(約五公里)。\r\n\r\n【自行開車】\r\n中山高速公路路竹交流道下→往路竹方向直行→接東方路即可抵達情人碼頭及鄰近的漁業文化動力館，或是沿台17線(濱海公路)即可抵達。\r\n",
  //     "visiting_time": "02:00:00",
  //     "img_name": "情人碼頭01.jpg",
  //     "tags": [
  //       "夏日戲水",
  //       "打卡熱點",
  //       "浪漫約會",
  //       "生態體驗",
  //       "親子共遊"
  //     ]
  //   }

  //  函式區----------------------------------------------------

  // 多選TAG篩選
  const TagSelect = (event) => {
    const { value, checked } = event.target
    // 根據是否被勾選，更新選中的標籤
    setSelectedTags((prevTags) =>
      checked ? [...prevTags, value] : prevTags.filter((tag) => tag !== value)
    )
  }
  // mui下拉選單標籤
  const handleTagSelect = (event, values) => {
    setSelectedTags(values.map((value) => value.tag_name)) // 紀錄選擇的標籤名稱
  }
  // 搜尋景點名稱
  const handleKeywordSearch = (e) => {
    setSearchKeyword(e.target.value)
  }

  // 單選下拉選單選擇地區
  const handleAreaSelect = (event) => {
    setSelectedArea(event.target.value)
  }

  // 依條件篩選景點
  useEffect(() => {
    // 將全部資料存入狀態
    setAttractions(data)
    // console.log('傳入search:', data);
    // console.log('傳入search的tags:', data[0].tags);
    // 篩選資料
    const filteredData = data.filter((attraction) => {
      // 輸入搜索
      const nameMatch =
        // 景點名
        attraction.attraction_name.includes(searchKeyword) ||
        // 景點簡介
        attraction.title.includes(searchKeyword) ||
        // TODO 地區
        attraction.address.includes(searchKeyword)
      // 標籤多選  包含
      const tagsMatch =
        selectedTags.length === 0 ||
        (attraction.tags &&
          selectedTags.some((tag) => attraction.tags.includes(tag)))
      // 地區
      const areaMatch =
        !selectedArea || attraction.fk_area_id.toString() === selectedArea
      return nameMatch && tagsMatch && areaMatch
    })
    // 把篩選後的結果加入狀態
    setFilteredAttractions(filteredData)

    // 計算總頁數
    // 將全部資料/展示資料筆數  向上取整
    const total = Math.ceil(filteredData.length / pageSize)
    // 更新總頁數狀態
    setTotalPages(total)
    // 當搜索關鍵字 標籤 地區選單  有改變  重新執行渲染
  }, [searchKeyword, selectedTags, selectedArea, attractions])

  // 分頁區----------------------------------------------------
  // 每頁顯示的資料筆數
  const [pageSize, setPageSize] = useState(8)
  // 分頁相關狀態
  const [filteredAttractions, setFilteredAttractions] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth
      if (windowWidth < 960) {
        setPageSize(4)
      } else if (windowWidth < 1200) {
        setPageSize(6)
      } else {
        setPageSize(8)
      }
    } // 初始設置
    handleResize()

    // 監聽視窗大小變化
    window.addEventListener('resize', handleResize)

    // 在清理 effect 時取消事件監聽
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // 處理分頁切換
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  // 依分頁狀態顯示對應的資料
  const startIdx = (currentPage - 1) * pageSize
  const endIdx = startIdx + pageSize
  const currentPageData = filteredAttractions.slice(startIdx, endIdx)

  return (
    <>
      <div className="container">
        <div
          className="a-search"
          data-aos="fade-up"
          data-aos-anchor-placement="center-bottom"
        >
          {/* 輸入搜尋 */}
          <div className="a-search-input">
            <input
              type="text"
              value={searchKeyword}
              onChange={handleKeywordSearch}
              placeholder="熱門地區:旗津"
              className="search-input"
            />
            {/* 搜尋按鈕 */}
            <button className="search-button">
              <SlMagnifier />
            </button>
            {/* 熱門景點 */}
            <div className=" mt-2  a-popular">
              {popular.attractions.map((attraction, i) => (
                <div key={i}>
                  <i
                    className="fa-solid fa-fire"
                    style={{ color: '#137976' }}
                  ></i>
                  <Link
                    key={i}
                    href={`/attraction/${attraction.attraction_id}`}
                    className=" a-popular-search justify-content-start align-items-center"
                  >
                    {attraction.attraction_name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          {/* 最外層 */}
          <div className="row mx-5 d-flex align-items-center">
            {/* rwd下拉tag */}
            <Autocomplete
              multiple
              id="Atags-multiple-checkbox"
              className="col-xl-5 col-lg-6 col-md-11 a-tags-box mx-5 mb-2"
              options={tagData}
              disableCloseOnSelect
              value={tagData.filter((tag) =>
                selectedTags.includes(tag.tag_name)
              )} // 設置初始選擇的標籤
              onChange={handleTagSelect}
              getOptionLabel={(option) => option.tag_name}
              sx={
                {
                  // '& .MuiOutlinedInput-notchedOutline': { border: 'transparent' },
                }
              }
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.tag_name}
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  // label="請選擇標籤"
                  placeholder="請選擇標籤"
                  sx={{
                    backgroundColor: '#ffffff',
                    borderRadius: '30px',
                    border: '1px solid #137976',
                    color: '#333',
                  }}
                />
              )}
            />
            <div className="row justify-content-start a-checkbox-select col-9">
              {/* 標籤多選框 */}
              <div className="row col-xxl-12 a-tag-box">
                {tagData.map((tag) => (
                  <div
                    key={tag.tag_name_id}
                    className="col-xxl-2 col-xl-3 d-flex"
                  >
                    <input
                      type="checkbox"
                      value={tag.tag_name}
                      onChange={TagSelect}
                      className="col-1 a-tag-input text-nowrap"
                      id={`checkbox_${tag.tag_name_id}`}
                    />
                    <label
                      className="col-10 a-tag-label"
                      htmlFor={`checkbox_${tag.tag_name_id}`}
                    >
                      {tag.tag_name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            {/* 標籤多選框結束 */}
            {/* 地區下拉選單 */}

            <select
              className="a-search-select col-xxl-2 col-xl-5 col-lg-6 col-md-11"
              value={selectedArea}
              onChange={handleAreaSelect}
            >
              <option value="">請選擇地區</option>
              {/* 引入地區資料做選單 */}
              {areaData.map((area) => (
                <option key={area.area_id} value={area.area_id}>
                  {area.area_name}
                </option>
              ))}
            </select>
            {/* 地區下拉選單結束 */}
          </div>
        </div>
      </div>

      {/* </div> */}
      {/* 顯示篩選後的景點或提示信息 */}
      <div className="row c1">
        <div></div>
        <div className="row col-10 c align d-flex justify-content-around ">
          {/* 當資料=0  出現提示   資料不等於0  出現搜索結果*/}
          {currentPageData.length === 0 ? (
            <div className="a-no-find text-center my-5">
              不好意思!
              <br />
              沒有符合的景點
              <br />
              請您重新搜尋
            </div>
          ) : (
            currentPageData.map((filter) => (
              <div
                className="d-flex col-xl-3 col-lg-4 col-md-6 col-sm-12  col-12"
                key={filter.attraction_id}
                data-aos="zoom-in-up"
                data-aos-easing="linear"
                data-aos-duration="500"
              >
                <Card
                  id={filter.attraction_id}
                  name={filter.attraction_name}
                  img_src={filter.img_name}
                  introduce={filter.title}
                  // time={filter.tags.join(' / ')}
                  // status={3}
                  member_id={filter.fk_member_id}
                  like={filter.fk_member_id}
                  towheresrc={`/attraction/${filter.attraction_id}`}
                />
              </div>
            ))
          )}
        </div>
      </div>
      {/* 分頁元件 */}

      <Page
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </>
  )
}

export default AttractionsSearch
