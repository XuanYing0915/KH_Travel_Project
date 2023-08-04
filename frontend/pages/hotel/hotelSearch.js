import React from 'react'
import Hotelphoto from '@/components/hotel/hotelphoto'
import Pscall from '@/components/hotel/pscall'


export default function hotelSearch() {
  return (
    <>
      <div className='hotelSearchBody'>
        <div>
          <Hotelphoto />
        </div>
        <div>
          {/* <div className="divsearch"> */}
          <div className="container">
            <Pscall />     
          </div>
        </div>
      </div>
    </>
  )
}
