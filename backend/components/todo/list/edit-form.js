import { useState } from 'react'

export default function EditForm({ text }) {
  // 用傳入的text值作為初始化值
  const [inputText, setInputText] = useState(text)

  return (
    <li>
      <input
        type="text"
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value)
        }}
      />
      <button onClick={() => {}}>儲存</button>
    </li>
  )
}
