import { useState, useEffect, useContext } from 'react'
import { useAuthJWT } from '@/hooks/use-auth-jwt' // 0815引用JWT認證

//全域鉤子
import { CartContext } from '@/components/hotel/CartContext'

// 判斷會員 X-- > 點選按鈕--(轉盤取值)V-- > 設定{ 值: 值, time: 12hr } 存入資料庫+狀態V --> 取得資料庫時判定與現在時間差多少(V)

// 取到設定值(有寫入狀態)-- > 將資料表內的資料刷新(尚未)-- > 得到折扣(尚未)
//     |
//     --> 將值 及 時間 放在(轉盤)旁邊 隨時間減少(設定值會減少) V (有抓到每秒倒數的時間 V)

// 缺少: 4.將有的狀態去改變資料頁 5.再次確認 6.動畫

export default function Counter() {
  //會員狀態
  const { authJWT } = useAuthJWT()
  const numberid = authJWT.userData.member_id

  //全域鉤子
  const { discount, setDiscount } = useContext(CartContext) //有類別優惠 ('null')
  const { times, setTimes } = useContext(CartContext) // 創建到期時間+會員名稱{ 'name': 'qaz2.0', 'time': null }
  const [isTimeSet, setIsTimeSet] = useState({ open: false, check: 0 }) //開啟倒數true
  const [string_time, setString_time] = useState('') //開啟倒數true

  //   let string_time =''

  const testclick = () => {
    setDiscount('古蹟')
    setTimes({ ...times, time: newDate }) //創建到期時間
    setIsTimeSet({ ...isTimeSet, open: true, check: 0 })
    // console.log('discount:', discount)
    // console.log('times:', times)
    // console.log('tiisTimeSetmes:', isTimeSet)
  }

  //fetch function
  const fetchdata = (data) => {
    fetch('http://localhost:3005/tk/test', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
      .then((v) => v.json())
      .then((data) => {
        alert(data[1].message)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  //點擊將 times,discount 後丟到後端資料庫並insert
  const insertclick = (numberid, tag) => {
    if(numberid){
      const currentDate = new Date()
      currentDate.setHours(currentDate.getHours() + 8)
      if (currentDate.getHours() >= 24) {
        currentDate.setDate(currentDate.getDate() + 1)
      }
      currentDate.setMinutes(currentDate.getMinutes() + 1) //此為設定增加1分鐘先做判斷

      const sqlFormattedDate = currentDate
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ')
      console.log(sqlFormattedDate) //2023-08-18 01:35:53 格式

      const data = {
        numberid: numberid,
        tag: `${tag}`,
        time: sqlFormattedDate,
        controll: 'insert',
      }
      fetchdata(data)

      setDiscount(`${tag}`)
      setTimes({ ...times, time: sqlFormattedDate })
      setIsTimeSet({ ...isTimeSet, open: true, check: 0 })
    }else{
        alert('請加入會員')
    }
  }

  //計算到期時間扣掉現在時間
  function calulateTimeLeft(datatime) {
    let different = null
    different = Date.parse(datatime) - new Date().getTime()
    return different
  }

  //初始狀態

  useEffect(() => {
    console.log('isTimeSet:', isTimeSet)
    console.log('time:', times)
    console.log('discount:', discount)

    //檢查有無使用過的資料fetch
  }, [discount])

  // useEffect 處理當有會員 去資料庫抓資料(目前假定有) 重新設定discount,time V
  useEffect(() => {
    if (numberid) {
      const data = {
        numberid: numberid,
        controll: 'get',
      }
      if (numberid) {
        fetch('http://localhost:3005/tk/test', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
        })
          .then((v) => v.json())
          .then((data) => {
            console.log(data.data[0])
            if (!data.data[0]) {
              alert('無資料')
            } else {
              const memberdata = data.data[0]
              setDiscount(memberdata.tag)
              setTimes({ ...times, name: numberid, time: memberdata.time })
              setIsTimeSet({ ...isTimeSet, open: true })
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  }, [authJWT.isAuth])

  //計時用
  useEffect(() => {
    if (isTimeSet.open) {
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

      //當倒數多少 < 0時
      if (time_left < 0) {
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
            // console.log(data.data[0])
            const check_time =
              Date.parse(data.data[0].time) - new Date().getTime()

            //第二次判斷 現在時間是否超過到期日 有的話才刪除並重設狀態
            if (check_time < 0) {
              //設定狀態
              setDiscount(null)
              setTimes({ ...times, time: null })
              setIsTimeSet({ ...isTimeSet, open: false, check: 0 })
              setString_time('')
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
    }
  }, [isTimeSet.check, times])

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />

      <button
        onClick={() => {
          insertclick(numberid, '古蹟')
        }}
      >
        22222
      </button>

      {isTimeSet.open ? <p>距離 下次抽獎時間 還有{string_time}秒</p> : ''}
    </>
  )
}
