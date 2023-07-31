import { useState } from 'react'
import Link from 'next/link'




export default function HomeCard1({
  id = 1,
  img_src = '',
  name = '',
  time = 'error',
  introduce = 'error',
  towheresrc = '#',
  imgrouter = ''
}) {


  const img = `/images/${imgrouter}/${img_src}`


  //收藏函式-------------------------



  return (
    <>
      {/* card本體 */}
      <div
        className=" homepageCard1 "
        key={id}
      >
        <Link href={towheresrc} >
          
          <div className={'imgbox'}>
            <img
              src={img}
              style={{ height: '100%', width: '100%' }}
              alt={name}
            />
          </div>

          {/* 下層文字框架及icon  上+下*/}
          <div className="textbox">
            {/* title */}
            <p className={ 'fs-4 text-primary fw-bold text-center'}>
              {name}
            </p>
            
          </div>
        </Link>
      </div>
    </>
  )
}
