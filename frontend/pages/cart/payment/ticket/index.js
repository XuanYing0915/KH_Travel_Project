import TicketOrder from "@/components/cart/ticket/order"
import TicketPaymentForm from "@/components/cart/ticket/payment-form"
import NoSSR from '@/components/NoSSR';
import { useAuthJWT } from '@/hooks/use-auth-jwt'
import { useTicketCart } from "@/hooks/use-ticket-cart";
import { useRouter } from 'next/router'
import Swal from 'sweetalert2';

export default function TicketPayment() {
  const { authJWT } = useAuthJWT()
  const { ticketItems } = useTicketCart()
  const router = useRouter()

  // 未登入時，不會出現頁面內容
  if (typeof window !== 'undefined' && !authJWT.isAuth) {
    Swal.fire({

      title: '請登入會員！',
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      router.push('/member/login')

    })
  }
  // else if (typeof window !== 'undefined' && ticketItems.length == 0) {
  //   router.push('/cart')
  // }

  const lastname = authJWT.userData.last_name;
  const username = lastname !== null ? authJWT.userData.first_name + ' ' + lastname : authJWT.userData.first_name;
  //現在購物欄位
  return (
    <div id="cart-page">
      {/* 1.購物順序 */}
      <div className='d-flex justify-content-between border-bottom' id="cart-steps">
        <p >1<span>確認購物車內商品</span></p>
        <p className="now-step">2<span>填寫付款與運送資訊</span></p>
        <p>3<span>完成購買</span></p>
      </div>
      {/* 2 */}
      <NoSSR>
        <TicketOrder />
      </NoSSR>

      <TicketPaymentForm
        username={username}
        userphone={authJWT.userData.phone}
        useraddress={authJWT.userData.country}
        memberID={authJWT.userData.member_id} />
      <a href='../'>返回修改商品</a>

    </div>

  )
}