
import FoodOrder from '@/components/cart/food/order';
import FoodPaymentForm from "@/components/cart/food/payment-form"
import NoSSR from '@/components/NoSSR';
import { useAuthJWT } from '@/hooks/use-auth-jwt'



export default function FoodPayment() {
  const { authJWT } = useAuthJWT()
  // 未登入時，不會出現頁面內容
  if (!authJWT.isAuth)
    return (
      <>
        <div className='m-4'>
          <h4>請先登入會員</h4>
        </div>
      </>
    )
 

  const last_name = authJWT.userData.last_name;
  const fullName = last_name !== null ? authJWT.userData.first_name + ' ' + last_name : authJWT.userData.first_name;

  const username = fullName

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
        <FoodOrder />
      </NoSSR>

      <FoodPaymentForm
        username={username}
        userphone={authJWT.userData.phone}
        useraddress={authJWT.userData.country}
        memberID={authJWT.userData.member_id}
      />
      <a href='../'>返回修改商品</a>





    </div>

  )
}
