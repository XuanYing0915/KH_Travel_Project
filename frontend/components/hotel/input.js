import React, { useState } from 'react';

export default function Input() {

    const getFutureDate = (days, baseDate = new Date()) => {
        let newDate = new Date(baseDate);
        newDate.setDate(newDate.getDate() + days); 
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        return `${year}-${month < 10 ? `0${month}` : `${month}`}-${date < 10 ? `0${date}` : `${date}`}`;
    };
     

    const [adults, setAdults] = useState(0);
    const [children, setChildren] = useState(0);
    const [showOptions, setShowOptions] = useState(false);
    const [checkInDate, setCheckInDate] = useState(getFutureDate(5)); // 新增入住日期狀態
    const [checkOutDate, setCheckOutDate] = useState(getFutureDate(7)); // 退房日期預設為當前日期的7天後
    
    const handleAdultChange = (value) => {
        setAdults(value < 0 ? 0 : value);
    };

    const handleChildrenChange = (value) => {   
        setChildren(value < 0 ? 0 : value);
    };

    const handleOptionsClose = () => {
        setShowOptions(false);
      };

      const handleCheckInDateChange = (e) => {
        setCheckInDate(e.target.value);
      };
    
       // 新增處理器
    const handleCheckOutDateChange = (e) => {
        setCheckOutDate(e.target.value);
    };
    
    const getNextDay = () => {
        return getFutureDate(1, new Date(checkInDate));
    };

  return (
    <>
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
                    value={`成人 ${adults} 位，孩童 ${children} 位`}
                    onClick={() => setShowOptions(true)}
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
                            <button style={{marginLeft:'30px'}} onClick={() => handleChildrenChange(children - 1)} disabled={children === 0}>-</button>
                            <span style={{margin:'0px 5px'}}>{children}</span>                          
                            <button onClick={() => handleChildrenChange(children + 1)}>+</button>
                        </div>
                        <button className='finishBtm' onClick={handleOptionsClose}>完成</button>
                    </div>
                )}
            </div>
            <button className='inputSubmit'>查詢</button>    
      </div> 
    </>
  )
}
