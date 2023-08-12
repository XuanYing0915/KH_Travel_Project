import React,{ useState, useEffect,useContext} from 'react'
import { ImUser } from 'react-icons/im' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTv } from "@fortawesome/free-solid-svg-icons";
import { faCity } from "@fortawesome/free-solid-svg-icons";
import { faWifi } from "@fortawesome/free-solid-svg-icons";
import { faShower } from "@fortawesome/free-solid-svg-icons";
import { faWind } from "@fortawesome/free-solid-svg-icons";
import { faMugSaucer } from "@fortawesome/free-solid-svg-icons";
import { faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import { faBed } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from 'next/router';
import Link from 'next/link';
import {CartContext} from '@/components/hotel/CartContext'

export default function Table({data}) {

    const router = useRouter();  // 抓取飯店hotel_id
    const { hotel_id  } = router.query; // 抓取飯店hotel_id
    // console.log(hotel_id)


      //日期功能：取得未來某天的日期
    const getFutureDate = (days, baseDate = new Date()) => {
        let newDate = new Date(baseDate);
        newDate.setDate(newDate.getDate() + days); 
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        // 返回格式化的日期字串，例如 "2023-08-09"
        return `${year}-${month < 10 ? `0${month}` : `${month}`}-${date < 10 ? `0${date}` : `${date}`}`;
    };
     
    // 定義一些使用 useState 來管理的狀態變數
    const {adults, setAdults} = useContext(CartContext); // 0809成人人數
    const {childrens, setChildrens} = useContext(CartContext); // 孩童人數
    const [showOptions, setShowOptions] = useState(false);  // 是否顯示選項
    const [checkInDate, setCheckInDate] =  useState(getFutureDate(5)); // 入住日期，預設5天後
    const [checkOutDate, setCheckOutDate] = useState(getFutureDate(7)); // 退房日期，預設7天後
    const [selectedRoomCounts, setSelectedRoomCounts] = useState({}); // 房間數量
    
  
    // 處理成人人數變化
    const handleAdultChange = (value) => {
        setAdults(value < 0 ? 0 : value);
    };
    // 處理孩童人數變化
    const handleChildrenChange = (value) => {   
        setChildrens(value < 0 ? 0 : value);
    };
    // 關閉選項
    const handleOptionsClose = () => {
        setShowOptions(false);
      };
     // 處理入住日期變化
    const handleCheckInDateChange = (e) => {
    setCheckInDate(e.target.value);
    };
    
    // 處理退房日期變化
    const handleCheckOutDateChange = (e) => {
        setCheckOutDate(e.target.value);
    };
    // 取得下一天的日期
    const getNextDay = () => {
        return getFutureDate(1, new Date(checkInDate));
    };

    // 0809 要抓選完的數值到送出房間表單的狀態
    useEffect(() => {
        handleAdultChange(adults);
        handleChildrenChange(childrens);
        localStorage.setItem('checkInDate', checkInDate); // 儲存入住日期資料
        localStorage.setItem('checkOutDate', checkOutDate); // 儲存退房日期資料
    },[adults,childrens,checkInDate,checkOutDate])
    

  return (
    <>  
        {/* 日期輸入表單 */}
        <div className="input-row">
            <span>入住日期</span>
            <input type="date" 
                   value={checkInDate} 
                   min={getFutureDate(0)} 
                   onChange={handleCheckInDateChange} />
            <span style={{marginLeft:'50px'}}>退房日期</span>
            <input type="date"  value={checkOutDate}  min={getNextDay()} onChange={handleCheckOutDateChange} />
            <span style={{marginLeft:'50px'}}>入住人數</span>
            <div className="input-container">
                <input
                    type="text"
                    value={`成人 ${adults} 位，孩童 ${childrens} 位`}
                    onClick={() => setShowOptions(true)}
                    readOnly 
                />
                {showOptions && (
                    <div className="options">
                        <div className='numberPeople'>
                            <span>成人：</span>
                            <button style={{marginLeft:'30px'}} onClick={() => handleAdultChange(adults - 1)} disabled={adults === 0}>-</button>
                            <span style={{margin:'0px 5px'}}>{adults}</span>
                            <button onClick={() => handleAdultChange(adults + 1)}>+</button>
                        </div>
                        <div className='numberPeople'>
                            <span>孩童：</span>
                            <button style={{marginLeft:'30px'}} onClick={() => handleChildrenChange(childrens - 1)} disabled={childrens === 0}>-</button>
                            <span style={{margin:'0px 5px'}}>{childrens}</span>                          
                            <button onClick={() => handleChildrenChange(childrens + 1)}>+</button>
                        </div>
                        <button className='finishBtm' onClick={handleOptionsClose}>完成</button>
                    </div>
                )}
            </div>
            <button className='inputSubmit'>查詢</button>    
      </div> 
        {/* 客房表單 */}
        {
         data ?         
            <table className='roomtable'>
                <thead>
                <tr>
                    <th>客房類型</th>
                    <th>適合人數</th>
                    <th>今日價格</th>
                    <th>預定須知</th>
                    <th>間數</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {data.map((v, i) => {
                    const roomCount = selectedRoomCounts[v.room_id] || '1';
                    const totalRoomPrice = v.room_price * roomCount;

                    return (
                    <tr key={v.room_id}>
                        <td>
                            <p>{v.room_name}</p>
                            <p>{v.room_type}</p>          
                            <span className='icon0'><FontAwesomeIcon icon={faBed}/>客房</span> 
                            <span className='icon'><FontAwesomeIcon icon={faCity} />市景</span> 
                            <span className='icon'><FontAwesomeIcon icon={faWind} />空調</span>  
                            <span className='icon'><FontAwesomeIcon icon={faMugSaucer} />咖啡機</span>        
                            <span className='icon'><FontAwesomeIcon icon={faVolumeXmark} />隔音</span>
                            <span className='icon'><FontAwesomeIcon icon={faShower}/>衛浴</span>
                            <span className='icon'><FontAwesomeIcon icon={faTv} />平面電視</span>
                            <span className='icon'><FontAwesomeIcon icon={faWifi} />免費wifi</span>                                
                        </td>
                        <td>
                        {Array.from({ length: v.room_capacity }).map((_, i) => <ImUser key={i} />)}         
                        </td>
                        <td>TWD:{v.room_price}</td>
                        <td>{v.room_describe} <br /> 無須訂金-入住時付款</td>
                        <td className='tableSelect'>
                            <select
                                name=""
                                id=""
                                value={roomCount}
                                onChange={e => setSelectedRoomCounts({ ...selectedRoomCounts, [v.room_id]: e.target.value })}
                                >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select></td>
                        <td className='tablebtm'>
                        <div>
                            {selectedRoomCounts[v.room_id] && `房間總價為: TWD: ${totalRoomPrice}`} 
                        </div>
                            <Link href={`/hotel/room/form/${hotel_id}?roomCount=${roomCount}&roomType=${v.room_type}&roomPrice=${v.room_price}&totalPrice=${totalRoomPrice}&roomName=${encodeURIComponent(v.room_name)}&hotelName=${encodeURIComponent(v.hotel_name)}&hotelAddress=${encodeURIComponent(v.hotel_address)}`}>
                                 <button>訂房</button>
                            </Link>
                        </td>
                    </tr>
                    )
                })}
                </tbody>
             </table>    
       : 'Loading...'}
    </>
  )
}
