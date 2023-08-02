import { useState } from 'react'
import Link from 'next/link'
import LoveIcon from './love-icon'
import NoLoveIcon from './nolove-icon'
import styles from './IntroductionCard.module.scss'

export default function IntroductionCard({
  id = 1,
  img_src = '2023-05-20.jpg',
  name = '好喝咖啡',
  introduce = '品味與濃郁交織，香氣四溢，令人沉醉於其中的絕佳咖啡享受。',
  like = false,
  towheresrc = '#',
}) {
  const img = `/images/food/${img_src}`

  const [lovestate, setLoves] = useState(like)
  const toggleFav = (clickid) => {
    if (id === clickid) {
      setLoves(!lovestate)
    }
  }

  const [hover, setHover] = useState(false)
  const hoverchange = (hoverstate) => {
    setHover(hoverstate)
  }

  return (
    <div
      className={styles.introductionCard}
      key={id}
      onMouseEnter={() => hoverchange(true)}
      onMouseLeave={() => hoverchange(false)}
    >
      <Link href={towheresrc}>
        <div
          className={`${styles['content-overlay']} ${hover ? 'shadow' : ''}`}
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <button
            className={`${styles.buttonStyle} heart-icon`}
            onClick={(e) => {
              e.preventDefault()
              toggleFav(id)
            }}
          >
            {lovestate ? <LoveIcon /> : <NoLoveIcon />}
          </button>
          <div className={styles.textbox}>
            <h4
              className={`${styles.font} ${styles.h4} ${
                hover ? styles['title-hover'] : styles.title
              }`}
            >
              {name}
            </h4>
            <p
              className={`${styles.font} ${styles.p} ${styles['p-st2']} ${
                hover ? styles.visible : styles.invisible
              }`}
            >
              {introduce}
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}
