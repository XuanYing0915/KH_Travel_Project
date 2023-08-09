import React, { useState } from 'react';
import axios from 'axios';


export default function Form() {
    const [formData, setFormData] = useState({
        name: '',
        roomType: '',
        checkIn: '',
        checkOut: ''
        // 其他所需欄位
      });
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('/api/book', formData);
          console.log('Booking response:', response.data);
          // 處理訂房成功的邏輯，例如跳轉到確認頁面
        } catch (error) {
          console.error('Booking error:', error);
          // 處理訂房失敗的邏輯
        }
      };
  return (
    <>
    <h1>訂房表單</h1>
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" onChange={handleChange} placeholder="Name" required />
      <input type="text" name="roomType" onChange={handleChange} placeholder="Room Type" required />
      <input type="date" name="checkIn" onChange={handleChange} required />
      <input type="date" name="checkOut" onChange={handleChange} required />
      {/* 其他所需的欄位 */}
      <button type="submit">Book</button>
    </form>
    </>
  )
}
