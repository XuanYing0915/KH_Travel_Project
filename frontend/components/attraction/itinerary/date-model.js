import React from 'react'
import { useState } from 'react'
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
  submitDT,
}) {
  // 取得日期 發送到父元件
  const dateChange = (range) => {
    const startDate = range[0].format('MM/DD')
    const endDate = range[1].format('MM/DD')
    console.log('開始日', startDate)
    console.log('結束日', endDate)
    // 將資料傳送到父元件
    onDateChange(startDate, endDate)
  }

  // 取得時間 發送到父元件
  const timeChange = (time) => {
    console.log('取得時間' + time)

    // 將資料傳送到父元件
    onTimeChange(time)
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
          <Modal.Title>加入行程第一步</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div>遊玩日期</div>
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
              <div>出發時間</div>
              <StaticTimePicker
                orientation="landscape"
                value={'00:00'}
                onChange={timeChange}
              />
            </LocalizationProvider>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            關閉
          </Button>
          <Button variant="primary" onClick={submitDT}>
            新增行程
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
