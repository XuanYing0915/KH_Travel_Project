import React from 'react'
import Hotelphoto from '@/components/hotel/hotelphoto'
import Pscall from '@/components/hotel/pscall'
import Search from '@/components/search'

export default function hotelSearch() {
  return (
    <>
      <div>
        <Hotelphoto />
      </div>
      <div>
        {/* <div className="divsearch"> */}
        <div className="container">
          <Pscall />     
        </div>
      </div>
    </>
  )
}
