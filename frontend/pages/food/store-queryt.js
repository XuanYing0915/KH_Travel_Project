import React from 'react'
import Introductioncard from '@/components/food/Introduction-card'
import Introductioncard from '@/components/food/Introduction-card'

import styles from '@/styles/food.module.scss'
export default function index() {
  const card = []
  for (let i = 0; i < 1; i++) {
    card.push(<Introductioncard />)
  }
  return (
    <>
      <div className={styles['queryt-body']}>
        <div className="img-dark-bg"></div>
        <div>123</div>
        <div className="row d-flex justify-content-center">{card}</div>
      </div>
    </>
  )
}
