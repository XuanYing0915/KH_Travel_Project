import React, { useState } from 'react';

export default function Input() {

    const [adults, setAdults] = useState(0);
    const [children, setChildren] = useState(0);
    const [showOptions, setShowOptions] = useState(false);
    const [checkInDate, setCheckInDate] = useState(''); // 新增入住日期狀態

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
    


  return (
    <>
      <div className="input-row">
            <span>入住日期</span>
            <input type="date" 
                   value={checkInDate} 
                   min={new Date().toISOString().split('T')[0]} 
                   onChange={handleCheckInDateChange} />
            <span style={{marginLeft:'50px'}}>退房日期</span>
            <input type="date" min={checkInDate} />
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
                            <button style={{marginLeft:'30px'}} onClick={() => handleAdultChange(adults + 1)}>+</button>
                            <span style={{margin:'0px 5px'}}>{adults}</span>
                            <button onClick={() => handleAdultChange(adults - 1)} disabled={adults === 0}>-</button>
                        </div>
                        <div className='numberPeople'>
                            <span>孩童：</span>
                            <button style={{marginLeft:'30px'}} onClick={() => handleChildrenChange(children + 1)}>+</button>
                            <span style={{margin:'0px 5px'}}>{children}</span>
                            <button onClick={() => handleChildrenChange(children - 1)} disabled={children === 0}>-</button>
                        </div>
                        <button style={{marginLeft:'60px'}} onClick={handleOptionsClose}>完成</button>
                    </div>
                )}
            </div>
            <button className='inputSubmit'>查詢</button>    
      </div> 
    </>
  )
}
