import React from 'react'
import Search from '@/components/search'
import Card2 from '@/components/common-card2/common-card2'
import { Footer } from '@/components/layout/footer/footer'
import Card5 from '@/components/hotel/hotel-card2'
import Hotelphoto from '@/components/hotel/hotelphoto'

export default function hotelSearch() {
  return (
    <>
      <div>
        <Hotelphoto />
      </div>
      <div>
        <div className="divsearch">
          <Search />
        </div>
        <div className="card-dog d-flex flex-wrap px-3 ">
          <Card5 />
        </div>
      </div>
    </>
  )
}
