import Link from 'next/link';

function MemberBack() {
    return (
        <>
            <div className="mMember">
                <Link href="/member/Profile">
                    <a>&lt;&ensp;會員中心</a>
                </Link>
            </div>
        </>
    )
}

export default MemberBack;
