import React, { Component } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Homecard1 from '@/components/homepage/homepage-card1'

export default class HomepageCardSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: {
        dots: false,
        infinite: true,
        speed: 1500,
        slidesToShow: 5,
        slidesToScroll: 3,
        responsive: [

          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      }
    };
  }

  render() {
    const displayCard = this.props.card.map((item, i) => (
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
        <Slider {...this.state.settings}>
          {displayCard}
        </Slider>
      </>
    );
  }
}
