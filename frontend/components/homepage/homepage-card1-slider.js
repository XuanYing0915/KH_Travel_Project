import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Homecard1 from '@/components/homepage/homepage-card1'


export default function HomepageCardSlider({ card }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 5,
    slidesToScroll: 3,
  }

  const displayCard = card.map((item, i) => (
    <div className='slide-pic' key={i}>
      <Homecard1
        id={i}
        img_src={item.img_name}
        name={item.attraction_name}
        like={false}
        towheresrc={"/attraction/" + `${item.attraction_id}`}
        imgrouter="attraction"
      />
    </div>
  ));

  return (
    <>

      <Slider {...settings}>
        {displayCard}

      </Slider>
    </>

  )
}
