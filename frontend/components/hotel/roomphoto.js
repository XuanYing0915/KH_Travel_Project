import React, { useState, useEffect } from 'react';


export default function RoomPhoto({data}) {
  const [selectedImage, setSelectedImage] = useState(null)
  const [showAllImages, setShowAllImages] = useState(false)
  const [currentImageId, setCurrentImageId] = useState(0)
  const [showMoreImages, setShowMoreImages] = useState(false) //隱藏照片
 
   // 可以分成兩組
   const visibleImages = data.slice(0, 6)
   const hiddenImages = showMoreImages ? images.slice(6) : []
 

  const handleModalClick = (event) => {
    // 檢查點擊的是否是模態框背景
    if (event.target.className === 'modal') {
      closeModal()
    }
  }

  const handleClick = (image) => {
    setSelectedImage(image)
    setCurrentImageId(data.indexOf(image))
    setShowAllImages(true)
  }

  const handlePrevImage = () => {
    setCurrentImageId((prevId) => (prevId === 0 ? data.length - 1 : prevId - 1))
  }

  const handleNextImage = () => {
    setCurrentImageId((prevId) => (prevId === data.length - 1 ? 0 : prevId + 1))
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
          {data.map((v, i) => (
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
