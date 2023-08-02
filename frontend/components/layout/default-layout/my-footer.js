import React from "react";
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
                    <a href="#">聯絡我們</a> ｜ <a href="#">其他相關</a> </p>
                <p className="copyright">Copyright © 2023 MFEE39前端班第三組</p>
            </div>
            <div className="date">
                <p>最後更新日期</p>
                <p>2023.07.03</p>
            </div>
        </footer>
    );
}
