import { useState } from 'react'
import Link from 'next/link'
import styles from './IntroductionCard.module.scss'

export default function IntroductionCard({
  id = 1,
  name = '好喝咖啡',
  title = '品味與濃郁交織，香氣四溢，令人沉醉於其中的絕佳咖啡享受。',
  towheresrc = '#',
  attractionimg = '$()',
}) {
  const img = `/images/attraction/${attractionimg}`
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
      <Link href={`/attraction/${id}`}>
        <div
          className={`${styles['content-overlay']} ${hover ? 'shadow' : ''}`}
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
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
              {title}
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}
