import { useEffect, useRef } from 'react'
import 'vanillajs-datepicker/css/datepicker-bs5.css'
import Datepicker from 'vanillajs-datepicker/Datepicker'
import zhTW from 'vanillajs-datepicker/locales/zh-TW'

/**
 * 日期文字輸入框(input)元件
 *
 * @component
 * @param {object} props
 * @param {function} [props.setDate=()=>{}] 設定回Parent元件的setState
 * @param {string} [props.defaultDate=''] 初始化日期
 * @param {boolean} [props.showDatepicker=false] 控制呈現datepicker的popup
 * @param {string} [props.setFormat='yyyy-mm-dd'] 呈現用字串格式
 * @param {string} [props.showFormat='yyyy/mm/dd'] 狀態中的字串格式
 * @returns {JSX.Element}
 */

export default function InputDatePicker({
  setDate = () => {},
  defaultDate = '',
  showDatepicker = false,
  setFormat = 'yyyy-mm-dd',
  showFormat = 'yyyy/mm/dd',
  ...otherProps
}) {
  const inputRef = useRef(null)
  const datepickerRef = useRef(null)

  useEffect(() => {
    // add zh-TW locale lang
    Object.assign(Datepicker.locales, zhTW)

    // cleanup use
    let localRef = null

    if (typeof window === 'object' && inputRef.current) {
      const datepicker = new Datepicker(inputRef.current, {
        buttonClass: 'btn',
        format: showFormat,
        language: 'zh-TW',
        autohide: true,
        // ...options
      })

      datepickerRef.current = datepicker

      // cleanup use
      localRef = inputRef.current

      // listen custom event
      localRef.addEventListener('changeDate', (e) => {
        const date = Datepicker.formatDate(e.detail.date, setFormat)
        setDate(date)
      })
    }

    return () => {
      // cleanup use
      localRef.removeEventListener('changeDate', (e) => {
        const date = Datepicker.formatDate(e.detail.date, setFormat)
        setDate(date)
      })
    }
  }, [])

  // control datepicker block show/hide
  useEffect(() => {
    if (showDatepicker) datepickerRef.current.show()
    else datepickerRef.current.hide()
  }, [showDatepicker])

  return (
    <>
      <input
        type="text"
        ref={inputRef}
        defaultValue={defaultDate}
        {...otherProps}
      />
    </>
  )
}
