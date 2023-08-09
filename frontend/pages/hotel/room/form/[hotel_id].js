import React, { useContext } from 'react';
import {CartContext} from '@/components/hotel/CartContext'


export default function RoomForm() {

  const {cartItems, setCartItems} = useContext(CartContext)
  const {adults} = useContext(CartContext)

  return (
    <>
        <h1>客房確認表單</h1>
        {cartItems}
        {adults}
    </>
  )
}
