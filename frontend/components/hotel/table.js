import React,{ useState, useEffect } from 'react'
// import roomdata from '@/data/hotel/room.json'
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

export default function Table() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetch('http://localhost:3005/hotelroom')
        .then(response => {
          if (!response.ok) { throw Error(response.statusText); }
          return response.json();
        })
        .then(data => {
          const roomData = data.filter(hotel => hotel.hotel_name === "福容大飯店");
          setData(roomData); //把取得的資料存入 data 狀態
       
        })
        .catch(error => setError(error.toString()));
    }, []);
  
  return (
    <>  
        {error ? <div>Error: {error}</div> : 
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
                            <span className='icon'><FontAwesomeIcon icon={faWifi} />免費wify</span>                                
                        </td>
                        <td>
                        {Array.from({ length: v.room_capacity }).map((_, i) => <ImUser key={i} />)}         
                        </td>
                        <td>TWD:{v.room_price}</td>
                        <td>{v.room_describe} <br /> 無須訂金-入住時付款</td>
                        <td className='tableSelect'>
                            <select name="" id="">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select></td>
                        <td className='tablebtm'><button >訂房</button></td>
                    </tr>
                    )
                })}
                </tbody>
             </table>    
       : 'Loading...'}
    </>
  )
}
