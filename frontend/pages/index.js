// pages/index.js
import Link from 'next/link'
import Image from 'next/image'
import PlaceholderText from '@/components/common/placeholder-text'
import background from '@/public/images/index/高流.jpg'

export default function Home() {
  return (
    <>


      <main style={{ marginTop: '90px' }}>

        <div className='d-flex flex-row' style={{ maxHeight: 'calc(100vh -120px)' }}>
          <div style={{ width: '160px' }}>

          </div>
          <div className='homepage-pic'
            style={{ backgroundImage: `url(${background.src})`}} >
            
            <span className='homepage-text' id='homepage-text1'>在高雄</span>
            <span className='homepage-text' id='homepage-text2'>盡情探索驚喜與美景</span>
            
            
          </div>


          <div style={{ width: '160px' }}>

          </div>
        </div>
        <div className='container'>
          123
        </div>


      </main>

      <style global jsx>
        {`
         .homepage-pic{
          position:relative;
          width: 100%;
          min-height: 60vh;
          overflow: hidden;
          background-attachment: fixed;
          background-repeat: no-repeat;
          background-size: cover;
          background-position: 35% 40%;
         }
         .homepage-text{
          background:white;
          padding-inline:20px;
          font-size:24px;
          font-weight:700;
         }
         #homepage-text1{
          position:absolute;
          bottom:35%;
          right:80px;
         }
         #homepage-text2{
          position:absolute;
          bottom:calc(35% - 70px);
          right:80px;
         }

         
        
          .card-cover {
            background-repeat: no-repeat;
            background-position: center center;
            background-size: cover;
          }

          .text-shadow-1 {
            text-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.25);
          }
          .text-shadow-2 {
            text-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.25);
          }
          .text-shadow-3 {
            text-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.25);
          }
        `}
      </style>
    </>
  )
}
