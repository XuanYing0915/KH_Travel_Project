import React from 'react'

export default function jsxValue() {
  return (
    <>
      <h1>JSX語法中的各種值得渲染呈現</h1>
      <h2>Number</h2>
      {123 - 99}
      {NaN}
      <h2>String</h2>
      abc
      {'def'}
      {`price = ${100 - 5}`}
      <h2> Boolean</h2>
      {/*部呈現*/}
      {true}
      {false}
      <h2> null</h2>
      {/*部呈現*/}
      {null}
      <h2>undefine</h2>
      {/*部呈現*/}
      {undefined}
      <h2>Array</h2>
      {/* 組合所有成員呈現，類似array.join("") */}
      {[1, 2, 3, 4]}
      <h2>Object</h2>
      {/* 不能直接渲染，會造成中斷錯誤*/}
      {/* {{a:1,b:2}} */}
      <h2>function</h2>
      {/* 會有警告，不會呈現*/}
      {() => {}}
    </>
  )
}
