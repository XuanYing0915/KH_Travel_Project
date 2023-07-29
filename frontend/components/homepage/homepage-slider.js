import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function HomepageSlider() {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    target : {
      displayHeight: 400,
      displayWidth: 300
    }
  }
  
  
  // getImageOriginalResolution = (base64) => {
  //     const image = new Image();
  //     image.onload = () => {
  //       this.setImageResolution(image.width, image.height)
  //       this.setState((ps) => ({...ps, imgRatio: image.width / image.height}))
  //     };
  //     image.src = base64;
  //   };
  //   setImageResolution = (imageWidth, imageHeight) => {
  //     const {target} = this.settings;
  //     let w = (imageWidth / imageHeight) * target.displayHeight;
  //     let h = (imageHeight / imageWidth) * target.displayWidth;
  //     imageWidth / imageHeight > target.displayWidth / target.displayHeight ? h = settings.displayHeight : w = settings.displayWidth;
  //     const marginLeft = (target.displayWidth / 2) - (w * 0.5);
  //     const marginTop = (target.displayHeight / 2) - (h * 0.5);
  //     this.setState((ps) => ({...ps, imageHeight: h, imageWidth: w, imgMarginLeft: marginLeft, imgMarginTop: marginTop}))
  //   }
    
    // <img style={{width: imageWidth + 'px', height: imageHeight + 'px', marginLeft: imgMarginLeft + 'px', marginTop: imgMarginTop + 'px'}}/>
  return (
    <div style={{maxHeight:'100%',maxWidth:'100%'}}>
        
        <Slider {...settings}>
          <div className='slide-pic' >
            <img src="/images/index/高流.jpg" style={{maxWidth:'100%', objectFit:'fill'}}/>
          </div>
          <div className='slide-pic'>
            <img src="images/index/高捷美麗島站.jpg" style={{maxWidth:'100%', objectFit:'fill'}}/>
          </div>
          <div className='slide-pic'>
            <img src="images/index/河景.jpg" style={{maxWidth:'100%', objectFit:'none'}}/>
          </div>
        </Slider>
    </div>
    
  )
}
