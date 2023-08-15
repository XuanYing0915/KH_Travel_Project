import React, { useState, useEffect } from 'react'
import Hotelphoto from '@/components/hotel/hotelphoto'
import Pscall from '@/components/hotel/pscall'
import { useAuthJWT } from '@/hooks/use-auth-jwt'


export default function hotelSearch() {  
  
  const { authJWT } = useAuthJWT()
  // 未登入時，不會出現頁面內容
  if (!authJWT.isAuth) return <></>
  return (
    <>
      <div className="hotelSearchBody">
        <div>
          <Hotelphoto />
        </div>
        <div>
          {/* <div className="divsearch"> */}
          <div className="container">
            <Pscall />
          </div>
        </div>
      </div>
    </>
  )
}
