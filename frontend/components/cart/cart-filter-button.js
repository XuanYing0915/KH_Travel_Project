import React from 'react'

export default function FilterButtons({ type, setType }) {
    const typeOptions = ['美食商品', '票券商品'];
    const handleClick = (e) => {
        e.preventDefault();
      }
    

    return (
        <>
            <ul className='d-flex m-0'>
                {typeOptions.map((v, i) => {
                    return (
                        <li
                            key={i}
                            className={type === v ? 'now-product-type' : ''}
                            onClick={() => {
                                setType(v)
                                handleClick
                            }}>
                            {v}
                        </li>
                    )
                })}
            </ul>

        </>

    )
}
