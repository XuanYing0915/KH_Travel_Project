import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuthJWT } from '@/hooks/use-auth-jwt' // 0815引用JWT認證
import Swal from 'sweetalert2'
import LikeCollect from '@/components/common-card2/like-collect'
import AOS from 'aos'
import 'aos/dist/aos.css'
import 'animate.css'

export default function IntroductionCard({
  id = 1,
  img_src = ' $()',
  name = '好喝咖啡',
  introduction = '品味與濃郁交織，香氣四溢，令人沉醉於其中的絕佳咖啡享受。',
  like = false,
  towheresrc = '/food/1',
  who = 2,
}) {
  const img = `/images/food/${img_src}`
  const { authJWT } = useAuthJWT()
   const numberid = authJWT.userData.member_id
  const [lovestate, setLoves] = useState(like)
  const [hover, setHover] = useState(false)

  const onClickHandler = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!authJWT.isAuth) {
      Swal.fire('請加入會員')
      return
    }
    toggleFav(id)
  }

  const toggleFav = (clickid) => {
    if (id === clickid) {
      setLoves(!lovestate)
    }
  }

  const hoverchange = (hoverstate) => {
    setHover(hoverstate)
  }

  // 動畫效果
 
  useEffect(() => {
    AOS.init({
    });
  }, []); 



  return (
    <div
    data-aos="zoom-in" data-aos-duration="1100"
      className="introductionCard"
      key={id}
      onMouseEnter={() => hoverchange(true)}
      onMouseLeave={() => hoverchange(false)}
    >
      <Link href={`/food/${towheresrc}`}>
        <div
          className={`content-overlay ${hover ? 'shadow' : ''}`}
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <LikeCollect
            className="like-collect"
            like={like}
            cardid={id}
            who={who}
          />

          <div className="textbox">
            <h4 className={`font h4 ${hover ? 'title-hover' : 'title'}`}>
              {name}
            </h4>
            <p className={`font p p-st2 ${hover ? 'visible' : 'invisible'}`}>
              {introduction}
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}
