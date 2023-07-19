import { useRef, useState } from 'react'
import LandingLayout from '@/components/layout/landing-layout'
import Title from '@/components/title'

// demo Fullscreen Video:
// from : https://www.w3schools.com/howto/howto_css_fullscreen_video.asp
export default function News() {
  const [buttonText, setButtonText] = useState('Pause')

  const videoRef = useRef(null)

  return (
    <>
      <section id="hero" className="d-flex align-items-center">
        <video autoPlay muted loop id="myVideo" ref={videoRef}>
          <source
            // src="https://www.w3schools.com/howto/rain.mp4"
            type="video/mp4"
          />
        </video>
        <div id="content">
          <h1>Heading</h1>
          <p>Lorem ipsum...</p>
          <Title title="標題名稱很多字" />
          <button
            id="myBtn"
            onClick={() => {
              if (videoRef.current.paused) {
                videoRef.current.play()
                setButtonText('Pause')
              } else {
                videoRef.current.pause()
                setButtonText('Play')
              }
            }}
          >
            {buttonText}
          </button>
        </div>
      </section>
      <style jsx>
        {`
          #myVideo {
            position: fixed;
            right: 0;
            bottom: 0;
            min-width: 100%;
            min-height: 100%;
          }

          #content {
            position: fixed;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            color: #f1f1f1;
            width: 100%;
            padding: 20px;
            margin: 0;
          }

          #myBtn {
            width: 200px;
            font-size: 18px;
            padding: 10px;
            border: none;
            background: #000;
            color: #fff;
            cursor: pointer;
          }

          #myBtn:hover {
            background: #ddd;
            color: black;
          }
        `}
      </style>
    </>
  )
}

News.getLayout = function (page) {
  return <LandingLayout>{page}</LandingLayout>
}
