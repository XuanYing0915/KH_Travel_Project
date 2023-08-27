import React, { useEffect } from 'react';
import LoginForm from '@/components/member/login-form';
import { useAuthJWT } from '@/hooks/use-auth-jwt';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();
  const { authJWT } = useAuthJWT();

  useEffect(() => {
    if (authJWT.isAuth) {
      router.push('/member/member-center');
    }
  }, [authJWT.isAuth, router]);

  // 未登入時，不會出現頁面內容
  if (!authJWT.isAuth) {
    return <div className='bg'><LoginForm />
    <style jsx> {` .bg {
      background: url('/images/member/yoyo.jpg');
      background-repeat: no-repeat;
      
              background-size: 100% 100%; // 新增這一行
              width: 1920px;  // 確保占滿整個寬度
              height: 660px;  // 確保占滿整個高度
    }`}
    </style>
    </div>;
  } else {
    return null; // 可以返回null或一個加載指示符，表示正在轉到會員中心
  }
}
