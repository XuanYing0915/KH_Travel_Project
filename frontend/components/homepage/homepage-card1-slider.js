import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Homecard1 from '@/components/homepage/homepage-card1'


export default function HomepageCardSlider() {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true

  }


  return (
    <div >

      <Slider {...settings}>
        <div className='slide-pic' >
          <Homecard1
            id={1}
            img_src="溫迪.png"
            name="洲際飯店"
            like={false}
            towheresrc="/attraction/#"
            imgrouter="attraction"
          />
        </div>
        <div className='slide-pic'>
          <Homecard1
            id={2}
            img_src="溫迪.png"
            name="洲際飯店"
            like={false}
            towheresrc="/attraction/#"
            imgrouter="attraction"
          />
        </div>
        <div className='slide-pic'>
          <Homecard1
            id={3}
            img_src="溫迪.png"
            name="洲際飯店"
            like={false}
            towheresrc="/attraction/#"
            imgrouter="attraction"
          />
        </div>
      </Slider>
    </div>

  )
}
