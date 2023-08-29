import React from 'react'
import RegisterForm from '@/components/member/register-form'

export default function Register() {
  return  <div className='bg'><RegisterForm />
  <style jsx> {` .bg {
    background: url('/images/member/yoyo.jpg');
    background-repeat: no-repeat;
    
            background-size: 100% 100%; // 新增這一行
            width: 1920px;  // 確保占滿整個寬度
            height: 960px;  // 確保占滿整個高度
  }`}
  </style>
  </div>;
} // 可以返回null或一個加載指示符，表示正在轉到會員中心


