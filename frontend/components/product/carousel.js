import { useState } from 'react'

const thumbsSample = [
  '/images/thumb-1.png',
  '/images/thumb-2.png',
  '/images/thumb-3.png',
]

const imgsSample = ['/images/p-1.webp', '/images/p-2.webp', '/images/p-3.webp']

export default function Carousel() {
  const [thumbs, setThumbs] = useState(thumbsSample)
  const [imgs, setImgs] = useState(imgsSample)

  return (
    <>
      <div id="carouselProduct" className="carousel slide carousel-fade">
        <div className="d-flex flex-row mb-3 justify-content-center">
          <div className="p-2">
            <ul className="thumbnails">
              {thumbs.map((v, i) => {
                return (
                  <li key={i}>
                    <a
                      href="#"
                      type="button"
                      data-bs-target="#carouselProduct"
                      data-bs-slide-to={i}
                      className="active"
                      aria-current="true"
                      aria-label={`Slide ${i + 1}`}
                    >
                      <img src={v} alt={v} />
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="p-2">
            <div className="carousel-inner">
              {imgs.map((v, i) => {
                return (
                  <div
                    key={v + i}
                    className={`carousel-item ${i === 0 ? 'active' : ''}`}
                  >
                    <img src={v} className="d-block w-100" alt="" />
                  </div>
                )
              })}
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselProduct"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselProduct"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
