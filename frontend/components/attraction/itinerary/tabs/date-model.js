import React from 'react'
import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import dayjs from 'dayjs'
import { ConfigProvider } from 'antd'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker'
import { DatePicker, Space } from 'antd'
import 'dayjs/locale/zh-cn'
import locale from 'antd/locale/zh_TW.js'
import { Margin, Mms } from '@mui/icons-material'

const { RangePicker } = DatePicker

export default function DateModel({
  show,
  handleClose,
  onDateChange,
  onTimeChange,
}) {
  // 若已經操作完畢日期model  將不再跳出日期model
  const [isDateModel, setIsDateModel] = useState(false)

  const [startDate, setStartDate] = useState('') // Initialize with an empty string
  const [endDate, setEndDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [playDays, setPlayDays] = useState('')
  // 取得日期 發送到父元件
  // let startDate = ''
  // let endDate = ''
  // let playDays = ''
  const dateChange = (range) => {
    // startDate = dayjs(range[0]).format('MM/DD')
    setStartDate(dayjs(range[0]).format('MM/DD'))
    // endDate = dayjs(range[1]).format('MM/DD')
    setEndDate(dayjs(range[1]).format('MM/DD'))
    // endDate = range[1].format('MM/DD')
    console.log('選擇時間:開始日', startDate)
    console.log('選擇時間:結束日', endDate)
    // 計算遊玩天數
    setPlayDays(dayjs(range[1]).diff(dayjs(range[0]), 'day') + 1)
    // 實際要加一天
    console.log(playDays)
    return startDate, endDate, playDays
  }

  // let startTime = ''

  // 取得時間 發送到父元件
  const timeChange = (time) => {
    console.log('取得時間' + time)
    setStartTime(time)
    // 將資料傳送到父元件
  }

  // useEffect(() => {
  //   // This effect will run whenever startDate, endDate, or playDays change
  //   if (
  //     startDate !== '' &&
  //     endDate !== '' &&
  //     playDays !== '' &&
  //     startTime !== ''
  //   ) {
  //     onDateChange(startDate, endDate, playDays, startTime)
  //   }
  // }, [startDate, endDate, playDays, startTime])

  // 點按鈕發送日期時間到父元件在關閉modal
  const submitDT = () => {
    // 檢查是否有選擇日期
    if (startDate === '' || endDate === '') {
      console.log(' startDate' + startDate)
      console.log(' endDate' + endDate)
      alert('請選擇日期')
      return
    }
    // 檢查是否有選擇時間
    if (startTime === '') {
      console.log('時間' + startTime)
      alert('請選擇時間')
      return
    }

    onDateChange(startDate, endDate, playDays, startTime)
    handleClose()
  }

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        // centered
        dialogClassName="i-date-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>填寫行程</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="font">遊玩日期</div>
            <Space direction="vertical" size={12}>
              <RangePicker
                size={'large'}
                status="warning"
                locale={locale}
                style={{ width: '100%' }}
                autoFocus={true}
                popupClassName="i-date-popup"
                format="YYYY-MM-DD"
                onChange={dateChange}
              />
            </Space>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className="font">出發時間</div>
              <StaticTimePicker
                orientation="landscape"
                value={dayjs('09:00', 'HH:mm')}
                onChange={timeChange}
              />
            </LocalizationProvider>
          </div>
          <div className="i-arrow-box">
            <img src="/images/attraction/箭頭.png" className="i-arrow-img" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="" onClick={handleClose}>
            關閉
          </Button> */}
          <Button
            variant="secondary"
            onClick={submitDT}
            className="add-i-btn rounded-pill "
            style={{ width: '100%', margin: '20px auto', fontSize: '20px' }}
          >
            新增行程
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
