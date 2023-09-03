import React from 'react'
import Link from 'next/link';

export default function FilterButtons({ type, setType }) {
    const typeOptions = ['美食商品', '票券商品'];
    const handleClick = (e) => {
        e.preventDefault();
    }


    return (
        <>
            {type != "購物車內無商品" &&
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
            }
            {type == "購物車內無商品" &&
                <>
                    <h3 className='text-center py-5'>購物車內目前無商品!</h3>
                    <div className='cart-btn-group d-flex justify-content-around pt-5'>
                        <Link href="/food">
                            <button className='btn btn-back'>回到特色美食</button>

                        </Link>
                        <Link href="/ticket">
                            <button className='btn  btn-secondary'>回到票券訂購</button>

                        </Link>


                    </div>
                </>
            }


        </>

    )
}
