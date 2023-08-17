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
    return <LoginForm />;
  } else {
    return null; // 可以返回null或一個加載指示符，表示正在轉到會員中心
  }
}
