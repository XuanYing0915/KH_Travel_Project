import React, { useState, useEffect } from 'react'

// 將從頁面帶入的off_day判斷營業日

// 資料格式(json) "off_day": "星期一,星期三,星期五,星期六,星期日",
// 營業日的map將顯示
// 星期一 公休
// 星期二 10:00 – 22:00
// 星期三 公休
// 星期四 10:00 – 22:00
// 星期五 公休
// 星期六 公休
// 星期日 公休
// 把資料的公休日轉成營業日
// 用map判斷星期一到星期日是否有在營業日陣列中
// 有的話就顯示營業時間 {open_time} – {close_time}
// 沒有的話就顯示公休

const BusinessComponent = ({ off_day, open_time, close_time }) => {
  const week = [
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六',
    '星期日',
  ]

  const [offDay, setOffDay] = useState([])
  const [businessDay, setBusinessDay] = useState([])

  useEffect(() => {
    const offDayArray = off_day.split(',')
    setOffDay(offDayArray)

    const businessDayArray = week.map((day) => {
      if (offDayArray.includes(day)) {
        return `${day} 公休`
      } else {
        return `${day} ${open_time} – ${close_time}`
      }
    })

    setBusinessDay(businessDayArray)
  }, [off_day, open_time, close_time])

  return (
    <div>
      {businessDay.map((v, i) => (
        <div key={i}>{v}</div>
      ))}
    </div>
  )
}

export default BusinessComponent
