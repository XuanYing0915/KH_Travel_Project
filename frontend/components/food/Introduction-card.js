import { useState } from 'react'
import Link from 'next/link'
import LoveIcon from './love-icon'
import NoLoveIcon from './nolove-icon'
import styles from './IntroductionCard.module.scss'
import { useAuthJWT } from '@/hooks/use-auth-jwt' // 0815引用JWT認證
import Swal from 'sweetalert2'
import Float from '@/components/attraction/float-btn'

export default function IntroductionCard({
  id = 1,
  img_src = ' $()',
  name = '好喝咖啡',
  introduction = '品味與濃郁交織，香氣四溢，令人沉醉於其中的絕佳咖啡享受。',
  like = false,
  towheresrc = '/food/1',
}) {
  const img = `/images/food/${img_src}`;
  const { authJWT } = useAuthJWT();
  const [lovestate, setLoves] = useState(like);
  const [hover, setHover] = useState(false);

  const onClickHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!authJWT.isAuth) {
      Swal.fire('請加入會員');
      return;
    }
    toggleFav(id);
  };

  const toggleFav = (clickid) => {
    if (id === clickid) {
      setLoves(!lovestate);
    }
  };

  const hoverchange = (hoverstate) => {
    setHover(hoverstate);
  };

  return (
    <div
      className={styles.introductionCard}
      key={id}
      onMouseEnter={() => hoverchange(true)}
      onMouseLeave={() => hoverchange(false)}
    >
      <Link href={`/food/${towheresrc}`}>
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
            onClick={onClickHandler}
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
              {introduction}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
