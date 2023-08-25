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

  // 定義四種不同的動畫效果
  const animations = ["zoom-in", "fade-up", "slide-right", "flip-up"];

  const [animation, setAnimation] = useState(animations[0]);

  useEffect(() => {
    // 隨機選擇一個動畫效果
    const selectedAnimation = animations[Math.floor(Math.random() * animations.length)];
    setAnimation(selectedAnimation);

    AOS.init({
      once: true, // 這裡保持 once 為 true，只在元素首次出現在視窗中時觸發動畫
    });
  }, []); // 如果你想要在某個特定屬性更改時改變動畫，可以在此數組中加入那個屬性



  return (
    <div
    data-aos={animation} data-aos-duration="1200"
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
