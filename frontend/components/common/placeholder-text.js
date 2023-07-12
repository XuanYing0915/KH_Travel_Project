import React from 'react'

export default function PlaceholderText() {
  return (
    <>
      {Array(100)
        .fill(1)
        .map((v, i) => {
          return (
            <p key={i}>
              <span className="placeholder col-12 placeholder-lg"></span>
            </p>
          )
        })}
    </>
  )
}
