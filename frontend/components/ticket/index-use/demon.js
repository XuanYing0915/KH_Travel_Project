import { useState, useEffect, useContext } from "react";
import { useAuthJWT } from '@/hooks/use-auth-jwt' // 0815引用JWT認證

//全域鉤子
import { CartContext } from '@/components/hotel/CartContext'

// 判斷會員 V-- > 點選按鈕--(轉盤取值)V-- > 設定{ 值: 值, time: 12hr } 存入資料庫+狀態V --> 取得資料庫時判定與現在時間差多少(尚未取得)


// 取到設定值(有寫入狀態)-- > 將資料表內的資料刷新(尚未)-- > 得到折扣
//     |
//     --> 將值 及 時間 放在(轉盤)旁邊 隨時間減少(設定值會減少) V (有抓到每秒倒數的時間)

// 缺少:1.判斷會員並阻止 2. 刪除資料庫 3.進入頁面讀取資料庫  4.將有的狀態去改變資料頁





export default function Counter() {

    //會員狀態
    const { authJWT } = useAuthJWT()
    const numberid = authJWT.userData.member_id

    //全域鉤子
    const { discount, setDiscount } = useContext(CartContext) //有類別優惠 ('null')
    const { times, setTimes } = useContext(CartContext) // 創建時間+會員名稱{ 'name': 'qaz2.0', 'time': null }
    const [isTimeSet, setIsTimeSet] = useState({ 'open': false, 'check': 0 }); //開啟倒數true



    const testclick = () => {
        // console.log('discount:', discount)
        // console.log('times:', times)
        // setDiscount({ ...discount, calss: null })
        setDiscount('古蹟')
        setTimes({ ...times, time: new Date().getTime() })
        setIsTimeSet({ ...isTimeSet, open: true, check: 0 })
        // console.log('discount:', discount)
        // console.log('times:', times)
        // console.log('tiisTimeSetmes:', isTimeSet)



    }

    //點擊將 times,discount 後丟到後端資料庫並新增資料
    const twoclick = (numberid, tag) => {



        const currentDate = new Date();
        currentDate.setHours(currentDate.getHours() + 8);
        if (currentDate.getHours() >= 24) {
            currentDate.setDate(currentDate.getDate() + 1);
        }
        const sqlFormattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
        console.log(sqlFormattedDate);  //2023-08-18 01:35:53

        const data = {
            numberid: numberid,
            tag: `${tag}`,
            time: sqlFormattedDate
        };
        fetch('http://localhost:3005/tk/test', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
        })

        setDiscount(`${tag}`)
        setTimes({ ...times, time: sqlFormattedDate })
        setIsTimeSet({ ...isTimeSet, open: true, check: 0 })

    }

    //計算目前時間扣掉創建時間
    function calulateTimeLeft(datatime) {

        let different = null;
        let nowsec = 0;
        different = new Date().getTime() - Date.parse(datatime);
        if (different > 0) {
            nowsec = Math.floor((different / 1000) % 60)
        }
        return nowsec;

    }


    //初始狀態
    useEffect(() => {
        console.log('isTimeSet:', isTimeSet);
        console.log('time:', times);
        console.log('discount:', discount);

        //檢查有無使用過的資料fetch

    }, [discount]);

    // useEffect 處理 會員
    useEffect(() => {
        setTimes({ ...times, name: numberid })//將會員套入
    }, [authJWT.isAuth]);



    useEffect(() => {
        if (isTimeSet.open) {
            let id = setInterval(() => {
                setIsTimeSet({ ...isTimeSet, check: calulateTimeLeft(times.time) })
            }, 1000);



            // const time_left = 12 * 60 * 60 - isTimeSet.check;
            const time_left = 20 - isTimeSet.check;
            const hours = Math.floor(time_left / 3600);
            const minutes = Math.floor((time_left % 3600) / 60);
            const seconds = time_left % 60;

            const string_time = `${hours}:${minutes}:${seconds}`
            console.log(string_time);

            //當大於多少
            if (time_left == 0) {
                //設定狀態
                setDiscount(null);
                setTimes({ ...times, time: null })
                setIsTimeSet({ ...isTimeSet, open: false });
                //fetch 刪除資料庫資料

            }

            return function () {
                clearInterval(id);
            };
        }
    }, [isTimeSet.check, times]);


    return (
        <>
            <br />
            <br />
            <br />
            <br />
            <br />
            <button onClick={() => { testclick() }}>1111111111111</button >
            <button onClick={() => { twoclick(numberid, '古蹟') }}>22222</button >

            {times.time ? <p>
                距離 創建時間 還有{isTimeSet.check}秒
            </p> : ''

            }

        </>
    );
}