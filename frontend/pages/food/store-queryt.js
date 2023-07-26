import React from 'react'
import Introductioncard from '@/components/food/Introduction-card'

export default function index() {
  const cardList = []
  for (let i = 0; i < 10; i++) {
    cardList.push(<Introductioncard />)
  }
  return (
    <>
      <div>
        <div className="img-dark-bg"></div>
        <div className="row d-flex justify-content-center">{cardList}</div>
      </div>
    </>
  )
}
