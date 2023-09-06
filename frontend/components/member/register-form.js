import { useState, useEffect } from 'react'
import styles from './member.module.css'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2';

// Datepicker relies on browser APIs like document
// dynamically load a component on the client side,
// use the ssr option to disable server-rendering.
const InputDatePicker = dynamic(() => import('../common/input-date-picker'), {
  ssr: false,
})

const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email('請輸入有效的電子郵件地址。')
    .required('此為必填欄位。'),
  password: Yup.string()
    .min(8, '密碼須至少為 8 個字元。')
    .required('此為必填欄位。'),
  firstName: Yup.string().required('此為必填欄位。'),
  
  // dob: Yup.date().required('此為必填欄位。').nullable(),
  // country: Yup.string().required('此為必填欄位。'),
  // sex: Yup.string().required('此為必填欄位。'),
  // agreement: Yup.bool().oneOf([true], '必須同意隱私權政策與使用條款。'),
})

export default function RegisterForm() {
  const [serverMessage, setServerMessage] = useState('')
  const [redirectTo, setRedirectTo] = useState(null)
  const [showDatepicker, setShowDatepicker] = useState(false)
  const [date, setDate] = useState('')
  const handleDateChange = (date) => {
    setDate(date);
    formik.setFieldValue('dob', date);
  };
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      dob: '',
      country: '',
      sex: '',
      agreement: false,
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      console.log(values)

      axios
        .post('http://localhost:3005/member/register', values)
        .then((response) => {
          console.log(response.data.message)
          // TODO: 根據伺服器的回應做適當的 UI 更新或導向
          setServerMessage(response.data.message)
          // 如果註冊成功，重定向到登入頁面
          if (response.data.message.includes('註冊成功')) {
            Swal.fire(
              '註冊成功!',
              '您已成功註冊，即將重定向到登入頁面。',
              'success'
            ).then(() => {
              setRedirectTo('/member/login');
            });
          }
        })
        .catch((error) => {
          // 設置伺服器的錯誤消息
          const errorMessage = error?.response?.data?.error || 'Error during registration';
          console.error('Error:', errorMessage);
          Swal.fire({
            icon: 'error',
            title: '註冊失敗',
            text: errorMessage,
          });
        })
    },
  })
  const router = useRouter()

  useEffect(() => {
    if (redirectTo) {
      router.push(redirectTo)
    }
  }, [redirectTo])

  const autofillDemo = () => {
    formik.setFieldValue('email', 'johnson1234@gmail.com');
    formik.setFieldValue('password', '12345678');
    formik.setFieldValue('firstName', '張嘉佑');
  };
  
  return (
    <>
    <div className='d-flex'>
      <main
        className={`sidebar-frame w-100 m-auto text-center form-member border border-dark my-5 ggg p-4`}
      >
        {/* {serverMessage && (
          <div
            className={
              serverMessage.includes('success')
                ? 'alert alert-success'
                : 'alert alert-danger'
            }
          >
            {serverMessage}
          </div>
        )} */}
        <h2 className="text-center mb-3">加入會員</h2>
        <p className={`text-center mb-3 ${styles['text-note']}`}>
        建立會員個人檔案，探索高雄精彩住宿、美食、景點及專屬票卷優惠，立即加入，開啟你的旅行新篇章！
        </p>
        <form onSubmit={formik.handleSubmit}>
          <div className="row mb-3">
            <div className="col-sm-12">
              <input
                type="email"
                {...formik.getFieldProps('email')}
                className={`form-control w-100 ${styles['form-control']} ${
                  formik.touched.email && formik.errors.email
                    ? styles['invalid']
                    : ''
                }`}
                placeholder="電子郵件地址"
              />
            </div>
            {/* <div className={`${styles['error']} my-2 text-start`}>
              請輸入有效的電子郵件地址。
            </div> */}
            {formik.touched.email && formik.errors.email ? (
              <div className={`${styles['error']} my-2 text-start`}>
                {formik.errors.email}
              </div>
            ) : null}
          </div>
          <div className="row mb-3">
            <div className="col-sm-12">
              <input
                type="password"
                {...formik.getFieldProps('password')}
                className={`form-control w-100 ${styles['form-control']} 
                } ${
                  formik.touched.password && formik.errors.password
                    ? styles['invalid']
                    : ''
                }`}
                placeholder="密碼"
              />
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className={`${styles['error']} my-2 text-start`}>
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          <div className="row mb-3">
            <div className="col-sm-12">
              <input
                type="text"
                {...formik.getFieldProps('firstName')}
                className={`form-control  ${styles['form-control']} 
                ${
                  formik.touched.firstName && formik.errors.firstName
                    ? styles['invalid']
                    : ''
                }`} 
                placeholder="姓名"
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <div className={`${styles['error']} my-2 text-start`}>
                  {formik.errors.firstName}
                </div>
              ) : null}
            </div>

            {/* <div className="col-sm-6">
              <input
                type="text"
                {...formik.getFieldProps('lastName')}
                className={`form-control  ${styles['form-control']} 
                ${
                  formik.touched.lastName && formik.errors.lastName 
                    ? styles['invalid']
                    : ''
                }`}
                placeholder="名字"
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <div className={`${styles['error']} my-2 text-start`}>
                  {formik.errors.lastName}
                </div>
              ) : null}
            </div> */}
          </div>
          <div className="row mb-3">
            <div className="col-sm-12">
              <div className="input-group position-relative d-inline-flex align-items-center">
                <InputDatePicker
                  showDatepicker={showDatepicker}
                  setFormat="yyyy-mm-dd"
                  showFormat="yyyy/mm/dd"
                  setDate={handleDateChange}
                  className={`form-control w-100 ${styles['form-control']} `}
                  style={{
                    borderRadius: 2.8,
                  }}
                  placeholder="出生年月日"
                />
                <i
                  className="bi bi-calendar4 position-absolute"
                  role="presentation"
                  style={{ right: 10, cursor: 'pointer', zIndex: 100 }}
                  onClick={() => setShowDatepicker(!showDatepicker)}
                ></i>
              </div>
            </div>
            {/* <div className={`${styles['error']} my-2 text-start`}>
              請輸入出生年月日。
            </div> */}
            <p className={`text-center mb-1 ${styles['text-note2']}`}>
              每年生日將獲得專屬會員慶生禮。
            </p>
          </div>
          <div className="row mb-3">
            <div className={`col-sm-12" ${styles['label-left']}`}>
              <label htmlFor="country" className="form-label">
                國家/地區
              </label>
              <select
                {...formik.getFieldProps('country')}
                className="form-select"
              >
                <option>台灣</option>
                <option>日本</option>
                <option>韓國</option>
                <option>中國</option>
              </select>
            </div>
          </div>
          <div className="row mb-3">
            <div className="btn-group">
              <input
                type="radio"
                {...formik.getFieldProps('sex')}
                value="男"
                className="btn-check"
                id="option1"
              />
              <label className="btn btn-outline-primary" htmlFor="option1">
                男
              </label>
              <input
                type="radio"
                {...formik.getFieldProps('sex')}
                value="女"
                className="btn-check"
                id="option2"
              />
              <label className="btn btn-outline-primary" htmlFor="option2">
                女
              </label>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-sm-12 text-start">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  {...formik.getFieldProps('agreement')}
                  id="gridCheck1"
                />
                <label
                  className={`form-check-label  ${styles['notice']}`}
                  htmlFor="gridCheck1"
                >
                  訂閱電子郵件就能收到產品、優惠以及會員福利的最新消息
                </label>
              </div>
            </div>
          </div>
          <div className="row mb-2">
            <p className={`${styles['notice']}`}>
              如建立帳號，即代表同意本站
              <Link href="/about">隱私權政策</Link>和
              <Link href="/about">使用條款</Link>。
            </p>
          </div>
          {console.log(formik.errors)}
          <button type="button" onClick={autofillDemo}>Demo</button>
          <button type="submit" className="btn btn-primary w-100">
            加入
          </button>

          <div className="row mt-2">
            <p className={`${styles['notice']}`}>
              已經是會員了嗎？ <Link href="/member/login " className='font-size'>登入</Link>。
            </p>
          </div>
        </form>
      </main>
    </div>
    </>
  )
}
