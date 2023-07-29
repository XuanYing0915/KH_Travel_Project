import React from 'react'
import Introductioncard from '@/components/food/Introduction-card'

export default function index() {
  const card = []
  for (let i = 0; i < 10; i++) {
    card.push(<Introductioncard />)
  }
  return (
    <>
      <div className="queryt-body">
        <div className="img-dark-bg"></div>
        <div>123</div>
        <div className="row d-flex justify-content-center">{card}</div>
      </div>
    </>
  )
}
