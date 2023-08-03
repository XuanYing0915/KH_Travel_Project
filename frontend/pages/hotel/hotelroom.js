import React from 'react'
import RoomPhoto from '@/components/hotel/roomphoto'
import Table from '@/components/hotel/table'
import Input from '@/components/hotel/input'
import Message from '@/components/hotel/message'


export default function hotelroom() {
  return (
    <>
      <div className='hotelRoomBody'>
        
          <RoomPhoto /> 
          <h2 style={{margin:'30px',textAlign:'center'}}>預定客房</h2>
          <Input />   
          <Table />   
          <h2 style={{margin:'30px',textAlign:'center'}}>住客評語</h2>
          <Message />   
        
      </div>
    </>
  )
}
