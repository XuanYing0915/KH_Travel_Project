import { useState } from 'react'

export default function InlineIf() {
  const [count, setCount] = useState(total:1)

  return (
    <hr>
      <h1>{count.total}</h1>
      <button
        onClick={() => {
          setCount({ total : count .total + 1} )
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          setCount(count - 1)
        }}
      >
        -
      </button>
      <hr/>
      {count &&<h2>訊息:目前計數為{count}</h2>}
    </>
  )
}
