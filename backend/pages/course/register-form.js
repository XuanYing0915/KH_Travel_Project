import { useState, useTransition } from 'react'

export default function RegisterForm() {
  // 注意 狀態是物件時的初始值
  // 使用者註冊資料
  const [user, setUser] = useState({
    fullname: '',
    email: '',
    password: '',
    password2: '',
  })

  // 記錄錯誤訊息用
  // 一開始的錯誤訊息物件要獨立出來定義
  // 假定使用者每次提交時，所有的錯誤訊息都是清空的
  // 換言之，每次提交會檢查所有欄位
  const originErrors = {
    fullname: '',
    email: '',
    password: '',
    password2: '',
  }

  const [errors, setErrors] = useState(originErrors)

  // 密碼呈現用
  const [show, setShow] = useState(false)
  const [show2, setShow2] = useState(false)

  // 所有表單欄位共用的事件處理函式
  const handleFieldChange = (e) => {
    // {[e.target.name]: e.target.value}
    //   ^^^^^^^^^^^^^^ 計算得來的屬性名稱(Computed property names)
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#computed_property_names
    //console.log(e.target.name, e.target.value);
    const newUser = { ...user, [e.target.name]: e.target.value }
    setUser(newUser)
  }

  // 表單送出用的事件處理函式
  const handleSubmit = (e) => {
    // 阻擋表單預設送出行為
    e.preventDefault()

    // 對各欄位作檢查

    // FormData範例，用FormData的API加上欄位的name來得到資料，也能作檢查
    // const formData = new FormData(e.target)
    // if (!formData.get('fullname')) {
    //   alert('請填寫姓名')
    // }

    let hasErrors = false
    const newErrors = { ...originErrors }

    // 直接用狀態中的資料來檢查
    if (!user.fullname) {
      newErrors.fullname = '請填寫姓名'
      hasErrors = true
    }

    if (!user.email) {
      newErrors.email = '請填寫Email'
      hasErrors = true
    }

    // 如果中途有檢查出錯誤，跳出此送出處理函式
    if (hasErrors) {
      setErrors(newErrors)
      return
    }

    // 下面是通過所有檢查，要送至伺服器
  }

  return (
    <>
      <style jsx>
        {`
          .error {
            color: red;
            font-size: 10px;
          }
        `}
      </style>
      <h1>註冊表單輸入與驗証</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            姓名:{' '}
            <input
              type="text"
              name="fullname"
              value={user.fullname}
              onChange={handleFieldChange}
            />
          </label>
        </div>
        <div className="error">{errors.fullname}</div>
        <div>
          <label>
            Email:{' '}
            <input
              type="text"
              name="email"
              value={user.email}
              onChange={handleFieldChange}
            />
          </label>
        </div>
        <div className="error">{errors.email}</div>
        <div>
          <label>
            密碼:{' '}
            <input
              type={show ? 'text' : 'password'}
              name="password"
              value={user.password}
              onChange={handleFieldChange}
            />
          </label>
          <label>
            <input
              type="checkbox"
              checked={show}
              onChange={(e) => {
                setShow(e.target.checked)
              }}
            />
            顯示密碼
          </label>
        </div>
        <div>
          <label>
            確認密碼:{' '}
            <input
              type={show2 ? 'text' : 'password'}
              name="password2"
              value={user.password2}
              onChange={handleFieldChange}
            />
          </label>
          <label>
            <input
              type="checkbox"
              checked={show2}
              onChange={(e) => {
                setShow2(e.target.checked)
              }}
            />
            顯示密碼
          </label>
        </div>
        <div>
          <button>提交</button>
        </div>
      </form>
    </>
  )
}