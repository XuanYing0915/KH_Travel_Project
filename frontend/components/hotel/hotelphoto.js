import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
    <main className="mainphoto">
        <div>
            <Slider {...settings}>
            <div  className='slide-pic' style={{height:'350px'}} >    
                <img src="/images/hotel/河堤.jpg" />
            </div>
            <div className='slide-pic' style={{height:'350px'}} >
              <img src="/images/hotel/河堤.jpg" />
            </div>
            <div className='slide-pic' style={{height:'350px'}} >
            <img src="/images/hotel/河堤.jpg" />
            </div>           
            </Slider>    
        </div>
    </main>

    );
  }
}
