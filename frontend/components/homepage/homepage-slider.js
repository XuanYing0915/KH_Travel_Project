import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



export default function HomepageSlider() {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    autoplay:true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    
  }
  
  return (
    < >
        
        <Slider {...settings}>
          <div className='slide-pic' >
            <img src="/images/index/高流.jpg" />
          </div>
          <div className='slide-pic'>
            <img src="images/index/高捷美麗島站.jpg" style={{objectPosition:'30% 80%'}}/>
          </div>
          <div className='slide-pic'>
            <img src="images/index/河景.jpg" />
          </div>
        </Slider>
    </>
    
  )
}
