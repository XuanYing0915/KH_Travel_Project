import React from 'react'
import Search from '@/components/search'
import Card2 from '@/components/common-card2/common-card2'
import { Footer } from '@/components/layout/footer/footer'

export default function hotelSearch() {
  return (
    <>
      {/* <div className="img-dark-bg"></div> */}
      <div>
        <div className="img-dark-bg"></div>
        <div className="divsearch">
          <Search />
        </div>
        <div className="card-dog d-flex flex-wrap px-3 " >
          <Card2 className="my-3"/>
          <Card2 />
          <Card2 />
          <Card2 />
          <Card2 />
          <Card2 />
          <Card2 />
          <Card2 />
          <Card2 />
          <Card2 />
          <Card2 />
          <Card2 />
          <Card2 />
        </div>
      </div>
     
    </>
  )
}
