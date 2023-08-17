import React from 'react'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

export default function DateModel({ show, handleClose }) {
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
          請填寫遊玩日期
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="Basic date picker" />
          </LocalizationProvider>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            關閉
          </Button>
          <Button variant="primary">新增行程</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
