import { useState } from 'react'

export default function AddForm({ handleAdd }) {
  // 定義文字輸入用的狀態
  const [inputText, setInputText] = useState('')
  // 為了要修正中文輸入法的用Enter組字用的信號狀態
  const [isCompositing, setIsCompositing] = useState(false)

  return (
    <>
      <input
        type="text"
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value)
        }}
        // 開關中文輸入法組字期間
        onCompositionStart={() => setIsCompositing(true)}
        onCompositionEnd={() => setIsCompositing(false)}
        onKeyDown={(e) => {
          // 要在不是中文輸入法組字期間，按下Enter才加入到待辨事項
          // 有值時(不是空白才能加入)
          if (e.key === 'Enter' && !isCompositing && inputText) {
            // 新增一筆todo
            // setTodos(add(todos, inputText))
            handleAdd(inputText)

            // 清空文字輸入框
            setInputText('')
          }
        }}
      />
    </>
  )
}
