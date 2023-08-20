import React from 'react'
import moment from 'moment'

export default function VisitingTime({ data = '', currentTime = '' }) {
  // 定義一個格式化時間的函數
  const formatTime = (timeString) => {
    return moment.duration(timeString)
  }

  // 解析時間字串為持續時間對象
  const duration = formatTime(data)

  // 計算小時和分鐘
  const hours = duration.hours()
  const minutes = duration.minutes()

  // 格式化持續時間為字串，不足一小時時只顯示分鐘
  const timeString = hours > 0 ? `${hours} 小時 ${minutes} 分鐘 ` : ` ${minutes}分鐘 `

  // 將當前時間加上持續時間得到新的時間
  const newTime = moment(currentTime).add(duration)

  return (
    <div className="col">
      <i className="bi bi-alarm-fill"></i>
      遊玩時間：{timeString}
     
    </div>)
}
