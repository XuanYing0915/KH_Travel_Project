import React from 'react';
import Link from 'next/link';

export default function hotelCard2({ v }) {
  // 圖片載入
   const img = `/images/hotel/${v.hotel_img}`;

  return (
    <>
     <Link href={`/hotel/${v.hotel_id}`}>
        {/* card本體 */}
        <div className="hotelCard my-3" key={v.hotel_id}>
          {/* 圖片框架 */}
          <div className='cardBox' >
            <img
                src={img}
                style={{ height: '100%', width: '100%' }}
                alt={v.hotel_name}
              />
          </div>
          <div>
            <h4 className="hotelfont hotelh4">{v.hotel_name}</h4>
            <div className="hotelfooter"></div>
          </div>
        </div>
      </Link>
    </>
  );
}
