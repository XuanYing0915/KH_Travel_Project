import React from 'react'
import roomdata from '@/data/hotel/room.json'
import { ImUser } from 'react-icons/im' 
import { MdCoffeeMaker } from 'react-icons/md' 
import { MdAir } from 'react-icons/md' 
import { PiTelevisionSimpleFill } from 'react-icons/pi' 
import {BiSolidVolumeMute } from 'react-icons/bi' 
import {MdBathroom } from 'react-icons/md' 



export default function Table() {
  return (
    <>    
        <table>
            <thead>
            <tr>
                <th>客房類型</th>
                <th>適合人數</th>
                <th>今日價格</th>
                <th>預定須知</th>
                <th>間數</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {roomdata.data.map((v, i) => {
                return (
                <tr key={v.room_id}>
                    <td>
                        <p>{v.room_name}</p>
                        <p>{v.room_type}</p>
                        <span>< MdCoffeeMaker /></span>
                        <span>< MdAir /></span>
                        <span>< PiTelevisionSimpleFill /></span>
                        <span>< BiSolidVolumeMute /></span>
                        <span>< MdBathroom /></span>
                    </td>
                    <td>
                    {Array.from({ length: v.room_capacity }).map((_, i) => <ImUser key={i} />)}         
                    </td>
                    <td>TWD:{v.room_price}</td>
                    <td>{v.room_describe} <br /> 無須訂金-入住時付款</td>
                    <td>
                        <select name="" id="">
                            <option value="">1</option>
                            <option value="">2</option>
                            <option value="">3</option>
                        </select></td>
                    <td><button>訂房</button></td>
                </tr>
                )
            })}
            </tbody>
      </table>
     
      
    </>
  )
}
