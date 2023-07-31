import React from 'react'
import Card  from '@/components/attraction/card-for-long/Introduction-card' 
import more from '@/data/attraction/more_attraction.json'
import Card1 from '@/components/food/Introduction-card'
  
export default function test() {
  return (
    <>
      <div className="container-space">123456</div>
      <div className="row">
      <Card1 />
        {more.attractions.map((v, i) => (
          <>
            <div className="col-3">
              <Card
                id={v.attraction_id}
                img_src={v.images[0]}
                name={v.attraction_name}
                introduce={v.title}
                like={false}
                towheresrc={`#${v.attraction_id}`}
              />
            </div>
          </>
        ))}
      </div>
    </>
  )}