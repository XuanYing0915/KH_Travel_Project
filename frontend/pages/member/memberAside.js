import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

function MemberAside() {
  const menuItem = [
    { id: 1, title: '基本資料', goto: '/member/Profile' },
    { id: 2, title: '訂單查詢', goto: '/member/OrderList' },
    { id: 3, title: '優惠紅利', goto: '/member/Point' },
    { id: 4, title: '問答中心', goto: '/member/QAList' },
    { id: 5, title: '密碼管理', goto: '/member/Password' },
    { id: 6, title: '我的收藏', goto: '/member/Favorite' },
  ];

  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const activeItem = menuItem.findIndex((item) => item.goto === router.pathname);
    setActiveIndex(activeItem);
  }, [router.pathname]);

  return (
    <>
      <div className="adminAside col-2">
        <ul className="asideContent">
          <p className="maindir">會員資料</p>
          {menuItem.map((v, i) => {
            return (
              <li key={v.id} onClick={() => setActiveIndex(i)}>
                {v.goto && (
                  <Link href={v.goto}>
                    {/* <a className={activeIndex === i ? 'active' : ''}>{v.title}</a> */}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default MemberAside;
