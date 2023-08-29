import { useState, useEffect, useContext } from 'react'
import { useAuthJWT } from '@/hooks/use-auth-jwt' // 0815引用JWT認證

//全域鉤子
import { CartContext } from '@/components/hotel/CartContext'

// 缺少:目前可以在資料庫沒資料時按  若時間有再跑時按下去會出問題(擋住即可) 6.動畫

export default function timeset() {
  //會員狀態
  const { authJWT } = useAuthJWT()
  const numberid = authJWT.userData.member_id

  //全域鉤子
  const { discount, setDiscount } = useContext(CartContext) //有類別優惠 ('null')
  const { times, setTimes } = useContext(CartContext) // 創建到期時間+會員名稱{ 'name': 'qaz2.0', 'time': null }
  const { open, setOpen } = useContext(CartContext) //是否開啟開關

  const [isTimeSet, setIsTimeSet] = useState({ check: 0 }) //開啟倒數true
  const [string_time, setString_time] = useState('') //設定倒數時間

  // //計算到期時間扣掉現在時間
  function calulateTimeLeft(datatime) {
    let different = null
    different = Date.parse(datatime) - new Date().getTime()
    return different
  }

  // // useEffect 處理當有會員 去資料庫抓資料(目前假定有) 重新設定discount,time V
  useEffect(() => {
    if (numberid) {
      const data = {
        numberid: numberid,
        controll: 'get',
      }

      fetch('http://localhost:3005/tk/test', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      })
        .then((v) => v.json())
        .then((data) => {
          console.log(data.data[0])
          if (data.data[0]) {
            const memberdata = data.data[0]
            setDiscount(memberdata.tag)
            setTimes({ ...times, name: numberid, time: memberdata.time })
            setOpen(true)
          } else {
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      setTimes({ ...times, name: numberid, time: '' })
      setOpen(false)
    }
  }, [authJWT.isAuth])

  //計時用
  useEffect(() => {
    // if (open) {
    let id = setInterval(() => {
      setIsTimeSet({ ...isTimeSet, check: calulateTimeLeft(times.time) })
    }, 1000)

    //set時間文字
    //   const time_left = ((12 * 60 * 60)-(isTimeSet.check/1000))
    const time_left = isTimeSet.check / 1000
    const hours = Math.floor(time_left / 3600)
    const minutes = Math.floor((time_left % 3600) / 60)
    const seconds = Math.floor(time_left % 60)
    const string_time = `${hours}:${minutes}:${seconds}`
    setString_time(string_time)
    console.log('string_time:', string_time)

    //當倒數多少 < 0時
    if (time_left < 0) {
      setOpen(false)
      //先fetch 抓取資料庫取的時間做比對 如果到期日<現在 則執行下列
      const data = {
        numberid: numberid,
        controll: 'get',
      }
      fetch('http://localhost:3005/tk/test', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      })
        .then((v) => v.json())
        .then((data) => {
          const check_time =
            Date.parse(data.data[0].time) - new Date().getTime()

          //第二次判斷 現在時間是否超過到期日 有的話才刪除並重設狀態
          if (check_time < 0) {
            //設定狀態
            setDiscount('1111')
            setTimes({ ...times, time: null })
            setIsTimeSet({ ...isTimeSet, check: 0 })
            setString_time('')
            setOpen(false)
            //fetch 刪除資料庫資料
            const data2 = {
              numberid: numberid,
              controll: 'delete',
            }
            fetch('http://localhost:3005/tk/test', {
              method: 'POST',
              body: JSON.stringify(data2),
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
    return function () {
      clearInterval(id)
    }
    // }
  }, [isTimeSet.check, times, discount])

  return <>{open ? <p className='timeset'>需{string_time}後再次抽獎<br />目前優惠為:{discount}</p> : <p className='timeset'>抽獎已準備就緒</p>}</>
}
