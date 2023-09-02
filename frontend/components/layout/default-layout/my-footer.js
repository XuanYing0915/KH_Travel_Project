import React from 'react'
// import { LogoRemovebg } from "./LogoRemovebg";
import Image from 'next/image'

export default function MyFooter() {
  return (
    <footer className="footer d-flex">
      <div className="logo">
        <Image src="/logo.png" alt="" width={120} height={120} priority />
      </div>

      <div className="frame">
        <p className="mfee">MFEE39前端班第三組</p>
        <p className="element">
          <a href="#">聯絡我們:0958394687</a> ｜ <a href="#">其他相關</a>{' '}
        </p>
        <p className="copyright">
          Copyright © 2023
          免責聲明:此為專題練習使用，不會作為商業營利，若圖片有侵害到您的權益，請您通知我們，我們會立刻下架。
        </p>
      </div>
      <div className="date">
        <p>最後更新日期</p>
        <p>2023.09.04</p>
      </div>
    </footer>
  )
}
