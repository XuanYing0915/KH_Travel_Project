import React from 'react'
import Title from '@/components/title'
import Card2 from '@/components/common-card2/common-card2'
import Detail from '@/components/hotel/detail'


export default function hotelSearch() {
  return (
    <> 
        <div className="hotelDetailBody">
          <Detail />
          <hr />
          <Title title="周邊景點" style="title_box_dark" />
          <div className="d-flex">
            <Card2
              id={1}
              img_src="洲際.jpg"
              name="洲際飯店"
              like={true}
              towheresrc="#"
              imgrouter="hotel"
            />
            <Card2
              id={1}
              img_src="洲際.jpg"
              name="洲際飯店"
              like={true}
              towheresrc="#"
              imgrouter="hotel"
            />
            <Card2
              id={1}
              img_src="洲際.jpg"
              name="洲際飯店"
              like={true}
              towheresrc="#"
              imgrouter="hotel"
            />
            <Card2
              id={1}
              img_src="洲際.jpg"
              name="洲際飯店"
              like={true}
              towheresrc="#"
              imgrouter="hotel"
            />
          </div>
          <Title title="周邊美食" style="title_box_dark" />
          <div className="d-flex">
            <Card2
              id={1}
              img_src="洲際.jpg"
              name="洲際飯店"
              like={true}
              towheresrc="#"
              imgrouter="hotel"
            />
            <Card2
              id={1}
              img_src="洲際.jpg"
              name="洲際飯店"
              like={true}
              towheresrc="#"
              imgrouter="hotel"
            />
            <Card2
              id={1}
              img_src="洲際.jpg"
              name="洲際飯店"
              like={true}
              towheresrc="#"
              imgrouter="hotel"
            />
            <Card2
              id={1}
              img_src="洲際.jpg"
              name="洲際飯店"
              like={true}
              towheresrc="#"
              imgrouter="hotel"
            />
          </div>
          <div style={{ margin: '50px' }}></div>
        </div>
    </>
  )
}
