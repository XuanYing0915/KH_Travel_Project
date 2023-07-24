import styles from './todo.module.css'

export default function FilterButtons({ type, setType }) {
  const typeOptions = ['所有', '進行中', '已完成']

  return (
    <>
      {typeOptions.map((v, i) => {
        return (
          <button
            key={i}
            className={type === v ? styles['active-btn'] : styles['normal-btn']}
            onClick={() => {
              setType(v)
            }}
          >
            {v}
          </button>
        )
      })}
    </>
  )
}
