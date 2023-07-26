import React from 'react'
import Item from './item'
import EditForm from './edit-form'

export default function List({ todos, handleRemove, handleToggleCompleted }) {
  return (
    <>
      <ul>
        {todos.map((v) => {
          const { id, completed, text, editing } = v
          return editing ? (
            <EditForm key={id} id={id} text={text} />
          ) : (
            <Item
              key={id}
              id={id}
              completed={completed}
              text={text}
              handleToggleCompleted={handleToggleCompleted}
              handleRemove={handleRemove}
            />
          )
        })}
      </ul>
    </>
  )
}
