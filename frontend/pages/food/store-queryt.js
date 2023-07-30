import React from 'react'
import IntroductionCard from '@/components/food/Introduction-card'
import MapQuery from '@/components/food/map-query'
import styles from '@/styles/food.module.scss'
export default function index() {
  const card = []
  for (let i = 0; i < 1; i++) {
    card.push(<IntroductionCard />)
  }
  return (
    <>
      <div className={styles['query-body']}>
        <div className="img-dark-bg"></div>
        <MapQuery />
        <div className="row d-flex justify-content-center">{card}</div>
      </div>
    </>
  )
}
