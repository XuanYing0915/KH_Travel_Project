import React from 'react'
import Search from '@/components/search'
import Title from '@/components/title'
import Card2 from '@/components/common-card2/common-card2'

export default function index() {
  const cardList = []
  for (let i = 0; i < 8; i++) {
    cardList.push(<Card2 />)
  }
  return (
    <>
      <div className="ticket">
        {/* <div className="img-dark-bg"></div> */}
        <div>
          <div className="img-dark-bg"></div>
          <div className="divsearch">
            <Search />
          </div>
          <div className="row d-flex justify-content-center">{cardList}</div>
        </div>
      </div>
    </>
  )
}
