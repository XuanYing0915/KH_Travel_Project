import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function RoomPhoto() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [showAllImages, setShowAllImages] = useState(false)
  const [currentImageId, setCurrentImageId] = useState(0)
  const [showMoreImages, setShowMoreImages] = useState(false) //隱藏照片
  const [images, setImages] = useState([]);

  
  useEffect(() => {
    axios.get('http://localhost:3005/hotelimg')
      .then(res => {
        const imgs = res.data.filter(item => item.hotel_name === "高雄萬豪酒店").map(item => '/images/hotel/' + item.img_src);
        setImages(imgs);
      })
      .catch(error => console.error(error));
  }, []);
  

  // const images = [
  //   '/images/hotel/連通1.jpg',
  //   '/images/hotel/連通2.jpg',
  //   '/images/hotel/連通3.jpg',
  //   '/images/hotel/連通4.jpg',
  //   '/images/hotel/連通5.jpg',
  //   '/images/hotel/連通6.jpg',
  //     // 假設還有其他6張圖片
  //     '/images/hotel/晶英.jpg',
  //     '/images/hotel/溫德.jpg',
  //     '/images/hotel/御宿建國.jpg',
  //     '/images/hotel/望峰.jpg',
  //     '/images/hotel/御宿.jpg',
  //     '/images/hotel/捷絲旅中正.jpg',
  // ]

   // 可以分成兩組
   const visibleImages = images.slice(0, 6)
   const hiddenImages = showMoreImages ? images.slice(6) : []
 

  const handleModalClick = (event) => {
    // 檢查點擊的是否是模態框背景
    if (event.target.className === 'modal') {
      closeModal()
    }
  }

  const handleClick = (image) => {
    setSelectedImage(image)
    setCurrentImageId(images.indexOf(image))
    setShowAllImages(true)
  }

  const handlePrevImage = () => {
    setCurrentImageId((prevId) => (prevId === 0 ? images.length - 1 : prevId - 1))
  }

  const handleNextImage = () => {
    setCurrentImageId((prevId) => (prevId === images.length - 1 ? 0 : prevId + 1))
  }

  const closeModal = () => {
    setSelectedImage(null)
    setCurrentImageId(0)
    setShowAllImages(false)
  }

  return (
    <div>
        <div className="gallery">
        {visibleImages.map((v, i) => (
          <img key={i} src={v} alt={`Image ${i}`} onClick={() => handleClick(v)} style={{ width: '400px', height: '400px', objectFit: 'cover' }} />
        ))}
      </div>
      {showMoreImages && (
        <div className="gallery">
          {hiddenImages.map((v, i) => (
            <img key={i + 6} src={v} alt={`Image ${i + 6}`} onClick={() => handleClick(v)} style={{ width: '400px', height: '400px', objectFit: 'cover' }} />
          ))}
        </div>
      )}

      {selectedImage && (
        <div className="modal"  onClick={handleModalClick}>
          {images.map((v, i) => (
            <div
              key={v + i}
              className={`carousel-item ${i === currentImageId ? 'active' : ''}`}
            >
              <img src={v} className="modal-content" alt="" />
            </div>           
          ))}
        
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselProduct"
            data-bs-slide="prev"
            onClick={handlePrevImage}
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselProduct"
            data-bs-slide="next"
            onClick={handleNextImage}
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      )}
    
    </div>
  )
}
