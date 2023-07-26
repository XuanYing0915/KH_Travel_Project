import TodoIndex from '@/components/todo'

import React, { Component } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

function Fade() {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }
  return (
    <div>
      <h2>Fade</h2>
      <Slider {...settings}>
        <div>
          <Image
            src="https://plus.unsplash.com/premium_photo-1678853633562-74721c38552b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
            alt="Image 1"
          />
        </div>
        <div>
          <Image
            src="https://images.unsplash.com/photo-1689781922550-81cacef1d933?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=385&q=80"
            alt="Image 2"
          />
        </div>
        {/* <div>
          <img src="https://your-image-url.com/image3.jpg" alt="Image 3" />
        </div>
        <div>
          <img src="https://your-image-url.com/image4.jpg" alt="Image 4" />
        </div> */}
      </Slider>
    </div>
  )
}

export default function Todo() {
  return (
    <>
      <h1>Todo待辨事項</h1>
      <TodoIndex />
      <Fade />
    </>
  )
}
