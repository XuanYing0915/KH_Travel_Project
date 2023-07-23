import React, { useState } from 'react'

export default function RoomPhoto() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [showAllImages, setShowAllImages] = useState(false)
  const [currentImageId, setCurrentImageId] = useState(0)

  const images = [
    '/images/hotel/連通1.jpg',
    '/images/hotel/連通2.jpg',
    '/images/hotel/連通3.jpg',
    '/images/hotel/連通4.jpg',
    '/images/hotel/連通5.jpg',
    '/images/hotel/連通6.jpg',
  ]

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
        {images.map((v, i) => (
          <img
            key={i}
            src={v}
            alt={`Image ${i}`}
            onClick={() => handleClick(v)}
            style={{ width: '500px', height: '500px', objectFit: 'cover' }}
          />
        ))}
      </div>

      {selectedImage && (
        <div className="modal">
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
          <button className="close" onClick={closeModal}>
            &times;
          </button>
        </div>
      )}
    
    </div>
  )
}
