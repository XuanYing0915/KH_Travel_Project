

import NoSSR from '@/components/NoSSR';
import { useAuthJWT } from '@/hooks/use-auth-jwt'
import { useTicketCart } from '@/hooks/use-food-cart'
import SuccessTicketTable from '@/components/cart/ticket/success-table';

import { useRouter } from 'next/router'


export default function FoodPayment() {
    const router = useRouter()

    const{orderNumber}=router.query

    return (
        <div id="cart-page">
            {/* 1.購物順序 */}
            <div className='d-flex justify-content-between border-bottom' id="cart-steps">
                <p >1<span>確認購物車內商品</span></p>
                <p >2<span>填寫付款與運送資訊</span></p>
                <p className="now-step">3<span>完成購買</span></p>
            </div>
            <SuccessTicketTable orderNumber={orderNumber}/>






        </div>

    )
}
