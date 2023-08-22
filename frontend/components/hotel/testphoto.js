import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import axios from 'axios'
import { useRouter } from 'next/router'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    height: '80%',
    width: '80%',
    transform: 'translate(-50%, -50%)',
    marginTop: '50px',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.55)', // 這會將背景設為半透明的黑色
  },
}

const hotelIdToName = {
  500010001: '宮賞藝術大飯店',
  500010002: '捷絲旅高雄站前館',
  500010003: '橋大飯店 - 火車站前館',
  500010004: 'WO Hotel',
  500010005: '華園大飯店草衙館',
  500010006: '秝芯旅店駁二館',
  500010007: '巨蛋旅店',
  500010008: '義大皇家酒店',
  500010009: '義大天悅飯店',
  500010010: '鈞怡大飯店',
  500010011: '高雄萬豪酒店',
  500010037: '福容大飯店',
  500010043: '高雄洲際酒店',
  500010025: '棚棚屋民宿Inn',
}

export default function TestPhoto({ data }) {
  let subtitle
  const [modalIsOpen, setIsOpen] = React.useState(false)
  const visibleImages = data.slice(0, 6)
  const [images, setImages] = useState([])
  const [selectedRoomImages, setSelectedRoomImages] = useState([])
  const [showBigGallery, setShowBigGallery] = useState(false)
  const router = useRouter()
  const { hotel_id } = router.query

  function openModal() {
    setIsOpen(true)
    handleRoomClick('ALL')
  }

  function afterOpenModal() {
    subtitle.style.color = 'black'
  }

  function closeModal() {
    setIsOpen(false)
  }

  function handleRoomClick(roomName) {
    if (roomName === 'ALL') {
      // 直接將 images 的資料轉換為你需要的格式
      const allImages = images.map((img) => ({
        original: `/images/hotel/${img.img_src}`,
        thumbnail: `/images/hotel/${img.img_src}`,
      }))
      setSelectedRoomImages(allImages)
    } else {
      const filteredImages = images
        .filter((img) => img.room_name === roomName)
        .map((img) => ({
          original: `/images/hotel/${img.img_src}`,
          thumbnail: `/images/hotel/${img.img_src}`, // 使用相同的圖片作為縮略圖，你也可以選擇其他縮略圖
        }))
      setSelectedRoomImages(filteredImages)
    }
  }

  const handleImageClick = () => {
    setShowBigGallery(true)
  }

  const handleBackToRooms = () => {
    setShowBigGallery(false)
  }

  const handleCloseModal = () => {
    closeModal()
    setShowBigGallery(false) // 重置大圖模式
    setSelectedRoomImages([]) // 重置已選擇的圖片
  }

  //客房photo路由設定 http://localhost:3005/hotelimg
  useEffect(() => {
    const hotel_name = hotelIdToName[hotel_id]
    if (hotel_name) {
      axios
        .get(`http://localhost:3005/hotelimg`)
        .then((response) => {
          const filteredImages = response.data.filter(
            (item) => item.hotel_name === hotel_name
          )
          setImages(filteredImages)
          console.log('後端撈資料', filteredImages)
        })
        .catch((error) => console.error(error))
    }
  }, [hotel_id])

  return (
    <>
      <div className="photoModalContainer">
        <div className="gallery">
          {visibleImages.map((v, i) => (
            <img
              key={i}
              src={v}
              alt={`Image ${i}`}
              onClick={openModal}
              style={{ width: '400px', height: '400px', objectFit: 'cover' }}
            />
          ))}
        </div>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={handleCloseModal}
          style={customStyles}
          contentLabel="Room Images Modal"
        >
          <div className="modal-header">
            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>相片集</h2>
            <button onClick={handleCloseModal} className="close-button">
              關閉 X
            </button>
          </div>
          {!showBigGallery ? (
            <>
              <div className="room-buttons">
                <button
                  className="room-button"
                  onClick={() => handleRoomClick('ALL')}
                >
                  總覽
                </button>
                {[...new Set(images.map((img) => img.room_name))].map(
                  (roomName, index) => (
                    <button
                      key={index}
                      onClick={() => handleRoomClick(roomName)}
                      className="room-button"
                    >
                      {roomName}
                    </button>
                  )
                )}
              </div>
              <div className="images-container">
                {selectedRoomImages.map((imgData, index) => (
                  <img
                    key={index}
                    src={imgData.original} // 注意這裡我們使用 imgData 的 original
                    alt={`Image ${index}`}
                    onClick={handleImageClick}
                    style={{ width: '400px', height: 'auto', margin: '10px' }}
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              <button onClick={handleBackToRooms}>← 相簿</button>
              <ImageGallery
                items={selectedRoomImages}
                showFullscreenButton={false}
                showPlayButton={false}
              />
            </>
          )}
        </Modal>
      </div>
    </>
  )
}
