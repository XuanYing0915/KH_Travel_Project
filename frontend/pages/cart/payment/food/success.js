import SuccessFoodTable from '@/components/cart/food/success-table';
import Link from 'next/link';

import { useRouter } from 'next/router'


export default function FoodPayment() {
    const router = useRouter()

    const { orderNumber } = router.query


    return (
        <div id="cart-page">
            {/* 1.購物順序 */}
            <div className='d-flex justify-content-between border-bottom' id="cart-steps">
                <p >1<span>確認購物車內商品</span></p>
                <p >2<span>填寫付款與運送資訊</span></p>
                <p className="now-step">3<span>完成購買</span></p>
            </div>
            <SuccessFoodTable orderNumber={orderNumber} />
            <div className='d-flex my-4 px-5 justify-content-around'>
            <Link href="/food">
                <button className='btn btn-primary px-4'>返回商品頁</button>

            </Link>
            <Link href="/member/member-order">
                <button className='btn btn-secondary text-light px-4'>確認訂單詳細</button>

            </Link>
            </div>
            


        </div>

    )
}
