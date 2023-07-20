// pages/index.js
import Link from 'next/link'
import Image from 'next/image'
import PlaceholderText from '@/components/common/placeholder-text'

export default function Home() {
  return (
    <>
      

      <main style={{ marginTop: '90px' }}>

        <div className='d-flex flex-row' style={{ maxHeight: 'calc(100vh -120px)', border: '1px solid black' }}>
          <div style={{ width: '120px' }}>
            1
          </div>
          <div style={{ width: 'calc(100vw -240px)', maxHeight: 'calc(100vh - 200px)', overflow: 'hidden' }}>
            <img src='\images\index\高流.jpg' style={{ objectFit: 'fill', }}></img>
          </div>


          <div style={{ width: '120px' }}>
            
          </div>
        </div>
        <div className='container'>
          123
        </div>


      </main>

      <style global jsx>
        {`
        
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
