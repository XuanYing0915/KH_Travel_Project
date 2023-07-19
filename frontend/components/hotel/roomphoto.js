import React, { useState } from 'react'

export default function RoomPhoto() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [showAllImages, setShowAllImages] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const images = [
    '/images/hotel/洲際.jpg',
    '/images/hotel/WO.jpg',
    '/images/hotel/河堤.jpg',
    '/images/hotel/花季.jpg',
    '/images/hotel/華園草衙.jpg',
    '/images/hotel/捷絲旅.jpg',
  ]

  const handleClick = (image, index) => {
    setSelectedImage(image)
    setCurrentImageIndex(index)
    setShowAllImages(true)
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => prevIndex - 1)
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => prevIndex + 1)
  }

  const closeModal = () => {
    setSelectedImage(null)
    setCurrentImageIndex(0)
    setShowAllImages(false)
  }

  return (
    <div>
      <div className="gallery">
        {images.slice(0, 6).map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index + 1}`}
            onClick={() => handleClick(image, index)}
            style={{ width: '200px', height: '200px', objectFit: 'cover' }}
          />
        ))}
      </div>

      {selectedImage && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <img
              src={selectedImage}
              alt="Selected Image"
              className="modal-image"
            />
          </div>
        </div>
      )}

      {selectedImage && (
        <div className="modal">
          <span className="arrow arrow-left" onClick={handlePrevImage}>
            &lt;
          </span>
          <span className="arrow arrow-right" onClick={handleNextImage}>
            &gt;
          </span>
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <img
              src={selectedImage}
              alt="Selected Image"
              className="modal-image"
            />
          </div>
        </div>
      )}

      {showAllImages && (
        <div className="gallery">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index + 1}`}
              onClick={() => handleClick(image, index)}
              style={{ width: '400px', height: '400px', objectFit: 'cover' }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
