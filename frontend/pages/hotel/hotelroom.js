import React from 'react'
import RoomPhoto from '@/components/hotel/roomphoto'
import Table from '@/components/hotel/table'
import Input from '@/components/hotel/input'


export default function hotelroom() {
  return (
    <>
      <div className="roomphoto">
        <RoomPhoto /> 
        <h2 style={{margin:'30px',textAlign:'center'}}>預定客房</h2>
        <Input />   
        <Table />   
      </div>
     
    </>
  )
}
