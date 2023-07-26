import React from 'react'

export default function JsxMap() {
  const users = ['eddy', 'may', 'bob']

  //   const displayUsers = users.map((v, i) => {
  //     return <li key={i}>{v}</li>
  //   })
  return (
    <>
      <h1>JSX語法中使用陣列map方法範例</h1>
      {/* <ul>{displayUsers}</ul> */}
      <ul>
        {users.map((v, i) => {
          return <li key={i}>{v}</li>
        })}
      </ul>
    </>
  )
}
