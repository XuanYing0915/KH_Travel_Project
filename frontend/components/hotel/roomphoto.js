import React, { useState } from 'react'

export default function RoomPhoto() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [showAllImages, setShowAllImages] = useState(false)
  const [CurrentImageId, setCurrentImageId] = useState(0)

  const images = [
    { id: 1, url: '/images/hotel/連通1.jpg' },
    { id: 2, url: '/images/hotel/連通2.jpg' },
    { id: 3, url: '/images/hotel/連通3.jpg' },
    { id: 4, url: '/images/hotel/連通4.jpg' },
    { id: 5, url: '/images/hotel/連通5.jpg' },
    { id: 6, url: '/images/hotel/連通6.jpg' },
  ];


  const handleClick = (image) => {
    setSelectedImage(image.url);
    setCurrentImageId(image.id);
    setShowAllImages(true)
  }

  const handlePrevImage = () => {
    setCurrentImageId((prevId) =>
      prevId === 1 ? images.length : prevId - 1
  
    ); 
  };
  
  const handleNextImage = () => {
    setCurrentImageId((prevId) =>
      prevId === images.length ? 1 : prevId + 1
     
    ); 
  };

  const closeModal = () => {
    setSelectedImage(null)
    setCurrentImageId(0)
    setShowAllImages(false)
  }

  return (
    <div>
      <div className="gallery">
        {images.slice(0, 6).map((image) => (
          <img
            key={image.id}
            src={image.url}
            alt={`Image ${image.id}`}
            onClick={() => handleClick(image)}
            style={{ width: '500px', height: '500px', objectFit: 'cover' }}
          />
        ))}
      </div>

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
      
    </div>
  );
}